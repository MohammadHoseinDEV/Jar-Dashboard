import React, { useEffect } from 'react';

import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { IoCloseSharp } from 'react-icons/io5';
import { toShamsi } from '../../../../../Time/date';
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react';

function CreateTransferJsx({
  form,
  setForm,
  closeHandler,
  submitHandler,
  getCustomers,
  filterCustomer,
  selectedCustomer,
  searchCustomer,
  setSearchCustomer,
  getProduct,
  filterProduct,
  selectedProduct,
  setSearchproduct,
  searchProduct,
  profile,
}) {
  const getProfile = profile?.data?.fullName;

  useEffect(() => {
    if (profile?.data) {
      setForm((p) => ({
        ...p,
        createdBy: getProfile || 'نام ثبت کننده',
      }));
    }
  }, [profile]);

  return (
    <div>
      <div className="flex items-center justify-between pb-5">
        <h1 className="5xl:text-[35px] pr-1.5 font-[SamimBold] text-[22px]">
          حواله جدید
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
        id="sales"
        onSubmit={submitHandler}
        className="no-scrollbar flex min-h-90 flex-col overflow-x-hidden overflow-y-auto max-md:max-h-[70vh]"
      >
        <div className="grid grid-cols-2 gap-4 max-md:flex max-md:flex-col">
          <label
            htmlFor="transferDate"
            className="5xl:text-[30px] flex flex-col"
          >
            تاریخ ثبت حواله
            <DatePicker
              calendar={persian}
              locale={persian_fa}
              placeholder={toShamsi(new Date())}
              name="transferDate"
              format="YYYY/MM/DD"
              calendarPosition="bottom-center"
              onChange={(value) =>
                setForm({
                  ...form,
                  transferDate: value
                    ? value.toDate().toISOString().split('T')[0]
                    : '',
                })
              }
              className="5xl:scale-125"
              inputClass="input-date"
            />
          </label>
          <label
            htmlFor="transferCode"
            className="5xl:text-[30px] flex flex-col"
          >
            کد حواله
            <input
              type="text"
              placeholder="کد حواله"
              name="transferCode"
              className="input-number"
              onChange={(e) =>
                setForm((p) => ({
                  ...p,
                  [e.target.name]: e.target.value,
                }))
              }
            />
          </label>
          <label htmlFor="customerCode">
            کد مشتری - نام مشتری
            <Combobox
              value={selectedCustomer}
              onChange={(value) => {
                setForm((p) => ({
                  ...p,
                  customerId: value?.id || '',
                  customerName: value?.name || '',
                  customerCode: value?.code || '',
                }));
              }}
            >
              {({ open }) => (
                <div className="relative">
                  <ComboboxButton className="5xl:text-[25px] my-2 w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none max-2xl:text-[14px] max-md:text-[15px]">
                    <span
                      className={
                        selectedCustomer?.id ? 'text-white' : 'text-white/70'
                      }
                    >
                      {`${selectedCustomer?.code} - ${selectedCustomer?.name}` ||
                        'انتخاب مشتری...'}
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
                        value={searchCustomer}
                        onChange={(e) => setSearchCustomer(e.target.value)}
                        placeholder="جستجو..."
                        className="w-full rounded-lg bg-white/10 p-2 font-[Samim] text-white outline-none placeholder:text-white/50"
                      />
                    </div>
                    <ComboboxOptions className="no-scrollbar max-h-50 overflow-auto">
                      {filterCustomer.length === 0 ? (
                        <div className="p-3 text-white/70">موردی پیدا نشد</div>
                      ) : (
                        filterCustomer?.map((c) => (
                          <ComboboxOption
                            key={c.id || 'null'}
                            value={c}
                            className={({ activ, selected }) =>
                              `cursor-pointer space-x-1 rounded-lg p-3 text-white ${
                                activ ? 'bg-black' : ''
                              } ${selected ? 'bg-black' : ''}`
                            }
                          >
                            <span className="font-[AvenirLTProBook]">
                              {c.code}
                            </span>
                            <span>-</span>
                            <span>{c.name}</span>
                          </ComboboxOption>
                        ))
                      )}
                    </ComboboxOptions>
                  </div>
                </div>
              )}
            </Combobox>
          </label>
          <label htmlFor="productCode">
            کد محصول - نام محصول
            <Combobox
              value={selectedProduct}
              onChange={(value) => {
                setForm((p) => ({
                  ...p,
                  productId: value?.id || '',
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
                        selectedProduct?.id
                          ? 'font-[AvenirLTProHeavy] text-white'
                          : 'text-white/70'
                      }
                    >
                      {`${selectedProduct?.name} - ${selectedProduct?.code} ` ||
                        'انتخاب مشتری...'}
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
                        value={searchProduct}
                        onChange={(e) => setSearchproduct(e.target.value)}
                        placeholder="جستجو..."
                        className="w-full rounded-lg bg-white/10 p-2 font-[Samim] text-white outline-none placeholder:text-white/50"
                      />
                    </div>
                    <ComboboxOptions className="no-scrollbar max-h-50 overflow-auto">
                      {filterProduct.length === 0 ? (
                        <div className="p-3 text-white/70">موردی پیدا نشد</div>
                      ) : (
                        filterProduct?.map((c) => (
                          <ComboboxOption
                            key={c.id || 'null'}
                            value={c}
                            className={({ activ, selected }) =>
                              `cursor-pointer space-x-1 rounded-lg p-3 text-white ${
                                activ ? 'bg-black' : ''
                              } ${selected ? 'bg-black' : ''}`
                            }
                          >
                            <span className="font-[AvenirLTProBook]">
                              {c.code}
                            </span>
                            <span>-</span>
                            <span>{c.name}</span>
                          </ComboboxOption>
                        ))
                      )}
                    </ComboboxOptions>
                  </div>
                </div>
              )}
            </Combobox>
          </label>
          <label htmlFor="quantity">
            تعداد محصول
            <input
              type="number"
              placeholder="10"
              name="quantity"
              onChange={(value) => {
                setForm((e) => ({
                  ...e,
                  [value.target.name]: Number(value.target.value),
                }));
              }}
              className="input-number"
            />
          </label>
          <label htmlFor="transferType">
            نوع حواله
            <select
              name="transferType"
              className="input-text"
              onChange={(value) => {
                setForm((e) => ({
                  ...e,
                  [value.target.name]: value.target.value,
                }));
              }}
            >
              <option value="" className="bg-neutral-900">
                نوع حواله
              </option>
              <option value="0" className="bg-neutral-900">
                حواله داخلی
              </option>
              <option value="1" className="bg-neutral-900">
                حواله صادرات
              </option>
            </select>
          </label>
          <label htmlFor="notes">
            توضیحات
            <textarea
              name="notes"
              className="input-text"
              onChange={(value) => {
                setForm((e) => ({
                  ...e,
                  [value.target.name]: value.target.value,
                }));
              }}
            />
          </label>
          <label htmlFor="createdBy">
            ثبت کننده
            <input
              type="text"
              value={form?.createdBy || ''}
              readOnly
              className="input-text"
            />
          </label>
        </div>
      </form>
      <div className="flex justify-end">
        <button type="submit" form="sales" className="btn-submit">
          تایید
        </button>
      </div>
    </div>
  );
}

export default CreateTransferJsx;
