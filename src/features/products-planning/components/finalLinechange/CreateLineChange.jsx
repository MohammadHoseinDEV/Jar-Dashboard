import React from 'react';
import { useMemo, useState } from 'react';

import close from '../../../../assets/images/close.png';

import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';

import TimePickerInput from '../../../../Time/TimePickerInput';
import { useGetProducts } from '../../../product_wareHouse/Api/productsApi';
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react';
import { useCreateLineChange } from '../../Api/planing';
import { toast } from 'react-toastify';

function CreateLineChange({ createForm, setCreateForm }) {
  const [searchProducts, setSearchProducts] = useState('');
  const [form, setForm] = useState({
    formDate: '',
    description: '',
    lineChangeDetails: [
      {
        lineNumber: '',
        currentProductName: '',
        currentProductCode: '',
        currentProductId: '',
        nextProductName: '',
        nextProductCode: '',
        nextProductId: '',
        averageProductionPerShift: 0,
        remainingProduction: 0,
        lineChangeDate: '',
        lineChangeTime: '',
        displayOrder: 0,
      },
    ],
  });

  const { data: getProduct } = useGetProducts();

  const createLine = useCreateLineChange();

  const updateLineChangeDetail = (index, field, value) => {
    setForm((prev) => {
      const details = prev.lineChangeDetails.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      );
      return { ...prev, lineChangeDetails: details };
    });
  };

  const addLineChangeDetail = () => {
    if (form.lineChangeDetails.length >= 3) {
      toast.warning('حداکثر 3 ردیف قابل اضافه کردن است.');
      return;
    }
    setForm((prev) => ({
      ...prev,
      lineChangeDetails: [
        ...(prev.lineChangeDetails || []),
        {
          lineNumber: '',
          currentProductName: '',
          currentProductCode: '',
          currentProductId: '',
          nextProductName: '',
          nextProductCode: '',
          nextProductId: '',
          averageProductionPerShift: 0,
          remainingProduction: 0,
          lineChangeDate: '',
          lineChangeTime: '',
          displayOrder: 0,
        },
      ],
    }));
  };

  const removeLineChangeDetail = (index) => {
    setForm((prev) => {
      const next = [...(prev.lineChangeDetails || [])];
      next.splice(index, 1);
      if (next.length === 0) {
        next.push({
          lineNumber: '',
          currentProductName: '',
          currentProductCode: '',
          currentProductId: '',
          nextProductName: '',
          nextProductCode: '',
          nextProductId: '',
          averageProductionPerShift: 0,
          remainingProduction: 0,
          lineChangeDate: '',
          lineChangeTime: '',
          displayOrder: 0,
        });
      }
      return { ...prev, lineChangeDetails: next };
    });
  };

  const closeHandler = () => {
    setCreateForm(false);
    setForm({
      formDate: '',
      description: '',
      lineChangeDetails: [
        {
          lineNumber: '',
          currentProductName: '',
          currentProductCode: '',
          currentProductId: '',
          nextProductName: '',
          nextProductCode: '',
          nextProductId: '',
          averageProductionPerShift: 0,
          remainingProduction: 0,
          lineChangeDate: '',
          lineChangeTime: '',
          displayOrder: 0,
        },
      ],
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    createLine.mutate(form, {
      onSuccess: () => {
        closeHandler();
      },
    });
  };

  const getProducts = useMemo(() => {
    const none = { id: '', name: '', code: '' };

    return [
      none,
      ...(getProduct ?? []).map((p) => ({
        id: p.id,
        name: p.productName,
        code: p.productCode,
      })),
    ];
  }, [getProduct]);

  const filterProducts = useMemo(() => {
    const q = searchProducts.trim().toLowerCase();
    if (!q) return getProducts;

    return getProducts?.filter((p) =>
      (p?.name || '').toLowerCase().includes(q)
    );
  }, [searchProducts, getProducts]);

  const getCurrentProductInfo = (productId) => {
    return getProducts.find((p) => p.id === productId) || getProducts[0];
  };

  const getNextProductInfo = (productId) => {
    return getProducts.find((p) => p.id === productId) || getProducts[0];
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
        createForm
          ? 'pointer-events-auto opacity-100'
          : 'pointer-events-none opacity-0'
      }`}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
      <div
        className={`relative w-[1500px] transform rounded-[15px] bg-linear-to-tl from-black to-gray-600 p-6 text-white shadow-2xl transition-all duration-300 ${
          createForm
            ? 'translate-y-0 scale-100 opacity-100'
            : '-translate-y-10 scale-95 opacity-0'
        }`}
      >
        <button
          onClick={closeHandler}
          className="float-left cursor-pointer rounded-[10px] bg-white/80 p-1.5 text-red-500 transition-all delay-100 duration-75 ease-in-out hover:bg-black"
        >
          <img src={close} alt="close" width={20} />
        </button>
        <form
          onSubmit={submitHandler}
          className="no-scrollbar grid max-h-180 grid-cols-4 gap-3 overflow-auto"
        >
          <DatePicker
            calendar={persian}
            locale={persian_fa}
            format="YYYY/MM/DD"
            placeholder="تاریخ ایجاد"
            onChange={(value) => {
              setForm((p) => ({
                ...p,
                formDate: value
                  ? value.toDate().toISOString().split('T')[0]
                  : '',
              }));
            }}
            inputClass="w-full rounded-xl mt-3 bg-white/10 col-span-2 p-3 font-[Samim] text-[18px] text-white outline-none"
          />
          <input
            type="text"
            placeholder="توضیحات"
            name="description"
            onChange={(event) => {
              setForm({
                ...form,
                [event.target.name]: event.target.value,
              });
            }}
            className="mt-3 w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
          />

          <button
            type="button"
            onClick={addLineChangeDetail}
            className="col-span-3 mt-5 ml-auto cursor-pointer rounded-xl bg-linear-to-tl from-green-900 to-green-500 px-4 py-2 font-[Samim] transition-all delay-100 duration-150 ease-in-out hover:scale-105"
          >
            افزودن خط تولید
          </button>
          <br />

          {form.lineChangeDetails.map((detail, index) => (
            <React.Fragment key={index}>
              <label>
                نام محصول فعلی
                <Combobox
                  value={getCurrentProductInfo(detail.currentProductId)}
                  onChange={(selectedProduct) => {
                    updateLineChangeDetail(
                      index,
                      'currentProductId',
                      selectedProduct?.id || ''
                    );

                    updateLineChangeDetail(
                      index,
                      'currentProductName',
                      selectedProduct?.name || ''
                    );
                    updateLineChangeDetail(
                      index,
                      'currentProductCode',
                      selectedProduct?.code || ''
                    );
                  }}
                >
                  {({ open }) => (
                    <div className="relative">
                      <ComboboxButton className="mt-3 flex w-full items-center justify-between rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[15px] text-white outline-none placeholder:font-[AvenirLTProMedium]">
                        <span
                          className={
                            detail.currentProductId
                              ? 'text-white'
                              : 'text-white/70'
                          }
                        >
                          {getCurrentProductInfo(detail.currentProductId)
                            ?.name || 'محصول فعلی...'}
                        </span>
                        <span className="text-white/70">
                          {open ? '▴' : '▾'}
                        </span>
                      </ComboboxButton>
                      <div
                        className={`absolute z-50 mt-2 w-full overflow-auto rounded-xl bg-black/95 shadow-lg ring-1 ring-white/10 ${open ? '' : 'hidden '}`}
                      >
                        <div className="border-b border-white/10 p-2">
                          <ComboboxInput
                            value={searchProducts}
                            onChange={(e) => setSearchProducts(e.target.value)}
                            placeholder="جستجو..."
                            className="w-full rounded-lg bg-white/10 p-2 font-[AvenirLTProMedium] text-white outline-none placeholder:text-white/50"
                          />
                        </div>
                        <ComboboxOptions
                          dir="ltr"
                          className="no-scrollbar max-h-60 overflow-auto p-1 font-[AvenirLTProMedium] text-[15px]"
                        >
                          {filterProducts.length === 0 ? (
                            <div className="p-3 text-white/70">
                              موردی پیدا نشد
                            </div>
                          ) : (
                            filterProducts?.map((p) => (
                              <ComboboxOption
                                key={p.id || 'null'}
                                value={p}
                                className={({ activ, selected }) =>
                                  `cursor-pointer rounded-lg p-3 text-white ${activ ? 'bg-black' : ''} ${selected ? 'bg-black' : ''}`
                                }
                              >
                                {p.name}
                              </ComboboxOption>
                            ))
                          )}
                        </ComboboxOptions>
                      </div>
                    </div>
                  )}
                </Combobox>
              </label>

              <label htmlFor="">
                کد محصول
                <input
                  type="text"
                  placeholder="کد محصول فعلی"
                  value={
                    getCurrentProductInfo(detail.currentProductId)?.code || ''
                  }
                  readOnly
                  className="mt-3 w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[15px] text-white outline-none placeholder:font-[Samim]"
                />
              </label>

              <label>
                نام محصول بعدی
                <Combobox
                  value={getNextProductInfo(detail.nextProductId)}
                  onChange={(selectedProduct) => {
                    updateLineChangeDetail(
                      index,
                      'nextProductId',
                      selectedProduct?.id || ''
                    );
                    updateLineChangeDetail(
                      index,
                      'nextProductName',
                      selectedProduct?.name || ''
                    );
                    updateLineChangeDetail(
                      index,
                      'nextProductCode',
                      selectedProduct?.code || ''
                    );
                  }}
                >
                  {({ open }) => (
                    <div className="relative">
                      <ComboboxButton className="mt-3 flex w-full items-center justify-between rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[15px] text-white outline-none">
                        <span
                          className={
                            detail.nextProductId
                              ? 'text-white'
                              : 'text-white/70'
                          }
                        >
                          {getNextProductInfo(detail.nextProductId)?.name ||
                            'محصول بعدی...'}
                        </span>
                        <span className="text-white/70">
                          {open ? '▴' : '▾'}
                        </span>
                      </ComboboxButton>
                      <div
                        className={`absolute z-50 mt-2 w-full overflow-auto rounded-xl bg-black/95 shadow-lg ring-1 ring-white/10 ${open ? '' : 'hidden '}`}
                      >
                        <div className="border-b border-white/10 p-2">
                          <ComboboxInput
                            value={searchProducts}
                            onChange={(e) => setSearchProducts(e.target.value)}
                            placeholder="جستجو..."
                            className="w-full rounded-lg bg-white/10 p-2 font-[Samim] text-white outline-none placeholder:text-white/50"
                          />
                        </div>
                        <ComboboxOptions className="no-scrollbar max-h-60 overflow-auto p-1">
                          {filterProducts.length === 0 ? (
                            <div className="p-3 text-white/70">
                              موردی پیدا نشد
                            </div>
                          ) : (
                            filterProducts?.map((p) => (
                              <ComboboxOption
                                key={p.id || 'null'}
                                value={p}
                                dir="ltr"
                                className={({ active, selected }) =>
                                  `cursor-pointer rounded-lg p-3 font-[AvenirLTProMedium] text-white ${active ? 'bg-black' : ''} ${selected ? 'bg-black' : ''}`
                                }
                              >
                                {p.name}
                              </ComboboxOption>
                            ))
                          )}
                        </ComboboxOptions>
                      </div>
                    </div>
                  )}
                </Combobox>
              </label>

              <label>
                کد محصول
                <input
                  type="text"
                  placeholder="کد محصول بعدی"
                  value={getNextProductInfo(detail.nextProductId)?.code || ''}
                  readOnly
                  className="mt-3 flex w-full items-center justify-between rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[15px] text-white outline-none placeholder:font-[Samim]"
                />
              </label>
              <label>
                شماره خط
                <input
                  type="text"
                  placeholder="شماره خط"
                  value={detail.lineNumber}
                  onChange={(e) =>
                    updateLineChangeDetail(index, 'lineNumber', e.target.value)
                  }
                  className="my-3 flex w-full items-center justify-between rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
                />
              </label>
              <label>
                میانگین تولید در هر شیفت
                <input
                  type="number"
                  value={detail.averageProductionPerShift}
                  onChange={(e) =>
                    updateLineChangeDetail(
                      index,
                      'averageProductionPerShift',
                      Number(e.target.value)
                    )
                  }
                  className="my-3 flex w-full items-center justify-between rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
                />
              </label>
              <label>
                مانده تولید
                <input
                  type="number"
                  value={detail.remainingProduction}
                  onChange={(e) =>
                    updateLineChangeDetail(
                      index,
                      'remainingProduction',
                      Number(e.target.value)
                    )
                  }
                  className="my-3 w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
                />
              </label>
              <label className="flex flex-col">
                تاریخ تعویض خط
                <DatePicker
                  calendar={persian}
                  locale={persian_fa}
                  format="YYYY/MM/DD"
                  placeholder="تاریخ تعویض خط"
                  value={
                    detail.lineChangeDate
                      ? new Date(detail.lineChangeDate)
                      : undefined
                  }
                  onChange={(value) => {
                    updateLineChangeDetail(
                      index,
                      'lineChangeDate',
                      value ? value.toDate().toISOString().split('T')[0] : ''
                    );
                  }}
                  inputClass="w-full rounded-xl my-3 bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
                />
              </label>
              <label>
                ساعت تعویض خط
                <TimePickerInput
                  value={detail.lineChangeTime}
                  minuteStep={1}
                  onChange={(timeValue) => {
                    updateLineChangeDetail(index, 'lineChangeTime', timeValue);
                  }}
                  className="py-3"
                />
              </label>

              {form.lineChangeDetails.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeLineChangeDetail(index)}
                  className="col-span-4 ml-auto cursor-pointer rounded-[10px] bg-red-500 p-2 text-right transition-all delay-100 duration-150 hover:bg-red-600"
                >
                  حذف خط تولید
                </button>
              )}
            </React.Fragment>
          ))}

          <div className="col-span-4 mt-6 text-center">
            <button
              type="submit"
              disabled={false}
              className="cursor-pointer rounded-xl bg-linear-to-tl from-green-900 to-green-500 px-4 py-2 font-[Samim] transition-all delay-100 duration-150 ease-in-out hover:scale-105"
            >
              ثبت اطلاعات
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateLineChange;
