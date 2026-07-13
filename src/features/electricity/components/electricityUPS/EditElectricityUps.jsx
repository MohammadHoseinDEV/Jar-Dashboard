import React, { useEffect, useState } from 'react';

import close from '../../../../assets/images/close.png';
import { toast } from 'react-toastify';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { useUpdateElectricityReport } from '../../Api/electricityUPS/electricityUps';

function EditElectricityUps({
  openEditReport,
  setOpenEditReport,
  selectedReport,
  setSelectedReport,
}) {
  const [form, setForm] = useState({
    id: '',
    readingDate: '',
    shiftName: '',
    personnelName: '',
    shiftFlags: 0,
    section1Items: [
      {
        voltage: 0,
      },
    ],
    section2Items: [
      {
        g1: 0,
        g2: 0,
      },
    ],
  });

  useEffect(() => {
    if (!selectedReport) return;

    setForm({
      id: selectedReport?.id,
      readingDate: selectedReport?.readingDate,
      shiftName: selectedReport?.shiftName,
      personnelName: selectedReport?.personnelName,
      shiftFlags: selectedReport?.shiftFlags,
      section1Items: selectedReport?.section1Items?.length
        ? selectedReport?.section1Items?.map((sec) => ({
            id: sec?.id,
            voltage: sec?.voltage,
          }))
        : [
            {
              voltage: 0,
            },
          ],
      section2Items: selectedReport?.section2Items?.length
        ? selectedReport?.section2Items?.map((sec) => ({
            id: sec?.id,
            g1: sec?.g1,
            g2: sec?.g2,
          }))
        : [
            {
              g1: 0,
              g2: 0,
            },
          ],
    });
  }, [selectedReport, openEditReport]);

  //   S1
  const addItems = () => {
    if (form.section1Items?.length >= 33) {
      toast.warning('حداکثر 33 ردیف قابل اضافه کردن است');
      return;
    }

    setForm((p) => ({
      ...p,
      section1Items: [
        ...(p.section1Items || []),
        {
          voltage: 0,
        },
      ],
    }));
  };
  const removeItems = (index) => {
    setForm((p) => {
      const next = [...(p.section1Items || [])];

      next.splice(index, 1);
      if (next.length === 0) {
        next.push({
          voltage: 0,
        });
      }
      return { ...p, section1Items: next };
    });
  };

  const updateItems = (index, field, value) => {
    setForm((p) => {
      const next = [...p.section1Items];
      next[index] = { ...next[index], [field]: value };
      return { ...p, section1Items: next };
    });
  };
  //   -------------------------------------------------

  // S2
  const addRows = () => {
    if (form.section2Items?.length >= 4) {
      toast.warning('حداکثر 4 ردیف قابل اضافه کردن است');
      return;
    }

    setForm((p) => ({
      ...p,
      section2Items: [
        ...(p.section2Items || []),
        {
          g1: 0,
          g2: 0,
        },
      ],
    }));
  };
  const removeRows = (index) => {
    setForm((p) => {
      const next = [...(p.section2Items || [])];

      next.splice(index, 1);
      if (next.length === 0) {
        next.push({
          g1: 0,
          g2: 0,
        });
      }
      return { ...p, section2Items: next };
    });
  };

  const updateRows = (index, field, value) => {
    setForm((p) => {
      const next = [...p.section2Items];
      next[index] = { ...next[index], [field]: value };
      return { ...p, section2Items: next };
    });
  };
  //   --------------------------------------------------------

  const closeHandler = () => {
    setOpenEditReport(false);
  };
  const updateReport = useUpdateElectricityReport();
  const submitHandler = (e) => {
    e.preventDefault();
    updateReport.mutate(
      { id: selectedReport?.id, form },
      {
        onSuccess: () => {
          setOpenEditReport(false);
          setSelectedReport(null);
        },
      }
    );
  };
  return (
    <div
      className={`fixed inset-0 z-50 flex h-screen items-center justify-center p-4 transition-opacity duration-300 ${
        openEditReport
          ? 'pointer-events-auto opacity-100 '
          : 'pointer-events-none opacity-0'
      }`}
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        onClick={closeHandler}
      />
      <div
        className={`relative flex max-h-[90vh] w-[1000px] max-w-[95vw] transform flex-col rounded-[15px] bg-linear-to-tl from-black to-gray-600 p-6 text-white shadow-2xl transition-all duration-300 max-md:h-160 max-md:overflow-auto ${
          openEditReport
            ? 'translate-y-0 scale-100 opacity-100'
            : '-translate-y-10 scale-0 opacity-0'
        }`}
      >
        <div className="flex shrink-0 items-center justify-between pb-5">
          <h2 className="font-[SamimBold] text-[20px]">
            ویرایش فرم گزارش ولتاژگیری باطریهای UPS
          </h2>
          <button
            onClick={() => {
              setOpenEditReport(false);
              setSelectedReport(null);
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
          <div className="grid grid-cols-3 gap-4 max-md:flex max-md:flex-col">
            <label htmlFor="readingDate" className="flex flex-col">
              تاریخ
              <DatePicker
                calendar={persian}
                locale={persian_fa}
                placeholder="تاریخ ثبت گزارش"
                name="readingDate"
                format="YYYY/MM/DD"
                calendarPosition="bottom-center"
                onChange={(value) =>
                  setForm({
                    ...form,
                    readingDate: value
                      ? value.toDate().toISOString().split('T')[0]
                      : '',
                  })
                }
                value={form.readingDate ? new Date(form.readingDate) : null}
                inputClass="w-full rounded-xl   bg-white/10 p-3 mt-2 font-[Samim] text-[18px] text-white outline-none"
              />
            </label>
            <label htmlFor="shiftName">
              شیفت
              <input
                type="text"
                name="shiftName"
                value={form.shiftName || ''}
                readOnly
                className="mt-2 w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
              />
            </label>
            <label htmlFor="personnelName">
              نام و نام خانوادگی
              <input
                type="text"
                name="personnelName"
                value={form.personnelName || ''}
                readOnly
                className="mt-2 w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
              />
            </label>
          </div>
          <div className="grid grid-cols-5 gap-4 py-5 max-md:grid max-md:grid-cols-2">
            <label
              className={`flex cursor-pointer items-center justify-center rounded-xl border px-8 py-2 transition-all max-md:col-span-2 ${
                form.shiftFlags === 0
                  ? 'border-white bg-white text-black'
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[15px]`}
            >
              <input
                type="radio"
                name="shiftFlags"
                value={0}
                checked={form.shiftFlags === 0}
                onChange={() =>
                  setForm({
                    ...form,
                    shiftFlags: 0,
                  })
                }
                className="hidden"
              />
              اداری
            </label>
            <label
              className={`flex cursor-pointer items-center justify-center rounded-xl border px-8 py-2 transition-all ${
                form.shiftFlags === 2
                  ? 'border-white bg-white text-black'
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[15px]`}
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
              className={`flex cursor-pointer items-center justify-center rounded-xl border px-8 py-2 transition-all ${
                form.shiftFlags === 4
                  ? 'border-white bg-white text-black'
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[15px]`}
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
              } font-[SamimBold] text-[15px]`}
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
              } font-[SamimBold] text-[15px]`}
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
          <p className="border-t border-white/50 pt-2 font-[SamimBold] text-[25px]">
            ولتاژ
          </p>
          <div>
            {(form?.section1Items || []).map((s, index) => (
              <div
                key={index}
                className="my-3 rounded-xl border border-white/30 p-3 text-left max-md:flex max-md:flex-col"
              >
                <p className="col-span-3 text-right font-[AvenirLTProMedium]">
                  {`${index + 1})`}
                </p>
                <button
                  type="button"
                  onClick={addItems}
                  className="col-span-2 cursor-pointer rounded-[10px] bg-green-500 p-2 transition-all delay-100 duration-150 hover:bg-green-700"
                >
                  افزودن ردیف
                </button>
                <div className="grid grid-cols-1 gap-4 rounded-[10px] text-right max-md:flex max-md:flex-col">
                  <label htmlFor="voltage">
                    ولتاژ
                    <input
                      type="number"
                      step="0.001"
                      name="voltage"
                      value={s.voltage || ''}
                      onChange={(e) =>
                        updateItems(index, 'voltage', e.target.value)
                      }
                      className="mt-2 w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none"
                      onWheel={(e) => e.currentTarget.blur()}
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
          <p className="border-t border-white/50 pt-2 font-[AvenirLTProMedium] text-[25px]">
            G1,G2
          </p>
          <div>
            {(form?.section2Items || []).map((s, index) => (
              <div
                key={index}
                className="my-3 rounded-xl border border-white/30 p-3 text-left max-md:flex max-md:flex-col"
              >
                <p className="col-span-3 text-right font-[AvenirLTProMedium]">
                  {`${index + 1})`}
                </p>
                <button
                  type="button"
                  onClick={addRows}
                  className="col-span-3 cursor-pointer rounded-[10px] bg-green-500 p-2 transition-all delay-100 duration-150 hover:bg-green-700"
                >
                  افزودن ردیف
                </button>
                <div className="grid grid-cols-2 gap-4 rounded-[10px] text-right max-md:flex max-md:flex-col">
                  <label htmlFor="g1" className="font-[AvenirLTProMedium]">
                    G1
                    <input
                      type="number"
                      step="0.001"
                      name="g1"
                      value={s.g1 || ''}
                      onChange={(e) => updateRows(index, 'g1', e.target.value)}
                      className="mt-2 w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none"
                      onWheel={(e) => e.currentTarget.blur()}
                    />
                  </label>
                  <label htmlFor="g2" className="font-[AvenirLTProMedium]">
                    G2
                    <input
                      type="number"
                      step="0.001"
                      name="g2"
                      value={s.g2 || ''}
                      onChange={(e) => updateRows(index, 'g2', e.target.value)}
                      className="mt-2 w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none"
                      onWheel={(e) => e.currentTarget.blur()}
                    />
                  </label>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    removeRows(index);
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
            className="col-span-4 float-left mt-5 shrink-0 cursor-pointer rounded-xl bg-linear-to-tl from-green-900 to-green-500 px-4 py-2 font-[Samim] transition-all delay-100 duration-150 ease-in-out hover:scale-105"
          >
            ثبت گزارش
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditElectricityUps;
