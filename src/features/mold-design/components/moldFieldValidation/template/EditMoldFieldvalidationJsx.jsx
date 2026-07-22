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

function EditMoldFieldvalidationJsx({
  selectedMold,
  closeHandler,
  form,
  setForm,
  product,
  submitHandler,
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
          <span> ویرایش محصول</span>
          <span className="pr-1 font-[AvenirLTProMedium]">
            {selectedMold?.productName}
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
        id="molds"
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
              value={form.formDate ? new Date(form.formDate) : ''}
              className="5xl:scale-125"
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
              readOnly
              className="5xl:text-[25px] my-2 w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none max-2xl:text-[14px]"
            />
          </label>
          <label htmlFor="moldCode" className="5xl:text-[30px]">
            کد قالب
            <input
              type="text"
              placeholder="کد قالب"
              name="moldCode"
              value={form?.moldCode || ''}
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
        <p className="my-2 border-t-2 border-white/30"></p>
        <div className="flex items-center space-x-1 max-md:grid max-md:grid-cols-1">
          <p className="5xl:text-[20px] max-2xl:text-[13px]">
            با توجه به نتایج صحه گذاری مطابق کنترل های زیر در تاریخ
          </p>
          <div>
            <DatePicker
              calendar={persian}
              locale={persian_fa}
              placeholder="تاریخ"
              name="validationDate"
              format="YYYY/MM/DD"
              calendarPosition="bottom-center"
              onChange={(value) =>
                setForm({
                  ...form,
                  validationDate: value
                    ? value.toDate().toISOString().split('T')[0]
                    : '',
                })
              }
              className="5xl:scale-125"
              value={form.validationDate ? new Date(form.validationDate) : ''}
              inputClass="w-full  rounded-xl 5xl:text-[25px] max-2xl:text-[14px]  bg-white/10 p-3 my-2 font-[Samim] text-[18px] text-white outline-none"
            />
          </div>
          <p className="5xl:text-[20px] max-2xl:text-[13px]">به تعداد</p>
          <div>
            <input
              type="text"
              name="quantity"
              value={form?.quantity || ''}
              placeholder="تعداد"
              className="5xl:text-[25px] my-2 w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none max-2xl:text-[14px] max-md:text-[13px]"
              onChange={(e) => {
                setForm((p) => ({
                  ...p,
                  [e.target.name]: e.target.value,
                }));
              }}
            />
          </div>
          <p className="5xl:text-[20px] max-2xl:text-[13px]">
            تولید صورت گرفت که نتیجه به شرح زیر می باشد :
          </p>
        </div>
        <p className="5xl:text-[30px] my-2 border-t-2 border-white/30 py-1">
          آیتم های کنترلی
        </p>
        <div className="grid grid-cols-4 gap-4 max-md:grid max-md:grid-cols-1">
          <div className="flex flex-col space-y-1">
            <p className="5xl:text-[25px]">وزن محصول</p>
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.productWeightOk === true
                  ? 'border-green-600 text-white'
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="productWeightOk"
                checked={form.productWeightOk === true}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    productWeightOk: true,
                  }))
                }
                className="hidden"
              />
              OK
            </label>
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.productWeightOk === false
                  ? 'border-red-600 '
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="productWeightOk"
                checked={form.productWeightOk === false}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    productWeightOk: false,
                  }))
                }
                className="hidden"
              />
              N.OK
            </label>
          </div>
          <div className="flex flex-col space-y-1">
            <p className="5xl:text-[25px]">بسته بندی محصول</p>
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.productPackagingOk === true
                  ? 'border-green-600 text-white'
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="productPackagingOk"
                checked={form.productPackagingOk === true}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    productPackagingOk: true,
                  }))
                }
                className="hidden"
              />
              OK
            </label>
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.productPackagingOk === false
                  ? 'border-red-600 '
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="productPackagingOk"
                checked={form.productPackagingOk === false}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    productPackagingOk: false,
                  }))
                }
                className="hidden"
              />
              N.OK
            </label>
          </div>
          <div className="flex flex-col space-y-1">
            <p className="5xl:text-[25px]">راندمان</p>
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.efficiencyOk === true
                  ? 'border-green-600 text-white'
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="efficiencyOk"
                checked={form.efficiencyOk === true}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    efficiencyOk: true,
                  }))
                }
                className="hidden"
              />
              OK
            </label>
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.efficiencyOk === false
                  ? 'border-red-600 '
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="efficiencyOk"
                checked={form.efficiencyOk === false}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    efficiencyOk: false,
                  }))
                }
                className="hidden"
              />
              N.OK
            </label>
          </div>
          <div className="flex flex-col space-y-1">
            <p className="5xl:text-[25px]">کیفیت محصول</p>
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.productQualityOk === true
                  ? 'border-green-600 text-white'
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="productQualityOk"
                checked={form.productQualityOk === true}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    productQualityOk: true,
                  }))
                }
                className="hidden"
              />
              OK
            </label>
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.productQualityOk === false
                  ? 'border-red-600 '
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="productQualityOk"
                checked={form.productQualityOk === false}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    productQualityOk: false,
                  }))
                }
                className="hidden"
              />
              N.OK
            </label>
          </div>
          <div className="flex flex-col space-y-1">
            <p className="5xl:text-[25px]">ابعاد محصول</p>
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.productDimensionsOk === true
                  ? 'border-green-600 text-white'
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="productDimensionsOk"
                checked={form.productDimensionsOk === true}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    productDimensionsOk: true,
                  }))
                }
                className="hidden"
              />
              OK
            </label>
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.productDimensionsOk === false
                  ? 'border-red-600 '
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="productDimensionsOk"
                checked={form.productDimensionsOk === false}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    productDimensionsOk: false,
                  }))
                }
                className="hidden"
              />
              N.OK
            </label>
          </div>
          <div className="flex flex-col space-y-1">
            <p className="5xl:text-[25px]">ارزیابی پسماند های بسته بندی</p>
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.packagingWasteAssessmentOk === true
                  ? 'border-green-600 text-white'
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="packagingWasteAssessmentOk"
                checked={form.packagingWasteAssessmentOk === true}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    packagingWasteAssessmentOk: true,
                  }))
                }
                className="hidden"
              />
              OK
            </label>
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.packagingWasteAssessmentOk === false
                  ? 'border-red-600 '
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="packagingWasteAssessmentOk"
                checked={form.packagingWasteAssessmentOk === false}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    packagingWasteAssessmentOk: false,
                  }))
                }
                className="hidden"
              />
              N.OK
            </label>
          </div>
          <div className="flex flex-col space-y-1">
            <p className="5xl:text-[25px]">ارزیابی مصرف انرژی</p>
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.energyConsumptionAssessmentOk === true
                  ? 'border-green-600 text-white'
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="energyConsumptionAssessmentOk"
                checked={form.energyConsumptionAssessmentOk === true}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    energyConsumptionAssessmentOk: true,
                  }))
                }
                className="hidden"
              />
              OK
            </label>
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.energyConsumptionAssessmentOk === false
                  ? 'border-red-600 '
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="energyConsumptionAssessmentOk"
                checked={form.energyConsumptionAssessmentOk === false}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    energyConsumptionAssessmentOk: false,
                  }))
                }
                className="hidden"
              />
              N.OK
            </label>
          </div>
        </div>
        <p className="my-2 border-t-2 border-white/30 py-1"></p>
        <div className="flex items-center space-x-1 max-md:grid max-md:grid-cols-1 max-md:space-y-2">
          <p className="5xl:text-[25px] max-md:pb-1 max-md:text-[14px]">
            نقشه های قالب و متعلقات مورد تایید
          </p>
          <p className="flex gap-2">
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.moldDrawingsAndAccessoriesApproved === true
                  ? 'border-green-600 text-white'
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="moldDrawingsAndAccessoriesApproved"
                checked={form.moldDrawingsAndAccessoriesApproved === true}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    moldDrawingsAndAccessoriesApproved: true,
                  }))
                }
                className="hidden"
              />
              می باشد
            </label>
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.moldDrawingsAndAccessoriesApproved === false
                  ? 'border-red-600 '
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="moldDrawingsAndAccessoriesApproved"
                checked={form.moldDrawingsAndAccessoriesApproved === false}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    moldDrawingsAndAccessoriesApproved: false,
                  }))
                }
                className="hidden"
              />
              نمی باشد
            </label>
          </p>
          <p className="5xl:text-[25px] max-md:pb-1 max-md:text-[14px]">
            دستوالعمل های راه اندازی و تولید مورد تایید
          </p>
          <p className="flex gap-2">
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.startupAndProductionInstructionsApproved === true
                  ? 'border-green-600 text-white'
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="startupAndProductionInstructionsApproved"
                checked={form.startupAndProductionInstructionsApproved === true}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    startupAndProductionInstructionsApproved: true,
                  }))
                }
                className="hidden"
              />
              می باشد
            </label>
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.startupAndProductionInstructionsApproved === false
                  ? 'border-red-600 '
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="startupAndProductionInstructionsApproved"
                checked={
                  form.startupAndProductionInstructionsApproved === false
                }
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    startupAndProductionInstructionsApproved: false,
                  }))
                }
                className="hidden"
              />
              نمی باشد
            </label>
          </p>
        </div>
        <p className="5xl:text-[30px] my-2 border-t-2 border-white/30 py-1 max-md:text-[14px]">
          ملاحظات (شرح تغییرات مورد نیاز به شرح ذیر می باشد) :
        </p>
        <div className="flex space-x-10 max-md:grid max-md:grid-cols-1 max-md:space-x-0">
          <div className="flex items-center gap-2 max-md:grid max-md:grid-cols-1">
            <p className="5xl:text-[25px]">شدت آلایندگی پسماند :</p>
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.wastePollutionHigh === true
                  ? 'border-green-600 text-white'
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="wastePollutionHigh"
                checked={form.wastePollutionHigh === true}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    wastePollutionHigh: true,
                  }))
                }
                className="hidden"
              />
              سطح 1
            </label>
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.wastePollutionHigh === false
                  ? 'border-red-600 '
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="wastePollutionHigh"
                checked={form.wastePollutionHigh === false}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    wastePollutionHigh: false,
                  }))
                }
                className="hidden"
              />
              سطح 3
            </label>
          </div>
          <div className="flex items-center gap-2 max-md:grid max-md:grid-cols-1">
            <p className="5xl:text-[25px]">شدت مصرف انرژی :</p>
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.energyConsumptionIntensity === 1
                  ? 'border-green-600 text-white'
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="energyConsumptionIntensity"
                checked={form.energyConsumptionIntensity === 1}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    energyConsumptionIntensity: 1,
                  }))
                }
                className="hidden"
              />
              کم مصرف
            </label>
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.energyConsumptionIntensity === 2
                  ? 'border-yellow-400 '
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="energyConsumptionIntensity"
                checked={form.energyConsumptionIntensity === 2}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    energyConsumptionIntensity: 2,
                  }))
                }
                className="hidden"
              />
              مصرف متوسط
            </label>
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.energyConsumptionIntensity === 3
                  ? 'border-red-600 '
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="energyConsumptionIntensity"
                checked={form.energyConsumptionIntensity === 3}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    energyConsumptionIntensity: 3,
                  }))
                }
                className="hidden"
              />
              پر مصرف
            </label>
          </div>
        </div>
      </form>
      <div className="flex items-center justify-end">
        <button
          type="submit"
          form="molds"
          className="5xl:text-[25px] cursor-pointer rounded-xl bg-linear-to-tl from-green-900 to-green-500 px-4 py-3 font-[Samim] transition-all delay-100 duration-150 ease-in-out hover:scale-[1.01]"
        >
          ثبت گزارش
        </button>
      </div>
    </div>
  );
}

export default EditMoldFieldvalidationJsx;
