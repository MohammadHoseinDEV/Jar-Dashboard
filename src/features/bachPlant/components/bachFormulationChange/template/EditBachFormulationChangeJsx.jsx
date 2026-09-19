import React from 'react';
import { IoCloseSharp } from 'react-icons/io5';

import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import TimePickerInput from '../../../../../Time/TimePickerInput';
import { toShamsi } from '../../../../../Time/date';

function EditBachFormulationChangeJsx({
  openEditModal,
  closeHandler,
  form,
  setForm,
  submitHandler,
  selectedFormulation,
}) {
  const handleItemChange = (index, field, value) => {
    setForm((prev) => {
      const items = [...prev.items];
      items[index] = { ...items[index], [field]: value };
      return { ...prev, items };
    });
  };
  return (
    <div className="">
      <div className="flex shrink-0 items-center justify-between">
        <h1 className="5xl:text-[35px] pr-1.5 font-[SamimBold] text-[22px]">
          ویرایش فرم
        </h1>
        <p
          onClick={closeHandler}
          className="5xl:size-12 5xl:text-[35px] flex size-8 cursor-pointer items-center justify-center rounded-full bg-[#343457] text-[20px] transition-all delay-75 duration-100 hover:scale-110"
        >
          <span>
            <IoCloseSharp />
          </span>
        </p>
      </div>

      <form
        id="editFourmolation"
        onSubmit={submitHandler}
        className="flex min-h-0 flex-col overflow-x-hidden overflow-y-auto max-md:max-h-[70vh]"
      >
        <div className="grid grid-cols-3 gap-2 max-md:flex max-md:flex-col">
          <label htmlFor="date" className="flex flex-col">
            تاریخ
            <DatePicker
              calendar={persian}
              locale={persian_fa}
              format="YYYY/MM/DD"
              calendarPosition="bottom-center"
              onChange={(value) => {
                setForm({
                  ...form,
                  date: value ? value.toDate().toISOString().split('T')[0] : '',
                });
              }}
              value={form.date ? new Date(form.date) : ''}
              inputClass="input-date"
            />
          </label>
          <label htmlFor="reportNumber" className="flex flex-col">
            شماره گزارش
            <input
              type="text"
              name="reportNumber"
              value={form?.reportNumber || ''}
              onChange={(e) => {
                setForm((p) => ({
                  ...p,
                  [e.target.name]: e.target.value,
                }));
              }}
              className="input-number"
            />
          </label>
          <label htmlFor="furnaceTonnage" className="flex flex-col">
            تناژ کوره
            <input
              type="number"
              name="furnaceTonnage"
              value={form.furnaceTonnage || ''}
              onChange={(e) => {
                setForm((p) => ({
                  ...p,
                  [e.target.name]: e.target.value,
                }));
              }}
              className="input-number"
            />
          </label>

          <label htmlFor="notes" className="col-span-3">
            توضیحات
            <input
              type="text"
              name="notes"
              value={form.notes || ''}
              onChange={(e) => {
                setForm((p) => ({
                  ...p,
                  [e.target.name]: e.target.value,
                }));
              }}
              className="input-text"
            />
          </label>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4 max-md:grid-cols-1">
          {form.items?.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 gap-4 rounded-[10px] border p-2"
            >
              <label htmlFor="materialName">
                <input
                  type="text"
                  value={item?.materialName || ''}
                  readOnly
                  className="input-text"
                />
              </label>
              <label htmlFor="currentWeight">
                وزن فعلی
                <input
                  type="number"
                  value={item?.currentWeight ?? ''}
                  step="0.001"
                  onChange={(e) =>
                    handleItemChange(
                      index,
                      'currentWeight',
                      Number(e.target.value)
                    )
                  }
                  className="input-number"
                />
              </label>
              <label htmlFor="correctedWeight">
                وزن اصلاح شده
                <input
                  type="number"
                  value={item?.correctedWeight ?? ''}
                  step="0.001"
                  onChange={(e) =>
                    handleItemChange(
                      index,
                      'correctedWeight',
                      Number(e.target.value)
                    )
                  }
                  className="input-number"
                />
              </label>
              <label htmlFor="weightPercentage">
                درصد وزنی
                <input
                  type="number"
                  value={item?.weightPercentage ?? ''}
                  step="0.001"
                  onChange={(e) =>
                    handleItemChange(
                      index,
                      'weightPercentage',
                      Number(e.target.value)
                    )
                  }
                  className="input-number"
                />
              </label>
              <label htmlFor="changeAmount">
                میزان تغییر
                <input
                  type="number"
                  placeholder="میزان تغییرات"
                  value={item?.changeAmount ?? ''}
                  step="0.001"
                  onChange={(e) =>
                    handleItemChange(index, 'changeAmount', e.target.value)
                  }
                  onWheel={(e) => e.currentTarget.blur()}
                  className="input-number"
                />
              </label>

              <label htmlFor="changeReason">
                علت تغییر
                <input
                  type="text"
                  maxLength={90}
                  value={item?.changeReason ?? ''}
                  onChange={(e) =>
                    handleItemChange(index, 'changeReason', e.target.value)
                  }
                  className="input-text"
                />
              </label>
            </div>
          ))}
        </div>
        <div className="my-3">
          <p className="mx-2 my-2 border-b border-white/50 text-[20px]">
            جمع کل وزن (بچ)
          </p>
          <div className="grid grid-cols-2 gap-5 space-y-1">
            <label htmlFor="totalBatchWeight" className="flex flex-col">
              جمع کل فعلی
              <input
                type="number"
                name="totalBatchWeight"
                value={form.totalBatchWeight ?? ''}
                step="0.001"
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: e.target.value,
                  }));
                }}
                className="input-number"
              />
            </label>

            <label htmlFor="totalBatchWeight1" className="flex flex-col">
              جمع کل اصلاح شده
              <input
                type="number"
                name="totalBatchWeight1"
                value={form.totalBatchWeight1 ?? ''}
                step="0.001"
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: e.target.value,
                  }));
                }}
                className="input-number"
              />
            </label>
          </div>
          <p className="mx-2 my-2 border-b border-white/50 text-[20px]">
            درصد شیشه خرده در بچ
          </p>
          <div className="grid grid-cols-2 gap-5 space-y-1">
            <label
              htmlFor="glassWastePercentageInBatch"
              className="flex flex-col"
            >
              درصد شیشه خرده فعلی
              <input
                type="number"
                value={form.glassWastePercentageInBatch ?? 0}
                step="0.001"
                name="glassWastePercentageInBatch"
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: e.target.value,
                  }));
                }}
                className="input-number"
              />
            </label>

            <label
              htmlFor="glassWastePercentageInBatch1"
              className="flex flex-col"
            >
              درصد شیشه خرده اصلاح شده
              <input
                type="number"
                name="glassWastePercentageInBatch1"
                value={form.glassWastePercentageInBatch1 ?? ''}
                step="0.001"
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: e.target.value,
                  }));
                }}
                className="input-number"
              />
            </label>
          </div>
          <p className="mx-2 my-2 border-b border-white/50 text-[20px]">
            وزن شیشه خرده
          </p>
          <div className="grid grid-cols-2 gap-5 space-y-1">
            <label htmlFor="glassWasteWeight" className="flex flex-col">
              وزن شیشه خرده فعلی
              <input
                type="number"
                name="glassWasteWeight"
                value={form.glassWasteWeight ?? ''}
                step="0.001"
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: e.target.value,
                  }));
                }}
                className="input-number"
              />
            </label>

            <label htmlFor="glassWasteWeight1" className="flex flex-col">
              وزن شیشه خرده اصلاح شده
              <input
                type="number"
                name="glassWasteWeight1"
                value={form.glassWasteWeight1 ?? ''}
                step="0.001"
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: e.target.value,
                  }));
                }}
                className="input-number"
              />
            </label>
          </div>
          <p className="mx-2 my-2 border-b border-white/50 text-[20px]">
            وزن بچ با شیشه خرده
          </p>
          <div className="grid grid-cols-2 gap-5 space-y-1">
            <label
              htmlFor="batchWeightWithGlassWaste"
              className="flex flex-col"
            >
              وزن بچ با شیشه خرده فعلی
              <input
                type="number"
                name="batchWeightWithGlassWaste"
                value={form.batchWeightWithGlassWaste ?? ''}
                step="0.001"
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: e.target.value,
                  }));
                }}
                className="input-number"
              />
            </label>

            <label
              htmlFor="batchWeightWithGlassWaste1"
              className="flex flex-col"
            >
              وزن بچ با شیشه خرده اصلاح شده
              <input
                type="number"
                name="batchWeightWithGlassWaste1"
                value={form.batchWeightWithGlassWaste1 ?? ''}
                step="0.001"
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: e.target.value,
                  }));
                }}
                className="input-number"
              />
            </label>
          </div>
          <p className="mx-2 my-2 border-b border-white/50 text-[20px]">
            تاریخ و ساعت
          </p>
          <div className="grid grid-cols-2 gap-5 space-y-1">
            <label htmlFor="changeRealDate" className="flex flex-col">
              تاریخ انجام تغییرات
              <DatePicker
                calendar={persian}
                locale={persian_fa}
                placeholder="تاریخ ثبت گزارش"
                format="YYYY/MM/DD"
                calendarPosition="bottom-center"
                onChange={(value) => {
                  setForm({
                    ...form,
                    changeRealDate: value
                      ? value.toDate().toISOString().split('T')[0]
                      : '',
                  });
                }}
                inputClass="input-date"
                value={form.changeRealDate ? new Date(form.changeRealDate) : ''}
              />
            </label>
            <label htmlFor="changeRealTime" className="flex flex-col">
              ساعت انجام تغییرات
              <TimePickerInput
                value={form.changeRealTime || ''}
                onChange={(value) => {
                  setForm((p) => ({
                    ...p,
                    changeRealTime: value,
                  }));
                }}
              />
            </label>
          </div>
        </div>
      </form>
      <div>
        <button type="submit" form="editFourmolation" className="btn-submit">
          تایید
        </button>
      </div>
    </div>
  );
}

export default EditBachFormulationChangeJsx;
