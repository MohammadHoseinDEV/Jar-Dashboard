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

function CreateProductWeightStandardJsx({
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
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
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
        id="standardForm"
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
          <label htmlFor="formNumber" className="5xl:text-[30px]">
            نام شرکت
            <input
              type="text"
              placeholder="کاویان جار ساچی"
              value={form.companyName || ''}
              readOnly
              className="5xl:text-[25px] my-2 w-full rounded-xl bg-white/10 p-3 text-[18px] text-white outline-none max-2xl:text-[14px]"
            />
          </label>
        </div>
        <p className="my-2 border-t-2 border-white/30 py-2">وزن محصول </p>
        <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
          <label htmlFor="productWeightLine1">
            وزن محصول خط 1
            <input
              type="text"
              name="productWeightLine1"
              onChange={(e) => {
                setForm((p) => ({
                  ...p,
                  [e.target.name]: e.target.value,
                }));
              }}
              className="5xl:text-[25px] my-2 w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none max-2xl:text-[14px] max-md:text-[13px]"
            />
          </label>
          <label htmlFor="productWeightLine2">
            وزن محصول خط 2
            <input
              type="text"
              name="productWeightLine2"
              onChange={(e) => {
                setForm((p) => ({
                  ...p,
                  [e.target.name]: e.target.value,
                }));
              }}
              className="5xl:text-[25px] my-2 w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none max-2xl:text-[14px] max-md:text-[13px]"
            />
          </label>
          <label htmlFor="productWeightLine3">
            وزن محصول خط 3
            <input
              type="text"
              name="productWeightLine3"
              onChange={(e) => {
                setForm((p) => ({
                  ...p,
                  [e.target.name]: e.target.value,
                }));
              }}
              className="5xl:text-[25px] my-2 w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none max-2xl:text-[14px] max-md:text-[13px]"
            />
          </label>
        </div>
        <p className="my-2 border-t-2 border-white/30 py-2">تلرانس وزنی</p>
        <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
          <label htmlFor="weightToleranceLine1">
            تلرانس وزنی خط 1
            <input
              type="text"
              name="weightToleranceLine1"
              onChange={(e) => {
                setForm((p) => ({
                  ...p,
                  [e.target.name]: e.target.value,
                }));
              }}
              className="5xl:text-[25px] my-2 w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none max-2xl:text-[14px] max-md:text-[13px]"
            />
          </label>
          <label htmlFor="weightToleranceLine2">
            تلرانس وزنی خط 2
            <input
              type="text"
              name="weightToleranceLine2"
              onChange={(e) => {
                setForm((p) => ({
                  ...p,
                  [e.target.name]: e.target.value,
                }));
              }}
              className="5xl:text-[25px] my-2 w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none max-2xl:text-[14px] max-md:text-[13px]"
            />
          </label>
          <label htmlFor="weightToleranceLine3">
            تلرانس وزنی خط 3
            <input
              type="text"
              name="weightToleranceLine3"
              onChange={(e) => {
                setForm((p) => ({
                  ...p,
                  [e.target.name]: e.target.value,
                }));
              }}
              className="5xl:text-[25px] my-2 w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none max-2xl:text-[14px] max-md:text-[13px]"
            />
          </label>
        </div>
        <p className="my-2 border-t-2 border-white/30 py-2">
          خطوط توصیه شده با توجه به ملاحظات اقتصادی
        </p>
        <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
          <label htmlFor="recommendedLine1">
            ملاحظات خط 1
            <input
              type="text"
              name="recommendedLine1"
              onChange={(e) => {
                setForm((p) => ({
                  ...p,
                  [e.target.name]: e.target.value,
                }));
              }}
              className="5xl:text-[25px] my-2 w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none max-2xl:text-[14px] max-md:text-[13px]"
            />
          </label>
          <label htmlFor="recommendedLine2">
            ملاحظات خط 2
            <input
              type="text"
              name="recommendedLine2"
              onChange={(e) => {
                setForm((p) => ({
                  ...p,
                  [e.target.name]: e.target.value,
                }));
              }}
              className="5xl:text-[25px] my-2 w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none max-2xl:text-[14px] max-md:text-[13px]"
            />
          </label>
          <label htmlFor="recommendedLine3">
            ملاحظات خط 3
            <input
              type="text"
              name="recommendedLine3"
              onChange={(e) => {
                setForm((p) => ({
                  ...p,
                  [e.target.name]: e.target.value,
                }));
              }}
              className="5xl:text-[25px] my-2 w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none max-2xl:text-[14px] max-md:text-[13px]"
            />
          </label>
        </div>
        <p className="my-2 border-t-2 border-white/30 py-2">توضیحات</p>
        <label htmlFor="drawingNotes" className="5xl:text-[30px] flex flex-col">
          <textarea
            name="notes"
            placeholder="ملاحظات"
            onChange={(e) => {
              setForm((p) => ({
                ...p,
                [e.target.name]: e.target.value,
              }));
            }}
            className="5xl:text-[25px] my-2 rounded-xl bg-white/10 p-3 text-white outline-none"
          />
        </label>
      </form>

      <div>
        <button
          type="submit"
          form="standardForm"
          className="5xl:text-[25px] w-full cursor-pointer rounded-xl bg-linear-to-tl from-green-900 to-green-500 px-4 py-3 font-[Samim] transition-all delay-100 duration-150 ease-in-out hover:scale-[1.01]"
        >
          ثبت گزارش
        </button>
      </div>
    </div>
  );
}

export default CreateProductWeightStandardJsx;
