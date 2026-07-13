import React from 'react';

import close from '../../../../../assets/images/close.png';

import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react';

function EditInternalDesignJsx({
  closeHandler,
  submitHandler,
  selectedInternal,
  form,
  setForm,
  product,
  searchProducts,
  setSearchProducts,
  getProducts,
  filterProducts,
  selectedProducts,
  handleItemChange,
}) {
  return (
    <div>
      <div className="flex shrink-0 items-center justify-between">
        <p className="5xl:text-[30px] space-x-1 pr-1.5 text-[20px] max-2xl:text-[15px]">
          <span>ویرایش فرم</span>
          <span className="font-[AvenirLTProMedium]">
            {selectedInternal?.productNameOrSampleCode}
          </span>
        </p>
        <button
          onClick={closeHandler}
          className="cursor-pointer rounded-[10px] bg-white/80 p-1.5 text-[30px] text-red-500 transition-all delay-100 duration-75 ease-in-out hover:bg-black"
        >
          <img
            src={close}
            alt="close"
            width={20}
            className="5xl:w-7 transition-all delay-100 duration-100 ease-in-out hover:scale-110 max-2xl:w-4"
          />
        </button>
      </div>
      <form
        onSubmit={submitHandler}
        id="internals"
        className="no-scrollbar flex h-[70vh] flex-col overflow-x-hidden overflow-y-auto max-md:max-h-[70vh]"
      >
        <div className="grid grid-cols-2 gap-5">
          <label htmlFor="startTime" className="flex flex-col">
            زمان شروع
            <DatePicker
              calendar={persian}
              locale={persian_fa}
              placeholder="تاریخ شروع "
              name="formDate"
              format="YYYY/MM/DD"
              calendarPosition="bottom-center"
              onChange={(value) =>
                setForm({
                  ...form,
                  startTime: value
                    ? value.toDate().toISOString().split('T')[0]
                    : '',
                })
              }
              value={form.startTime ? new Date(form.startTime) : ''}
              className="5xl:scale-125"
              inputClass="rounded-xl w-full 5xl:text-[25px] max-2xl:text-[14px]  bg-white/10 p-3 my-2 font-[Samim] text-[18px] text-white outline-none"
            />
          </label>
          <label htmlFor="endTime" className="flex flex-col">
            زمان پایان
            <DatePicker
              calendar={persian}
              locale={persian_fa}
              placeholder="تاریخ پایان "
              name="formDate"
              format="YYYY/MM/DD"
              calendarPosition="bottom-center"
              onChange={(value) =>
                setForm({
                  ...form,
                  endTime: value
                    ? value.toDate().toISOString().split('T')[0]
                    : '',
                })
              }
              value={form.endTime ? new Date(form.endTime) : ''}
              className="5xl:scale-125"
              inputClass="rounded-xl w-full 5xl:text-[25px] max-2xl:text-[14px]  bg-white/10 p-3 my-2 font-[Samim] text-[18px] text-white outline-none"
            />
          </label>
        </div>
        <p className="my-2 border-b-2 border-white/30"></p>
        <div className="grid grid-cols-4 gap-4">
          <label htmlFor="productNameOrSampleCode" className="5xl:text-[30px]">
            نام محصول
            <Combobox
              value={selectedProducts}
              onChange={(value) => {
                setForm((prev) => ({
                  ...prev,
                  id: value?.id || '',
                  productNameOrSampleCode: value?.name || '',
                }));
              }}
            >
              {({ open }) => (
                <div className="relative">
                  <ComboboxButton className="5xl:text-[25px] my-2 w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none max-2xl:text-[14px] max-md:text-[15px]">
                    <span
                      className={
                        selectedProducts?.id ? 'text-white' : 'text-white/70'
                      }
                    >
                      {selectedProducts?.name || 'انتخاب محصول...'}
                    </span>
                    <span className="text-white/70">{open ? '▴' : '▾'}</span>
                  </ComboboxButton>
                  <div
                    className={`absolute z-50 mt-2 w-full overflow-auto rounded-xl bg-black/95 shadow-lg ring-1 ring-white/10 ${
                      open ? '' : 'hidden '
                    }`}
                  >
                    <div className="border-b border-white/10 p-2">
                      <ComboboxInput
                        value={searchProducts}
                        onChange={(e) => setSearchProducts(e.target.value)}
                        placeholder="جستجو..."
                        className="w-full rounded-lg bg-white/10 p-2 font-[AvenirLTProMedium] text-white outline-none placeholder:text-white/50"
                      />
                    </div>
                    <ComboboxOptions className="no-scrollbar max-h-50 overflow-auto">
                      {filterProducts.length === 0 ? (
                        <div className="p-3 text-white/70">موردی پیدا نشد</div>
                      ) : (
                        filterProducts?.map((j) => (
                          <ComboboxOption
                            key={j.id || 'null'}
                            value={j}
                            className={({ activ, selected }) =>
                              `cursor-pointer rounded-lg p-3 text-white ${
                                activ ? 'bg-black' : ''
                              } ${selected ? 'bg-black' : ''}`
                            }
                          >
                            {j.name}
                          </ComboboxOption>
                        ))
                      )}
                    </ComboboxOptions>
                  </div>
                </div>
              )}
            </Combobox>
          </label>
          <label
            htmlFor="plannedStartDate"
            className="5xl:text-[30px] flex flex-col"
          >
            تاریخ شروع برنامه ریزی شده
            <DatePicker
              calendar={persian}
              locale={persian_fa}
              placeholder="تاریخ ثبت "
              name="formDate"
              format="YYYY/MM/DD"
              calendarPosition="bottom-center"
              onChange={(value) =>
                setForm({
                  ...form,
                  plannedStartDate: value
                    ? value.toDate().toISOString().split('T')[0]
                    : '',
                })
              }
              value={
                form.plannedStartDate ? new Date(form.plannedStartDate) : ''
              }
              className="5xl:scale-125"
              inputClass="rounded-xl w-full 5xl:text-[25px] max-2xl:text-[14px]  bg-white/10 p-3 my-2 font-[Samim] text-[18px] text-white outline-none"
            />
          </label>
          <label htmlFor="estimatedTotalHours">
            کل زمان پیش بینی
            <input
              type="number"
              step="0.001"
              placeholder="زمان پیش بینی به ساعت وارد شود"
              value={form.estimatedTotalHours ?? 0}
              name="estimatedTotalHours"
              onWheel={(e) => e.currentTarget.blur()}
              onChange={(e) => {
                setForm((p) => ({
                  ...p,
                  [e.target.name]: Number(e.target.value),
                }));
              }}
              className="5xl:text-[25px] my-2 w-full rounded-xl bg-white/10 p-3 text-[18px] text-white outline-none max-2xl:text-[14px]"
            />
          </label>
          <label
            htmlFor="actualEndDate"
            className="5xl:text-[30px] flex flex-col"
          >
            تاریخ پایان واقعی (صحه گذاری محصول)
            <DatePicker
              calendar={persian}
              locale={persian_fa}
              placeholder="تاریخ ثبت "
              name="formDate"
              format="YYYY/MM/DD"
              calendarPosition="bottom-center"
              onChange={(value) =>
                setForm({
                  ...form,
                  actualEndDate: value
                    ? value.toDate().toISOString().split('T')[0]
                    : '',
                })
              }
              value={form.actualEndDate ? new Date(form.actualEndDate) : ''}
              className="5xl:scale-125"
              inputClass="rounded-xl w-full 5xl:text-[25px] max-2xl:text-[14px]  bg-white/10 p-3 my-2 font-[Samim] text-[18px] text-white outline-none"
            />
          </label>
        </div>
        <p className="my-2 border-b-2 border-white/30"></p>
        {form.items.map((item, index) => (
          <div
            key={index}
            className="my-3 grid grid-cols-1 gap-4 rounded-[10px] border p-2"
          >
            <label htmlFor="designPhase" className="flex flex-col">
              فاز های طراحی
              <input
                type="text"
                value={item.designPhase || ''}
                readOnly
                className="mt-1 rounded-xl bg-white/10 p-3 font-[Samim] text-white outline-none"
              />
            </label>
            <div className="grid grid-cols-8 gap-4">
              <label
                onClick={() =>
                  handleItemChange(index, 'production', !item.production)
                }
                className={`flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 ${
                  item.production
                    ? 'border-white bg-white text-black'
                    : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
                }`}
              >
                تولید
              </label>
              <label
                onClick={() =>
                  handleItemChange(index, 'designManager', !item.designManager)
                }
                className={`flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 ${
                  item.designManager
                    ? 'border-white bg-white text-black'
                    : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
                }`}
              >
                مسئول طراحی
              </label>
              <label
                onClick={() =>
                  handleItemChange(
                    index,
                    'tehranDesignOffice',
                    !item.tehranDesignOffice
                  )
                }
                className={`flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 ${
                  item.tehranDesignOffice
                    ? 'border-white bg-white text-black'
                    : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
                }`}
              >
                دفتر تهران طراحی
              </label>
              <label
                onClick={() =>
                  handleItemChange(
                    index,
                    'qualityControlPackaging',
                    !item.qualityControlPackaging
                  )
                }
                className={`flex cursor-pointer items-center justify-center rounded-xl border-2 px-2 py-1 text-[14px] ${
                  item.qualityControlPackaging
                    ? 'border-white bg-white text-black'
                    : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
                }`}
              >
                کنترل کیفیت و بسته بندی
              </label>
              <label
                onClick={() =>
                  handleItemChange(index, 'machining', !item.machining)
                }
                className={`flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 ${
                  item.machining
                    ? 'border-white bg-white text-black'
                    : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
                }`}
              >
                تراشکاری
              </label>
              <label
                onClick={() =>
                  handleItemChange(index, 'cartonmaking', !item.cartonmaking)
                }
                className={`flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 ${
                  item.cartonmaking
                    ? 'border-white bg-white text-black'
                    : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
                }`}
              >
                کارتن سازی
              </label>
              <label
                onClick={() => handleItemChange(index, 'sales', !item.sales)}
                className={`flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 ${
                  item.sales
                    ? 'border-white bg-white text-black'
                    : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
                }`}
              >
                فروش
              </label>
              <label
                onClick={() =>
                  handleItemChange(
                    index,
                    'factoryManager',
                    !item.factoryManager
                  )
                }
                className={`flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 ${
                  item.factoryManager
                    ? 'border-white bg-white text-black'
                    : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
                }`}
              >
                مدیر کارخانه
              </label>
            </div>
          </div>
        ))}
      </form>
      <div className="flex items-center justify-end">
        <button
          type="submit"
          form="internals"
          className="cursor-pointer rounded-xl bg-linear-to-tl from-green-900 to-green-500 px-4 py-3 font-[Samim] transition-all delay-100 duration-150 ease-in-out hover:scale-[1.01]"
        >
          ثبت گزارش
        </button>
      </div>
    </div>
  );
}

export default EditInternalDesignJsx;
