import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';

import close from '../../../../../../assets/images/close.png';
import { useMemo, useState } from 'react';
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react';

function CreateModal({
  openCreateModal,
  setOpenCreateModal,
  submitHadler,
  form,
  setForm,
  educationDegrees,
  jobPositions,
  data,
}) {
  
  

  const [searchEdu, setSearchEdu] = useState('');
  const [searchJob, setSearchJob] = useState('');
  const [searchManager, setSearchManager] = useState('');

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
  const jobPosition = useMemo(() => {
    const none = { id: '', name: 'بدون جایگاه شغلی', isActive: true };

    return [
      none,
      ...(jobPositions?.items ?? [])?.map((p) => ({
        id: p.id,
        name: p.title || '--',
        isActive: p.isActive,
      })),
    ];
  }, [jobPositions]);

  const filterJob = useMemo(() => {
    const q = searchJob.trim().toLowerCase();
    if (!q) return jobPosition;

    return jobPosition.filter((j) => (j?.name || '').toLowerCase().includes(q));
  }, [searchJob, jobPosition]);

  const selectedJob = useMemo(() => {
    return (
      jobPosition.find((m) => m.id === (form.jobPositionId || '')) ||
      jobPosition[0]
    );
  }, [jobPosition, form.jobPositionId]);
  // -------------------------------------------

  // option manager
  const managerOption = useMemo(() => {
    const none = { id: '', name: 'انتخاب مدیر مستقیم' };

    const parents = (jobPositions?.items ?? [])
      .filter((p) => p.parentPositionId && p.parentPositionTitle) // فقط معتبرها
      .map((p) => ({
        id: p.parentPositionId,
        name: p.parentPositionTitle,
      }));

    const uniq = Array.from(new Map(parents.map((m) => [m.id, m])).values());

    return [none, ...uniq];
  }, [jobPositions]);

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

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
        openCreateModal
          ? 'pointer-events-auto opacity-100'
          : 'pointer-events-none opacity-0'
      }`}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

      <div
        className={`relative w-fit transform rounded-[15px] bg-linear-to-tl from-black to-gray-600 p-6 text-white shadow-2xl transition-all duration-300 ${
          openCreateModal
            ? 'translate-y-0 scale-100 opacity-100'
            : '-translate-y-10 scale-95 opacity-0'
        }`}
      >
        <div className="flex items-center justify-between">
          <h2 className="pr-1.5 pb-5 font-[SamimBold] text-[20px]">
            ایجاد کاربر جدید
          </h2>
          <button
            onClick={() => {
              setOpenCreateModal(false);
            }}
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
        <form onSubmit={submitHadler} className="grid grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="نام"
            name="firstName"
            value={form.firstName}
            onChange={(event) => {
              setForm({ ...form, firstName: event.target.value });
            }}
            className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
          />
          <input
            type="text"
            placeholder="نام خانوادگی"
            name="lastName"
            value={form.lastName}
            onChange={(event) => {
              setForm({ ...form, lastName: event.target.value });
            }}
            className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
          />

          <input
            type="text"
            placeholder="کد پرسنلی"
            name="personnelCode"
            value={form.personnelCode}

            onChange={(event) => {
              setForm({ ...form, personnelCode: event.target.value });
            }}
            className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
          />
          <input
            type="text"
            placeholder="رمز عبور"
            name="password"
            value={form.password}
            onChange={(event) => {
              setForm({ ...form, password: event.target.value });
            }}
            className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
          />
          <input
            type="text"
            placeholder="کدملی"
            name="nationalCode"
            value={form.nationalCode}
            onChange={(event) => {
              setForm({ ...form, nationalCode: event.target.value });
            }}
            className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
          />
          <input
            type="text"
            placeholder="شماره موبایل"
            name="mobileNumber"
            value={form.mobileNumber}
            onChange={(event) => {
              setForm({ ...form, mobileNumber: event.target.value });
            }}
            className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
          />
          <input
            type="email"
            placeholder="example@gmail.com"
            name="email"
            value={form.email}
            onChange={(event) => {
              setForm({ ...form, email: event.target.value });
            }}
            className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
          />
          <DatePicker
            calendar={persian}
            locale={persian_fa}
            placeholder="تاریخ تولد"
            name="birthDate"
            format="YYYY/MM/DD"
            calendarPosition="bottom-center"
            onChange={(value) => {
              setForm({
                ...form,
                birthDate: value
                  ? value.toDate().toISOString().split('T')[0]
                  : '',
              });
            }}
            inputClass="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
          />
          <DatePicker
            calendar={persian}
            locale={persian_fa}
            placeholder="تاریخ استخدام"
            name="hireDate"
            format="YYYY/MM/DD"
            calendarPosition="bottom-center"
            onChange={(value) => {
              setForm({
                ...form,
                hireDate: value
                  ? value.toDate().toISOString().split('T')[0]
                  : '',
              });
            }}
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
            <label htmlFor="gender" className="text-[20px]">
              آقا
              <input
                type="radio"
                name="gender"
                value={0}
                checked={form.gender === 0}
                onChange={(event) => {
                  setForm({
                    ...form,
                    [event.target.name]: Number(event.target.value),
                  });
                }}
                className="mr-2 size-4"
              />
            </label>
            <label htmlFor="gender" className="text-[20px]">
              خانم
              <input
                type="radio"
                name="gender"
                value={1}
                checked={form.gender === 1}
                onChange={(event) => {
                  setForm({
                    ...form,
                    [event.target.name]: Number(event.target.value),
                  });
                }}
                className="mr-2 size-4"
              />
            </label>
          </div>

          <div className="col-span-2 flex justify-end space-x-5 pt-5">
            <button
              type="submit"
              className="hover: cursor-pointer rounded-xl bg-linear-to-tl from-green-900 to-green-500 px-4 py-2 font-[Samim] transition-all delay-100 duration-150 ease-in-out hover:scale-105"
            >
              ایجاد
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateModal;
