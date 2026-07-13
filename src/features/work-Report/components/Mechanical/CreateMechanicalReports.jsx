import React, { useEffect, useState } from 'react';

import close from '../../../../assets/images/close.png';

import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { useGetProfile } from '../../../../hooks/profile/profile';
import TimePickerInput from '../../../../Time/TimePickerInput';
import { toast } from 'react-toastify';
import { useCreateMechanicalReports } from '../../Api/Mechanical/mechanical';

function CreateMechanicalReports({ openCreateReport, setOpenCreateReport }) {
  const [form, setForm] = useState({
    reportDate: '',
    shiftType: '',
    personnelName: '',
    operations: [
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
  });

  const { data: profile } = useGetProfile();

  useEffect(() => {
    if (profile?.data?.currentShift?.shiftName) {
      setForm((p) => ({
        ...p,
        shiftType: profile?.data?.currentShift?.shiftName,
      }));
    }
    if (profile?.data?.fullName) {
      setForm((p) => ({
        ...p,
        personnelName: profile?.data?.fullName,
      }));
    }
  }, [profile]);

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

  const createReports = useCreateMechanicalReports();

  const submitHandler = (e) => {
    e.preventDefault();

    createReports.mutate(form, {
      onSuccess: () => {
        setOpenCreateReport(!openCreateReport);
      },
    });
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex h-screen items-center justify-center p-4 transition-opacity duration-300 ${
        openCreateReport
          ? 'pointer-events-auto opacity-100 '
          : 'pointer-events-none opacity-0'
      }`}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
      <div
        className={`relative flex max-h-[90vh] w-[1000px] max-w-[95vw] flex-col gap-4 overflow-hidden rounded-[15px] bg-linear-to-bl from-black to-gray-600 p-6 text-white shadow-2xl transition-all duration-300 max-2xl:w-[900px] max-xl:w-[800px] ${
          openCreateReport
            ? 'translate-y-0 scale-100 opacity-100 '
            : '-translate-y-10 scale-0 opacity-0'
        }`}
      >
        <div className="flex shrink-0 items-center justify-between pb-5">
          <p className="pr-1.5 font-[SamimBold] text-[20px]">
            ایجاد گزارش جدید
          </p>
          <button
            onClick={() => {
              setOpenCreateReport(!openCreateReport);
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

        <form
          onSubmit={submitHandler}
          className="no-scrollbar flex min-h-0 flex-col overflow-x-hidden overflow-y-auto max-md:max-h-[70vh]"
        >
          <div className="grid grid-cols-3 gap-5 max-md:flex max-md:flex-col">
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
                inputClass="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
              />
            </label>
            <label htmlFor="shiftType">
              نام شیفت
              <input
                type="text"
                name="shiftType"
                readOnly
                value={profile?.data?.currentShift?.shiftName}
                className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
              />
            </label>
            <label htmlFor="personnelName">
              نام و نام خانوادگی
              <input
                type="text"
                name="personnelName"
                readOnly
                value={profile?.data?.fullName}
                className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
              />
            </label>
          </div>
          <p className="mx-10 mb-2 border-b border-white/50 pt-2"></p>
          <div className="no-scrollbar shrink-0 space-y-2 overflow-auto">
            {(form?.operations || []).map((item, index) => (
              <div
                className="rounded-xl border border-white/30 p-3 text-left max-md:flex max-md:flex-col"
                key={index}
              >
                <p className="col-span-3 text-right font-[AvenirLTProMedium]">
                  {index + 1}
                </p>
                <button
                  type="button"
                  onClick={addItems}
                  className="col-span-3 cursor-pointer rounded-[10px] bg-green-500 p-2 transition-all delay-100 duration-150 hover:bg-green-700 max-md:mb-5"
                >
                  افزودن ردیف
                </button>
                <div className="grid grid-cols-3 gap-5 rounded-[10px] max-md:flex max-md:flex-col">
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
                      value={item.startTime}
                      minuteStep={1}
                      onChange={(value) =>
                        updateItems(index, 'startTime', value)
                      }
                    />
                  </label>
                  <label htmlFor="endTime" className="text-right">
                    ساعت پایان
                    <TimePickerInput
                      value={item.endTime}
                      minuteStep={1}
                      onChange={(value) => updateItems(index, 'endTime', value)}
                    />
                  </label>
                  <label
                    htmlFor="consumedPartsInShift"
                    className="text-right max-xl:text-[15px]"
                  >
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
                  className="mt-1 cursor-pointer rounded-xl bg-linear-to-bl from-red-500 to-red-800 px-4 py-2 font-[Samim] transition-all delay-100 duration-150 ease-in-out hover:scale-105 hover:bg-red-500/60 max-md:mt-5"
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

export default CreateMechanicalReports;
