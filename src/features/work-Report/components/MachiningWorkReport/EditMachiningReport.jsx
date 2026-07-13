import React, { useEffect, useState } from 'react';

import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';

import close from '../../../../assets/images/close.png';
import { useEditMachiningReport } from '../../Api/MachiningWorkReport/machiningApi';
import { toast } from 'react-toastify';

function EditMachiningReport({
  openEditReports,
  setOpenEditReports,
  selectedReports,
  setSelectedReports,
}) {
  const [form, setForm] = useState({
    id: '',
    reportDate: '',
    shift: '',
    assignedTasksForNextShift: '',
    nextShiftType: 0,
    personnelName: '',
    items: [
      {
        id: '',
        machineName: '',
        operatorName: '',
        partName: '',
        operationDescription: '',
        partNumber: '',
        quantity: 0,
        estimatedTime: 0,
        actualTime: 0,
      },
    ],
  });

  useEffect(() => {
    if (!selectedReports) return;

    setForm({
      id: selectedReports?.id,
      reportDate: selectedReports?.reportDate,
      shift: selectedReports?.shift,
      assignedTasksForNextShift: selectedReports?.assignedTasksForNextShift,
      nextShiftType: selectedReports?.nextShiftType,
      personnelName: selectedReports?.personnelName,
      items: selectedReports?.items?.length
        ? selectedReports?.items?.map((m) => ({
            id: m?.id,
            machineName: m?.machineName,
            operatorName: m?.operatorName,
            partName: m?.partName,
            operationDescription: m?.operationDescription,
            partNumber: m?.partNumber,
            quantity: m?.quantity,
            estimatedTime: m?.estimatedTime,
            actualTime: m?.actualTime,
          }))
        : [
            {
              machineName: '',
              operatorName: '',
              partName: '',
              operationDescription: '',
              partNumber: '',
              quantity: 0,
              estimatedTime: 0,
              actualTime: 0,
            },
          ],
    });
  }, [selectedReports, openEditReports]);

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

  const updateItem = (index, field, value) => {
    setForm((p) => {
      const next = [...p.items];
      next[index] = { ...next[index], [field]: value };
      return { ...p, items: next };
    });
  };
  const closeHandler = () => {
    setOpenEditReports(false);
    setSelectedReports(null);
  };

  const editReport = useEditMachiningReport();

  const submitHandler = (e) => {
    e.preventDefault();
    editReport.mutate(
      { id: selectedReports?.id, form },
      {
        onSuccess: () => {
          setOpenEditReports(false);
          setSelectedReports(null);
        },
      }
    );
  };
  return (
    <div
      className={`fixed inset-0 z-50 flex h-screen items-center justify-center p-4 transition-opacity duration-300 ${
        openEditReports
          ? 'pointer-events-auto opacity-100 '
          : 'pointer-events-none opacity-0'
      }`}
    >
      <div
        onClick={closeHandler}
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
      />
      <div
        className={`relative flex max-h-[90vh] w-[1000px] max-w-[95vw] transform flex-col overflow-hidden rounded-[15px] bg-linear-to-tl from-black to-gray-600 p-6 text-white shadow-2xl transition-all duration-300 max-2xl:w-[900px] max-lg:w-[800px] ${
          openEditReports
            ? 'translate-y-0 scale-100 opacity-100'
            : '-translate-y-10 scale-95 opacity-0'
        }`}
      >
        <div className="flex shrink-0 items-center justify-between">
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
                value={form.personnelName || ''}
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
                value={form.shift || ''}
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
                      value={item.machineName || ''}
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
                      value={item.operatorName || ''}
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
                      value={item.partName || ''}
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
                      value={item.operationDescription || ''}
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
                      value={item.partNumber || ''}
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
                      value={item.quantity || 0}
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
                      value={item.estimatedTime || 0}
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
                      value={item.actualTime || 0}
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
              value={form.nextShiftType || 4}
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
              value={form.assignedTasksForNextShift || ''}
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

export default EditMachiningReport;
