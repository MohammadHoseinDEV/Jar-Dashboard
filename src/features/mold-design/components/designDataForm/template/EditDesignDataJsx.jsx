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

function EditDesignDataJsx({
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
  selectedDesign,
}) {
  return (
    <>
      <div className="flex shrink-0 items-center justify-between">
        <p className="5xl:text-[30px] pr-1.5 font-[SamimBold] text-[20px] max-2xl:text-[15px]">
          <span> ویرایش محصول</span>
          <span className="pr-1 font-[AvenirLTProMedium]">
            {selectedDesign?.productName}
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
        id="designForms"
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
              inputClass="w-full rounded-xl  5xl:text-[25px] bg-white/10 p-3 my-2 font-[Samim] text-[18px] text-white outline-none"
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
              readOnly
              className="5xl:text-[25px] my-2 w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none max-2xl:text-[14px]"
            />
          </label>
          <label htmlFor="formNumber" className="5xl:text-[30px]">
            شماره فرم
            <input
              type="text"
              placeholder="شماره فرم"
              value={form.formNumber || ''}
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
        <div className="grid grid-cols-4 gap-4 max-md:grid-cols-1">
          <label
            htmlFor="manufacturingConstraints"
            className="5xl:text-[25px] max-2xl:text-[12px] max-md:text-[13px]"
          >
            محدودیت های ساخت با توجه به تجربیات قبلی
            <input
              type="text"
              name="manufacturingConstraints"
              value={form?.manufacturingConstraints || ''}
              placeholder="محدودیت های ساخت ..."
              className="5xl:text-[25px] my-2 w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none max-2xl:text-[14px] max-md:text-[13px]"
              onChange={(e) => {
                setForm((p) => ({
                  ...p,
                  [e.target.name]: e.target.value,
                }));
              }}
            />
          </label>
          <label
            htmlFor="productApplication"
            className="5xl:text-[25px] max-2xl:text-[14px] max-md:text-[13px]"
          >
            کاربرد محصول
            <input
              type="text"
              name="productApplication"
              value={form?.productApplication || ''}
              placeholder="کاربرد..."
              className="5xl:text-[25px] my-2 w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none max-2xl:text-[14px] max-md:text-[13px]"
              onChange={(e) => {
                setForm((p) => ({
                  ...p,
                  [e.target.name]: e.target.value,
                }));
              }}
            />
          </label>
          <label
            htmlFor="productApplicationConditions"
            className="5xl:text-[25px] max-2xl:text-[14px] max-md:text-[13px]"
          >
            شرایط کاربردی محصول
            <input
              type="text"
              name="productApplicationConditions"
              value={form?.productApplicationConditions || ''}
              placeholder="شرایط کاربردی ..."
              className="5xl:text-[25px] my-2 w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none max-2xl:text-[14px] max-md:text-[13px]"
              onChange={(e) => {
                setForm((p) => ({
                  ...p,
                  [e.target.name]: e.target.value,
                }));
              }}
            />
          </label>
          <label
            htmlFor="potentialFailureConsequences"
            className="5xl:text-[25px] max-2xl:text-[12px] max-md:text-[13px]"
          >
            پیامدهای احتمای شکست بنا به ماهیت محصول
            <input
              type="text"
              name="potentialFailureConsequences"
              value={form?.potentialFailureConsequences || ''}
              placeholder="پیامدهای احتمالی..."
              className="5xl:text-[25px] my-2 w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none max-2xl:text-[14px] max-md:text-[13px]"
              onChange={(e) => {
                setForm((p) => ({
                  ...p,
                  [e.target.name]: e.target.value,
                }));
              }}
            />
          </label>
          <label
            htmlFor="packagingAndWasteManagementRequirements"
            className="5xl:text-[21px] max-2xl:text-[11px] max-md:text-[11px]"
          >
            الزامات سازمان در خصوص بسته بندی و مدیریت پسماند
            <input
              type="text"
              name="packagingAndWasteManagementRequirements"
              value={form?.packagingAndWasteManagementRequirements || ''}
              placeholder="الزامات سازمان ..."
              className="5xl:text-[25px] my-2 w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none max-2xl:text-[14px]"
              onChange={(e) => {
                setForm((p) => ({
                  ...p,
                  [e.target.name]: e.target.value,
                }));
              }}
            />
          </label>
          <label
            htmlFor="energyManagementRequirements"
            className="5xl:text-[23px] max-2xl:text-[12px] max-md:text-[12px]"
          >
            الزاامات سازمانی در خصوص مدیریت مصرف انرژی
            <input
              type="text"
              name="energyManagementRequirements"
              value={form?.energyManagementRequirements || ''}
              placeholder="الزامات سازمان ..."
              className="5xl:text-[25px] my-2 w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none max-2xl:text-[14px] max-md:text-[13px]"
              onChange={(e) => {
                setForm((p) => ({
                  ...p,
                  [e.target.name]: e.target.value,
                }));
              }}
            />
          </label>

          <label
            htmlFor="otherRequirements"
            className="5xl:text-[25px] max-2xl:text-[12px] max-md:text-[13px]"
          >
            سایر موارد
            <input
              type="text"
              name="otherRequirements"
              value={form?.otherRequirements || ''}
              placeholder="سایرموارد ..."
              className="5xl:text-[25px] my-2 w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none max-2xl:text-[14px] max-md:text-[13px]"
              onChange={(e) => {
                setForm((p) => ({
                  ...p,
                  [e.target.name]: e.target.value,
                }));
              }}
            />
          </label>
        </div>
        <p className="my-2 border-b-2 border-white/30"></p>

        <div className="flex items-center space-x-5 max-md:grid max-md:grid-cols-1 max-md:gap-5">
          <p className="5xl:text-[30px] max-2xl:text-[12px] max-md:text-[13px]">
            با توجه به کنترل های زیر نمونه قابل تولید
          </p>
          <label
            className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 transition-all select-none max-2xl:text-[14px] ${
              form.isProductionFeasible === true
                ? 'border-green-600 text-white'
                : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
            } font-[SamimBold] text-[18px]`}
          >
            <input
              type="radio"
              name="isProductionFeasible"
              checked={form.isProductionFeasible === true}
              onChange={() =>
                setForm((prev) => ({
                  ...prev,
                  isProductionFeasible: true,
                }))
              }
              className="hidden"
            />
            می باشد
          </label>
          <label
            className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 transition-all select-none max-2xl:text-[14px] ${
              form.isProductionFeasible === false
                ? 'border-red-600 '
                : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
            } font-[SamimBold] text-[18px]`}
          >
            <input
              type="radio"
              name="isProductionFeasible"
              checked={form.isProductionFeasible === false}
              onChange={() =>
                setForm((prev) => ({
                  ...prev,
                  isProductionFeasible: false,
                }))
              }
              className="hidden"
            />
            نمی باشد
          </label>
          <label htmlFor="sampleCheckDate">
            <DatePicker
              calendar={persian}
              locale={persian_fa}
              placeholder="تاریخ"
              name="sampleCheckDate"
              format="YYYY/MM/DD"
              calendarPosition="bottom-center"
              onChange={(value) =>
                setForm({
                  ...form,
                  sampleCheckDate: value
                    ? value.toDate().toISOString().split('T')[0]
                    : '',
                })
              }
              value={form.sampleCheckDate ? new Date(form.sampleCheckDate) : ''}
              className="5xl:scale-125"
              inputClass="w-full rounded-xl max-2xl:text-[14px] 5xl:text-[25px]  bg-white/10 p-3 my-2 font-[Samim] text-[18px] text-white outline-none"
            />
          </label>
        </div>
        <p className="my-2 border-b-2 border-white/30"></p>
        <div className="grid grid-cols-4 space-y-5 max-md:grid-cols-1">
          <div className="flex items-center space-x-2 max-md:grid max-md:gap-3">
            <p className="5xl:text-[30px] max-2xl:text-[14px]">ابعادی</p>
            <label
              className={`5xl:text-[25px] 5xl:px-3 flex cursor-pointer items-center justify-center rounded-xl border px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.sampleDimensions === true
                  ? 'border-green-600 text-white'
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="sampleDimensions"
                checked={form.sampleDimensions === true}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    sampleDimensions: true,
                  }))
                }
                className="hidden"
              />
              OK
            </label>
            <label
              className={`5xl:text-[25px] 5xl:px-3 flex cursor-pointer items-center justify-center rounded-xl border px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.sampleDimensions === false
                  ? 'border-red-600 '
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="sampleDimensions"
                checked={form.sampleDimensions === false}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    sampleDimensions: false,
                  }))
                }
                className="hidden"
              />
              N.OK
            </label>
          </div>
          <div className="flex items-center space-x-2 max-md:grid max-md:gap-3">
            <p className="5xl:text-[30px] max-2xl:text-[14px]">وزن</p>
            <label
              className={`5xl:text-[25px] 5xl:px-3 flex cursor-pointer items-center justify-center rounded-xl border px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.sampleWeight === true
                  ? 'border-green-600 text-white'
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="sampleWeight"
                checked={form.sampleWeight === true}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    sampleWeight: true,
                  }))
                }
                className="hidden"
              />
              OK
            </label>
            <label
              className={`5xl:text-[25px] 5xl:px-3 flex cursor-pointer items-center justify-center rounded-xl border px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.sampleWeight === false
                  ? 'border-red-600 '
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="sampleWeight"
                checked={form.sampleWeight === false}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    sampleWeight: false,
                  }))
                }
                className="hidden"
              />
              N.OK
            </label>
          </div>
          <div className="flex items-center space-x-2 max-md:grid max-md:gap-3">
            <p className="5xl:text-[30px] max-2xl:text-[14px]">حجم</p>
            <label
              className={`5xl:text-[25px] 5xl:px-3 flex cursor-pointer items-center justify-center rounded-xl border px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.sampleVolume === true
                  ? 'border-green-600 text-white'
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="sampleVolume"
                checked={form.sampleVolume === true}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    sampleVolume: true,
                  }))
                }
                className="hidden"
              />
              OK
            </label>
            <label
              className={`5xl:text-[25px] 5xl:px-3 flex cursor-pointer items-center justify-center rounded-xl border px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.sampleVolume === false
                  ? 'border-red-600 '
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="sampleVolume"
                checked={form.sampleVolume === false}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    sampleVolume: false,
                  }))
                }
                className="hidden"
              />
              N.OK
            </label>
          </div>
          <div className="flex items-center space-x-2 max-md:grid max-md:gap-3">
            <p className="5xl:text-[30px] max-2xl:text-[12px]">
              درب بندی (پرینت 3 بعدی)
            </p>
            <label
              className={`5xl:text-[25px] 5xl:px-3 flex cursor-pointer items-center justify-center rounded-xl border px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.sampleCapping3DPrint === true
                  ? 'border-green-600 text-white'
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="sampleCapping3DPrint"
                checked={form.sampleCapping3DPrint === true}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    sampleCapping3DPrint: true,
                  }))
                }
                className="hidden"
              />
              OK
            </label>
            <label
              className={`5xl:text-[25px] 5xl:px-3 flex cursor-pointer items-center justify-center rounded-xl border px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.sampleCapping3DPrint === false
                  ? 'border-red-600 '
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="sampleCapping3DPrint"
                checked={form.sampleCapping3DPrint === false}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    sampleCapping3DPrint: false,
                  }))
                }
                className="hidden"
              />
              N.OK
            </label>
          </div>
          <div className="flex items-center space-x-2 max-md:grid max-md:gap-3">
            <p className="5xl:text-[30px] max-2xl:text-[14px]">
              ظاهری (پرینت 3 بعدی)
            </p>
            <label
              className={`5xl:px-3 5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.sampleAppearance3DPrint === true
                  ? 'border-green-600 text-white'
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="sampleAppearance3DPrint"
                checked={form.sampleAppearance3DPrint === true}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    sampleAppearance3DPrint: true,
                  }))
                }
                className="hidden"
              />
              OK
            </label>
            <label
              className={`5xl:px-3 5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.sampleAppearance3DPrint === false
                  ? 'border-red-600 '
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="sampleAppearance3DPrint"
                checked={form.sampleAppearance3DPrint === false}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    sampleAppearance3DPrint: false,
                  }))
                }
                className="hidden"
              />
              N.OK
            </label>
          </div>
          <div className="flex items-center space-x-2 max-md:grid max-md:gap-3">
            <p className="5xl:text-[30px] max-2xl:text-[12px]">ضخامت</p>
            <label
              className={`5xl:px-3 5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.sampleThickness === true
                  ? 'border-green-600 text-white'
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="sampleThickness"
                checked={form.sampleThickness === true}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    sampleThickness: true,
                  }))
                }
                className="hidden"
              />
              OK
            </label>
            <label
              className={`5xl:px-3 5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.sampleThickness === false
                  ? 'border-red-600 '
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="sampleThickness"
                checked={form.sampleThickness === false}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    sampleThickness: false,
                  }))
                }
                className="hidden"
              />
              N.OK
            </label>
          </div>
          <div className="flex items-center space-x-2 max-md:grid max-md:gap-3">
            <p className="5xl:text-[30px] max-2xl:text-[14px]">روش بسته بندی</p>
            <label
              className={`5xl:px-3 5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.samplePackagingMethod === true
                  ? 'border-green-600 text-white'
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="samplePackagingMethod"
                checked={form.samplePackagingMethod === true}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    samplePackagingMethod: true,
                  }))
                }
                className="hidden"
              />
              OK
            </label>
            <label
              className={`5xl:px-3 5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.samplePackagingMethod === false
                  ? 'border-red-600 '
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="samplePackagingMethod"
                checked={form.samplePackagingMethod === false}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    samplePackagingMethod: false,
                  }))
                }
                className="hidden"
              />
              N.OK
            </label>
          </div>
          <div className="flex items-center space-x-2 max-md:grid max-md:gap-3">
            <p className="5xl:text-[30px] max-2xl:text-[12px]">
              ویژگی های فیزیکی محصول
            </p>
            <label
              className={`5xl:px-3 5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.samplePhysicalProperties === true
                  ? 'border-green-600 text-white'
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="samplePhysicalProperties"
                checked={form.samplePhysicalProperties === true}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    samplePhysicalProperties: true,
                  }))
                }
                className="hidden"
              />
              OK
            </label>
            <label
              className={`5xl:px-3 5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.samplePhysicalProperties === false
                  ? 'border-red-600 '
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="samplePhysicalProperties"
                checked={form.samplePhysicalProperties === false}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    samplePhysicalProperties: false,
                  }))
                }
                className="hidden"
              />
              N.OK
            </label>
          </div>
        </div>
        <p className="my-2 border-b-2 border-white/30"></p>
        <div className="flex items-center space-x-5 max-md:flex-col">
          <label
            htmlFor="drawingNumber"
            className="5xl:text-[30px] max-2xl:text-[14px]"
          >
            شماره نقشه
            <input
              type="text"
              placeholder="شماره نقشه"
              name="drawingNumber"
              value={form?.drawingNumber || ''}
              onChange={(e) => {
                setForm((p) => ({
                  ...p,
                  [e.target.name]: e.target.value,
                }));
              }}
              className="my-2 w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none max-2xl:text-[14px]"
            />
          </label>
          <div className="flex items-center space-x-5 max-md:flex-col max-md:gap-2">
            <p className="5xl:text-[30px] max-2xl:text-[12px] max-md:text-[12px]">
              با توجه به کنترل های زیر نقشه و نمونه درتاریخ
            </p>
            <label htmlFor="drawingReviewDate">
              <DatePicker
                calendar={persian}
                locale={persian_fa}
                placeholder="تاریخ تایید نقشه و نمونه"
                format="YYYY/MM/DD"
                calendarPosition="bottom-center"
                onChange={(value) => {
                  setForm({
                    ...form,
                    drawingReviewDate: value
                      ? value.toDate().toISOString().split('T')[0]
                      : '',
                  });
                }}
                value={
                  form.drawingReviewDate ? new Date(form.drawingReviewDate) : ''
                }
                className="5xl:scale-125"
                inputClass="w-full rounded-xl max-2xl:text-[14px] 5xl:text-[25px]  bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
              />
            </label>
            <p className="5xl:text-[30px] max-2xl:text-[14px]">
              بررسی و مورد تایید
            </p>
            <label
              className={`5xl:text-[30px] flex cursor-pointer items-center justify-center rounded-xl border px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:m-auto max-md:w-full ${
                form.drawingApproved === true
                  ? 'border-green-600 text-white'
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="drawingApproved"
                checked={form.drawingApproved === true}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    drawingApproved: true,
                  }))
                }
                className="hidden"
              />
              می باشد
            </label>
            <label
              className={`5xl:text-[30px] flex cursor-pointer items-center justify-center rounded-xl border px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.drawingApproved === false
                  ? 'border-red-600 '
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="drawingApproved"
                checked={form.drawingApproved === false}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    drawingApproved: false,
                  }))
                }
                className="hidden"
              />
              نمی باشد
            </label>
          </div>
        </div>
        <p className="my-2 border-b-2 border-white/30"></p>
        <div className="grid grid-cols-4 space-y-5 max-md:grid-cols-1">
          <div className="flex items-center space-x-2 max-md:grid max-md:gap-2">
            <p className="5xl:text-[30px] max-2xl:text-[12px]">ابعادی</p>
            <label
              className={`5xl:px-3 5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.drawingDimensions === true
                  ? 'border-green-600 text-white'
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="drawingDimensions"
                checked={form.drawingDimensions === true}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    drawingDimensions: true,
                  }))
                }
                className="hidden"
              />
              OK
            </label>
            <label
              className={`5xl:px-3 5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.drawingDimensions === false
                  ? 'border-red-600 '
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="drawingDimensions"
                checked={form.drawingDimensions === false}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    drawingDimensions: false,
                  }))
                }
                className="hidden"
              />
              N.OK
            </label>
          </div>
          <div className="flex items-center space-x-2 max-md:grid max-md:gap-2">
            <p className="5xl:text-[30px] max-2xl:text-[12px]">وزن</p>
            <label
              className={`5xl:px-3 5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.drawingWeight === true
                  ? 'border-green-600 text-white'
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="drawingWeight"
                checked={form.drawingWeight === true}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    drawingWeight: true,
                  }))
                }
                className="hidden"
              />
              OK
            </label>
            <label
              className={`5xl:px-3 5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.drawingWeight === false
                  ? 'border-red-600 '
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="drawingWeight"
                checked={form.drawingWeight === false}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    drawingWeight: false,
                  }))
                }
                className="hidden"
              />
              N.OK
            </label>
          </div>
          <div className="flex items-center space-x-2 max-md:grid max-md:gap-2">
            <p className="5xl:text-[30px] max-2xl:text-[12px]">حجم</p>
            <label
              className={`5xl:px-3 5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.drawingVolume === true
                  ? 'border-green-600 text-white'
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="drawingVolume"
                checked={form.drawingVolume === true}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    drawingVolume: true,
                  }))
                }
                className="hidden"
              />
              OK
            </label>
            <label
              className={`5xl:px-3 5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.drawingVolume === false
                  ? 'border-red-600 '
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="drawingVolume"
                checked={form.drawingVolume === false}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    drawingVolume: false,
                  }))
                }
                className="hidden"
              />
              N.OK
            </label>
          </div>
          <div className="flex items-center space-x-2 max-md:grid max-md:gap-2">
            <p className="5xl:text-[30px] max-2xl:text-[12px]">تست شوک</p>
            <label
              className={`5xl:px-3 5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.drawingShockTest === true
                  ? 'border-green-600 text-white'
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="drawingShockTest"
                checked={form.drawingShockTest === true}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    drawingShockTest: true,
                  }))
                }
                className="hidden"
              />
              OK
            </label>
            <label
              className={`5xl:px-3 5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.drawingShockTest === false
                  ? 'border-red-600 '
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="drawingShockTest"
                checked={form.drawingShockTest === false}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    drawingShockTest: false,
                  }))
                }
                className="hidden"
              />
              N.OK
            </label>
          </div>
          <div className="flex items-center space-x-2 max-md:grid max-md:gap-2">
            <p className="5xl:text-[30px] max-2xl:text-[12px]">
              درب بندی (پرینت 3 بعدی)
            </p>
            <label
              className={`5xl:px-3 5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.drawingCapping3DPrint === true
                  ? 'border-green-600 text-white'
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="drawingCapping3DPrint"
                checked={form.drawingCapping3DPrint === true}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    drawingCapping3DPrint: true,
                  }))
                }
                className="hidden"
              />
              OK
            </label>
            <label
              className={`5xl:px-3 5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.drawingCapping3DPrint === false
                  ? 'border-red-600 '
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="drawingCapping3DPrint"
                checked={form.drawingCapping3DPrint === false}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    drawingCapping3DPrint: false,
                  }))
                }
                className="hidden"
              />
              N.OK
            </label>
          </div>

          <div className="flex items-center space-x-2 max-md:grid max-md:gap-2">
            <p className="5xl:text-[30px] max-2xl:text-[12px]">
              ظاهری (پرینت 3 بعدی)
            </p>
            <label
              className={`5xl:px-3 5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.drawingAppearance3DPrint === true
                  ? 'border-green-600 text-white'
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="drawingAppearance3DPrint"
                checked={form.drawingAppearance3DPrint === true}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    drawingAppearance3DPrint: true,
                  }))
                }
                className="hidden"
              />
              OK
            </label>
            <label
              className={`5xl:px-3 5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.drawingAppearance3DPrint === false
                  ? 'border-red-600 '
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="drawingAppearance3DPrint"
                checked={form.drawingAppearance3DPrint === false}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    drawingAppearance3DPrint: false,
                  }))
                }
                className="hidden"
              />
              N.OK
            </label>
          </div>
          <div className="flex items-center space-x-2 max-md:grid max-md:gap-2">
            <p className="5xl:text-[30px] max-2xl:text-[12px]">ضخامت</p>
            <label
              className={`5xl:px-3 5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.drawingThickness === true
                  ? 'border-green-600 text-white'
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="drawingThickness"
                checked={form.drawingThickness === true}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    drawingThickness: true,
                  }))
                }
                className="hidden"
              />
              OK
            </label>
            <label
              className={`5xl:px-3 5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.drawingThickness === false
                  ? 'border-red-600 '
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="drawingThickness"
                checked={form.drawingThickness === false}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    drawingThickness: false,
                  }))
                }
                className="hidden"
              />
              N.OK
            </label>
          </div>
          <div className="flex items-center space-x-2 max-md:grid max-md:gap-2">
            <p className="5xl:text-[30px] max-2xl:text-[12px]">تست فشار</p>
            <label
              className={`5xl:px-3 5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.drawingPressureTest === true
                  ? 'border-green-600 text-white'
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="drawingPressureTest"
                checked={form.drawingPressureTest === true}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    drawingPressureTest: true,
                  }))
                }
                className="hidden"
              />
              OK
            </label>
            <label
              className={`5xl:px-3 5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.drawingPressureTest === false
                  ? 'border-red-600 '
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="drawingPressureTest"
                checked={form.drawingPressureTest === false}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    drawingPressureTest: false,
                  }))
                }
                className="hidden"
              />
              N.OK
            </label>
          </div>
        </div>
        <p className="my-2 border-b-2 border-white/30"></p>
        <label
          htmlFor="drawingNotes"
          className="5xl:text-[30px] flex flex-col max-2xl:text-[14px]"
        >
          ملاحظات
          <textarea
            name="drawingNotes"
            value={form?.drawingNotes || ''}
            placeholder="توضیحات ..."
            className="5xl:text-[25px] my-2 rounded-xl bg-white/10 p-3 text-white outline-none max-2xl:text-[14px]"
            onChange={(e) => {
              setForm((p) => ({
                ...p,
                [e.target.name]: e.target.value,
              }));
            }}
          />
        </label>
      </form>
      <div>
        <button
          type="submit"
          form="designForms"
          className="5xl:text-[30px] w-full cursor-pointer rounded-xl bg-linear-to-tl from-green-900 to-green-500 px-4 py-3 font-[Samim] transition-all delay-100 duration-150 ease-in-out hover:scale-[1.01]"
        >
          ثبت گزارش
        </button>
      </div>
    </>
  );
}

export default EditDesignDataJsx;
