import React, { useEffect, useState } from 'react';

import close from '../../../../assets/images/close.png';

import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import TimePickerInput from '../../../../Time/TimePickerInput';
import { useEditPolishingReport } from '../../Api/polishing/polishing';

function EditingPolishingReport({
  setOpenEditReport,
  openEditReport,
  selectedReports,
  setSelectedReports,
}) {
  const [form, setForm] = useState({
    id: '',
    reportDate: '',
    shift: '',
    notes: '',
    personnelName: '',
    items: [
      {
        id: '',
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
      notes: selectedReports?.notes || '',
      personnelName: selectedReports?.personnelName,
      items: selectedReports?.items?.length
        ? selectedReports?.items?.map((p) => ({
            id: p?.id,
            lineNumber: p?.lineNumber,
            partName: p?.partName,
            partNumber: p?.partNumber,
            operatorName: p?.operatorName,
            operationDescription: p?.operationDescription,
            fromTime: p?.fromTime,
            toTime: p?.toTime,
          }))
        : [
            {
              id: '',
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
  }, [selectedReports, openEditReport]);

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

  const closeHandler = () => {
    setOpenEditReport(false);
    setSelectedReports(null);
  };

  const editReport = useEditPolishingReport();
  const submitHandler = (e) => {
    e.preventDefault();

    editReport.mutate(
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
      className={`fixed inset-0 z-50 flex h-screen items-center justify-center overflow-hidden p-4 transition-opacity duration-300 ${
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
          className="no-scrollbar flex min-h-0 flex-col gap-4 overflow-x-hidden overflow-y-auto"
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
                onChange={(value) => {
                  setForm({
                    ...form,
                    reportDate: value
                      ? value.toDate().toISOString().split('T')[0]
                      : '',
                  });
                }}
                value={form.reportDate ? new Date(form.reportDate) : null}
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
                value={form.shift}
                readOnly
                className="rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
              />
            </label>
          </div>
          <div className="no-scrollbar shrink-0 space-y-2 overflow-auto">
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
                    ساعت ورود
                    <TimePickerInput
                      value={normalizeTime(item.fromTime)}
                      minuteStep={1}
                      onChange={(value) =>
                        updateItems(index, 'fromTime', value)
                      }
                    />
                  </label>
                  <label htmlFor="toTime" className="text-right">
                    ساعت خروج
                    <TimePickerInput
                      value={normalizeTime(item.toTime)}
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
              value={form.notes}
              className="max-h-35 min-h-30 rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
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

export default EditingPolishingReport;
