import React, { useEffect, useState } from 'react';

import close from '../../../../assets/images/close.png';

import { useGetProfile } from '../../../../hooks/profile/profile';

import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { useCreateControlChecklistReport } from '../../Api/controlChecklist/controlChecklist';

const deviseList = [
  { id: 1, name: 'کولرگازی فن سوپر ژرنال A', location: 'داخل اتاق توزیع' },
  { id: 2, name: 'کولرگازی فن سوپر ژرنال B', location: 'داخل اتاق توزیع' },
  { id: 3, name: 'کولرگازی فن سوپر ژرنال C', location: 'داخل اتاق توزیع' },
  {
    id: 4,
    name: 'کولرگازی فن سوپر ژرنال فرمان A',
    location: 'داخل اتاق فرمان',
  },
  { id: 5, name: 'کولرگازی فن سوپرژرنال فرمان B', location: 'داخل اتاق فرمان' },
  {
    id: 6,
    name: 'کولرگازی اتاق سرپرستی و مدیریت',
    location: 'سرپرستی و مدیریت',
  },
  {
    id: 7,
    name: 'کولرگازی اتاق فرمان بچ پلنت',
    location: 'اتاق فرمان بچ پلنت',
  },
  { id: 8, name: 'کولرگازی اتاق سرپرست تولید', location: 'اتاق سرپرست تولید' },
  { id: 9, name: 'کولرگازی اتاق HSE', location: 'اتاق HSE' },
  { id: 10, name: 'کولرگازی اتاق ماشین 3', location: 'اتاق ماشین 3' },
  { id: 11, name: 'روغن ترانس شبکه A', location: 'اتاق پست' },
  { id: 12, name: 'روغن ترانس شبکه B', location: 'اتاق پست' },
  { id: 13, name: 'سیم پیچ ترانس A', location: 'اتاق پست' },
  { id: 14, name: 'سیم پیچ ترانس B', location: 'اتاق پست' },
  { id: 15, name: 'دمای اتاق ترانس', location: 'اتاق ترانس' },
  { id: 16, name: 'سطح روغن ترانس A', location: 'اتاق ترانس' },
  { id: 17, name: 'سطح روغن ترانس B', location: 'اتاق ترانس' },
  { id: 18, name: 'تهویه تابلوهای توزیع', location: 'اتاق توزیع' },
  {
    id: 19,
    name: 'تهویه اتاق ترانس فن ها',
    location: 'اتاق پست',
  },
  {
    id: 20,
    name: 'تهویه تابلوهای PLC کوره و اتاق فرمان',
    location: 'اتاق فرمان کوره',
  },
  { id: 21, name: 'ولتاژ باطری ها', location: 'اتاق توزیع' },
  { id: 22, name: 'تهویه دما', location: 'اتاق توزیع' },
  { id: 23, name: 'سلامت باطری', location: 'اتاق توزیع' },
  { id: 24, name: 'آیتم مصرفی', location: 'اتاق توزیع' },
  {
    id: 25,
    name: 'سطح گازوئیل دیزل ژنراتور مخزن A',
    location: 'محوطه ی دیزل ها',
  },
  {
    id: 26,
    name: 'سطح گازوئیل دیزل ژنراتور مخزن B',
    location: 'محوطه ی دیزل ها',
  },

  {
    id: 27,
    name: 'سطح روغن دیزل ژنراتور  A',
    location: 'محوطه ی دیزل ها',
  },

  {
    id: 28,
    name: 'سطح روغن دیزل ژنراتور  B',
    location: 'محوطه ی دیزل ها',
  },

  {
    id: 29,
    name: 'سطح منبع گازوئیل مخزن 8000(لیتر)',
    location: 'محوطه ی ورودی زیرزمین',
  },
];

