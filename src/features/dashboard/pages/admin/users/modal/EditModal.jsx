// EditModal.jsx
import { useEffect, useMemo, useState } from 'react';
import close from '../../../../../../assets/images/close.png';

import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react';

import DatePicker from 'react-multi-date-picker';
import DateObject from 'react-date-object';

import persian from 'react-date-object/calendars/persian';
import gregorian from 'react-date-object/calendars/gregorian';
import persian_fa from 'react-date-object/locales/persian_fa';

import { useEducationDegrees } from '../../../../../../hooks/education/education';
import { useJobPositions } from '../../../../../../hooks/jobPosition/jobPosition';
import { useUpdateUser } from '../../../../../../hooks/user/userApi';
import { toShamsi } from '../../../../../../Time/date';

function pickerValueFromISO(iso) {
  if (!iso) return null;

  return new DateObject({
    date: iso,
    format: 'YYYY-MM-DD',
    calendar: gregorian,
  }).convert(persian);
}

function isoFromPickerValue(value) {
  return value ? value.convert(gregorian).format('YYYY-MM-DD') : '';
}

function EditModal({
  selectedUser,
  setSelectedUser,
  openEditModal,
  setOpenEditModal,
}) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    nationalCode: '',
    mobileNumber: '',
    email: '',
    homePhoneNumber: '',
    insuranceCode: '',
    faceCode: '',
    gender: 0,

    birthDate: '',
    hireDate: '',

    educationDegreeId: '',
    jobPositionId: '',
    managerId: '',
  });

  const [searchEdu, setSearchEdu] = useState('');
  const [searchJob, setSearchJob] = useState('');
  const [searchManager, setSearchManager] = useState('');

  // get education
  const { data: educationDegrees } = useEducationDegrees();
  // get jobPosition
  const { data: jobPosition } = useJobPositions();

  const updateUser = useUpdateUser();

  // option education
  const education = useMemo(() => {
    const none = { id: '', name: 'بدون مدرک', isActive: true };

    return [
      none,
      ...(educationDegrees ?? [])?.map((p) => ({
        id: p.id,
        name: p.name || '--',
        isActive: p.isActive,
      })),
    ];
  }, [educationDegrees]);

  const filterEducation = useMemo(() => {
    const q = searchEdu.trim().toLowerCase();
    if (!q) return education;

    return education.filter((m) => (m?.name || '').toLowerCase().includes(q));
  }, [searchEdu, education]);

  const selectedEdu = useMemo(() => {
    return (
      education.find((m) => m.id === (form.educationDegreeId || '')) ||
      education[0]
    );
  }, [education, form.educationDegreeId]);
  // --------------------------------------------

  // option jobPosition
  const jobPositions = useMemo(() => {
    const none = { id: '', name: 'بدون جایگاه شغلی', isActive: true };

    return [
      none,
      ...(jobPosition?.items ?? [])?.map((p) => ({
        id: p.id,
        name: p.title || '--',
        isActive: p.isActive,
      })),
    ];
  }, [jobPosition]);

  const filterJob = useMemo(() => {
    const q = searchJob.trim().toLowerCase();
    if (!q) return jobPositions;

    return jobPositions.filter((j) =>
      (j?.name || '').toLowerCase().includes(q)
    );
  }, [searchJob, jobPosition]);

  const selectedJob = useMemo(() => {
    return (
      jobPositions.find((m) => m.id === (form.jobPositionId || '')) ||
      jobPosition[0]
    );
  }, [jobPositions, form.jobPositionId]);
  // -------------------------------------------

  // option manager
  const managerOption = useMemo(() => {
    const none = { id: '', name: 'انتخاب مدیر مستقیم' };

    const parents = (jobPosition?.items ?? [])
      .filter((p) => p.parentPositionId && p.parentPositionTitle)
      .map((p) => ({
        id: p.parentPositionId,
        name: p.parentPositionTitle,
      }));

    const uniq = Array.from(new Map(parents.map((m) => [m.id, m])).values());

    return [none, ...uniq];
  }, [jobPosition]);

  const filterManager = useMemo(() => {
    const q = searchManager.trim().toLowerCase();
    if (!q) return managerOption;

    return managerOption.filter((m) =>
      (m?.name || '').toLowerCase().includes(q)
    );
  }, [searchManager, managerOption]);

  const selectedManager = useMemo(() => {
    return (
      managerOption.find((m) => m.id === (form.managerId || '')) ||
      managerOption[0]
    );
  }, [managerOption, form.managerId]);
  // -----------------------------------------------------

  useEffect(() => {
    if (!selectedUser) return;

    setForm({
      ...selectedUser,
      firstName: selectedUser.firstName ?? '',
      lastName: selectedUser.lastName ?? '',
      nationalCode: selectedUser.nationalCode ?? '',
      mobileNumber: selectedUser.mobileNumber ?? '',
      email: selectedUser.email ?? '',
      homePhoneNumber: selectedUser.homePhoneNumber ?? '',
      insuranceCode: selectedUser.insuranceCode ?? '',
      faceCode: selectedUser.faceCode ?? '',
      gender: Number(selectedUser.gender ?? 0),

      birthDate: selectedUser?.birthDate ?? '',
      hireDate: selectedUser?.hireDate ?? '',

      educationDegreeId: selectedUser.educationDegreeId ?? '',
      jobPositionId: selectedUser.jobPositionId ?? '',
      managerId: selectedUser.managerId ?? '',
    });
  }, [selectedUser]);

  const payload = useMemo(() => {
    return {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),

      nationalCode: form.nationalCode.trim() || null,
      mobileNumber: form.mobileNumber.trim(),
      email: form.email.trim(),

      homePhoneNumber: form.homePhoneNumber.trim() || null,
      insuranceCode: form.insuranceCode.trim() || null,
      faceCode: form.faceCode.trim() || null,

      gender: Number(form.gender ?? 0),

      birthDate: form.birthDate.trim() || null,
      hireDate: form.hireDate.trim() || null,

      educationDegreeId: form.educationDegreeId || null,
      jobPositionId: form.jobPositionId || null,
      managerId: form.managerId.trim() || null,
    };
  }, [form]);

  const closeModal = () => {
    setOpenEditModal(false);
    setSelectedUser(null);
  };

  const onTextChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!selectedUser?.id) return;

    updateUser.mutate(
      { id: selectedUser.id, data: payload },
      {
        onSuccess: () => setOpenEditModal(false),
      }
    );
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
        openEditModal ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

      <div
        className={`relative w-[550px] transform rounded-[15px] bg-linear-to-tl from-black to-gray-600 p-6 text-white shadow-2xl transition-all duration-300 ${
          openEditModal
            ? 'translate-y-0 scale-100 opacity-100'
            : '-translate-y-10 scale-95 opacity-0'
        }`}
      >
        <div className="flex items-center justify-between pb-5">
          <h2 className="pr-1.5 font-[SamimBold] text-[20px]">{`ویرایش کاربر ${
            selectedUser?.fullName ?? '--'
          }`}</h2>

          <button
            type="button"
            onClick={closeModal}
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

        <form onSubmit={submitHandler} className="grid grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="نام"
            name="firstName"
            value={form.firstName}
            onChange={onTextChange}
            className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
          />

          <input
            type="text"
            placeholder="نام خانوادگی"
            name="lastName"
            value={form.lastName}
            onChange={onTextChange}
            className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
          />
          <input
            type="text"
            placeholder="کد ملی"
            name="insuranceCode"
            value={form.insuranceCode}
            onChange={onTextChange}
            className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProBook] text-[18px] text-white outline-none placeholder:font-[Samim]"
          />
          <input
            type="text"
            placeholder="کد بیمه"
            name="nationalCode"
            value={form.nationalCode}
            onChange={onTextChange}
            className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProBook] text-[18px] text-white outline-none placeholder:font-[Samim]"
          />

          <input
            type="text"
            placeholder="شماره موبایل"
            name="mobileNumber"
            value={form.mobileNumber}
            onChange={onTextChange}
            className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
          />

          <input
            type="email"
            placeholder="example@gmail.com"
            name="email"
            value={form.email}
            onChange={onTextChange}
            className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProBook] text-[18px] text-white outline-none placeholder:font-[Samim]"
          />

          <input
            type="text"
            placeholder="تلفن منزل"
            name="homePhoneNumber"
            value={form.homePhoneNumber}
            onChange={onTextChange}
            className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProBook] text-[18px] text-white outline-none placeholder:font-[Samim]"
          />

          <input
            type="text"
            placeholder="کد چهره"
            name="faceCode"
            value={form.faceCode}
            onChange={onTextChange}
            className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProBook] text-[18px] text-white outline-none placeholder:font-[Samim]"
          />

          <DatePicker
            calendar={persian}
            locale={persian_fa}
            format="YYYY/MM/DD"
            placeholder="تاریخ تولد"
            onChange={(value) =>
              setForm((p) => ({
                ...p,
                birthDate: value
                  ? value.toDate().toISOString().split('T')[0]
                  : '',
              }))
            }
            value={form.birthDate ? new Date(form.birthDate) : null}
            inputClass="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
          />

          <DatePicker
            calendar={persian}
            locale={persian_fa}
            placeholder="تاریخ استخدام"
            format="YYYY/MM/DD"
            onChange={(value) =>
              setForm((p) => ({
                ...p,
                hireDate: value
                  ? value.toDate().toISOString().split('T')[0]
                  : '',
              }))
            }
            value={form.hireDate ? new Date(form.hireDate) : null}
            inputClass="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
          />

          <Combobox
            value={selectedEdu}
            onChange={(value) =>
              setForm((p) => ({ ...p, educationDegreeId: value?.id || '' }))
            }
          >
            {({ open }) => (
              <div className="relative">
                <ComboboxButton className="flex w-full items-center justify-between rounded-xl bg-white/10 p-3 font-[Samim] text-white outline-none">
                  <span
                    className={selectedEdu?.id ? 'text-white' : 'text-white/70'}
                  >
                    {selectedEdu?.name || 'انتخاب مدرک...'}
                  </span>
                  <span className="text-white/70">{open ? '▴' : '▾'}</span>
                </ComboboxButton>
                <div
                  className={`absolute z-50 mt-2 w-full overflow-auto rounded-xl bg-black/95 shadow-lg ring-1 ring-white/10 ${
                    open ? '' : 'hidden '
                  }`}
                >
                  <div className="border-b border-white/10 p-2">
                    <ComboboxInput
                      value={searchEdu}
                      onChange={(e) => setSearchEdu(e.target.value)}
                      placeholder="جستجو..."
                      className="w-full rounded-lg bg-white/10 p-2 font-[Samim] text-white outline-none placeholder:text-white/50"
                    />
                  </div>

                  <ComboboxOptions className="no-scrollbar max-h-60 overflow-auto p-1">
                    {filterEducation.length === 0 ? (
                      <div className="p-3 text-white/70">موردی پیدا نشد</div>
                    ) : (
                      filterEducation
                        ?.filter((item) => item.isActive === true)
                        ?.map((edu) => (
                          <ComboboxOption
                            key={edu.id || 'null'}
                            value={edu}
                            className={({ active, selected }) =>
                              `cursor-pointer rounded-lg p-3 text-white ${
                                active ? 'bg-black' : ''
                              } ${selected ? 'bg-black' : ''}`
                            }
                          >
                            {edu.name}
                          </ComboboxOption>
                        ))
                    )}
                  </ComboboxOptions>
                </div>
              </div>
            )}
          </Combobox>

          <Combobox
            value={selectedJob}
            onChange={(value) =>
              setForm((p) => ({ ...p, jobPositionId: value?.id || '' }))
            }
          >
            {({ open }) => (
              <div className="relative">
                <ComboboxButton className="flex w-full items-center justify-between rounded-xl bg-white/10 p-3 font-[Samim] text-white outline-none">
                  <span
                    className={selectedJob?.id ? 'text-white' : 'text-white/70'}
                  >
                    {selectedJob?.name || 'انتخاب جایگاه شغلی...'}
                  </span>
                  <span className="text-white/70">{open ? '▴' : '▾'}</span>
                </ComboboxButton>
                <div
                  className={`absolute z-50 mt-2 w-full overflow-auto rounded-xl bg-black/95 shadow-lg ring-1 ring-white/10 ${
                    open ? '' : 'hidden '
                  }`}
                >
                  <div className="border-b border-white/10 p-2">
                    <ComboboxInput
                      value={searchJob}
                      onChange={(e) => setSearchJob(e.target.value)}
                      placeholder="جستجو..."
                      className="w-full rounded-lg bg-white/10 p-2 font-[Samim] text-white outline-none placeholder:text-white/50"
                    />
                  </div>
                  <ComboboxOptions className="no-scrollbar max-h-60 overflow-auto p-1">
                    {filterJob.length === 0 ? (
                      <div className="p-3 text-white/70">موردی پیدا نشد</div>
                    ) : (
                      filterJob
                        ?.filter((item) => item.isActive === true)
                        .map((job) => (
                          <ComboboxOption
                            key={job.id || 'null'}
                            value={job}
                            className={({ active, selected }) =>
                              `cursor-pointer rounded-lg p-3 text-white ${
                                active ? 'bg-black' : ''
                              } ${selected ? 'bg-black' : ''}`
                            }
                          >
                            {job.name}
                          </ComboboxOption>
                        ))
                    )}
                  </ComboboxOptions>
                </div>
              </div>
            )}
          </Combobox>

          <Combobox
            value={selectedManager}
            onChange={(value) =>
              setForm((p) => ({ ...p, managerId: value?.id || '' }))
            }
          >
            {({ open }) => (
              <div className="relative">
                <ComboboxButton className="flex w-full items-center justify-between rounded-xl bg-white/10 p-3 font-[Samim] text-white outline-none">
                  <span
                    className={
                      selectedManager?.id ? 'text-white' : 'text-white/70'
                    }
                  >
                    {selectedManager?.name || 'انتخاب جایگاه شغلی...'}
                  </span>
                  <span className="text-white/70">{open ? '▴' : '▾'}</span>
                </ComboboxButton>
                <div
                  className={`absolute z-50 mt-2 w-full overflow-auto rounded-xl bg-black/95 shadow-lg ring-1 ring-white/10 ${
                    open ? '' : 'hidden '
                  }`}
                >
                  <div className="border-b border-white/10 p-2">
                    <ComboboxInput
                      value={searchManager}
                      onChange={(e) => setSearchManager(e.target.value)}
                      placeholder="جستجو..."
                      className="w-full rounded-lg bg-white/10 p-2 font-[Samim] text-white outline-none placeholder:text-white/50"
                    />
                  </div>
                  <ComboboxOptions className="no-scrollbar max-h-60 overflow-auto p-1">
                    {filterManager.length === 0 ? (
                      <div className="p-3 text-white/70">موردی پیدا نشد</div>
                    ) : (
                      filterManager.map((m) => (
                        <ComboboxOption
                          key={m.id}
                          value={m}
                          className={({ active, selected }) =>
                            `cursor-pointer rounded-lg p-3 text-white ${
                              active ? 'bg-black' : ''
                            } ${selected ? 'bg-black' : ''}`
                          }
                        >
                          {m.name}
                        </ComboboxOption>
                      ))
                    )}
                  </ComboboxOptions>
                </div>
              </div>
            )}
          </Combobox>

          <div className="flex items-center space-x-5">
            <label className="text-[20px]">
              آقا
              <input
                type="radio"
                name="gender"
                value={0}
                checked={form.gender === 0}
                onChange={(e) =>
                  setForm((p) => ({ ...p, gender: Number(e.target.value) }))
                }
                className="mr-2 size-4"
              />
            </label>

            <label className="text-[20px]">
              خانم
              <input
                type="radio"
                name="gender"
                value={1}
                checked={form.gender === 1}
                onChange={(e) =>
                  setForm((p) => ({ ...p, gender: Number(e.target.value) }))
                }
                className="mr-2 size-4"
              />
            </label>
          </div>

          <div className="col-span-2 flex justify-end space-x-5 pt-5">
            <button
              type="submit"
              disabled={updateUser.isPending}
              className="hover: cursor-pointer rounded-xl bg-linear-to-tl from-green-900 to-green-500 px-4 py-2 font-[Samim] transition-all delay-100 duration-150 ease-in-out hover:scale-105"
            >
              {updateUser.isPending ? 'در حال ارسال...' : 'ویرایش'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditModal;
