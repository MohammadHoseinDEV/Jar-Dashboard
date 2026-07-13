import { useState } from 'react';
import close from '../../../../assets/images/close.png';

import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { useCreateProducts } from '../../Api/productsApi';

function AddProducts({ addProduct, setAddProuducts }) {
  const [form, setForm] = useState({
    productCode: '',
    productName: '',
    market: '',
    customer: '',
    brimfulCapacity: 0,
    weight: 0,
    diameter: 0,
    height: 0,
    color: '',
    finish: '',
    palletDimensionLength: 0,
    palletDimensionWidth: 0,
    palletDimensionHeight: 0,
    palletVolume: 0,
    palletTotalWeight: 0,
    palletBottlesWeight: 0,
    palletPackingWeight: 0,
    numberOfBottlesIn1Ton: 0,
    numberOfBottlesIn1M3: 0,
    numberOfBottlesInPallet: 0,
    numberOfLayers: 0,
    bottlesPerLayer: 0,
    typeOfArrangement: '',
    topLayerPosition: '',
    bottomLayerPosition: '',
    separatorLayer: '',
    openingBalance: 0,
    preparedBy: '',
    revisionNumber: '',
    preparedDate: '',
    approvedBy: '',
    packagingMaterials: [
      {
        materialName: '',
        materialType: '',
        quality: '',
        dimensions: '',
        quantity: 0,
        unit: '',
        description: '',
      },
    ],
  });

  const addPackagingMaterials = () => {
    setForm((prev) => ({
      ...prev,
      packagingMaterials: [
        ...(prev.packagingMaterials || []),
        {
          materialName: '',
          materialType: '',
          quality: '',
          dimensions: '',
          quantity: 0,
          unit: '',
          description: '',
        },
      ],
    }));
  };

  const removePackagingMaterials = (index) => {
    setForm((prev) => {
      const next = [...(prev.packagingMaterials || [])];
      next.splice(index, 1);
      if (next.length === 0) {
        next.push({
          materialName: '',
          materialType: '',
          quality: '',
          dimensions: '',
          quantity: 0,
          unit: '',
          description: '',
        });
      }
      return { ...prev, packagingMaterials: next };
    });
  };

  const closeHandler = () => {
    setAddProuducts(false);
  };

  const createProducts = useCreateProducts();

  const submitHandler = (e) => {
    e.preventDefault();

    createProducts.mutate(form, {
      onSuccess: () => {
        closeHandler();
      },
    });
  };

  const inputHandler = (e) => {
    const { name, value, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === 'number' ? (value === '' ? 0 : Number(value)) : value,
    }));
  };

  const packagingHandler = (e, index = 0) => {
    const { name, value, type } = e.target;

    setForm((prev) => {
      const updated = [...prev.packagingMaterials];

      updated[index] = {
        ...updated[index],
        [name]: type === 'number' ? (value === '' ? 0 : Number(value)) : value,
      };

      return {
        ...prev,
        packagingMaterials: updated,
      };
    });
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
          addProduct
            ? 'pointer-events-auto opacity-100 '
            : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
        <div
          className={`relative w-[350px] transform rounded-[15px] bg-linear-to-tl from-black to-gray-600 p-6 text-white shadow-2xl transition-all duration-300 ${
            addProduct
              ? 'translate-y-0 scale-100 opacity-100'
              : '-translate-y-10 scale-95 opacity-0'
          }`}
        >
          <div className="flex items-center justify-between">
            <h2 className="pr-1.5 pb-5 font-[SamimBold] text-[20px]">
              ایجاد شناسنامه محصول جدید
            </h2>
            <button
              onClick={closeHandler}
              className="cursor-pointer rounded-[10px] bg-white/80 p-1.5 text-[30px] text-red-500 transition-all delay-100 duration-75 ease-in-out hover:bg-black"
            >
              <img
                src={close}
                alt="close"
                width={25}
                className="transition-all delay-100 duration-100 ease-in-out hover:scale-110"
              />
            </button>
          </div>
          <form
            onSubmit={submitHandler}
            className="no-scrollbar mt-5 h-[500px] w-[300px] space-y-3 overflow-auto rounded-2xl border border-white/50 px-5 pt-5"
          >
            <span className="mb-3 p-1 font-[SamimBold] text-[20px]">
              اطلاعات پایه محصول
            </span>
            <input
              type="text"
              placeholder="کد محصول"
              name="productCode"
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <input
              type="text"
              placeholder="نام محصول"
              name="productName"
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <input
              type="text"
              placeholder="بازار هدف"
              name="market"
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <input
              type="text"
              placeholder="مشتری مرتبط با این محصول"
              name="customer"
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <span className="p-3 font-[SamimBold] text-[20px]">
              مشخصات فنی بطری
            </span>
            <input
              type="number"
              step="0.01"
              name="brimfulCapacity"
              placeholder="ظرفیت کامل بطری"
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <input
              type="number"
              step="0.01"
              placeholder="وزن بطری"
              name="weight"
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <input
              type="number"
              step="0.01"
              placeholder="قطر بطری"
              name="diameter"
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <input
              type="number"
              step="0.01"
              placeholder="ارتفاع بطری"
              name="height"
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <input
              type="text"
              placeholder="رنگ بطری"
              name="color"
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <input
              type="text"
              placeholder="نوع دهانه بطری"
              name="finish"
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <span className="col-span-4 p-3 font-[SamimBold] text-[20px]">
              مشخصات پالت
            </span>
            <input
              type="number"
              step="0.01"
              placeholder="طول پالت"
              name="palletDimensionLength"
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <input
              type="number"
              step="0.01"
              placeholder="عرض پالت"
              name="palletDimensionWidth"
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <input
              type="number"
              step="0.01"
              placeholder="ارتفاع پالت"
              name="palletDimensionHeight"
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <input
              type="number"
              step="0.01"
              placeholder="حجم پالت"
              name="palletVolume"
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <input
              type="number"
              step="0.01"
              placeholder="وزن کل پالت"
              name="palletTotalWeight"
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <input
              type="number"
              step="0.01"
              placeholder="وزن بطری‌ها"
              name="palletBottlesWeight"
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <input
              type="number"
              step="0.01"
              placeholder="وزن متریال بسته بندی"
              name="palletPackingWeight"
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <span className="p-3 font-[SamimBold] text-[16px]">
              اطلاعات چیدمان بطری روی پالت
            </span>
            <input
              type="number"
              step="0.01"
              placeholder="تعداد بطری در یک تن"
              name="numberOfBottlesIn1Ton"
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <input
              type="number"
              step="0.01"
              placeholder="تعداد بطری در یک متر مکعب"
              name="numberOfBottlesIn1M3"
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <input
              type="number"
              step="0.01"
              placeholder="تعداد بطری در هر پالت"
              name="numberOfBottlesInPallet"
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <input
              type="number"
              step="0.01"
              placeholder="تعداد لایه‌ها"
              name="numberOfLayers"
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <input
              type="number"
              step="0.01"
              placeholder="بطری در هر لایه"
              name="bottlesPerLayer"
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />

            <input
              type="text"
              placeholder="نوع چیدمان"
              name="typeOfArrangement"
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <input
              type="text"
              placeholder="وضعیت لایه بالا"
              name="topLayerPosition"
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <input
              type="text"
              placeholder="وضعیت لایه پایین"
              name="bottomLayerPosition"
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />

            <input
              type="text"
              placeholder="آیا بین لایه‌ها مقوا هست یا نه"
              name="separatorLayer"
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <span className="p-3 font-[SamimBold] text-[20px]">
              اطلاعات مالی / انبار
            </span>
            <input
              type="number"
              step="0.01"
              placeholder="موجودی اولیه محصول در انبار"
              name="openingBalance"
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />

            <span className="col-span-4 p-3 font-[SamimBold] text-[20px]">
              اطلاعات مستندسازی
            </span>
            <input
              type="text"
              placeholder="تهیه کننده"
              name="preparedBy"
              onChange={inputHandler}
              className="h-[52px] w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <input
              type="text"
              placeholder="شماره ریویژن"
              name="revisionNumber"
              onChange={inputHandler}
              className="h-[52px] w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <DatePicker
              calendar={persian}
              locale={persian_fa}
              format="YYYY/MM/DD"
              placeholder="تاریخ تهیه"
              onChange={(value) => {
                setForm((p) => ({
                  ...p,
                  preparedDate: value ? value.toDate().toISOString() : '',
                }));
              }}
              inputClass="w-[259px] h-[52px] rounded-xl  bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />

            <input
              type="text"
              placeholder="تایید کننده"
              name="approvedBy"
              onChange={inputHandler}
              className="h-[52px] w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <span className="p-3 font-[SamimBold] text-[20px]">
              مواد بسته‌بندی
            </span>
            <button
              type="button"
              onClick={addPackagingMaterials}
              className="w-fit cursor-pointer rounded-xl bg-linear-to-tl from-green-900 to-green-500 px-4 py-2 font-[Samim] transition-all delay-100 duration-150 ease-in-out hover:scale-105"
            >
              افزودن متریال
            </button>
            {(form.packagingMaterials || []).map((item, index) => (
              <div
                key={index}
                className="space-y-3 rounded-xl border border-white/20 p-3"
              >
                <input
                  type="text"
                  placeholder="نام متریال"
                  name="materialName"
                  value={item.materialName}
                  onChange={(e) => packagingHandler(e, index)}
                  className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
                />
                <input
                  type="text"
                  placeholder="نوع متریال"
                  name="materialType"
                  value={item.materialType}
                  onChange={(e) => packagingHandler(e, index)}
                  className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
                />
                <input
                  type="text"
                  placeholder="درجه کیفیت"
                  name="quality"
                  value={item.quality}
                  onChange={(e) => packagingHandler(e, index)}
                  className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
                />

                <input
                  type="text"
                  placeholder="ابعاد"
                  name="dimensions"
                  value={item.dimensions}
                  onChange={(e) => packagingHandler(e, index)}
                  className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
                />
                <input
                  type="number"
                  step="0.01"
                  placeholder="مقدار مصرف"
                  name="quantity"
                  value={item.quantity === 0 ? '' : item.quantity}
                  onChange={(e) => packagingHandler(e, index)}
                  className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
                />
                <input
                  type="text"
                  placeholder="واحد"
                  name="unit"
                  value={item.unit}
                  onChange={(e) => packagingHandler(e, index)}
                  className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
                />
                <input
                  type="text"
                  placeholder="توضیحات"
                  name="description"
                  value={item.description}
                  onChange={(e) => packagingHandler(e, index)}
                  className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
                />
                <div className="col-span-4 flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      removePackagingMaterials(index);
                    }}
                    className="cursor-pointer rounded-xl bg-linear-to-bl from-red-500 to-red-800 px-4 py-2 font-[Samim] transition-all delay-100 duration-150 ease-in-out hover:scale-105 hover:bg-red-500/60"
                  >
                    حذف متریال
                  </button>
                </div>
              </div>
            ))}
            <button
              type="submit"
              className="my-5 w-full cursor-pointer rounded-xl bg-linear-to-tl from-green-900 to-green-500 px-4 py-2 font-[Samim] transition-all delay-100 duration-150 ease-in-out hover:scale-105"
            >
              تایید
            </button>
          </form>
        </div>
      </div>
      ) : (
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
          addProduct
            ? 'pointer-events-auto opacity-100 '
            : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
        <div
          className={`relative w-[1600px] transform rounded-[15px] bg-linear-to-tl from-black to-gray-600 p-6 text-white shadow-2xl transition-all duration-300 ${
            addProduct
              ? 'translate-y-0 scale-100 opacity-100'
              : '-translate-y-10 scale-95 opacity-0'
          }`}
        >
          <div className="flex items-center justify-between">
            <h2 className="pr-1.5 pb-5 font-[SamimBold] text-[20px]">
              ایجاد شناسنامه محصول جدید
            </h2>
            <button
              onClick={closeHandler}
              className="cursor-pointer rounded-[10px] bg-white/80 p-1.5 text-[30px] text-red-500 transition-all delay-100 duration-75 ease-in-out hover:bg-black"
            >
              <img
                src={close}
                alt="close"
                width={25}
                className="transition-all delay-100 duration-100 ease-in-out hover:scale-110"
              />
            </button>
          </div>
          <form
            onSubmit={submitHandler}
            className="no-scrollbar mt-5 grid h-[700px] grid-cols-4 gap-3 overflow-auto rounded-2xl border border-white/50 px-5 pt-5"
          >
            <span className="col-span-4 mb-3 p-1 font-[SamimBold] text-[20px]">
              اطلاعات پایه محصول
            </span>
            <label htmlFor="productCode">
              کد محصول (Product Code)
              <input
                type="text"
                placeholder="79J4BmH1"
                name="productCode"
                onChange={inputHandler}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[AvenirLTProMedium] placeholder:text-white/30 focus:font-[AvenirLTProMedium]"
              />
            </label>
            <label htmlFor="productName">
              نام محصول (productName)
              <input
                type="text"
                placeholder="130cc Jar TO58"
                name="productName"
                onChange={inputHandler}
                className="w-full rounded-xl bg-white/10 p-3 text-right font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[AvenirLTProMedium] focus:font-[AvenirLTProMedium]"
                dir="ltr"
              />
            </label>
            <label htmlFor="market">
              بازار هدف (market)
              <input
                type="text"
                placeholder="market"
                name="market"
                onChange={inputHandler}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none"
              />
            </label>
            <label htmlFor="customer">
              مشتری مرتبط با این محصول (customer)
              <input
                type="text"
                placeholder="customer"
                name="customer"
                onChange={inputHandler}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none"
              />
            </label>
            <span className="col-span-4 p-3 font-[SamimBold] text-[20px]">
              مشخصات فنی بطری
            </span>
            <label htmlFor="brimfulCapacity">
              ظرفیت کامل بطری (brimfulCapacity)
              <input
                type="number"
                step="0.01"
                name="brimfulCapacity"
                placeholder="130"
                onChange={inputHandler}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[AvenirLTProMedium] focus:font-[AvenirLTProMedium]"
              />
            </label>
            <label htmlFor="weight">
              وزن بطری (weight)
              <input
                type="text"
                step="0.01"
                placeholder="120"
                name="weight"
                onChange={inputHandler}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[AvenirLTProMedium] focus:font-[AvenirLTProMedium]"
              />
            </label>
            <label htmlFor="diameter">
              قطر بطری (diameter)
              <input
                type="number"
                step="0.01"
                placeholder="57"
                name="diameter"
                onChange={inputHandler}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[AvenirLTProMedium] focus:font-[AvenirLTProMedium]"
              />
            </label>
            <label htmlFor="height">
              ارتفاع بطری (height)
              <input
                type="number"
                step="0.01"
                placeholder="80"
                name="height"
                onChange={inputHandler}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[AvenirLTProMedium] focus:font-[AvenirLTProMedium]"
              />
            </label>
            <label htmlFor="color">
              رنگ بطری (color)
              <input
                type="text"
                placeholder="flint"
                name="color"
                onChange={inputHandler}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[AvenirLTProMedium] focus:font-[AvenirLTProMedium]"
              />
            </label>
            <label htmlFor="finish">
              اندازه دهانه بطری (finish)
              <input
                type="text"
                placeholder="52.71"
                name="finish"
                onChange={inputHandler}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[AvenirLTProMedium] focus:font-[AvenirLTProMedium]"
              />
            </label>
            <span className="col-span-4 p-3 font-[SamimBold] text-[20px]">
              مشخصات پالت
            </span>
            <label htmlFor="palletDimensionLength">
              طول پالت (palletDimensionLength)
              <input
                type="number"
                step="0.01"
                placeholder="1210"
                name="palletDimensionLength"
                onChange={inputHandler}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[AvenirLTProMedium] focus:font-[AvenirLTProMedium]"
              />
            </label>
            <label htmlFor="palletDimensionWidth">
              عرض پالت (palletDimensionWidth)
              <input
                type="number"
                step="0.01"
                placeholder="1010"
                name="palletDimensionWidth"
                onChange={inputHandler}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[AvenirLTProMedium] focus:font-[AvenirLTProMedium]"
              />
            </label>
            <label htmlFor="palletDimensionHeight">
              ارتفاع پالت (palletDimensionHeight)
              <input
                type="number"
                step="0.01"
                placeholder="1725"
                name="palletDimensionHeight"
                onChange={inputHandler}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[AvenirLTProMedium] focus:font-[AvenirLTProMedium]"
              />
            </label>
            <label htmlFor="palletVolume">
              حجم پالت (palletVolume)
              <input
                type="number"
                step="0.001"
                placeholder="2.108"
                name="palletVolume"
                onChange={inputHandler}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[AvenirLTProMedium] focus:font-[AvenirLTProMedium]"
              />
            </label>
            <label htmlFor="palletTotalWeight">
              وزن کل پالت (palletTotalWeight)
              <input
                type="number"
                step="0.01"
                placeholder="970"
                name="palletTotalWeight"
                onChange={inputHandler}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[AvenirLTProMedium] focus:font-[AvenirLTProMedium]"
              />
            </label>
            <label htmlFor="palletBottlesWeight">
              وزن بطری ها (palletBottlesWeight)
              <input
                type="number"
                step="0.01"
                placeholder="935"
                name="palletBottlesWeight"
                onChange={inputHandler}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[AvenirLTProMedium] focus:font-[AvenirLTProMedium]"
              />
            </label>
            <label htmlFor="palletPackingWeight">
              وزن متریال بسته بندی (palletPackingWeight)
              <input
                type="number"
                step="0.01"
                placeholder="35"
                name="palletPackingWeight"
                onChange={inputHandler}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[AvenirLTProMedium] focus:font-[AvenirLTProMedium]"
              />
            </label>
            <span className="col-span-4 p-3 font-[SamimBold] text-[20px]">
              اطلاعات چیدمان بطری روی پالت
            </span>
            <label htmlFor="numberOfBottlesIn1Ton">
              تعداد بطری در یک تن (numberOfBottlesIn1Ton)
              <input
                type="number"
                step="0.01"
                placeholder="8075"
                name="numberOfBottlesIn1Ton"
                onChange={inputHandler}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[AvenirLTProMedium] focus:font-[AvenirLTProMedium]"
              />
            </label>
            <label
              htmlFor="numberOfBottlesIn1M3"
              className="pt-[3px] text-[15px]"
            >
              تعداد بطری در یک متر مکعب (numberOfBottlesIn1M3)
              <input
                type="number"
                step="0.01"
                placeholder="4920"
                name="numberOfBottlesIn1M3"
                onChange={inputHandler}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[AvenirLTProMedium] focus:font-[AvenirLTProMedium]"
              />
            </label>
            <label htmlFor="numberOfBottlesInPallet">
              تعداد بطری در هر پالت (numberOfBottlesInPallet)
              <input
                type="number"
                step="0.01"
                placeholder="7790"
                name="numberOfBottlesInPallet"
                onChange={inputHandler}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[AvenirLTProMedium] focus:font-[AvenirLTProMedium]"
              />
            </label>
            <label htmlFor="numberOfLayers">
              تعداد لایه ها (numberOfLayers)
              <input
                type="number"
                step="0.01"
                placeholder="19"
                name="numberOfLayers"
                onChange={inputHandler}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[AvenirLTProMedium] focus:font-[AvenirLTProMedium]"
              />
            </label>
            <label htmlFor="bottlesPerLayer">
              بطری در هر لایه (bottlesPerLayer)
              <input
                type="number"
                step="0.01"
                placeholder="410"
                name="bottlesPerLayer"
                onChange={inputHandler}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[AvenirLTProMedium] focus:font-[AvenirLTProMedium]"
              />
            </label>
            <label htmlFor="typeOfArrangement">
              نوع چیدمان (typeOfArrangement)
              <input
                type="text"
                placeholder="Wide side"
                name="typeOfArrangement"
                onChange={inputHandler}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[AvenirLTProMedium] focus:font-[AvenirLTProMedium]"
              />
            </label>
            <label htmlFor="topLayerPosition">
              وضعیت لایه بالا (topLayerPosition)
              <input
                type="text"
                placeholder="Top layer"
                name="topLayerPosition"
                onChange={inputHandler}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[AvenirLTProMedium] focus:font-[AvenirLTProMedium]"
              />
            </label>
            <label htmlFor="bottomLayerPosition">
              وضعیت لایه پایین (bottomLayerPosition)
              <input
                type="text"
                placeholder="bottom layer"
                name="bottomLayerPosition"
                onChange={inputHandler}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[AvenirLTProMedium] focus:font-[AvenirLTProMedium]"
              />
            </label>
            <label htmlFor="separatorLayer">
              لایه جدا کننده (separatorLayer)
              <input
                type="text"
                placeholder="Separator layer"
                name="separatorLayer"
                onChange={inputHandler}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[AvenirLTProMedium] focus:font-[AvenirLTProMedium]"
              />
            </label>
            <span className="col-span-4 p-3 font-[SamimBold] text-[20px]">
              اطلاعات مالی / انبار
            </span>
            <label htmlFor="openingBalance">
              موجودی اولیه محصول در انبار
              <input
                type="number"
                step="0.01"
                placeholder="1000"
                name="openingBalance"
                onChange={inputHandler}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[AvenirLTProMedium] focus:font-[AvenirLTProMedium]"
              />
            </label>
            <span className="col-span-4 p-3 font-[SamimBold] text-[20px]">
              اطلاعات مستندسازی
            </span>
            <label htmlFor="preparedBy">
              تهیه کننده (preparedBy)
              <input
                type="text"
                placeholder="FullName"
                name="preparedBy"
                onChange={inputHandler}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[AvenirLTProMedium] focus:font-[AvenirLTProMedium]"
              />
            </label>
            <label htmlFor="revisionNumber">
              شماره ریویژن (revisionNumber)
              <input
                type="text"
                placeholder="01"
                name="revisionNumber"
                onChange={inputHandler}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[AvenirLTProMedium] focus:font-[AvenirLTProMedium]"
              />
            </label>
            <label htmlFor="preparedDate" className="flex flex-col">
              تاریخ تهیه شناسنامه (preparedDate)
              <DatePicker
                calendar={persian}
                locale={persian_fa}
                format="YYYY/MM/DD"
                placeholder="1405/01/01"
                onChange={(value) => {
                  setForm((p) => ({
                    ...p,
                    preparedDate: value ? value.toDate().toISOString() : '',
                  }));
                }}
                inputClass="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[AvenirLTProMedium] focus:font-[AvenirLTProMedium]"
              />
            </label>
            <label htmlFor="approvedBy">
              تایید کننده (approvedBy)
              <input
                type="text"
                placeholder="FullName"
                name="approvedBy"
                onChange={inputHandler}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[AvenirLTProMedium] focus:font-[AvenirLTProMedium]"
              />
            </label>
            <span className="col-span-2 p-3 font-[SamimBold] text-[20px]">
              مواد بسته‌بندی
            </span>

            {(form.packagingMaterials || []).map((item, index) => (
              <div
                key={index}
                className="col-span-4 grid grid-cols-4 gap-3 rounded-xl border border-white/20 p-3"
              >
                <label htmlFor="materialName">
                  نام متریال (materialName)
                  <input
                    type="text"
                    placeholder="نام متریال"
                    name="materialName"
                    value={item.materialName}
                    onChange={(e) => packagingHandler(e, index)}
                    className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[SamimBold] focus:font-[AvenirLTProMedium]"
                  />
                </label>
                <label htmlFor="materialType">
                  نوع متریال (materialType)
                  <input
                    type="text"
                    placeholder="نوع متریال"
                    name="materialType"
                    value={item.materialType}
                    onChange={(e) => packagingHandler(e, index)}
                    className="w-full rounded-xl bg-white/10 p-3 text-right font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[SamimBold] focus:font-[AvenirLTProMedium]"
                    dir="ltr"
                  />
                </label>
                <label htmlFor="quality">
                  درجه کیفیت (quality)
                  <input
                    type="text"
                    placeholder="درجه کیفیت"
                    name="quality"
                    value={item.quality}
                    onChange={(e) => packagingHandler(e, index)}
                    className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[SamimBold] focus:font-[AvenirLTProMedium]"
                  />
                </label>

                <label htmlFor="dimensions">
                  ابعاد (dimensions)
                  <input
                    type="text"
                    placeholder="1000x1200x150"
                    name="dimensions"
                    value={item.dimensions}
                    onChange={(e) => packagingHandler(e, index)}
                    className="w-full rounded-xl bg-white/10 p-3 text-right font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[AvenirLTProMedium] focus:font-[AvenirLTProMedium]"
                    dir="ltr"
                  />
                </label>
                <label htmlFor="quantity">
                  مقدار مصرف (quantity)
                  <input
                    type="number"
                    step="0.01"
                    placeholder="1"
                    name="quantity"
                    value={item.quantity === 0 ? '' : item.quantity}
                    onChange={(e) => packagingHandler(e, index)}
                    className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[AvenirLTProMedium] focus:font-[AvenirLTProMedium]"
                  />
                </label>
                <label htmlFor="unit">
                  واحد (unit)
                  <input
                    type="text"
                    placeholder="pcs"
                    name="unit"
                    value={item.unit}
                    onChange={(e) => packagingHandler(e, index)}
                    className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[AvenirLTProMedium] focus:font-[AvenirLTProMedium]"
                  />
                </label>
                {/* <input
                    type="text"
                    placeholder="توضیحات"
                    name="description"
                    value={item.description}
                    onChange={(e) => packagingHandler(e, index)}
                    className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
                  /> */}
                <div className="col-span-4 flex items-center justify-end space-x-3">
                  <button
                    type="button"
                    onClick={addPackagingMaterials}
                    className="w-fit cursor-pointer rounded-xl bg-linear-to-tl from-green-900 to-green-500 px-4 py-2 font-[Samim] transition-all delay-100 duration-150 ease-in-out hover:scale-105"
                  >
                    افزودن متریال
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      removePackagingMaterials(index);
                    }}
                    className="cursor-pointer rounded-xl bg-linear-to-bl from-red-500 to-red-800 px-4 py-2 font-[Samim] transition-all delay-100 duration-150 ease-in-out hover:scale-105 hover:bg-red-500/60"
                  >
                    حذف متریال
                  </button>
                </div>
              </div>
            ))}
            <p></p>
            <button
              type="submit"
              className="col-span-4 mx-150 my-5 cursor-pointer rounded-xl bg-linear-to-tl from-green-900 to-green-500 px-4 py-2 font-[Samim] transition-all delay-100 duration-150 ease-in-out hover:scale-105"
            >
              تایید
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddProducts;
