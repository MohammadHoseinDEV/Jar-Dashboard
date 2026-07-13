import React, { useEffect, useState } from 'react';

import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';

import close from '../../../../assets/images/close.png';
import { useGetProfile } from '../../../../hooks/profile/profile';
import TimePickerInput from '../../../../Time/TimePickerInput';
import { toast } from 'react-toastify';
import { useCreateBachReport } from '../../Api/Bachplant/bachplantApi';

const initialFormState = {
  reportDate: '',
  shift: '',
  operatorName: '',
  shiftFlags: 2,
  notes: '',
  siloVisitTime: '',
  conveyorBeltVisitTime: '',
  elevatorVisitTime: '',
  scaleTestTime: '',
  moistureReceptionTime: '',
  batchCount: 0,
  cleaningaz: '',
  cleaningta: '',
  section2Items: [
    {
      waterAmount: 0,
      mixerMoisture: 0,
      sidelineMoisture: 0,
      sampleWeight: 0,
      silicaHumidityReading: 0,
      measurementTime: '',
    },
  ],
  furnaceSilica: 0,
  furnaceBatch: 0,
  measurementTime: '',
  withoutGlassFragment: 0,
  withGlassFragment: 0,
};

function CreateBachplantReport({ openCreateReport, setOpenCreateReport }) {
  const [form, setForm] = useState(initialFormState);

  const addItems = () => {
    if (form.section2Items?.length >= 6) {
      toast.warning('حداکثر 6 ردیف قابل اضافه کردن است');
      return;
    }

    setForm((p) => ({
      ...p,
      section2Items: [
        ...(p.section2Items || []),
        {
          waterAmount: 0,
          mixerMoisture: 0,
          sidelineMoisture: 0,
          sampleWeight: 0,
          silicaHumidityReading: 0,
          measurementTime: '',
        },
      ],
    }));
  };

  const removeItems = (index) => {
    setForm((p) => {
      const next = [...(p.section2Items || [])];

      next.splice(index, 1);
      if (next.length === 0) {
        next.push({
          waterAmount: 0,
          mixerMoisture: 0,
          sidelineMoisture: 0,
          sampleWeight: 0,
          silicaHumidityReading: 0,
          measurementTime: '',
        });
      }
      return { ...p, section2Items: next };
    });
  };

  const updateItems = (index, field, value) => {
    setForm((p) => {
      const next = [...p.section2Items];
      next[index] = { ...next[index], [field]: value };
      return { ...p, section2Items: next };
    });
  };

  const { data: profile } = useGetProfile();

  useEffect(() => {
    if (profile?.data) {
      setForm((p) => ({
        ...p,
        operatorName: profile?.data?.fullName,
      }));
    }
    if (profile?.data?.currentShift?.shiftName) {
      setForm((p) => ({
        ...p,
        shift: profile?.data?.currentShift?.shiftName,
      }));
    }
  }, [profile]);

  const closeHadler = () => {
    setOpenCreateReport(false);
  };

  const createReport = useCreateBachReport();

  const submitHandler = (e) => {
    e.preventDefault();

    createReport.mutate(form, {
      onSuccess: () => {
        setOpenCreateReport(false);
        setForm({
          ...initialFormState,
          operatorName: profile?.data?.fullName || '',
          shift: profile?.data?.currentShift?.shiftName || '',
        });
      },
    });
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex h-screen items-center justify-center overflow-auto p-4 transition-opacity duration-300 print:hidden! ${
        openCreateReport
          ? 'pointer-events-auto opacity-100'
          : 'pointer-events-none opacity-0'
      }`}
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        onClick={closeHadler}
      />
      <div
        className={`relative flex max-h-[90vh] w-[1200px] max-w-[95vw] flex-col gap-4 overflow-hidden rounded-[15px] bg-linear-to-tl from-black to-gray-600 p-6 text-white shadow-2xl transition-all duration-300 max-2xl:w-[900px] max-lg:w-[800px] ${
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
            onClick={closeHadler}
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
          {/* information */}
          <div className="grid grid-cols-3 gap-4 pb-5 max-md:grid-cols-1">
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
                    reportDate: value
                      ? value.toDate().toISOString().split('T')[0]
                      : '',
                  })
                }
                inputClass="w-full rounded-xl   bg-white/10 p-3 mt-2 font-[Samim] text-[18px] text-white outline-none"
              />
            </label>
            <label htmlFor="operatorName">
              نام و نام خانوادگی
              <input
                type="text"
                name="operatorName"
                value={form.operatorName}
                readOnly
                className="mt-2 w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
              />
            </label>
            <label htmlFor="shift" className="flex flex-col">
              شیفت
              <input
                type="text"
                placeholder="شیفت"
                name="shift"
                value={form.shift}
                readOnly
                className="mt-2 rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
              />
            </label>
          </div>
          {/* shiftDay Type */}
          <div className="grid grid-cols-4 gap-4 max-md:grid-cols-2">
            <label
              className={`flex cursor-pointer items-center justify-center rounded-xl border px-8 py-2 transition-all max-md:text-[15px] ${
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
              className={`flex cursor-pointer items-center justify-center rounded-xl border px-8 py-2 transition-all max-md:text-[15px] ${
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
              className={`flex cursor-pointer items-center justify-center rounded-xl border px-8 py-2 transition-all max-md:text-[14px] ${
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
              className={`flex cursor-pointer items-center justify-center rounded-xl border px-8 py-2 transition-all max-md:text-[14px] ${
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
          <p className="mt-5 border-t border-white/50"></p>
          <p className="pt-3 font-[SamimBold] text-[25px]">بازدیدها</p>
          <div className="grid grid-cols-4 gap-3 pb-5 max-md:grid-cols-1">
            <label htmlFor="siloVisitTime" className="pt-2">
              بازدید از سیلوهای بچ
              <TimePickerInput
                value={form.siloVisitTime}
                onChange={(value) => {
                  setForm((p) => ({
                    ...p,
                    siloVisitTime: value,
                  }));
                }}
                className="mt-2"
              />
            </label>
            <label htmlFor="conveyorBeltVisitTime" className="pt-2">
              بازدید از نوار نقاله
              <TimePickerInput
                value={form.conveyorBeltVisitTime}
                onChange={(value) => {
                  setForm((p) => ({
                    ...p,
                    conveyorBeltVisitTime: value,
                  }));
                }}
                className="mt-2"
              />
            </label>
            <label htmlFor="elevatorVisitTime" className="pt-2">
              بازدید از الواتورها
              <TimePickerInput
                value={form.elevatorVisitTime}
                onChange={(value) => {
                  setForm((p) => ({
                    ...p,
                    elevatorVisitTime: value,
                  }));
                }}
                className="mt-2"
              />
            </label>
            <label htmlFor="scaleTestTime" className="pt-2">
              تست ترازوها
              <TimePickerInput
                value={form.scaleTestTime}
                onChange={(value) => {
                  setForm((p) => ({
                    ...p,
                    scaleTestTime: value,
                  }));
                }}
                className="mt-2"
              />
            </label>
          </div>
          <div className="grid grid-cols-4 gap-4 max-md:grid-cols-1">
            <label htmlFor="moistureReceptionTime">
              دریافت رطوبت ها
              <TimePickerInput
                value={form.moistureReceptionTime}
                onChange={(value) => {
                  setForm((p) => ({
                    ...p,
                    moistureReceptionTime: value,
                  }));
                }}
                className="mt-2"
              />
            </label>
            <label htmlFor="batchCount">
              تعداد بچ
              <input
                type="text"
                placeholder="تعداد بچ"
                name="batchCount"
                value={form.batchCount || ''}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="mt-2 w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] placeholder:text-[15px]"
              />
            </label>
            <label htmlFor="cleaningaz">
              ساعت شروع نظافت
              <TimePickerInput
                value={form.cleaningaz}
                onChange={(value) => {
                  setForm((p) => ({
                    ...p,
                    cleaningaz: value,
                  }));
                }}
                className="mt-2"
              />
            </label>
            <label htmlFor="cleaningta">
              ساعت پایان نظافت
              <TimePickerInput
                value={form.cleaningta}
                onChange={(value) => {
                  setForm((p) => ({
                    ...p,
                    cleaningta: value,
                  }));
                }}
                className="mt-2"
              />
            </label>
          </div>
          <p className="mt-5 border-t border-white/50"></p>
          <p className="pt-3 font-[SamimBold] text-[25px]"> بچ - سیلیس</p>

          <div>
            {(form?.section2Items || []).map((bach, index) => (
              <div
                key={index}
                className="my-3 rounded-xl border border-white/30 p-3 text-left max-md:flex max-md:flex-col"
              >
                <p className="col-span-3 text-right font-[AvenirLTProMedium]">
                  {`(${index + 1}`}
                </p>
                <button
                  type="button"
                  onClick={addItems}
                  className="col-span-3 cursor-pointer rounded-[10px] bg-green-500 p-2 transition-all delay-100 duration-150 hover:bg-green-700"
                >
                  افزودن ردیف
                </button>
                <div className="grid grid-cols-3 gap-4 rounded-[10px] text-right max-md:flex max-md:flex-col">
                  <label htmlFor="waterAmount">
                    مقدار آب (لیتر)
                    <input
                      type="number"
                      step="0.001"
                      name="waterAmount"
                      value={bach.waterAmount || ''}
                      onChange={(e) =>
                        updateItems(index, 'waterAmount', e.target.value)
                      }
                      className="mt-2 w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
                      onWheel={(e) => e.currentTarget.blur()}
                    />
                  </label>

                  <label htmlFor="mixerMoisture">
                    رطوبت بچ میکسر
                    <input
                      type="number"
                      step="0.001"
                      name="mixerMoisture"
                      value={bach.mixerMoisture || ''}
                      onChange={(e) =>
                        updateItems(index, 'mixerMoisture', e.target.value)
                      }
                      className="mt-2 w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
                      onWheel={(e) => e.currentTarget.blur()}
                    />
                  </label>
                  <label htmlFor="sidelineMoisture">
                    رطوبت بچ پارویی
                    <input
                      type="number"
                      step="0.001"
                      name="sidelineMoisture"
                      value={bach.sidelineMoisture || ''}
                      onChange={(e) =>
                        updateItems(index, 'sidelineMoisture', e.target.value)
                      }
                      className="mt-2 w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
                      onWheel={(e) => e.currentTarget.blur()}
                    />
                  </label>
                  <label htmlFor="sampleWeight">
                    وزن نمونه
                    <input
                      type="number"
                      step="0.001"
                      name="sampleWeight"
                      value={bach.sampleWeight || ''}
                      onChange={(e) =>
                        updateItems(index, 'sampleWeight', e.target.value)
                      }
                      className="mt-2 w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
                      onWheel={(e) => e.currentTarget.blur()}
                    />
                  </label>
                  <label htmlFor="silicaHumidityReading">
                    رطوبت سنج
                    <input
                      type="number"
                      step="0.001"
                      name="silicaHumidityReading"
                      value={bach.silicaHumidityReading || ''}
                      onChange={(e) =>
                        updateItems(
                          index,
                          'silicaHumidityReading',
                          e.target.value
                        )
                      }
                      className="mt-2 w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
                      onWheel={(e) => e.currentTarget.blur()}
                    />
                  </label>
                  <label htmlFor="measurementTime">
                    ساعت
                    <TimePickerInput
                      value={bach.measurementTime}
                      minuteStep={1}
                      onChange={(value) =>
                        updateItems(index, 'measurementTime', value)
                      }
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
          <p className="mt-5 border-t border-white/50"></p>
          <p className="pt-3 font-[SamimBold] text-[25px]">رطوبت آزمایشگاه</p>
          <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
            <label htmlFor="furnaceSilica">
              سیلیس کوره
              <input
                type="number"
                step="0.001"
                placeholder="سیلیس کوره"
                name="furnaceSilica"
                value={form.furnaceSilica || ''}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: e.target.value,
                  }));
                }}
                className="mt-2 w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] placeholder:text-[15px]"
                onWheel={(e) => e.currentTarget.blur()}
              />
            </label>
            <label htmlFor="furnaceBatch">
              بچ کوره
              <input
                type="number"
                step="0.001"
                placeholder="بچ کوره"
                name="furnaceBatch"
                value={form.furnaceBatch || ''}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: e.target.value,
                  }));
                }}
                className="mt-2 w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] placeholder:text-[15px]"
                onWheel={(e) => e.currentTarget.blur()}
              />
            </label>
            <label htmlFor="measurementTime">
              ساعت
              <TimePickerInput
                value={form.measurementTime}
                onChange={(value) => {
                  setForm((p) => ({
                    ...p,
                    measurementTime: value,
                  }));
                }}
                className="mt-2"
              />
            </label>
          </div>
          <p className="mt-5 border-t border-white/50"></p>
          <p className="pt-3 font-[SamimBold] text-[25px]">مصرف مواد اولیه</p>
          <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
            <label htmlFor="withoutGlassFragment">
              بدون شیشه خورده
              <input
                type="number"
                step="0.001"
                placeholder="بدون شیشه خورده"
                name="withoutGlassFragment"
                value={form.withoutGlassFragment || ''}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="mt-2 w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] placeholder:text-[15px]"
                onWheel={(e) => e.currentTarget.blur()}
              />
            </label>
            <label htmlFor="withGlassFragment">
              با شیشه خورده
              <input
                type="number"
                step="0.001"
                placeholder="با شیشه خورده"
                name="withGlassFragment"
                value={form.withGlassFragment || ''}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: e.target.value,
                  }));
                }}
                className="mt-2 w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] placeholder:text-[15px]"
                onWheel={(e) => e.currentTarget.blur()}
              />
            </label>
          </div>
          <p className="mt-5 border-t border-white/50"></p>
          <textarea
            placeholder="توضیحات"
            name="notes"
            value={form.notes || ''}
            onChange={(e) => {
              setForm((p) => ({
                ...p,
                [e.target.name]: e.target.value,
              }));
            }}
            className="mt-2 max-h-[200px] min-h-[100px] w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] placeholder:text-[15px]"
          />
          <button
            type="submit"
            className="col-span-4 float-left mt-5 shrink-0 cursor-pointer rounded-xl bg-linear-to-tl from-green-900 to-green-500 px-4 py-2 font-[Samim] transition-all delay-100 duration-150 ease-in-out hover:scale-105"
          >
            ثبت گزارش
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateBachplantReport;
