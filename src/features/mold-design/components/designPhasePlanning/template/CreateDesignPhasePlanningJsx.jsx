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

function CreateDesignPhasePlanningJsx({
  closeHandler,
  handleItemChange,
  submitHandler,
  form,
  setForm,
  product,
  searchProducts,
  setSearchProducts,
  getProducts,
  filterProducts,
  selectedProducts,
}) {
  return (
    <div>
      <div className="flex shrink-0 items-center justify-between">
        <p className="5xl:text-[30px] pr-1.5 font-[SamimBold] text-[20px] max-2xl:text-[15px]">
          ایجاد فرم جدید
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
        id="phase"
        className="no-scrollbar flex max-h-[65vh] min-h-0 flex-1 flex-col overflow-x-hidden overflow-y-auto max-md:max-h-[70vh]"
      >
        <div>
          <div className="grid grid-cols-2 gap-5 max-md:grid max-md:grid-cols-1">
            <label
              htmlFor="startTime"
              className="5xl:text-[30px] flex flex-col"
            >
              زمان شروع
              <DatePicker
                calendar={persian}
                locale={persian_fa}
                placeholder="تاریخ شروع "
                name="startTime"
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
                className="5xl:scale-125"
                inputClass="rounded-xl w-full 5xl:text-[25px] max-2xl:text-[14px]  bg-white/10 p-3 my-2 font-[Samim] text-[18px] text-white outline-none"
              />
            </label>
            <label htmlFor="endTime" className="5xl:text-[30px] flex flex-col">
              زمان پایان
              <DatePicker
                calendar={persian}
                locale={persian_fa}
                placeholder="تاریخ پایان "
                name="endTime"
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
                className="5xl:scale-125"
                inputClass="rounded-xl w-full 5xl:text-[25px] max-2xl:text-[14px]  bg-white/10 p-3 my-2 font-[Samim] text-[18px] text-white outline-none"
              />
            </label>
          </div>
          <div className="grid grid-cols-3 gap-5 max-md:grid max-md:grid-cols-1">
            <label htmlFor="productName" className="5xl:text-[30px]">
              نام محصول
              <Combobox
                value={selectedProducts}
                onChange={(value) => {
                  setForm((prev) => ({
                    ...prev,
                    id: value?.id || '',
                    productName: value?.name || '',
                    productCode: value?.code || '',
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
                          <div className="p-3 text-white/70">
                            موردی پیدا نشد
                          </div>
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
            <label htmlFor="productCode" className="5xl:text-[30px]">
              کدمحصول
              <input
                type="text"
                value={form?.productCode || ''}
                readOnly
                className="5xl:text-[25px] my-2 w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none max-2xl:text-[14px]"
              />
            </label>
            <label htmlFor="formNumber" className="5xl:text-[30px]">
              شماره فرم
              <input
                type="text"
                placeholder="شماره فرم"
                name="formNumber"
                value={form?.formNumber || ''}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: e.target.value,
                  }));
                }}
                className="5xl:text-[25px] my-2 w-full rounded-xl bg-white/10 p-3 text-[18px] text-white outline-none max-2xl:text-[14px]"
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
                <p className="5xl:text-[30px]">فاز های طراحی</p>
                <input
                  type="text"
                  value={item.designPhase || ''}
                  readOnly
                  className="5xl:text-[25px] mt-1 w-full rounded-xl bg-white/10 p-3 font-[Samim] text-white outline-none"
                />
              </label>
              <div className="flex items-center justify-around gap-4 max-md:grid max-md:grid-cols-1">
                <label
                  htmlFor="production"
                  onClick={() =>
                    handleItemChange(index, 'production', !item.production)
                  }
                  className={`5xl:text-[22px] flex cursor-pointer items-center justify-center rounded-[5px] border-2 px-5 py-1 ${
                    item.production
                      ? 'border-white bg-white text-black'
                      : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
                  }`}
                >
                  تولید
                </label>
                <label
                  htmlFor="design"
                  onClick={() =>
                    handleItemChange(index, 'design', !item.design)
                  }
                  className={`5xl:text-[22px] flex cursor-pointer items-center justify-center rounded-[5px] border-2 px-5 py-1 ${
                    item.design
                      ? 'border-white bg-white text-black'
                      : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
                  }`}
                >
                  طراحی
                </label>
                <label
                  htmlFor="supplier"
                  onClick={() =>
                    handleItemChange(index, 'supplier', !item.supplier)
                  }
                  className={`5xl:text-[22px] flex cursor-pointer items-center justify-center rounded-[5px] border-2 px-5 py-1 ${
                    item.supplier
                      ? 'border-white bg-white text-black'
                      : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
                  }`}
                >
                  تامین کننده
                </label>
                <label
                  htmlFor="qualityControlPackaging"
                  onClick={() =>
                    handleItemChange(
                      index,
                      'qualityControlPackaging',
                      !item.qualityControlPackaging
                    )
                  }
                  className={`5xl:text-[22px] flex cursor-pointer items-center justify-center rounded-[5px] border-2 px-5 py-1 ${
                    item.qualityControlPackaging
                      ? 'border-white bg-white text-black'
                      : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
                  }`}
                >
                  کنترل کیفیت بسته بندی
                </label>
                <label
                  htmlFor="machining"
                  onClick={() =>
                    handleItemChange(index, 'machining', !item.machining)
                  }
                  className={`5xl:text-[22px] flex cursor-pointer items-center justify-center rounded-[5px] border-2 px-5 py-1 ${
                    item.machining
                      ? 'border-white bg-white text-black'
                      : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
                  }`}
                >
                  تراشکاری
                </label>
                <label
                  htmlFor="sales"
                  onClick={() => handleItemChange(index, 'sales', !item.sales)}
                  className={`5xl:text-[22px] flex cursor-pointer items-center justify-center rounded-[5px] border-2 px-5 py-1 ${
                    item.sales
                      ? 'border-white bg-white text-black'
                      : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
                  }`}
                >
                  فروش
                </label>
                <label
                  htmlFor="factoryManager"
                  onClick={() =>
                    handleItemChange(
                      index,
                      'factoryManager',
                      !item.factoryManager
                    )
                  }
                  className={`5xl:text-[22px] flex cursor-pointer items-center justify-center rounded-[5px] border-2 px-5 py-1 ${
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
        </div>
      </form>
      <div className="flex items-center justify-end">
        <button
          type="submit"
          form="phase"
          className="5xl:text-[25px] cursor-pointer rounded-xl bg-linear-to-tl from-green-900 to-green-500 px-4 py-3 font-[Samim] transition-all delay-100 duration-150 ease-in-out hover:scale-[1.01]"
        >
          ثبت گزارش
        </button>
      </div>
    </div>
  );
}

export default CreateDesignPhasePlanningJsx;
