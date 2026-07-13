import { useMemo, useState } from 'react';

import close from '../../../../../../assets/images/close.png';
import {
  useGetShifts,
  useShiftsAssignments,
  useShiftTransfer,
  useUnAssignShift,
} from '../../../../../../hooks/shift/shiftApi';

import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react';

function ShiftModal({
  openShiftModal,
  setOpenShiftModal,
  selectedUser,
  mobile,
}) {
  const [assignmentsShift, setAssignmentShift] = useState(true);
  const [searchShift, setSearchShift] = useState('');

  const [form, setForm] = useState({
    shiftDefinitionId: '',
    startDate: '',
    endDate: '',
    startCycleIndex: '',
    notes: '',
  });

  const [formData, setFormData] = useState({
    newShiftDefinitionId: '',
    transferDate: '',
    startCycleIndex: '',
    notes: '',
  });

  const { data: shifts } = useGetShifts();

  const createShiftsAssignment = useShiftsAssignments();
  const transferShifts = useShiftTransfer();
  const unassignShifts = useUnAssignShift();

  const data = {
    userId: selectedUser?.id,
    personnelCode: selectedUser?.personnelCode,
    shiftDefinitionId: form.shiftDefinitionId,
    startDate: form.startDate,
    endDate: form.endDate,
    startCycleIndex: form.startCycleIndex,
    notes: form.notes,
  };

  const payload = {
    userId: selectedUser?.id,
    personnelCode: selectedUser?.personnelCode,
    newShiftDefinitionId: formData.newShiftDefinitionId,
    transferDate: formData.transferDate,
    startCycleIndex: formData.startCycleIndex,
    notes: formData.notes,
  };

  const submitHandler = (e) => {
    e.preventDefault();

    createShiftsAssignment.mutate(data, {
      onSuccess: () => {
        setOpenShiftModal(false);
      },
    });
  };

  const transferHandler = (e) => {
    e.preventDefault();

    transferShifts.mutate(payload, {
      onSuccess: () => {
        setOpenShiftModal(false);
      },
    });
  };

  const removeHandler = (assignmentId) => {
    if (!selectedUser?.id) return;

    if (!assignmentId) {
      toast.error('assignmentId نامعتبر است');
      return;
    }

    const endDate = new Date(
      Date.now() - new Date().getTimezoneOffset() * 60000
    )
      .toISOString()
      .slice(0, 10);

    unassignShifts.mutate(
      {
        userId: selectedUser.id,
        personnelCode: selectedUser.personnelCode,
        assignmentId,
        endDate,
        unassignAll: false,
        notes: '',
      },
      {
        onSuccess: () => {
          setOpenShiftModal(false);
        },
      }
    );
  };

  // get Shifts

  const getShifts = useMemo(() => {
    const none = { id: '', name: 'انتخاب شیفت', isActive: true };

    return [
      none,
      ...(shifts?.data ?? []).map((s) => ({
        id: s.id,
        name: s.name,
        isActive: s.isActive,
      })),
    ];
  }, [shifts]);

  const filterShifts = useMemo(() => {
    const q = searchShift.trim().toLowerCase();
    if (!q) return getShifts;

    return getShifts.filter((s) => (s?.name || '').toLowerCase().includes(q));
  }, [searchShift, getShifts]);

  const selectedShifts = useMemo(() => {
    return (
      getShifts.find((s) => s.id === (form.shiftDefinitionId || '')) ||
      getShifts[0]
    );
  }, [getShifts, form.shiftDefinitionId]);

  const selectedNewShifts = useMemo(() => {
    return (
      getShifts.find((s) => s.id === (formData.newShiftDefinitionId || '')) ||
      getShifts[0]
    );
  }, [getShifts, formData.newShiftDefinitionId]);

  return (
    <>
      {mobile ? (
        // mobile
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
            openShiftModal ? 'opacity-100 ' : 'pointer-events-none opacity-0'
          }`}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
          <div
            className={`relative transform rounded-[15px] bg-linear-to-tl from-black to-gray-600 p-3 text-white shadow-2xl transition-all duration-300 ${
              openShiftModal
                ? 'translate-y-0 scale-100 opacity-100'
                : '-translate-y-10 scale-95 opacity-0'
            }`}
          >
            <div className="flex items-center justify-between pb-5">
              <h1 className="pr-1.5 font-[SamimBold] text-[20px]">شیفت</h1>

              <button
                type="button"
                onClick={() => setOpenShiftModal(false)}
                className="cursor-pointer rounded-[10px] bg-white/80 p-1.5 text-red-500 transition-all delay-100 duration-75 ease-in-out hover:bg-black"
              >
                <img src={close} alt="close" width={20} />
              </button>
            </div>
            <div className="flex items-center justify-end space-x-3">
              {assignmentsShift ? (
                <p
                  onClick={() => setAssignmentShift(false)}
                  className="flex cursor-pointer items-center justify-center rounded-xl bg-white/30 px-4 py-2 font-[Samim] transition-all delay-75 duration-150 ease-in-out hover:scale-110 hover:bg-white/15"
                >
                  انتقال شیفت
                </p>
              ) : (
                <p
                  onClick={() => setAssignmentShift(true)}
                  className="flex cursor-pointer items-center justify-center rounded-xl bg-white/30 px-4 py-2 font-[Samim] transition-all delay-75 duration-150 ease-in-out hover:scale-110 hover:bg-white/15"
                >
                  اختصاص دادن شیفت
                </p>
              )}
            </div>
            {assignmentsShift ? (
              <h1 className="font-[SamimBold] text-[18px]">اختصاص دادن شیفت</h1>
            ) : (
              <h1 className="font-[SamimBold] text-[18px]">جایگزینی شیفت</h1>
            )}

            {assignmentsShift ? (
              // اختصاص دادن شیفت
              <form
                className="mt-5 grid grid-cols-2 gap-2"
                onSubmit={submitHandler}
              >
                <label className="font-[SamimBold]">
                  نام و نام خانوادگی
                  <input
                    type="text"
                    name="fullName"
                    value={selectedUser?.fullName || ''}
                    readOnly
                    className="mt-2 w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[16px] text-white outline-none"
                  />
                </label>

                <label className="font-[SamimBold]">
                  کدپرسنلی
                  <input
                    type="text"
                    name="personnelCode"
                    value={selectedUser?.personnelCode || ''}
                    readOnly
                    className="mt-2 w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[16px] text-white outline-none"
                  />
                </label>

                <Combobox
                  value={selectedShifts}
                  onChange={(value) =>
                    setForm((p) => ({
                      ...p,
                      shiftDefinitionId: value?.id || '',
                    }))
                  }
                >
                  {({ open }) => (
                    <div className="relative">
                      <ComboboxButton className="flex w-full items-center justify-between rounded-xl bg-white/10 p-3 font-[Samim] text-white outline-none">
                        <span
                          className={
                            selectedShifts?.id ? 'text-white' : 'text-white/70'
                          }
                        >
                          {selectedShifts?.name || 'انتخاب مدرک...'}
                        </span>
                        <span className="text-white/70">
                          {open ? '▴' : '▾'}
                        </span>
                      </ComboboxButton>
                      <div
                        className={`absolute z-50 mt-2 w-full overflow-auto rounded-xl bg-black/95 shadow-lg ring-1 ring-white/10 ${
                          open ? '' : 'hidden '
                        }`}
                      >
                        <div className="border-b border-white/10 p-2">
                          <ComboboxInput
                            value={searchShift}
                            onChange={(e) => setSearchShift(e.target.value)}
                            placeholder="جستجو..."
                            className="w-full rounded-lg bg-white/10 p-2 font-[Samim] text-white outline-none placeholder:text-white/50"
                          />
                        </div>
                        <ComboboxOptions>
                          {filterShifts.length === 0 ? (
                            <div className="p-3 text-white/70">
                              موردی پیدا نشد
                            </div>
                          ) : (
                            filterShifts
                              ?.filter((s) => s.isActive === true)
                              ?.map((s) => (
                                <ComboboxOption
                                  key={s.id || 'null'}
                                  value={s}
                                  className={({ activ, selected }) =>
                                    `cursor-pointer rounded-lg p-3 text-white ${
                                      activ ? 'bg-black' : ''
                                    } ${selected ? 'bg-black' : ''}`
                                  }
                                >
                                  {s.name}
                                </ComboboxOption>
                              ))
                          )}
                        </ComboboxOptions>
                      </div>
                    </div>
                  )}
                </Combobox>

                <input
                  type="text"
                  placeholder="چرخش"
                  name="startCycleIndex"
                  value={form.startCycleIndex}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, [e.target.name]: e.target.value }))
                  }
                  className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[16px] text-white outline-none"
                />

                <DatePicker
                  calendar={persian}
                  locale={persian_fa}
                  format="YYYY/MM/DD"
                  placeholder="تاریخ شروع"
                  onChange={(value) => {
                    setForm((p) => ({
                      ...p,
                      startDate: value
                        ? value.toDate().toISOString().split('T')[0]
                        : '',
                    }));
                  }}
                  inputClass="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[16px] text-white outline-none"
                />

                <DatePicker
                  calendar={persian}
                  locale={persian_fa}
                  format="YYYY/MM/DD"
                  placeholder="تاریخ پایان"
                  onChange={(value) => {
                    setForm((p) => ({
                      ...p,
                      endDate: value
                        ? value.toDate().toISOString().split('T')[0]
                        : '',
                    }));
                  }}
                  inputClass="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[16px] text-white outline-none"
                />

                <textarea
                  name="notes"
                  placeholder="توضیحات"
                  value={form.notes}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, [e.target.name]: e.target.value }))
                  }
                  className="col-span-2 w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[16px] text-white outline-none"
                />

                <div className="col-span-2 flex justify-end space-x-5 pt-1">
                  <button
                    type="submit"
                    className="cursor-pointer rounded-xl bg-linear-to-tl from-green-900 to-green-500 px-4 py-2 font-[Samim] transition-all delay-100 duration-150 ease-in-out hover:scale-105"
                  >
                    تایید
                  </button>
                </div>
              </form>
            ) : (
              // جایگزینی شیفت
              <form
                className="mt-5 grid grid-cols-2 gap-2"
                onSubmit={transferHandler}
              >
                <label className="font-[SamimBold]">
                  نام و نام خانوادگی
                  <input
                    type="text"
                    name="fullName"
                    value={selectedUser?.fullName || ''}
                    readOnly
                    className="mt-2 w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[16px] text-white outline-none"
                  />
                </label>

                <label className="font-[SamimBold]">
                  کد پرسنلی
                  <input
                    type="text"
                    name="personnelCode"
                    value={selectedUser?.personnelCode || ''}
                    readOnly
                    className="mt-2 w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[16px] text-white outline-none"
                  />
                </label>

                <DatePicker
                  calendar={persian}
                  locale={persian_fa}
                  format="YYYY/MM/DD"
                  placeholder="زمان انتقال"
                  onChange={(value) => {
                    setFormData((p) => ({
                      ...p,
                      transferDate: value
                        ? value.toDate().toISOString().split('T')[0]
                        : '',
                    }));
                  }}
                  inputClass="w-full rounded-xl  bg-white/10 p-3 font-[Samim] text-[16px] text-white outline-none"
                />

                <input
                  type="text"
                  placeholder="چرخش"
                  name="startCycleIndex"
                  value={formData.startCycleIndex}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      [e.target.name]: e.target.value,
                    }))
                  }
                  className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[16px] text-white outline-none"
                />

                <Combobox
                  value={selectedNewShifts}
                  onChange={(value) =>
                    setFormData((p) => ({
                      ...p,
                      newShiftDefinitionId: value?.id || '',
                    }))
                  }
                >
                  {({ open }) => (
                    <div className="relative">
                      <ComboboxButton className="flex w-full items-center justify-between rounded-xl bg-white/10 p-3 font-[Samim] text-white outline-none">
                        <span
                          className={
                            selectedNewShifts?.id
                              ? 'text-white'
                              : 'text-white/70'
                          }
                        >
                          {selectedNewShifts?.name || 'انتخاب مدرک...'}
                        </span>
                        <span className="text-white/70">
                          {open ? '▴' : '▾'}
                        </span>
                      </ComboboxButton>
                      <div
                        className={`absolute z-50 mt-2 w-full overflow-auto rounded-xl bg-black/95 shadow-lg ring-1 ring-white/10 ${
                          open ? '' : 'hidden '
                        }`}
                      >
                        <div className="border-b border-white/10 p-2">
                          <ComboboxInput
                            value={searchShift}
                            onChange={(e) => setSearchShift(e.target.value)}
                            placeholder="جستجو..."
                            className="w-full rounded-lg bg-white/10 p-2 font-[Samim] text-white outline-none placeholder:text-white/50"
                          />
                        </div>
                        <ComboboxOptions>
                          {filterShifts.length === 0 ? (
                            <div className="p-3 text-white/70">
                              موردی پیدا نشد
                            </div>
                          ) : (
                            filterShifts
                              ?.filter((s) => s.isActive === true)
                              ?.map((s) => (
                                <ComboboxOption
                                  key={s.id || 'null'}
                                  value={s}
                                  className={({ activ, selected }) =>
                                    `cursor-pointer rounded-lg p-3 text-white ${
                                      activ ? 'bg-black' : ''
                                    } ${selected ? 'bg-black' : ''}`
                                  }
                                >
                                  {s.name}
                                </ComboboxOption>
                              ))
                          )}
                        </ComboboxOptions>
                      </div>
                    </div>
                  )}
                </Combobox>
                <textarea
                  name="notes"
                  placeholder="توضیحات"
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      [e.target.name]: e.target.value,
                    }))
                  }
                  className="col-span-2 w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[16px] text-white outline-none"
                />

                <div className="col-span-2 flex justify-end space-x-5 pt-2">
                  <button
                    type="submit"
                    className="cursor-pointer rounded-xl bg-linear-to-tl from-green-900 to-green-500 px-4 py-2 font-[Samim] transition-all delay-100 duration-150 ease-in-out hover:scale-105"
                  >
                    تایید
                  </button>
                </div>
              </form>
            )}
            {selectedUser?.currentShiftAssignmentId &&
            selectedUser?.currentShiftAssignmentId.length > 0 ? (
              <div>
                <p className="border-white-50 border-b pt-5"></p>
                <h3 className="pt-5 pr-1.5 pb-5 font-[SamimBold] text-[20px]">
                  حذف شیفت از کاربر
                </h3>
                <div className="no-scrollbar flex w-full items-center justify-between rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none">
                  <p>{selectedUser?.currentShiftName}</p>

                  <button
                    onClick={() => {
                      removeHandler(selectedUser.currentShiftAssignmentId);
                    }}
                    className="cursor-pointer rounded-xl bg-linear-to-bl from-red-500 to-red-800 px-4 py-2 font-[Samim] transition-all delay-100 duration-150 ease-in-out hover:scale-105 hover:bg-red-500/60"
                  >
                    حذف
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        // desktop
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
            openShiftModal ? 'opacity-100 ' : 'pointer-events-none opacity-0'
          }`}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

          <div
            className={`relative w-[550px] transform rounded-[15px] bg-linear-to-tl from-black to-gray-600 p-6 text-white shadow-2xl transition-all duration-300 ${
              openShiftModal
                ? 'translate-y-0 scale-100 opacity-100'
                : '-translate-y-10 scale-95 opacity-0'
            }`}
          >
            <div className="flex items-center justify-between pb-2">
              <h2 className="font-[SamimBold] text-lg">شیفت</h2>

              <button
                type="button"
                onClick={() => setOpenShiftModal(false)}
                className="cursor-pointer rounded-[10px] bg-white/80 p-1.5 text-[30px] text-red-500 transition-all delay-100 duration-75 ease-in-out hover:bg-black"
              >
                <img
                  src={close}
                  alt="close"
                  width={20}
                  className="transition-all delay-100 duration-100 ease-in-out hover:scale-110"
                />
              </button>
            </div>

            <div className="flex items-center justify-end space-x-3">
              {assignmentsShift ? (
                <p
                  onClick={() => setAssignmentShift(false)}
                  className="flex cursor-pointer items-center justify-center rounded-xl bg-white/30 px-4 py-2 font-[Samim] transition-all delay-75 duration-150 ease-in-out hover:scale-110 hover:bg-white/15"
                >
                  انتقال شیفت
                </p>
              ) : (
                <p
                  onClick={() => setAssignmentShift(true)}
                  className="flex cursor-pointer items-center justify-center rounded-xl bg-white/30 px-4 py-2 font-[Samim] transition-all delay-75 duration-150 ease-in-out hover:scale-110 hover:bg-white/15"
                >
                  اختصاص دادن شیفت
                </p>
              )}
            </div>

            {assignmentsShift ? (
              <h1 className="font-[SamimBold] text-[18px]">اختصاص دادن شیفت</h1>
            ) : (
              <h1 className="font-[SamimBold] text-[18px]">جایگزینی شیفت</h1>
            )}

            {assignmentsShift ? (
              // اختصاص دادن شیفت
              <form
                className="mt-8 grid grid-cols-2 gap-5"
                onSubmit={submitHandler}
              >
                <label className="font-[SamimBold]">
                  نام و نام خانوادگی
                  <input
                    type="text"
                    name="fullName"
                    value={selectedUser?.fullName || ''}
                    readOnly
                    className="mt-3 w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
                  />
                </label>

                <label className="font-[SamimBold]">
                  کدپرسنلی
                  <input
                    type="text"
                    name="personnelCode"
                    value={selectedUser?.personnelCode || ''}
                    readOnly
                    className="mt-3 w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProBook] text-[18px] text-white outline-none placeholder:font-[Samim]"
                  />
                </label>

                <Combobox
                  value={selectedShifts}
                  onChange={(value) =>
                    setForm((p) => ({
                      ...p,
                      shiftDefinitionId: value?.id || '',
                    }))
                  }
                >
                  {({ open }) => (
                    <div className="relative">
                      <ComboboxButton className="flex w-full items-center justify-between rounded-xl bg-white/10 p-3 font-[Samim] text-white outline-none">
                        <span
                          className={
                            selectedShifts?.id ? 'text-white' : 'text-white/70'
                          }
                        >
                          {selectedShifts?.name || 'انتخاب مدرک...'}
                        </span>
                        <span className="text-white/70">
                          {open ? '▴' : '▾'}
                        </span>
                      </ComboboxButton>
                      <div
                        className={`absolute z-50 mt-2 w-full overflow-auto rounded-xl bg-black/95 shadow-lg ring-1 ring-white/10 ${
                          open ? '' : 'hidden '
                        }`}
                      >
                        <div className="border-b border-white/10 p-2">
                          <ComboboxInput
                            value={searchShift}
                            onChange={(e) => setSearchShift(e.target.value)}
                            placeholder="جستجو..."
                            className="w-full rounded-lg bg-white/10 p-2 font-[Samim] text-white outline-none placeholder:text-white/50"
                          />
                        </div>
                        <ComboboxOptions>
                          {filterShifts.length === 0 ? (
                            <div className="p-3 text-white/70">
                              موردی پیدا نشد
                            </div>
                          ) : (
                            filterShifts
                              ?.filter((s) => s.isActive === true)
                              ?.map((s) => (
                                <ComboboxOption
                                  key={s.id || 'null'}
                                  value={s}
                                  className={({ activ, selected }) =>
                                    `cursor-pointer rounded-lg p-3 text-white ${
                                      activ ? 'bg-black' : ''
                                    } ${selected ? 'bg-black' : ''}`
                                  }
                                >
                                  {s.name}
                                </ComboboxOption>
                              ))
                          )}
                        </ComboboxOptions>
                      </div>
                    </div>
                  )}
                </Combobox>

                <input
                  type="text"
                  placeholder="چرخش"
                  name="startCycleIndex"
                  value={form.startCycleIndex}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, [e.target.name]: e.target.value }))
                  }
                  className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
                />

                <DatePicker
                  calendar={persian}
                  locale={persian_fa}
                  format="YYYY/MM/DD"
                  placeholder="تاریخ شروع"
                  onChange={(value) => {
                    setForm((p) => ({
                      ...p,
                      startDate: value
                        ? value.toDate().toISOString().split('T')[0]
                        : '',
                    }));
                  }}
                  inputClass="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
                />

                <DatePicker
                  calendar={persian}
                  locale={persian_fa}
                  format="YYYY/MM/DD"
                  placeholder="تاریخ پایان"
                  onChange={(value) => {
                    setForm((p) => ({
                      ...p,
                      endDate: value
                        ? value.toDate().toISOString().split('T')[0]
                        : '',
                    }));
                  }}
                  inputClass="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
                />

                <textarea
                  name="notes"
                  placeholder="توضیحات"
                  value={form.notes}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, [e.target.name]: e.target.value }))
                  }
                  className="col-span-2 mt-3 w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
                />

                <div className="col-span-2 flex justify-end space-x-5 pt-5">
                  <button
                    type="submit"
                    className="cursor-pointer rounded-xl bg-linear-to-tl from-green-900 to-green-500 px-4 py-2 font-[Samim] transition-all delay-100 duration-150 ease-in-out hover:scale-105"
                  >
                    تایید
                  </button>
                </div>
              </form>
            ) : (
              // جایگزینی شیفت
              <form
                className="mt-8 grid grid-cols-2 gap-5"
                onSubmit={transferHandler}
              >
                <label className="font-[SamimBold]">
                  نام و نام خانوادگی
                  <input
                    type="text"
                    name="fullName"
                    value={selectedUser?.fullName || ''}
                    readOnly
                    className="mt-3 w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
                  />
                </label>

                <label className="font-[SamimBold]">
                  کد پرسنلی
                  <input
                    type="text"
                    name="personnelCode"
                    value={selectedUser?.personnelCode || ''}
                    readOnly
                    className="mt-3 w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProBook] text-[18px] text-white outline-none placeholder:font-[Samim]"
                  />
                </label>

                <DatePicker
                  calendar={persian}
                  locale={persian_fa}
                  format="YYYY/MM/DD"
                  placeholder="زمان انتقال"
                  onChange={(value) => {
                    setFormData((p) => ({
                      ...p,
                      transferDate: value
                        ? value.toDate().toISOString().split('T')[0]
                        : '',
                    }));
                  }}
                  inputClass="w-full rounded-xl mt-3 bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
                />

                <input
                  type="text"
                  placeholder="چرخش"
                  name="startCycleIndex"
                  value={formData.startCycleIndex}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      [e.target.name]: e.target.value,
                    }))
                  }
                  className="mt-3 w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
                />

                <Combobox
                  value={selectedNewShifts}
                  onChange={(value) =>
                    setFormData((p) => ({
                      ...p,
                      newShiftDefinitionId: value?.id || '',
                    }))
                  }
                >
                  {({ open }) => (
                    <div className="relative">
                      <ComboboxButton className="flex w-full items-center justify-between rounded-xl bg-white/10 p-3 font-[Samim] text-white outline-none">
                        <span
                          className={
                            selectedNewShifts?.id
                              ? 'text-white'
                              : 'text-white/70'
                          }
                        >
                          {selectedNewShifts?.name || 'انتخاب مدرک...'}
                        </span>
                        <span className="text-white/70">
                          {open ? '▴' : '▾'}
                        </span>
                      </ComboboxButton>
                      <div
                        className={`absolute z-50 mt-2 w-full overflow-auto rounded-xl bg-black/95 shadow-lg ring-1 ring-white/10 ${
                          open ? '' : 'hidden '
                        }`}
                      >
                        <div className="border-b border-white/10 p-2">
                          <ComboboxInput
                            value={searchShift}
                            onChange={(e) => setSearchShift(e.target.value)}
                            placeholder="جستجو..."
                            className="w-full rounded-lg bg-white/10 p-2 font-[Samim] text-white outline-none placeholder:text-white/50"
                          />
                        </div>
                        <ComboboxOptions>
                          {filterShifts.length === 0 ? (
                            <div className="p-3 text-white/70">
                              موردی پیدا نشد
                            </div>
                          ) : (
                            filterShifts
                              ?.filter((s) => s.isActive === true)
                              ?.map((s) => (
                                <ComboboxOption
                                  key={s.id || 'null'}
                                  value={s}
                                  className={({ activ, selected }) =>
                                    `cursor-pointer rounded-lg p-3 text-white ${
                                      activ ? 'bg-black' : ''
                                    } ${selected ? 'bg-black' : ''}`
                                  }
                                >
                                  {s.name}
                                </ComboboxOption>
                              ))
                          )}
                        </ComboboxOptions>
                      </div>
                    </div>
                  )}
                </Combobox>

                <textarea
                  name="notes"
                  placeholder="توضیحات"
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      [e.target.name]: e.target.value,
                    }))
                  }
                  className="col-span-2 mt-3 w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
                />

                <div className="col-span-2 flex justify-end space-x-5 pt-5">
                  <button
                    type="submit"
                    className="cursor-pointer rounded-xl bg-linear-to-tl from-green-900 to-green-500 px-4 py-2 font-[Samim] transition-all delay-100 duration-150 ease-in-out hover:scale-105"
                  >
                    تایید
                  </button>
                </div>
              </form>
            )}

            {selectedUser?.currentShiftAssignmentId &&
            selectedUser?.currentShiftAssignmentId.length > 0 ? (
              <div className="no-scrollbar mt-2 flex w-full items-center justify-between rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none">
                <p>{selectedUser?.currentShiftName}</p>

                <button
                  onClick={() => {
                    removeHandler(selectedUser.currentShiftAssignmentId);
                  }}
                  className="cursor-pointer rounded-xl bg-linear-to-bl from-red-500 to-red-800 px-4 py-2 font-[Samim] transition-all delay-100 duration-150 ease-in-out hover:scale-105 hover:bg-red-500/60"
                >
                  حذف
                </button>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
}

export default ShiftModal;
