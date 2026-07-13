import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import close from '../../../../assets/images/close.png';

import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import TimePickerInput from '../../../../Time/TimePickerInput';
import { toShamsi } from '../../../../Time/date';
import { useUpdateBachReport } from '../../Api/Bachplant/bachplantApi';

function EditBachplantReport({
  openEditReport,
  setOpenEditReport,
  selectedReports,
  setSelectedReports,
}) {
  const [form, setForm] = useState({
    id: '',
    reportDate: '',
    shift: '',
    operatorName: '',
    shiftFlags: 0,
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
        id: '',
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
  });

  function normalizeTime(time) {
    if (!time) return '';
    return time.slice(0, 5);
  }

  useEffect(() => {
    if (!selectedReports) return;

    setForm({
      id: selectedReports?.id,
      reportDate: selectedReports?.reportDate,
      shift: selectedReports?.shift,
      operatorName: selectedReports?.operatorName,
      shiftFlags: selectedReports?.shiftFlags,
      notes: selectedReports?.notes,
      siloVisitTime: selectedReports?.siloVisitTime,
      conveyorBeltVisitTime: selectedReports?.conveyorBeltVisitTime,
      elevatorVisitTime: selectedReports?.elevatorVisitTime,
      scaleTestTime: selectedReports?.scaleTestTime,
      moistureReceptionTime: selectedReports?.moistureReceptionTime,
      batchCount: selectedReports?.batchCount,
      cleaningaz: selectedReports?.cleaningaz,
      cleaningta: selectedReports?.cleaningta,
      section2Items: selectedReports?.section2Items?.length
        ? selectedReports?.section2Items?.map((b) => ({
            id: b?.id,
            waterAmount: b?.waterAmount,
            mixerMoisture: b?.mixerMoisture,
            sidelineMoisture: b?.sidelineMoisture,
            sampleWeight: b?.sampleWeight,
            silicaHumidityReading: b?.silicaHumidityReading,
            measurementTime: b?.measurementTime,
          }))
        : [
            {
              id: '',
              waterAmount: 0,
              mixerMoisture: 0,
              sidelineMoisture: 0,
              sampleWeight: 0,
              silicaHumidityReading: 0,
              measurementTime: '',
            },
          ],
      furnaceSilica: selectedReports?.furnaceSilica,
      furnaceBatch: selectedReports?.furnaceBatch,
      measurementTime: selectedReports?.measurementTime,
      withoutGlassFragment: selectedReports?.withoutGlassFragment,
      withGlassFragment: selectedReports?.withGlassFragment,
    });
  }, [selectedReports, openEditReport]);

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

  const closeHandler = () => {
    setOpenEditReport(false);
    setSelectedReports(null);
  };

  const updateBach = useUpdateBachReport();

  const submitHandler = (e) => {
    e.preventDefault();

    updateBach.mutate(
      { id: selectedReports?.id, form },
      {
        onSuccess: () => {
          setOpenEditReport(false);
          setSelectedReports(null);
        },
      }
    );
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex h-screen items-center justify-center overflow-hidden p-4 transition-opacity duration-300 print:hidden! print:border-none ${
        openEditReport
          ? 'pointer-events-auto opacity-100 '
          : 'pointer-events-none opacity-0'
      }`}
    >
      <div
        onClick={closeHandler}
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
      />
      <div
        className={`relative flex max-h-[90vh] w-[1000px] max-w-[95vw] flex-col gap-4 overflow-hidden rounded-[15px] bg-linear-to-tl from-black to-gray-600 p-6 text-white shadow-2xl transition-all duration-300 max-2xl:w-[900px] max-lg:w-[800px] ${
          openEditReport
            ? 'translate-y-0 scale-100 opacity-100'
            : '-translate-y-10 scale-95 opacity-0'
        }`}
      >
        <div className="flex items-center justify-between">
          <p className="pr-1.5 font-[SamimBold] text-[20px]">ویرایش گزارش</p>
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
                value={form.reportDate ? new Date(form.reportDate) : null}
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
                value={normalizeTime(form.siloVisitTime)}
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
                value={normalizeTime(form.conveyorBeltVisitTime)}
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
                value={normalizeTime(form.elevatorVisitTime)}
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
                value={normalizeTime(form.scaleTestTime)}
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
                value={normalizeTime(form.moistureReceptionTime)}
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
                value={form.batchCount}
                name="batchCount"
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
                value={normalizeTime(form.cleaningaz)}
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
                value={normalizeTime(form.cleaningta)}
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
                      value={bach.waterAmount ?? ''}
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
                      value={bach.mixerMoisture}
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
                      value={bach.sidelineMoisture}
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
                      value={bach.sampleWeight}
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
                      value={bach.silicaHumidityReading}
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
                      value={normalizeTime(bach.measurementTime)}
                      minuteStep={1}
                      onChange={(value) =>
                        updateItems(index, 'measurementTime', value)
                      }
                      className="mt-2"
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
                value={form.furnaceSilica}
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
                value={form.furnaceBatch}
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
                value={normalizeTime(form.measurementTime)}
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
                value={form.withoutGlassFragment}
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
            <label htmlFor="withGlassFragment">
              با شیشه خورده
              <input
                type="number"
                step="0.001"
                placeholder="با شیشه خورده"
                name="withGlassFragment"
                value={form.withGlassFragment}
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
            value={form.notes}
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

export default EditBachplantReport;
