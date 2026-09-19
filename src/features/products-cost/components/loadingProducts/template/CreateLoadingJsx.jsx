import React from 'react';
import { IoCloseSharp } from 'react-icons/io5';

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
import TimePickerInput from '../../../../../Time/TimePickerInput';

function CreateLoadingJsx({
  closeHandler,
  form,
  setForm,
  submitHandler,
  product,
  searchProducts,
  setSearchProducts,
  getProducts,
  filterProducts,
  selectedProducts,
}) {
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files[0] || null,
    }));
  };

  const handleMultipleFileChange = (e) => {
    const { name, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: Array.from(files),
    }));
  };
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex shrink-0 items-center justify-between">
        <h1 className="5xl:text-[35px] pr-1.5 font-[SamimBold] text-[22px]">
          ایجاد گزارش بارگیری جدید
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
        id="loadingProducts"
        onSubmit={submitHandler}
        className="no-scrollbar flex min-h-0 flex-col overflow-x-hidden overflow-y-auto max-md:max-h-[70vh]"
      >
        <div className="grid grid-cols-4 gap-3 py-2 max-md:grid-cols-1">
          <label htmlFor="LoadingDate" className="flex flex-col">
            تاریخ بارگیری
            <DatePicker
              calendar={persian}
              locale={persian_fa}
              placeholder="تاریخ ثبت گزارش"
              format="YYYY/MM/DD"
              calendarPosition="bottom-center"
              onChange={(value) => {
                setForm({
                  ...form,
                  LoadingDate: value
                    ? value.toDate().toISOString().split('T')[0]
                    : '',
                });
              }}
              inputClass="input-date"
            />
          </label>
          <label htmlFor="OutputNumber">
            شماره خروجی
            <input
              type="number"
              name="OutputNumber"
              onChange={(e) => {
                setForm((p) => ({
                  ...p,
                  [e.target.name]: Number(e.target.value),
                }));
              }}
              className="input-number"
            />
          </label>
          <label htmlFor="VehicleNumber">
            شماره پلاک
            <input
              type="number"
              name="VehicleNumber"
              onChange={(e) => {
                setForm((p) => ({
                  ...p,
                  [e.target.name]: Number(e.target.value),
                }));
              }}
              className="input-number"
            />
          </label>
          <label htmlFor="PalletCount">
            تعداد پالت
            <input
              type="number"
              name="PalletCount"
              onChange={(e) => {
                setForm((p) => ({
                  ...p,
                  [e.target.name]: Number(e.target.value),
                }));
              }}
              className="input-number"
            />
          </label>
        </div>
        <div className="my-5 grid grid-cols-3 gap-5 max-md:grid-cols-1">
          <label htmlFor="productName" className="5xl:text-[30px]">
            نام محصول
            <Combobox
              value={selectedProducts}
              onChange={(value) => {
                setForm((prev) => ({
                  ...prev,
                  id: value?.id || '',
                  ProductName: value?.name || '',
                  ProductCode: value?.code || '',
                  UnitsPerPallet: value?.count || '',
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
                      {selectedProducts?.name || 'Product Selection'}
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
                              `cursor-pointer rounded-lg p-3 font-[AvenirLTProMedium] text-white ${
                                activ ? 'bg-black' : ''
                              } ${selected ? 'bg-black' : ''}`
                            }
                          >
                            {j.code} - {j.name}
                          </ComboboxOption>
                        ))
                      )}
                    </ComboboxOptions>
                  </div>
                </div>
              )}
            </Combobox>
          </label>
          <label htmlFor="ProductCode" className="5xl:text-[30px]">
            کدمحصول
            <input
              type="text"
              value={form?.ProductCode || ''}
              readOnly
              className="5xl:text-[25px] my-2 w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none max-2xl:text-[14px]"
            />
          </label>
          <label htmlFor="UnitsPerPallet" className="5xl:text-[30px]">
            تعداد در پالت
            <input
              type="text"
              value={form?.UnitsPerPallet || ''}
              readOnly
              className="5xl:text-[25px] my-2 w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none max-2xl:text-[14px]"
            />
          </label>
        </div>
        <div className="my-5 grid grid-cols-4 gap-5 max-md:grid-cols-1">
          <label htmlFor="Destination">
            مقصد
            <input
              type="text"
              name="Destination"
              onChange={(e) => {
                setForm((p) => ({
                  ...p,
                  [e.target.name]: e.target.value,
                }));
              }}
              className="input-text"
            />
          </label>
          <label htmlFor="LoadingStartTime">
            ساعت شروع بارگیری
            <TimePickerInput
              value={form.LoadingStartTime}
              onChange={(value) =>
                setForm((prev) => ({
                  ...prev,
                  LoadingStartTime: value,
                }))
              }
            />
          </label>
          <label htmlFor="LoadingEndTime">
            ساعت پایان بارگیری
            <TimePickerInput
              value={form.LoadingEndTime}
              onChange={(value) =>
                setForm((prev) => ({
                  ...prev,
                  LoadingEndTime: value,
                }))
              }
            />
          </label>
          <label htmlFor="ReferralCode ">
            شماره حواله
            <input
              type="number"
              name="ReferralCode"
              onChange={(e) => {
                setForm((p) => ({
                  ...p,
                  [e.target.name]: Number(e.target.value),
                }));
              }}
              className="input-number"
            />
          </label>
        </div>
        {/* images */}
        {/* <div className="my-5 grid grid-cols-3 gap-5">
          <label htmlFor="VehicleFrontImage">
            عکس از روبرو
            <input
              type="file"
              id="VehicleFrontImage"
              name="VehicleFrontImage"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
          </label>
          <label htmlFor="VehicleRightImage">
            عکس از سمت راست
            <input
              type="file"
              id="VehicleRightImage"
              name="VehicleRightImage"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
          </label>
          <label htmlFor="VehicleLeftImage">
            عکس از سمت چپ
            <input
              type="file"
              id="VehicleLeftImage"
              name="VehicleLeftImage"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
          </label>
          <label htmlFor="LabelImages">
            عکس لیبل
            <input
              type="file"
              id="VehicleLeftImage"
              name="VehicleLeftImage"
              accept="image/*"
              onChange={handleFileChange}
              className="my-2 w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
          </label>
        </div> */}
        <div className="grid grid-cols-3 gap-5 max-md:grid-cols-1">
          <p className="flex items-center text-[20px]">محصول سالم است؟</p>
          <label
            className={`flex cursor-pointer items-center justify-center rounded-xl border px-8 py-2 transition-all max-md:text-[14px] ${
              form.ProductNotBroken === true
                ? 'border-green-600 text-white'
                : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
            } font-[SamimBold] text-[18px]`}
          >
            <input
              type="radio"
              name="ProductNotBroken"
              value={true}
              checked={form.ProductNotBroken === true}
              onChange={() =>
                setForm({
                  ...form,
                  ProductNotBroken: true,
                })
              }
              className="hidden"
            />
            بله
          </label>
          <label
            className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 transition-all select-none max-2xl:text-[14px] ${
              form.ProductNotBroken === false
                ? 'border-red-600 text-white'
                : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
            } font-[SamimBold] text-[18px]`}
          >
            <input
              type="radio"
              name="ProductNotBroken"
              value={false}
              checked={form?.ProductNotBroken === false}
              onChange={() =>
                setForm({
                  ...form,
                  ProductNotBroken: false,
                })
              }
              className="hidden"
            />
            خیر
          </label>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-5 max-md:grid-cols-1">
          <p className="flex items-center text-[20px]">
            لیبل با محصول مطابقت دارد؟
          </p>
          <label
            className={`flex cursor-pointer items-center justify-center rounded-xl border px-8 py-2 transition-all max-md:text-[14px] ${
              form.LabelMatchesProduct === true
                ? 'border-green-600 text-white'
                : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
            } font-[SamimBold] text-[18px]`}
          >
            <input
              type="radio"
              name="LabelMatchesProduct "
              value={true}
              checked={form.LabelMatchesProduct === true}
              onChange={() =>
                setForm({
                  ...form,
                  LabelMatchesProduct: true,
                })
              }
              className="hidden"
            />
            بله
          </label>
          <label
            className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 transition-all select-none max-2xl:text-[14px] ${
              form.LabelMatchesProduct === false
                ? 'border-red-600 text-white'
                : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
            } font-[SamimBold] text-[18px]`}
          >
            <input
              type="radio"
              name="LabelMatchesProduct "
              value={false}
              checked={form?.LabelMatchesProduct === false}
              onChange={() =>
                setForm({
                  ...form,
                  LabelMatchesProduct: false,
                })
              }
              className="hidden"
            />
            خیر
          </label>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-5 max-md:grid-cols-1">
          <p className="flex items-center text-[20px]">
            سالم بودن پالت و تسمه ها
          </p>
          <label
            className={`flex cursor-pointer items-center justify-center rounded-xl border px-8 py-2 transition-all max-md:text-[14px] ${
              form.PalletPlasticAndStrapsHealthy === true
                ? 'border-green-600 text-white'
                : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
            } font-[SamimBold] text-[18px]`}
          >
            <input
              type="radio"
              name="PalletPlasticAndStrapsHealthy  "
              value={true}
              checked={form.PalletPlasticAndStrapsHealthy === true}
              onChange={() =>
                setForm({
                  ...form,
                  PalletPlasticAndStrapsHealthy: true,
                })
              }
              className="hidden"
            />
            بله
          </label>
          <label
            className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 transition-all select-none max-2xl:text-[14px] ${
              form.PalletPlasticAndStrapsHealthy === false
                ? 'border-red-600 text-white'
                : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
            } font-[SamimBold] text-[18px]`}
          >
            <input
              type="radio"
              name="PalletPlasticAndStrapsHealthy  "
              value={false}
              checked={form?.PalletPlasticAndStrapsHealthy === false}
              onChange={() =>
                setForm({
                  ...form,
                  PalletPlasticAndStrapsHealthy: false,
                })
              }
              className="hidden"
            />
            خیر
          </label>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-5 max-md:grid-cols-1">
          <p className="flex items-center text-[20px]">
            وسیله نقلیه چادر دارد؟
          </p>
          <label
            className={`flex cursor-pointer items-center justify-center rounded-xl border px-8 py-2 transition-all max-md:text-[14px] ${
              form.VehicleCoverAvailable === true
                ? 'border-green-600 text-white'
                : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
            } font-[SamimBold] text-[18px]`}
          >
            <input
              type="radio"
              name="VehicleCoverAvailable   "
              value={true}
              checked={form.VehicleCoverAvailable === true}
              onChange={() =>
                setForm({
                  ...form,
                  VehicleCoverAvailable: true,
                })
              }
              className="hidden"
            />
            بله
          </label>
          <label
            className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 transition-all select-none max-2xl:text-[14px] ${
              form.VehicleCoverAvailable === false
                ? 'border-red-600 text-white'
                : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
            } font-[SamimBold] text-[18px]`}
          >
            <input
              type="radio"
              name="VehicleCoverAvailable   "
              value={false}
              checked={form?.VehicleCoverAvailable === false}
              onChange={() =>
                setForm({
                  ...form,
                  VehicleCoverAvailable: false,
                })
              }
              className="hidden"
            />
            خیر
          </label>
        </div>
      </form>
      <div className="my-2 text-left">
        <button type="submit" form="loadingProducts" className="btn-submit">
          ثبت گزارش
        </button>
      </div>
    </div>
  );
}

export default CreateLoadingJsx;
