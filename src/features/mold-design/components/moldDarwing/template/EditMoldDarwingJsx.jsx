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

function EditMoldDarwingJsx({
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
  selectedMoldDarwing,
}) {
  return (
    <div>
      <div className="flex shrink-0 items-center justify-between">
        <p className="5xl:text-[30px] pr-1.5 font-[SamimBold] text-[20px] max-2xl:text-[15px]">
          <span> ویرایش محصول</span>
          <span className="pr-1 font-[AvenirLTProMedium]">
            {selectedMoldDarwing?.productName}
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
        id="editMoldDarwing"
        className="no-scrollbar flex min-h-90 flex-col overflow-x-hidden overflow-y-auto max-md:max-h-[70vh]"
      >
        <div className="grid grid-cols-4 gap-4 max-md:flex max-md:flex-col">
          <label htmlFor="formDate" className="5xl:text-[30px] flex flex-col">
            تاریخ
            <DatePicker
              calendar={persian}
              locale={persian_fa}
              placeholder="تاریخ ثبت گزارش"
              name="formDate"
              format="YYYY/MM/DD"
              calendarPosition="bottom-center"
              onChange={(value) =>
                setForm({
                  ...form,
                  formDate: value
                    ? value.toDate().toISOString().split('T')[0]
                    : '',
                })
              }
              className="5xl:scale-125"
              value={form.formDate ? new Date(form.formDate) : ''}
              inputClass="w-full  rounded-xl 5xl:text-[25px] max-2xl:text-[14px]  bg-white/10 p-3 my-2 font-[Samim] text-[18px] text-white outline-none"
            />
          </label>
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
              placeholder="20B1JmH1"
              readOnly
              className="5xl:text-[25px] my-2 w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none max-2xl:text-[14px]"
            />
          </label>
          <label htmlFor="formNumber" className="5xl:text-[30px]">
            شماره فرم
            <input
              type="text"
              placeholder="شماره فرم"
              value={form.formNumber ?? 0}
              name="formNumber"
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
        <div className="flex items-center gap-4 max-md:grid max-md:grid-cols-1 max-md:text-center">
          <p>تصدیق نقشه ها و متعاقات نیاز به ساخت نمونه</p>

          <label
            className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 transition-all select-none max-2xl:text-[14px] ${
              form.needsSampleProduction === 1
                ? 'border-green-600 text-white'
                : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
            } font-[SamimBold] text-[18px]`}
          >
            <input
              type="radio"
              name="needsSampleProduction"
              value={1}
              checked={form.needsSampleProduction === 1}
              onChange={() =>
                setForm((prev) => ({
                  ...prev,
                  needsSampleProduction: 1,
                }))
              }
              className="hidden"
            />
            دارد
          </label>
          <label
            className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 transition-all select-none max-2xl:text-[14px] ${
              form.needsSampleProduction === 2
                ? 'border-red-600 '
                : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
            } font-[SamimBold] text-[18px]`}
          >
            <input
              type="radio"
              name="needsSampleProduction"
              value={2}
              checked={form.needsSampleProduction === 2}
              onChange={() =>
                setForm({
                  ...form,
                  needsSampleProduction: 2,
                })
              }
              className="hidden"
            />
            ندارد
          </label>
          <input
            type="text"
            name="notes"
            placeholder="ملاحظات ... "
            value={form.notes || ''}
            onChange={(e) => {
              setForm((p) => ({
                ...p,
                [e.target.name]: e.target.value,
              }));
            }}
            className="5xl:text-[25px] my-2 rounded-xl bg-white/10 p-3 text-[18px] text-white outline-none max-2xl:text-[14px]"
          />
        </div>
        <p className="my-2 border-b-2 border-white/30"></p>
        <div className="flex items-center gap-4 max-md:grid max-md:grid-cols-1 max-md:text-center">
          <p>
            با توجه به کنترل های انجام شده مطابق داده های به طراحی نقشه ها مورد
            تایید
          </p>
          <label
            className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 transition-all select-none max-2xl:text-[14px] ${
              form.drawingsApproved === 1
                ? 'border-green-600 text-white'
                : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
            } font-[SamimBold] text-[18px]`}
          >
            <input
              type="radio"
              name="drawingsApproved"
              checked={form.drawingsApproved === 1}
              onChange={() => {
                setForm((p) => ({
                  ...p,
                  drawingsApproved: 1,
                }));
              }}
              className="hidden"
            />
            می باشد
          </label>
          <label
            className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 transition-all select-none max-2xl:text-[14px] ${
              form.drawingsApproved === 2
                ? 'border-red-600 '
                : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
            } font-[SamimBold] text-[18px]`}
          >
            <input
              type="radio"
              name="drawingsApproved"
              checked={form.drawingsApproved === 2}
              onChange={() => {
                setForm((p) => ({
                  ...p,
                  drawingsApproved: 2,
                }));
              }}
              className="hidden"
            />
            نمی باشد
          </label>
        </div>
        <p className="my-2 border-t-2 border-white/30 py-2">
          کنترل های انجام شده
        </p>
        <div className="flex items-center justify-around space-y-5 max-md:grid max-md:grid-cols-1 max-md:text-center">
          <div className="flex items-center space-x-2 max-md:grid max-md:gap-3">
            <p className="5xl:text-[25px] max-2xl:text-[12px]">
              ران و ضخامت کف دیواره ها ( نقشه Layout )
            </p>
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.runAndWallThickness === 1
                  ? 'border-green-600 text-white'
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="runAndWallThickness"
                checked={form.runAndWallThickness === 1}
                onChange={() =>
                  setForm((p) => ({
                    ...p,
                    runAndWallThickness: 1,
                  }))
                }
                className="hidden"
              />
              OK
            </label>
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.runAndWallThickness === 2
                  ? 'border-red-600 '
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="runAndWallThickness"
                checked={form.runAndWallThickness === 2}
                onChange={() =>
                  setForm((p) => ({
                    ...p,
                    runAndWallThickness: 2,
                  }))
                }
                className="hidden"
              />
              N.Ok
            </label>
          </div>
          <div className="flex items-center space-x-2 max-md:grid max-md:gap-3">
            <p className="5xl:text-[25px] max-2xl:text-[12px]">
              فرمت اصلی بلنک
            </p>
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.blankMainFormat === 1
                  ? 'border-green-600 text-white'
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="blankMainFormat"
                checked={form.blankMainFormat === 1}
                onChange={() =>
                  setForm((p) => ({
                    ...p,
                    blankMainFormat: 1,
                  }))
                }
                className="hidden"
              />
              OK
            </label>
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.blankMainFormat === 2
                  ? 'border-red-600 '
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="blankMainFormat"
                checked={form.blankMainFormat === 2}
                onChange={() =>
                  setForm((p) => ({
                    ...p,
                    blankMainFormat: 2,
                  }))
                }
                className="hidden"
              />
              N.Ok
            </label>
          </div>
          <div className="flex items-center space-x-2 max-md:grid max-md:gap-3">
            <p className="5xl:text-[25px] max-2xl:text-[12px]">
              جداره بلنک و قالب و ناحیه گردن محصول
            </p>
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.blankMoldWallAndNeck === 1
                  ? 'border-green-600 text-white'
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="blankMoldWallAndNeck"
                checked={form.blankMoldWallAndNeck === 1}
                onChange={() =>
                  setForm((p) => ({
                    ...p,
                    blankMoldWallAndNeck: 1,
                  }))
                }
                className="hidden"
              />
              OK
            </label>
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.blankMoldWallAndNeck === 2
                  ? 'border-red-600 '
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="blankMoldWallAndNeck"
                checked={form.blankMoldWallAndNeck === 2}
                onChange={() =>
                  setForm((p) => ({
                    ...p,
                    blankMoldWallAndNeck: 2,
                  }))
                }
                className="hidden"
              />
              N.Ok
            </label>
          </div>
        </div>
        <div className="flex items-center justify-around space-y-5 max-md:grid max-md:grid-cols-1 max-md:text-center">
          <div className="flex items-center space-x-2 max-md:grid max-md:gap-3">
            <p className="5xl:text-[25px] max-2xl:text-[12px]">
              میزان shrinkage
            </p>
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.shrinkage === 1
                  ? 'border-green-600 text-white'
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="shrinkage"
                checked={form.shrinkage === 1}
                onChange={() =>
                  setForm((p) => ({
                    ...p,
                    shrinkage: 1,
                  }))
                }
                className="hidden"
              />
              OK
            </label>
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.shrinkage === 2
                  ? 'border-red-600 '
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="shrinkage"
                checked={form.shrinkage === 2}
                onChange={() =>
                  setForm((p) => ({
                    ...p,
                    shrinkage: 2,
                  }))
                }
                className="hidden"
              />
              N.Ok
            </label>
          </div>
          <div className="flex items-center space-x-2 max-md:grid max-md:gap-3">
            <p className="5xl:text-[25px] max-2xl:text-[12px]">
              انتخاب هلدر قالب و بلنک
            </p>
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.moldBlankHolderSelection === 1
                  ? 'border-green-600 text-white'
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="moldBlankHolderSelection"
                checked={form.moldBlankHolderSelection === 1}
                onChange={() =>
                  setForm((p) => ({
                    ...p,
                    moldBlankHolderSelection: 1,
                  }))
                }
                className="hidden"
              />
              OK
            </label>
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.moldBlankHolderSelection === 2
                  ? 'border-red-600 '
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="moldBlankHolderSelection"
                checked={form.moldBlankHolderSelection === 2}
                onChange={() =>
                  setForm((p) => ({
                    ...p,
                    moldBlankHolderSelection: 2,
                  }))
                }
                className="hidden"
              />
              N.Ok
            </label>
          </div>
          <div className="flex items-center space-x-2 max-md:grid max-md:gap-3">
            <p className="5xl:text-[25px] max-2xl:text-[12px]">
              فاصله پیچ آفست تا شیار هنگ
            </p>
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.offsetScrewToHangGroove === 1
                  ? 'border-green-600 text-white'
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="offsetScrewToHangGroove"
                checked={form.offsetScrewToHangGroove === 1}
                onChange={() =>
                  setForm((p) => ({
                    ...p,
                    offsetScrewToHangGroove: 1,
                  }))
                }
                className="hidden"
              />
              OK
            </label>
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.offsetScrewToHangGroove === 2
                  ? 'border-red-600 '
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="offsetScrewToHangGroove"
                checked={form.offsetScrewToHangGroove === 2}
                onChange={() =>
                  setForm((p) => ({
                    ...p,
                    offsetScrewToHangGroove: 2,
                  }))
                }
                className="hidden"
              />
              N.Ok
            </label>
          </div>
        </div>
        <div className="flex items-center justify-around space-y-5 max-md:grid max-md:grid-cols-1 max-md:text-center">
          <div className="flex items-center space-x-2 max-md:grid max-md:gap-3">
            <p className="5xl:text-[25px] max-2xl:text-[12px]">
              اینورت و H قالب
            </p>
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.invertAndMoldH === 1
                  ? 'border-green-600 text-white'
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="invertAndMoldH"
                checked={form.invertAndMoldH === 1}
                onChange={() =>
                  setForm((p) => ({
                    ...p,
                    invertAndMoldH: 1,
                  }))
                }
                className="hidden"
              />
              OK
            </label>
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.invertAndMoldH === 2
                  ? 'border-red-600 '
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="invertAndMoldH"
                checked={form.invertAndMoldH === 2}
                onChange={() =>
                  setForm((p) => ({
                    ...p,
                    invertAndMoldH: 2,
                  }))
                }
                className="hidden"
              />
              N.Ok
            </label>
          </div>
          <div className="flex items-center space-x-2 max-md:grid max-md:gap-3">
            <p className="5xl:text-[25px] max-2xl:text-[12px]">
              طراحی انبر برنجی بر اساس نوع دهانه محصول
            </p>
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.dimensionalControl === 1
                  ? 'border-green-600 text-white'
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="dimensionalControl"
                checked={form.dimensionalControl === 1}
                onChange={() =>
                  setForm((p) => ({
                    ...p,
                    dimensionalControl: 1,
                  }))
                }
                className="hidden"
              />
              OK
            </label>
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.dimensionalControl === 2
                  ? 'border-red-600 '
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="dimensionalControl"
                checked={form.dimensionalControl === 2}
                onChange={() =>
                  setForm((p) => ({
                    ...p,
                    dimensionalControl: 2,
                  }))
                }
                className="hidden"
              />
              N.Ok
            </label>
          </div>
          <div className="flex items-center space-x-2 max-md:grid max-md:gap-3">
            <p className="5xl:text-[25px] max-2xl:text-[12px]">کنترل ابعادی </p>
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.brassTongDesign === 1
                  ? 'border-green-600 text-white'
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="brassTongDesign"
                checked={form.brassTongDesign === 1}
                onChange={() =>
                  setForm((p) => ({
                    ...p,
                    brassTongDesign: 1,
                  }))
                }
                className="hidden"
              />
              OK
            </label>
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.brassTongDesign === 2
                  ? 'border-red-600 '
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="brassTongDesign"
                checked={form.brassTongDesign === 2}
                onChange={() =>
                  setForm((p) => ({
                    ...p,
                    brassTongDesign: 2,
                  }))
                }
                className="hidden"
              />
              N.Ok
            </label>
          </div>
        </div>
        <p className="my-2 border-t-2 border-white/30 py-2">
          شرح تغییرات و تکرار مجدد مراحل طراحی مورد نیاز :
        </p>
        <textarea
          name="changeDescriptionAndRework"
          placeholder="توضیحات ..."
          value={form?.changeDescriptionAndRework || ''}
          onChange={(e) => {
            setForm((p) => ({
              ...p,
              [e.target.name]: e.target.value,
            }));
          }}
          className="5xl:text-[25px] my-2 rounded-xl bg-white/10 p-3 text-white outline-none max-md:min-h-20"
        />
      </form>
      <div>
        <button
          type="submit"
          form="editMoldDarwing"
          className="5xl:text-[25px] w-full cursor-pointer rounded-xl bg-linear-to-tl from-green-900 to-green-500 px-4 py-3 font-[Samim] transition-all delay-100 duration-150 ease-in-out hover:scale-[1.01]"
        >
          ثبت فرم
        </button>
      </div>
    </div>
  );
}

export default EditMoldDarwingJsx;
