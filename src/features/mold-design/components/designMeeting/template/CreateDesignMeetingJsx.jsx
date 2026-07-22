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

function CreateDesignMeetingJsx({
  closeHandler,
  submitHandler,
  form,
  setForm,
  product,
  searchProducts,
  setSearchProducts,
  getProducts,
  filterProducts,
  selectedProducts,
  addItems,
  removeItems,
  updateItems,
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
        id="designMeeting"
        className="no-scrollbar flex max-h-[70vh] min-h-90 flex-col overflow-x-hidden overflow-y-auto max-md:max-h-[70vh]"
      >
        <div className="grid grid-cols-3 gap-4 max-md:flex max-md:flex-col">
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
          <label htmlFor="productCode" className="5xl:text-[30px]">
            کدمحصول
            <input
              type="text"
              value={form?.productCode || ''}
              readOnly
              className="5xl:text-[25px] my-2 w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none max-2xl:text-[14px]"
            />
          </label>
          <label htmlFor="dataFormNumber" className="5xl:text-[30px]">
            شماره فرم داده های به طراحی
            <input
              type="text"
              placeholder="شماره فرم"
              name="dataFormNumber"
              onChange={(e) => {
                setForm((p) => ({
                  ...p,
                  [e.target.name]: e.target.value,
                }));
              }}
              className="5xl:text-[25px] my-2 w-full rounded-xl bg-white/10 p-3 text-[18px] text-white outline-none max-2xl:text-[14px]"
            />
          </label>
          <label
            htmlFor="meetingDate"
            className="5xl:text-[30px] flex flex-col"
          >
            تاریخ جلسه
            <DatePicker
              calendar={persian}
              locale={persian_fa}
              placeholder="تاریخ جلسه"
              name="meetingDate"
              format="YYYY/MM/DD"
              calendarPosition="bottom-center"
              onChange={(value) =>
                setForm({
                  ...form,
                  meetingDate: value
                    ? value.toDate().toISOString().split('T')[0]
                    : '',
                })
              }
              className="5xl:scale-125"
              inputClass="w-full  rounded-xl 5xl:text-[25px] max-2xl:text-[14px]  bg-white/10 p-3 my-2 font-[Samim] text-[18px] text-white outline-none"
            />
          </label>
          <label htmlFor="designPhase" className="5xl:text-[30px]">
            فاز طراحی
            <input
              type="text"
              name="designPhase"
              placeholder="فاز طراحی"
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
        <div>
          <label htmlFor="participants" className="5xl:text-[30px]">
            اعضاء حاضر در جلسه
            <input
              type="text"
              name="participants"
              placeholder="حاضرین در جلسه"
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
        <p className="5xl:text-[30px] my-2 border-t-2 border-white/30 py-2">
          کنترل های انجام شده
        </p>
        <div className="grid grid-cols-4 gap-4 max-md:flex max-md:flex-col">
          <div>
            <p className="5xl:text-[25px] pb-2 max-2xl:text-[12px] max-md:text-[13px]">
              وزن
            </p>
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 transition-all select-none max-2xl:text-[14px] ${
                form.weightOk === true
                  ? 'border-green-600 text-white'
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="weightOk"
                checked={form.weightOk === true}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    weightOk: true,
                  }))
                }
                className="hidden"
              />
              OK
            </label>
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 transition-all select-none max-2xl:text-[14px] ${
                form.weightOk === false
                  ? 'border-red-600 '
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="weightOk"
                checked={form.weightOk === false}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    weightOk: false,
                  }))
                }
                className="hidden"
              />
              N.OK
            </label>
          </div>
          <div>
            <p className="5xl:text-[25px] pb-2 max-2xl:text-[12px] max-md:text-[13px]">
              تلرانس محصول
            </p>
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 transition-all select-none max-2xl:text-[14px] ${
                form.productToleranceOk === true
                  ? 'border-green-600 text-white'
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="productToleranceOk"
                checked={form.productToleranceOk === true}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    productToleranceOk: true,
                  }))
                }
                className="hidden"
              />
              OK
            </label>
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 transition-all select-none max-2xl:text-[14px] ${
                form.productToleranceOk === false
                  ? 'border-red-600 '
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="productToleranceOk"
                checked={form.productToleranceOk === false}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    productToleranceOk: false,
                  }))
                }
                className="hidden"
              />
              N.OK
            </label>
          </div>
          <div>
            <p className="5xl:text-[25px] pb-2 max-2xl:text-[12px] max-md:text-[13px]">
              عمر قالب
            </p>
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 transition-all select-none max-2xl:text-[14px] ${
                form.moldLifetimeOk === true
                  ? 'border-green-600 text-white'
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="moldLifetimeOk"
                checked={form.moldLifetimeOk === true}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    moldLifetimeOk: true,
                  }))
                }
                className="hidden"
              />
              OK
            </label>
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 transition-all select-none max-2xl:text-[14px] ${
                form.moldLifetimeOk === false
                  ? 'border-red-600 '
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="moldLifetimeOk"
                checked={form.moldLifetimeOk === false}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    moldLifetimeOk: false,
                  }))
                }
                className="hidden"
              />
              N.OK
            </label>
          </div>
          <div>
            <p className="5xl:text-[25px] pb-2 max-2xl:text-[12px] max-md:text-[13px]">
              نمونه گچی
            </p>
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 transition-all select-none max-2xl:text-[14px] ${
                form.gypsumSampleOk === true
                  ? 'border-green-600 text-white'
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="gypsumSampleOk"
                checked={form.gypsumSampleOk === true}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    gypsumSampleOk: true,
                  }))
                }
                className="hidden"
              />
              OK
            </label>
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 transition-all select-none max-2xl:text-[14px] ${
                form.gypsumSampleOk === false
                  ? 'border-red-600 '
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="gypsumSampleOk"
                checked={form.gypsumSampleOk === false}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    gypsumSampleOk: false,
                  }))
                }
                className="hidden"
              />
              N.OK
            </label>
          </div>
          <div>
            <p className="5xl:text-[25px] pb-2 max-2xl:text-[12px] max-md:text-[13px]">
              کولینگ پلانجر
            </p>
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 transition-all select-none max-2xl:text-[14px] ${
                form.coolingPlungerOk === true
                  ? 'border-green-600 text-white'
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="coolingPlungerOk"
                checked={form.coolingPlungerOk === true}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    coolingPlungerOk: true,
                  }))
                }
                className="hidden"
              />
              OK
            </label>
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 transition-all select-none max-2xl:text-[14px] ${
                form.coolingPlungerOk === false
                  ? 'border-red-600 '
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="coolingPlungerOk"
                checked={form.coolingPlungerOk === false}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    coolingPlungerOk: false,
                  }))
                }
                className="hidden"
              />
              N.OK
            </label>
          </div>
          <div>
            <p className="5xl:text-[25px] pb-2 max-2xl:text-[12px] max-md:text-[13px]">
              بررسی هلدر قالب
            </p>
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 transition-all select-none max-2xl:text-[14px] ${
                form.moldHolderCheckOk === true
                  ? 'border-green-600 text-white'
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="moldHolderCheckOk"
                checked={form.moldHolderCheckOk === true}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    moldHolderCheckOk: true,
                  }))
                }
                className="hidden"
              />
              OK
            </label>
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 transition-all select-none max-2xl:text-[14px] ${
                form.moldHolderCheckOk === false
                  ? 'border-red-600 '
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="moldHolderCheckOk"
                checked={form.moldHolderCheckOk === false}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    moldHolderCheckOk: false,
                  }))
                }
                className="hidden"
              />
              N.OK
            </label>
          </div>
          <div>
            <p className="5xl:text-[25px] pb-2 max-2xl:text-[12px] max-md:text-[13px]">
              بررسی هلدر بلنک
            </p>
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 transition-all select-none max-2xl:text-[14px] ${
                form.blankHolderCheckOk === true
                  ? 'border-green-600 text-white'
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="blankHolderCheckOk"
                checked={form.blankHolderCheckOk === true}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    blankHolderCheckOk: true,
                  }))
                }
                className="hidden"
              />
              OK
            </label>
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 transition-all select-none max-2xl:text-[14px] ${
                form.blankHolderCheckOk === false
                  ? 'border-red-600 '
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="blankHolderCheckOk"
                checked={form.blankHolderCheckOk === false}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    blankHolderCheckOk: false,
                  }))
                }
                className="hidden"
              />
              N.OK
            </label>
          </div>
          <div>
            <p className="5xl:text-[25px] pb-2 max-2xl:text-[12px] max-md:text-[13px]">
              اینورت و H قالب
            </p>
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 transition-all select-none max-2xl:text-[14px] ${
                form.invertAndMoldHOk === true
                  ? 'border-green-600 text-white'
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="invertAndMoldHOk"
                checked={form.invertAndMoldHOk === true}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    invertAndMoldHOk: true,
                  }))
                }
                className="hidden"
              />
              OK
            </label>
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 transition-all select-none max-2xl:text-[14px] ${
                form.invertAndMoldHOk === false
                  ? 'border-red-600 '
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="invertAndMoldHOk"
                checked={form.invertAndMoldHOk === false}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    invertAndMoldHOk: false,
                  }))
                }
                className="hidden"
              />
              N.OK
            </label>
          </div>
          <div>
            <p className="5xl:text-[25px] pb-2 max-2xl:text-[12px] max-md:text-[13px]">
              اینورت و H بلنک
            </p>
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 transition-all select-none max-2xl:text-[14px] ${
                form.invertAndBlankHOk === true
                  ? 'border-green-600 text-white'
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="invertAndBlankHOk"
                checked={form.invertAndBlankHOk === true}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    invertAndBlankHOk: true,
                  }))
                }
                className="hidden"
              />
              OK
            </label>
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 transition-all select-none max-2xl:text-[14px] ${
                form.invertAndBlankHOk === false
                  ? 'border-red-600 '
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="invertAndBlankHOk"
                checked={form.invertAndBlankHOk === false}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    invertAndBlankHOk: false,
                  }))
                }
                className="hidden"
              />
              N.OK
            </label>
          </div>
          <div>
            <p className="5xl:text-[21px] pb-2 text-[15px] max-2xl:text-[11px] max-md:text-[13px]">
              بررسی فاصله پیچ آفست تا زیر شیار هنگ ، قالب و بلنک
            </p>
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 transition-all select-none max-2xl:text-[14px] ${
                form.offsetScrewToHangGrooveDistanceCheckOk === true
                  ? 'border-green-600 text-white'
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="offsetScrewToHangGrooveDistanceCheckOk"
                checked={form.offsetScrewToHangGrooveDistanceCheckOk === true}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    offsetScrewToHangGrooveDistanceCheckOk: true,
                  }))
                }
                className="hidden"
              />
              OK
            </label>
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 transition-all select-none max-2xl:text-[14px] ${
                form.offsetScrewToHangGrooveDistanceCheckOk === false
                  ? 'border-red-600 '
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="offsetScrewToHangGrooveDistanceCheckOk"
                checked={form.offsetScrewToHangGrooveDistanceCheckOk === false}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    offsetScrewToHangGrooveDistanceCheckOk: false,
                  }))
                }
                className="hidden"
              />
              N.OK
            </label>
          </div>
          <div>
            <p className="5xl:text-[25px] pb-2 max-2xl:text-[12px] max-md:text-[13px]">
              دهانه داخلی محصول
            </p>
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 transition-all select-none max-2xl:text-[14px] ${
                form.insideProductMouthOk === true
                  ? 'border-green-600 text-white'
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="insideProductMouthOk"
                checked={form.insideProductMouthOk === true}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    insideProductMouthOk: true,
                  }))
                }
                className="hidden"
              />
              OK
            </label>
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 transition-all select-none max-2xl:text-[14px] ${
                form.insideProductMouthOk === false
                  ? 'border-red-600 '
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="insideProductMouthOk"
                checked={form.insideProductMouthOk === false}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    insideProductMouthOk: false,
                  }))
                }
                className="hidden"
              />
              N.OK
            </label>
          </div>
          <div>
            <p className="5xl:text-[25px] pb-2 max-2xl:text-[12px] max-md:text-[13px]">
              ران پاریزون
            </p>
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 transition-all select-none max-2xl:text-[14px] ${
                form.parisonRunnerOk === true
                  ? 'border-green-600 text-white'
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="parisonRunnerOk"
                checked={form.parisonRunnerOk === true}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    parisonRunnerOk: true,
                  }))
                }
                className="hidden"
              />
              OK
            </label>
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 transition-all select-none max-2xl:text-[14px] ${
                form.parisonRunnerOk === false
                  ? 'border-red-600 '
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="parisonRunnerOk"
                checked={form.parisonRunnerOk === false}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    parisonRunnerOk: false,
                  }))
                }
                className="hidden"
              />
              N.OK
            </label>
          </div>
          <div>
            <p className="5xl:text-[25px] pb-2 max-2xl:text-[12px] max-md:text-[13px]">
              هلدر بافل
            </p>
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 transition-all select-none max-2xl:text-[14px] ${
                form.baffleHolderOk === true
                  ? 'border-green-600 text-white'
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="baffleHolderOk"
                checked={form.baffleHolderOk === true}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    baffleHolderOk: true,
                  }))
                }
                className="hidden"
              />
              OK
            </label>
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 transition-all select-none max-2xl:text-[14px] ${
                form.baffleHolderOk === false
                  ? 'border-red-600 '
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="baffleHolderOk"
                checked={form.baffleHolderOk === false}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    baffleHolderOk: false,
                  }))
                }
                className="hidden"
              />
              N.OK
            </label>
          </div>
          <div>
            <p className="5xl:text-[25px] pb-2 max-2xl:text-[12px] max-md:text-[13px]">
              تلرانس نک رینگ ، گاید رینگ ، پلانجر
            </p>
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 transition-all select-none max-2xl:text-[14px] ${
                form.neckRingGuideRingPlungerToleranceOk === true
                  ? 'border-green-600 text-white'
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="neckRingGuideRingPlungerToleranceOk"
                checked={form.neckRingGuideRingPlungerToleranceOk === true}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    neckRingGuideRingPlungerToleranceOk: true,
                  }))
                }
                className="hidden"
              />
              OK
            </label>
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 transition-all select-none max-2xl:text-[14px] ${
                form.neckRingGuideRingPlungerToleranceOk === false
                  ? 'border-red-600 '
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="neckRingGuideRingPlungerToleranceOk"
                checked={form.neckRingGuideRingPlungerToleranceOk === false}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    neckRingGuideRingPlungerToleranceOk: false,
                  }))
                }
                className="hidden"
              />
              N.OK
            </label>
          </div>
          <div>
            <p className="5xl:text-[25px] pb-2 max-2xl:text-[12px] max-md:text-[13px]">
              تلرانس گلویی قالب ، بلنک و نک رینگ
            </p>
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 transition-all select-none max-2xl:text-[14px] ${
                form.blankMoldAndNeckRingThroatToleranceOk === true
                  ? 'border-green-600 text-white'
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="blankMoldAndNeckRingThroatToleranceOk"
                checked={form.blankMoldAndNeckRingThroatToleranceOk === true}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    blankMoldAndNeckRingThroatToleranceOk: true,
                  }))
                }
                className="hidden"
              />
              OK
            </label>
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 transition-all select-none max-2xl:text-[14px] ${
                form.blankMoldAndNeckRingThroatToleranceOk === false
                  ? 'border-red-600 '
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="blankMoldAndNeckRingThroatToleranceOk"
                checked={form.blankMoldAndNeckRingThroatToleranceOk === false}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    blankMoldAndNeckRingThroatToleranceOk: false,
                  }))
                }
                className="hidden"
              />
              N.OK
            </label>
          </div>
          <div>
            <p className="5xl:text-[25px] pb-2 max-2xl:text-[12px] max-md:text-[13px]">
              متریال متعلقات
            </p>
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 transition-all select-none max-2xl:text-[14px] ${
                form.accessoriesMaterialOk === true
                  ? 'border-green-600 text-white'
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="accessoriesMaterialOk"
                checked={form.accessoriesMaterialOk === true}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    accessoriesMaterialOk: true,
                  }))
                }
                className="hidden"
              />
              OK
            </label>
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 transition-all select-none max-2xl:text-[14px] ${
                form.accessoriesMaterialOk === false
                  ? 'border-red-600 '
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="accessoriesMaterialOk"
                checked={form.accessoriesMaterialOk === false}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    accessoriesMaterialOk: false,
                  }))
                }
                className="hidden"
              />
              N.OK
            </label>
          </div>
          <div>
            <p className="5xl:text-[25px] pb-2 max-2xl:text-[12px] max-md:text-[13px]">
              چک لیست کنترل ریسک
            </p>
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 transition-all select-none max-2xl:text-[14px] ${
                form.productNeedsRiskAssessmentOk === true
                  ? 'border-green-600 text-white'
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="productNeedsRiskAssessmentOk"
                checked={form.productNeedsRiskAssessmentOk === true}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    productNeedsRiskAssessmentOk: true,
                  }))
                }
                className="hidden"
              />
              دارد
            </label>
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 transition-all select-none max-2xl:text-[14px] ${
                form.productNeedsRiskAssessmentOk === false
                  ? 'border-red-600 '
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="productNeedsRiskAssessmentOk"
                checked={form.productNeedsRiskAssessmentOk === false}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    productNeedsRiskAssessmentOk: false,
                  }))
                }
                className="hidden"
              />
              ندارد
            </label>
          </div>
        </div>
        <div className="py-2">
          {(form.decisions || []).map((item, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/30 p-3 text-left max-md:flex max-md:flex-col"
            >
              <p className="col-span-3 text-right font-[AvenirLTProMedium]">
                {index + 1}
              </p>
              <button
                type="button"
                onClick={addItems}
                className="5xl:text-[25px] col-span-3 cursor-pointer rounded-[10px] bg-green-500 p-2 transition-all delay-100 duration-150 hover:bg-green-700"
              >
                افزودن ردیف
              </button>
              <div className="grid grid-cols-4 gap-2 rounded-[10px] max-md:flex max-md:flex-col">
                <label
                  htmlFor="decision"
                  className="5xl:text-[25px] text-right"
                >
                  تصمیمیات اخذ شده
                  <input
                    type="text"
                    name="decision"
                    value={item.decision || ''}
                    maxLength={37}
                    onChange={(e) =>
                      updateItems(index, 'decision', e.target.value)
                    }
                    className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
                  />
                </label>
                <label
                  htmlFor="responsible"
                  className="5xl:text-[25px] text-right"
                >
                  مسئول اجرا
                  <input
                    type="text"
                    name="responsible"
                    value={item.responsible || ''}
                    onChange={(e) =>
                      updateItems(index, 'responsible', e.target.value)
                    }
                    className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
                  />
                </label>
                <label
                  htmlFor="deadline"
                  className="5xl:text-[25px] text-right"
                >
                  مهلت انجام
                  <input
                    type="text"
                    name="deadline"
                    value={item.deadline || ''}
                    onChange={(e) =>
                      updateItems(index, 'deadline', e.target.value)
                    }
                    className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
                  />
                </label>
                <label htmlFor="notes" className="5xl:text-[25px] text-right">
                  ملاحظات
                  <input
                    type="text"
                    name="notes"
                    value={item.notes || ''}
                    onChange={(e) =>
                      updateItems(index, 'notes', e.target.value)
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
                className="5xl:text-[25px] my-5 cursor-pointer rounded-xl bg-linear-to-bl from-red-500 to-red-800 px-4 py-2 font-[Samim] transition-all delay-100 duration-150 ease-in-out hover:scale-105 hover:bg-red-500/60"
              >
                حذف ردیف
              </button>
            </div>
          ))}
        </div>
      </form>
      <div>
        <button
          type="submit"
          form="designMeeting"
          className="5xl:text-[25px] w-full cursor-pointer rounded-xl bg-linear-to-tl from-green-900 to-green-500 px-4 py-3 font-[Samim] transition-all delay-100 duration-150 ease-in-out hover:scale-[1.01]"
        >
          ثبت گزارش
        </button>
      </div>
    </div>
  );
}

export default CreateDesignMeetingJsx;