function CreateControlChecklist({ openCreateModal, setOpenCreateModal }) {
  const [form, setForm] = useState({
    checklistDate: '',
    shiftName: '',
    personnelName: '',
    shiftFlags: 2,
    description: '',
    items: deviseList?.map((d) => ({
      equipmentName: d?.name,
      location: d?.location,
      temperature: 0,
      ampere: 0,
      visualInspection: '',
      setpoint: '',
    })),
  });

  const handleItemChange = (index, field, value) => {
    setForm((prev) => {
      const items = [...prev.items];
      items[index] = { ...items[index], [field]: value };
      return { ...prev, items };
    });
  };

  const { data: profile } = useGetProfile();

  useEffect(() => {
    if (profile?.data?.currentShift?.shiftName) {
      setForm((p) => ({
        ...p,
        shiftName: profile?.data?.currentShift?.shiftName,
      }));
    }

    if (profile?.data?.fullName) {
      setForm((p) => ({
        ...p,
        personnelName: profile?.data?.fullName,
      }));
    }
  }, [profile]);

  const closeHandler = () => {
    setOpenCreateModal(false);
  };

  const createReport = useCreateControlChecklistReport();

  const submitHandler = (e) => {
    e.preventDefault();

    createReport.mutate(form, {
      onSuccess: () => {
        setOpenCreateModal(false);
      },
    });
  };
  return (
    <div
      className={`fixed inset-0 z-50 flex h-screen items-center justify-center p-4 transition-opacity duration-300 ${
        openCreateModal
          ? 'pointer-events-auto opacity-100 '
          : 'pointer-events-none opacity-0'
      }`}
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        onClick={closeHandler}
      />
      <div
        className={`relative flex max-h-[90vh] w-[1000px] max-w-[95vw] transform flex-col rounded-[15px] bg-linear-to-bl from-black to-gray-600 p-6 text-white shadow-2xl transition-all duration-300 max-2xl:scale-95 max-md:h-180 max-md:overflow-auto ${
          openCreateModal
            ? ' translate-y-0 scale-100 opacity-100'
            : '-translate-y-10 scale-0 opacity-0'
        }`}
      >
        {/* Header & close */}
        <div className="flex shrink-0 items-center justify-between">
          <p className="pr-1.5 font-[SamimBold] text-[20px]">
            ایجاد گزارش جدید
          </p>
          <button
            onClick={closeHandler}
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

        <form
          id="dailyAmpForm"
          onSubmit={submitHandler}
          className="no-scrollbar flex min-h-0 flex-col overflow-x-hidden overflow-y-auto max-md:max-h-[70vh]"
        >
          {/* Details */}
          <div className="grid grid-cols-3 gap-2 max-md:flex max-md:flex-col">
            <label htmlFor="reportDate" className="mt-5 flex flex-col">
              تاریخ
              <DatePicker
                calendar={persian}
                locale={persian_fa}
                placeholder="تاریخ ثبت گزارش"
                format="YYYY/MM/DD"
                calendarPosition="bottom-center"
                onChange={(value) => {
                  setForm({
                    ...form,
                    checklistDate: value
                      ? value.toDate().toISOString().split('T')[0]
                      : '',
                  });
                }}
                inputClass="w-full rounded-xl bg-white/10 p-3 mt-2 font-[Samim] text-[18px] text-white outline-none"
              />
            </label>
            <label htmlFor="shiftName" className="mt-5 flex flex-col">
              نام شیفت
              <input
                type="text"
                readOnly
                name="shiftName"
                value={form.shiftName || ''}
                className="mt-2 w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
              />
            </label>
            <label htmlFor="personnelName" className="mt-5 flex flex-col">
              نام و نام خانوادگی
              <input
                type="text"
                name="personnelName"
                readOnly
                value={form.personnelName || ''}
                className="mt-2 w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
              />
            </label>
          </div>
          {/* Daily Work */}
          <div className="mt-4 grid grid-cols-4 gap-4 max-md:grid-cols-2 max-md:gap-2">
            <label
              className={`flex cursor-pointer items-center justify-center rounded-xl border px-8 py-2 transition-all max-md:text-[14px] ${
                form.shiftFlags === 2
                  ? 'border-white bg-white text-black'
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[20px]`}
            >
              <input
                type="radio"
                name="shiftFlags"
                value={2}
                checked={form.shiftFlags === 2}
                onChange={() =>
                  setForm({
                    ...form,
                    shiftFlags: 2,
                  })
                }
                className="hidden"
              />
              روز کاری اول
            </label>
            <label
              className={`flex cursor-pointer items-center justify-center rounded-xl border px-8 py-2 transition-all max-md:text-[14px] ${
                form.shiftFlags === 4
                  ? 'border-white bg-white text-black'
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[20px]`}
            >
              <input
                type="radio"
                name="shiftFlags"
                value={4}
                checked={form.shiftFlags === 4}
                onChange={() =>
                  setForm({
                    ...form,
                    shiftFlags: 4,
                  })
                }
                className="hidden"
              />
              روز کاری دوم
            </label>
            <label
              className={`flex cursor-pointer items-center justify-center rounded-xl border px-8 py-2 transition-all max-md:text-[13px] ${
                form.shiftFlags === 6
                  ? 'border-white bg-white text-black'
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[20px]`}
            >
              <input
                type="radio"
                name="shiftFlags"
                value={6}
                checked={form.shiftFlags === 6}
                onChange={() =>
                  setForm({
                    ...form,
                    shiftFlags: 6,
                  })
                }
                className="hidden"
              />
              شب کاری اول
            </label>
            <label
              className={`flex cursor-pointer items-center justify-center rounded-xl border px-8 py-2 transition-all max-md:text-[13px] ${
                form.shiftFlags === 8
                  ? 'border-white bg-white text-black'
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[20px]`}
            >
              <input
                type="radio"
                name="shiftFlags"
                value={8}
                checked={form.shiftFlags === 8}
                onChange={() =>
                  setForm({
                    ...form,
                    shiftFlags: 8,
                  })
                }
                className="hidden"
              />
              شب کاری دوم
            </label>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4 max-md:grid-cols-1">
            {form.items.map((item, index) => (
              <div
                key={index}
                className="gap-4 rounded-[10px] border border-white/50 p-2"
              >
                <label
                  htmlFor="equipmentName"
                  className="flex flex-col font-[SamimBold]"
                >
                  نام دستگاه
                  <input
                    type="text"
                    value={item.equipmentName}
                    readOnly
                    className="mt-1 rounded-xl bg-white/10 p-3 font-[Samim] text-white outline-none"
                  />
                </label>
                <label
                  htmlFor="location"
                  className="mt-2 flex flex-col font-[SamimBold]"
                >
                  محل قرارگیری
                  <input
                    type="text"
                    value={item.location}
                    readOnly
                    className="mt-1 rounded-xl bg-white/10 p-3 font-[Samim] text-white outline-none"
                  />
                  
                </label>
                <label
                  htmlFor="temperature"
                  className="mt-2 flex flex-col font-[SamimBold]"
                >
                  دما
                  <input
                    type="number"
                    step="0.001"
                    placeholder="دما"
                    value={item.temperature ?? 0}
                    onChange={(e) =>
                      handleItemChange(index, 'temperature', e.target.value)
                    }
                    className="mt-1 rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-white outline-none"
                    onWheel={(e) => e.currentTarget.blur()}
                  />
                </label>
                <label
                  htmlFor="ampere"
                  className="mt-2 flex flex-col font-[Samim]"
                >
                  آمپر
                  <input
                    type="number"
                    step="0.001"
                    placeholder="آمپر"
                    value={item.ampere ?? 0}
                    onChange={(e) =>
                      handleItemChange(index, 'ampere', e.target.value)
                    }
                    className="mt-2 rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-white outline-none"
                    onWheel={(e) => e.currentTarget.blur()}
                  />
                </label>
                <label
                  htmlFor="visualInspection"
                  className="mt-2 flex flex-col font-[Samim]"
                >
                  بازدید ظاهری
                  <input
                    type="text"
                    placeholder="OK & N.OK"
                    value={item.visualInspection || ''}
                    onChange={(e) =>
                      handleItemChange(
                        index,
                        'visualInspection',
                        e.target.value
                      )
                    }
                    className="mt-2 rounded-xl bg-white/10 p-3 font-[Samim] text-white outline-none"
                  />
                </label>
                <label
                  htmlFor="setpoint"
                  className="mt-2 flex flex-col font-[AvenirLTProMedium]"
                >
                  Set Point
                  <input
                    type="text"
                    step="0.001"
                    placeholder="Set Point"
                    value={item.setpoint || ''}
                    onChange={(e) =>
                      handleItemChange(index, 'setpoint', e.target.value)
                    }
                    className="rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-white outline-none"
                    onWheel={(e) => e.currentTarget.blur()}
                  />
                </label>
              </div>
            ))}
          </div>
          <label htmlFor="description">
            <textarea
              name="description"
              maxLength={400}
              placeholder="توضیحات"
              className="my-5 grid w-full rounded-[10px] border border-white/50 p-2"
            />
          </label>
        </form>
        <div>
          <button
            type="submit"
            form="dailyAmpForm"
            className="w-full cursor-pointer rounded-xl bg-linear-to-tl from-green-900 to-green-500 px-4 py-3 font-[Samim] transition-all delay-100 duration-150 ease-in-out hover:scale-[1.01]"
          >
            ثبت گزارش
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateControlChecklist;
