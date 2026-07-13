import { useEffect, useState } from 'react';

import { useCreatePoloshingReport } from '../../Api/polishing/polishing';

import close from '../../../../assets/images/close.png';

import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { toGregorian } from 'jalaali-js';
import { useGetProfile } from '../../../../hooks/profile/profile';
import TimePickerInput from '../../../../Time/TimePickerInput';
import { toast } from 'react-toastify';

function CreatePolishingFormReport({ openCreateReport, setOpenCreateReports }) {
  const [form, setForm] = useState({
    reportDate: '',
    shift: '',
    notes: '',
    personnelName: '',
    items: [
      {
        id: '' || null,
        lineNumber: '',
        partName: '',
        partNumber: '',
        operatorName: '',
        operationDescription: '',
        fromTime: '',
        toTime: '',
      },
    ],
  });

  const addItems = () => {
    if (form.items?.length >= 8) {
      toast.warning('حداکثر 8 ردیف قابل اضافه کردن است');
      return;
    }
    setForm((p) => ({
      ...p,
      items: [
        ...(p.items || []),
        {
          lineNumber: '',
          partName: '',
          partNumber: '',
          operatorName: '',
          operationDescription: '',
          fromTime: '',
          toTime: '',
          notes: '',
        },
      ],
    }));
  };

  const removeItems = (index) => {
    setForm((p) => {
      const next = [...(p.items || [])];

      next.splice(index, 1);
      if (next.length === 0) {
        next.push({
          lineNumber: '',
          partName: '',
          partNumber: '',
          operatorName: '',
          operationDescription: '',
          fromTime: '',
          toTime: '',
          notes: '',
        });
      }
      return { ...p, items: next };
    });
  };

  const updateItems = (index, field, value) => {
    setForm((p) => {
      const next = [...p.items];
      next[index] = { ...next[index], [field]: value };
      return { ...p, items: next };
    });
  };

  function convertJalaliToGregorian(date) {
    const g = toGregorian(date.year, date.month, date.day);

    return `${g.gy}-${String(g.gm).padStart(2, '0')}-${String(g.gd).padStart(2, '0')}`;
  }

  // POST
  const createReport = useCreatePoloshingReport();

  const { data: profile } = useGetProfile();

  useEffect(() => {
    if (profile?.data) {
      setForm((p) => ({
        ...p,
        personnelName: profile?.data?.fullName,
      }));
    }
    if (profile?.data?.currentShift?.shiftName) {
      setForm((p) => ({
        ...p,
        shift: profile?.data?.currentShift?.shiftName,
      }));
    }
  }, [profile]);

  const closeModal = () => {
    setOpenCreateReports(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    createReport.mutate(form, {
      onSuccess: () => {
        setOpenCreateReports(false);
      },
    });
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex h-screen items-center justify-center overflow-auto p-4 transition-opacity duration-300 ${
        openCreateReport
          ? 'pointer-events-auto opacity-100'
          : 'pointer-events-none opacity-0'
      }`}
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        onClick={closeModal}
      />
      <div
        className={`relative flex max-h-[90vh] w-[1000px] max-w-[95vw] flex-col gap-4 overflow-hidden rounded-[15px] bg-linear-to-tl from-black to-gray-600 p-6 text-white shadow-2xl transition-all duration-300 max-2xl:w-[900px] max-lg:w-[800px] ${
          openCreateReport
            ? 'translate-y-0 scale-100 opacity-100 max-2xl:scale-95'
            : '-translate-y-10 scale-0 opacity-0'
        }`}
      >
        <div className="flex items-center justify-between pb-5">
          <h1 className="pr-1.5 font-[SamimBold] text-[20px]">
            ایجاد گزارش جدید
          </h1>
          <button
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
        <form
          onSubmit={submitHandler}
          className="no-scrollbar flex min-h-0 flex-col overflow-x-hidden overflow-y-auto max-md:max-h-[70vh]"
        >
          <div className="grid grid-cols-4 space-x-5 pb-5 max-md:grid-cols-1">
            <label htmlFor="reportDate" className="flex flex-col">
              تاریخ
              <DatePicker
                calendar={persian}
                locale={persian_fa}
                placeholder="تاریخ ثبت گزارش"
                name="reportDate"
                format="YYYY/MM/DD"
                calendarPosition="bottom-center"
                onChange={(value) =>
                  setForm({
                    ...form,
                    reportDate: value ? convertJalaliToGregorian(value) : '',
                  })
                }
                inputClass="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
              />
            </label>
            <label htmlFor="personnelName">
              نام و نام خانوادگی
              <input
                type="text"
                name="personnelName"
                value={form.personnelName}
                readOnly
                className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
              />
            </label>
            <label htmlFor="shift" className="flex flex-col">
              شیفت
              <input
                type="text"
                placeholder="شیفت"
                name="shift"
                value={profile?.data?.currentShift?.shiftName}
                readOnly
                className="rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
              />
            </label>
          </div>
          <div className="no-scrollbar max-h-[460px] shrink-0 space-y-2 overflow-auto">
            {(form.items || []).map((item, index) => (
              <div
                key={index}
                className="rounded-xl border border-white/30 p-3 text-left"
              >
                <p className="col-span-3 text-right font-[AvenirLTProMedium]">
                  {index + 1}
                </p>
                <button
                  type="button"
                  onClick={addItems}
                  className="col-span-3 cursor-pointer rounded-[10px] bg-green-500 p-2 transition-all delay-100 duration-150 hover:bg-green-700"
                >
                  افزودن ردیف
                </button>
                <div className="grid grid-cols-4 gap-2 rounded-[10px] max-md:grid-cols-1">
                  <label htmlFor="lineNumber" className="text-right">
                    شماره خط
                    <input
                      type="text"
                      name="lineNumber"
                      value={item.lineNumber}
                      onChange={(e) =>
                        updateItems(index, 'lineNumber', e.target.value)
                      }
                      className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
                    />
                  </label>
                  <label htmlFor="partName" className="text-right">
                    نام قطعه
                    <input
                      type="text"
                      name="partName"
                      value={item.partName}
                      onChange={(e) =>
                        updateItems(index, 'partName', e.target.value)
                      }
                      className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
                    />
                  </label>
                  <label htmlFor="partNumber" className="text-right">
                    شماره قطعه
                    <input
                      type="text"
                      name="partNumber"
                      maxLength={65}
                      value={item.partNumber}
                      onChange={(e) =>
                        updateItems(index, 'partNumber', e.target.value)
                      }
                      className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
                    />
                  </label>
                  <label htmlFor="operatorName" className="text-right">
                    نام اپراتور
                    <input
                      type="text"
                      name="operatorName"
                      value={item.operatorName}
                      onChange={(e) =>
                        updateItems(index, 'operatorName', e.target.value)
                      }
                      className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
                    />
                  </label>
                  <label htmlFor="operationDescription" className="text-right">
                    شرح عملیات
                    <input
                      type="text"
                      name="operationDescription"
                      value={item.operationDescription}
                      maxLength={150}
                      onChange={(e) =>
                        updateItems(
                          index,
                          'operationDescription',
                          e.target.value
                        )
                      }
                      className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
                    />
                  </label>
                  <label htmlFor="fromTime" className="text-right">
                    ساعت شروع
                    <TimePickerInput
                      value={item.fromTime}
                      minuteStep={1}
                      onChange={(value) =>
                        updateItems(index, 'fromTime', value)
                      }
                    />
                  </label>
                  <label htmlFor="toTime" className="text-right">
                    ساعت پایان
                    <TimePickerInput
                      value={item.toTime}
                      minuteStep={1}
                      onChange={(value) => updateItems(index, 'toTime', value)}
                    />
                  </label>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    removeItems(index);
                  }}
                  className="mt-1 cursor-pointer rounded-xl bg-linear-to-bl from-red-500 to-red-800 px-4 py-2 font-[Samim] transition-all delay-100 duration-150 ease-in-out hover:scale-105 hover:bg-red-500/60"
                >
                  حذف ردیف
                </button>
              </div>
            ))}
          </div>
          <label
            htmlFor="notes"
            className="col-span-4 flex flex-col text-right"
          >
            توضیحات
            <textarea
              type="text"
              maxLength={500}
              name="notes"
              onChange={(e) => {
                setForm((p) => ({
                  ...p,
                  [e.target.name]: e.target.value,
                }));
              }}
              className="max-h-35 rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
          </label>
          <button
            type="submit"
            className="col-span-4 float-left mt-2 shrink-0 cursor-pointer rounded-xl bg-linear-to-tl from-green-900 to-green-500 px-4 py-2 font-[Samim] transition-all delay-100 duration-150 ease-in-out hover:scale-105"
          >
            ثبت گزارش
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePolishingFormReport;
