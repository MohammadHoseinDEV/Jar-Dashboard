import React, { useEffect, useState } from 'react';

import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';

import close from '../../../../assets/images/close.png';
import { useGetProfile } from '../../../../hooks/profile/profile';
import { useCreateMachiningReport } from '../../Api/MachiningWorkReport/machiningApi';
import { toGregorian } from 'jalaali-js';
import { toast } from 'react-toastify';

function CreateReport({ openCreateReport, closeReportHandler }) {
  const [form, setForm] = useState({
    reportDate: '',
    shift: 1,
    assignedTasksForNextShift: '',
    nextShiftType: 0,
    createdByUserId: '' || null,
    updatedByUserId: '' || null,
    personnelName: '',
    items: [
      {
        machineName: '',
        operatorName: '',
        partName: '',
        operationDescription: '',
        partNumber: '',
        quantity: 1,
        estimatedTime: 1,
        actualTime: 1,
      },
    ],
  });

  const data = {
    reportDate: '',
    shift: 1,
    assignedTasksForNextShift: '',
    nextShiftType: 0,
    createdByUserId: '' || null,
    updatedByUserId: '' || null,
    personnelName: '',
    items: [
      {
        machineName: '',
        operatorName: '',
        partName: '',
        operationDescription: '',
        partNumber: '',
        quantity: 1,
        estimatedTime: 1,
        actualTime: 1,
      },
    ],
  };

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
          machineName: '',
          operatorName: '',
          partName: '',
          operationDescription: '',
          partNumber: '',
          quantity: 1,
          estimatedTime: 1,
          actualTime: 1,
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
          machineName: '',
          operatorName: '',
          partName: '',
          operationDescription: '',
          partNumber: '',
          quantity: 1,
          estimatedTime: 1,
          actualTime: 1,
        });
      }
      return { ...p, items: next };
    });
  };

  const updateItem = (index, field, value) => {
    setForm((p) => {
      const next = [...p.items];
      next[index] = { ...next[index], [field]: value };
      return { ...p, items: next };
    });
  };

  const { data: profile } = useGetProfile();

  useEffect(() => {
    if (profile?.data) {
      setForm((p) => ({
        ...p,
        personnelName: profile.data.fullName,
        createdByUserId: profile.data.userId,
      }));
    }

    if (profile?.data?.currentShift?.shiftName) {
      setForm((p) => ({
        ...p,
        shift: profile?.data?.currentShift?.shiftName,
      }));
    }
  }, [profile]);

  function convertJalaliToGregorian(date) {
    const g = toGregorian(date.year, date.month, date.day);

    return `${g.gy}-${String(g.gm).padStart(2, '0')}-${String(g.gd).padStart(2, '0')}`;
  }

  const createReport = useCreateMachiningReport();

  const submitHandler = (e) => {
    e.preventDefault();

    createReport.mutate(form, {
      onSuccess: () => {
        closeReportHandler(data);
      },
    });
  };
  return (
    <div
      className={`fixed inset-0 z-50 flex h-screen items-center justify-center p-4 transition-opacity duration-300 ${
        openCreateReport
          ? 'pointer-events-auto opacity-100'
          : 'pointer-events-none opacity-0'
      }`}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
      <div
        className={`relative flex max-h-[90vh] w-[1000px] max-w-[95vw] transform flex-col rounded-[15px] bg-linear-to-tl from-black to-gray-600 p-6 text-white shadow-2xl transition-all duration-300 max-2xl:w-[900px] max-lg:w-[800px] ${
          openCreateReport
            ? 'translate-y-0 scale-100 opacity-100 max-2xl:scale-95'
            : '-translate-y-10 scale-0 opacity-0'
        }`}
      >
        <div className="flex shrink-0 items-center justify-between pb-5">
          <h1 className="pr-1.5 font-[SamimBold] text-[20px]">
            ایجاد گزارش جدید
          </h1>
          <button
            onClick={closeReportHandler}
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
                onChange={(value) => {
                  setForm({
                    ...form,
                    reportDate: value ? convertJalaliToGregorian(value) : '',
                  });
                }}
                inputClass="w-full rounded-xl max-md:my-1 bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
              />
            </label>
            <label htmlFor="personnelName">
              نام و نام خانوادگی
              <input
                type="text"
                name="personnelName"
                value={form.personnelName}
                readOnly
                className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none max-md:my-1"
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
          <div className="no-scrollbar max-h-[45vh] shrink-0 space-y-2 overflow-auto">
            {(form.items || []).map((item, index) => (
              <div
                key={index}
                className="rounded-xl border border-white/30 p-3 text-left"
              >
                <button
                  type="button"
                  onClick={addItems}
                  className="col-span-3 cursor-pointer rounded-[10px] bg-green-500 p-2 transition-all delay-100 duration-150 hover:bg-green-700"
                >
                  افزودن ردیف
                </button>
                <div className="my-5 grid grid-cols-4 gap-2 rounded-[10px] max-md:grid-cols-1">
                  <label htmlFor="machineName" className="text-right">
                    نام دستگاه
                    <input
                      type="text"
                      name="machineName"
                      value={item.machineName}
                      onChange={(e) =>
                        updateItem(index, 'machineName', e.target.value)
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
                        updateItem(index, 'operatorName', e.target.value)
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
                        updateItem(index, 'partName', e.target.value)
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
                        updateItem(
                          index,
                          'operationDescription',
                          e.target.value
                        )
                      }
                      className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
                    />
                  </label>
                  <label htmlFor="partNumber" className="text-right">
                    شماره قطعه
                    <input
                      type="text"
                      name="partNumber"
                      value={item.partNumber}
                      maxLength={80}
                      onChange={(e) =>
                        updateItem(index, 'partNumber', e.target.value)
                      }
                      className="my-1 w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none"
                    />
                  </label>
                  <label htmlFor="quantity" className="text-right">
                    تعداد
                    <input
                      type="number"
                      name="quantity"
                      value={item.quantity}
                      onChange={(e) =>
                        updateItem(index, 'quantity', e.target.value)
                      }
                      className="my-1 w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none"
                      onWheel={(e) => e.currentTarget.blur()}
                    />
                  </label>
                  <label htmlFor="estimatedTime" className="text-right">
                    زمان پیش بینی (دقیقه)
                    <input
                      type="number"
                      name="estimatedTime"
                      value={item.estimatedTime}
                      onChange={(e) =>
                        updateItem(index, 'estimatedTime', e.target.value)
                      }
                      className="my-1 w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none"
                      onWheel={(e) => e.currentTarget.blur()}
                    />
                  </label>
                  <label htmlFor="actualTime" className="text-right">
                    زمان ساخت (دقیقه)
                    <input
                      type="number"
                      name="actualTime"
                      value={item.actualTime}
                      onChange={(e) =>
                        updateItem(index, 'actualTime', e.target.value)
                      }
                      className="my-1 w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none"
                      onWheel={(e) => e.currentTarget.blur()}
                    />
                  </label>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    removeItems(index);
                  }}
                  className="cursor-pointer rounded-xl bg-linear-to-bl from-red-500 to-red-800 px-4 py-2 font-[Samim] transition-all delay-100 duration-150 ease-in-out hover:scale-105 hover:bg-red-500/60"
                >
                  حذف متریال
                </button>
              </div>
            ))}
          </div>

          <p className="grid grid-cols-3 max-md:grid-cols-1">
            <select
              name="nextShiftType"
              value={form.nextShiftType}
              onChange={(e) => {
                setForm((p) => ({
                  ...p,
                  nextShiftType: Number(e.target.value),
                }));
              }}
              className="m-2 w-full rounded-xl bg-white/10 px-3 py-2 font-[Samim] text-[18px] text-white outline-none max-md:mx-0"
            >
              <option value={4} className="bg-black/95 text-[15px] text-white">
                انتخاب شیفت
              </option>
              <option value={0} className="bg-black/95 text-[15px] text-white">
                شیفت اداری
              </option>
              <option value={1} className="bg-black/95 text-[15px] text-white">
                شیفت چرخشی A
              </option>
              <option value={2} className="bg-black/95 text-[15px] text-white">
                شیفت چرخشی B
              </option>
              <option value={3} className="bg-black/95 text-[15px] text-white">
                شیفت چرخشی C
              </option>
            </select>
            <textarea
              type="text"
              placeholder="کارهای محوله در شیفت بعد"
              maxLength={500}
              name="assignedTasksForNextShift"
              onChange={(event) => {
                setForm({ ...form, [event.target.name]: event.target.value });
              }}
              className="col-span-3 m-2 rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
          </p>
          <button
            type="submit"
            className="col-span-4 float-left mt-2 cursor-pointer rounded-xl bg-linear-to-tl from-green-900 to-green-500 px-4 py-2 font-[Samim] transition-all delay-100 duration-150 ease-in-out hover:scale-105"
          >
            ثبت گزارش
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateReport;
