import React, { useEffect, useState } from 'react';

import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';

import close from '../../../../assets/images/close.png';
import TimePickerInput from '../../../../Time/TimePickerInput';
import { toast } from 'react-toastify';
import { useUpdateFacilityReports } from '../../Api/Facility/facility';

function EditFacilityReports({
  openEditReport,
  setopenEditReport,
  selectedFacility,
  setSelectedFacility,
}) {
  
  const [form, setForm] = useState({
    id: '',
    reportDate: '',
    shiftType: '',
    personnelName: '',

    operations: [
      {
        id: '',
        operationDescription: '',
        requestingUnit: '',
        startTime: '',
        endTime: '',
        operationExecutor: '',
        consumedPartsInShift: '',
        warehouseDeliveredItems: '',
      },
    ],
  });

  useEffect(() => {
    if (!selectedFacility) return;

    setForm({
      id: selectedFacility?.id,
      reportDate: selectedFacility?.reportDate,
      shiftType: selectedFacility?.shiftType,
      personnelName: selectedFacility?.personnelName,
      operations: selectedFacility?.operations?.length
        ? selectedFacility?.operations?.map((f) => ({
            id: f?.id,
            operationDescription: f?.operationDescription,
            requestingUnit: f?.requestingUnit,
            startTime: f?.startTime,
            endTime: f?.endTime,
            operationExecutor: f?.operationExecutor,
            consumedPartsInShift: f?.consumedPartsInShift,
            warehouseDeliveredItems: f?.warehouseDeliveredItems,
          }))
        : [
            {
              id: '',
              operationDescription: '',
              requestingUnit: '',
              startTime: '',
              endTime: '',
              operationExecutor: '',
              consumedPartsInShift: '',
              warehouseDeliveredItems: '',
            },
          ],
    });
  }, [selectedFacility]);

  function normalizeTime(time) {
    if (!time) return '';
    return time.slice(0, 5);
  }

  const closeModal = () => {
    setopenEditReport(false);
  };

  const addItems = () => {
    if (form.operations.length >= 12) {
      toast.warning('حداکثر 12 ردیف قابل اضافه کردن است.');
      return;
    }

    setForm((p) => ({
      ...p,
      operations: [
        ...(p.operations || []),
        {
          operationDescription: '',
          requestingUnit: '',
          startTime: '',
          endTime: '',
          operationExecutor: '',
          consumedPartsInShift: '',
          warehouseDeliveredItems: '',
        },
      ],
    }));
  };

  const removeItems = (index) => {
    setForm((p) => {
      const next = [...(p.operations || [])];

      next.splice(index, 1);

      if (next.length === 0) {
        next.push({
          operationDescription: '',
          requestingUnit: '',
          startTime: '',
          endTime: '',
          operationExecutor: '',
          consumedPartsInShift: '',
          warehouseDeliveredItems: '',
        });
      }
      return { ...p, operations: next };
    });
  };

  const updateItems = (index, field, value) => {
    setForm((p) => {
      const next = [...p.operations];
      next[index] = { ...next[index], [field]: value };
      return { ...p, operations: next };
    });
  };

  const updateReport = useUpdateFacilityReports();

  const submitHandler = (e) => {
    e.preventDefault();

    updateReport.mutate(
      { id: selectedFacility?.id, form },
      {
        onSuccess: () => {
          setopenEditReport(false);
          setSelectedFacility(null);
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
        onClick={closeModal}
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
      />
      <div
        className={`relative flex max-h-[90vh] w-[1000px] max-w-[95vw] flex-col gap-4 overflow-hidden rounded-[15px] bg-linear-to-tl from-black to-gray-600 p-6 text-white shadow-2xl transition-all duration-300 max-xl:w-[850px] ${
          openEditReport
            ? 'translate-y-0 scale-100 opacity-100'
            : '-translate-y-10 scale-95 opacity-0'
        }`}
      >
        <div className="flex shrink-0 items-center justify-between">
          <p className="pr-1.5 font-[SamimBold] text-[20px]">ویرایش گزارش</p>
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
          <div className="grid grid-cols-3 gap-5">
            <label htmlFor="reportDate" className="flex flex-col">
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
                    reportDate: value
                      ? value.toDate().toISOString().split('T')[0]
                      : '',
                  });
                }}
                value={form.reportDate ? new Date(form.reportDate) : null}
                inputClass="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
              />
            </label>
            <label htmlFor="shiftType">
              نام شیفت
              <input
                type="text"
                name="shiftType"
                readOnly
                value={form.shiftType}
                className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
              />
            </label>
            <label htmlFor="personnelName">
              نام و نام خانوادگی
              <input
                type="text"
                name="personnelName"
                readOnly
                value={form.personnelName}
                className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
              />
            </label>
          </div>
          <p className="mx-10 mb-2 border-b border-white/50 pt-2"></p>
          <div className="no-scrollbar max-h-[55vh] shrink-0 space-y-2 overflow-auto">
            {(form?.operations || []).map((item, index) => (
              <div
                className="rounded-xl border border-white/30 p-3 text-left"
                key={index}
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
                <div className="grid grid-cols-3 gap-5 rounded-[10px]">
                  <label htmlFor="operationDescription" className="text-right">
                    شرح عملیات
                    <input
                      type="text"
                      name="operationDescription"
                      value={item.operationDescription}
                      maxLength={118}
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
                  <label htmlFor="requestingUnit" className="text-right">
                    واحد در خواست کننده
                    <input
                      type="text"
                      name="requestingUnit"
                      value={item.requestingUnit}
                      onChange={(e) =>
                        updateItems(index, 'requestingUnit', e.target.value)
                      }
                      className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
                    />
                  </label>
                  <label htmlFor="operationExecutor" className="text-right">
                    مجری عملیات
                    <input
                      type="text"
                      name="operationExecutor"
                      value={item.operationExecutor}
                      onChange={(e) =>
                        updateItems(index, 'operationExecutor', e.target.value)
                      }
                      className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
                    />
                  </label>
                  <label htmlFor="startTime" className="text-right">
                    ساعت شروع
                    <TimePickerInput
                      value={normalizeTime(item?.startTime)}
                      minuteStep={1}
                      onChange={(value) =>
                        updateItems(index, 'startTime', value)
                      }
                    />
                  </label>
                  <label htmlFor="endTime" className="text-right">
                    ساعت پایان
                    <TimePickerInput
                      value={normalizeTime(item?.endTime)}
                      minuteStep={1}
                      onChange={(value) => updateItems(index, 'endTime', value)}
                    />
                  </label>
                  <label htmlFor="consumedPartsInShift" className="text-right">
                    قطعات مصرف شده در طول شیفت کاری
                    <input
                      type="text"
                      name="consumedPartsInShift"
                      value={item.consumedPartsInShift}
                      onChange={(e) =>
                        updateItems(
                          index,
                          'consumedPartsInShift',
                          e.target.value
                        )
                      }
                      className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
                    />
                  </label>
                  <label
                    htmlFor="warehouseDeliveredItems"
                    className="text-right"
                  >
                    اقلام تحویلی از انبار
                    <input
                      type="text"
                      name="warehouseDeliveredItems"
                      value={item.warehouseDeliveredItems}
                      onChange={(e) =>
                        updateItems(
                          index,
                          'warehouseDeliveredItems',
                          e.target.value
                        )
                      }
                      className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
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

export default EditFacilityReports;
