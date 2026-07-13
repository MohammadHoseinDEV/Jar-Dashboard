import close from '../../../../assets/images/close.png';

import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { useEffect, useState } from 'react';
import { useEditProducts } from '../../Api/productsApi';

function EditProducts({
  openEditProducts,
  setOpenEditProducts,
  seledtedProducts,
  setSelectedProducts,
}) {
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

  useEffect(() => {
    if (!seledtedProducts) return;
    setForm({
      productName: seledtedProducts?.productName ?? '',
      market: seledtedProducts?.market ?? '',
      customer: seledtedProducts?.customer ?? '',
      brimfulCapacity: seledtedProducts?.brimfulCapacity ?? 0,
      weight: seledtedProducts?.weight ?? 0,
      diameter: seledtedProducts?.diameter ?? 0,
      height: seledtedProducts?.height ?? 0,
      color: seledtedProducts?.color ?? '',
      finish: seledtedProducts?.finish ?? '',
      palletDimensionLength: seledtedProducts?.palletDimensionLength ?? 0,
      palletDimensionWidth: seledtedProducts?.palletDimensionWidth ?? 0,
      palletDimensionHeight: seledtedProducts?.palletDimensionHeight ?? 0,
      palletVolume: seledtedProducts?.palletVolume ?? 0,
      palletTotalWeight: seledtedProducts?.palletTotalWeight ?? 0,
      palletBottlesWeight: seledtedProducts?.palletBottlesWeight ?? 0,
      palletPackingWeight: seledtedProducts?.palletPackingWeight ?? 0,
      numberOfBottlesIn1Ton: seledtedProducts?.numberOfBottlesIn1Ton ?? 0,
      numberOfBottlesIn1M3: seledtedProducts?.numberOfBottlesIn1M3 ?? 0,
      numberOfBottlesInPallet: seledtedProducts?.numberOfBottlesInPallet ?? 0,
      numberOfLayers: seledtedProducts?.numberOfLayers ?? 0,
      bottlesPerLayer: seledtedProducts?.bottlesPerLayer ?? 0,
      typeOfArrangement: seledtedProducts?.typeOfArrangement ?? '',
      topLayerPosition: seledtedProducts?.topLayerPosition ?? '',
      bottomLayerPosition: seledtedProducts?.bottomLayerPosition ?? '',
      separatorLayer: seledtedProducts?.separatorLayer ?? '',
      openingBalance: seledtedProducts?.openingBalance ?? 0,
      preparedBy: seledtedProducts?.preparedBy ?? '',
      revisionNumber: seledtedProducts?.revisionNumber ?? '',
      preparedDate: seledtedProducts?.preparedDate ?? '',
      approvedBy: seledtedProducts?.approvedBy ?? '',
      packagingMaterials: seledtedProducts?.packagingMaterials?.length
        ? seledtedProducts.packagingMaterials.map((x) => ({
            id: x?.id,
            materialName: x?.materialName ?? '',
            materialType: x?.materialType ?? '',
            quality: x?.quality ?? '',
            dimensions: x?.dimensions ?? '',
            quantity: x?.quantity ?? 0,
            unit: x?.unit ?? '',
            description: x?.description ?? '',
          }))
        : [
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
  }, [openEditProducts]);

  const closeHandler = () => {
    setOpenEditProducts(false);
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

  const editProducts = useEditProducts();

  const editHandler = (e) => {
    e.preventDefault();
    if (!seledtedProducts?.id) return;

    editProducts.mutate(
      {
        id: seledtedProducts.id,
        data: { ...form, id: seledtedProducts.id },
      },
      {
        onSuccess: () => {
          closeHandler();
          setSelectedProducts(null);
        },
      }
    );
  };

  return (
    <div>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
          openEditProducts
            ? 'pointer-events-auto opacity-100 '
            : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
        <div
          className={`relative w-full transform rounded-[15px] bg-linear-to-tl from-black to-gray-600 p-6 text-white shadow-2xl transition-all duration-300 ${
            openEditProducts
              ? 'translate-y-0 scale-100 opacity-100'
              : '-translate-y-10 scale-95 opacity-0'
          }`}
        >
          <div className="flex items-center justify-between pb-5">
            <h2 className="font-[SamimBold] text-[20px]">
              ویرایش شناسنامه محصول
            </h2>
            <button
              onClick={closeHandler}
              className="cursor-pointer rounded-[10px] bg-white/80 p-1.5 text-[30px] text-red-500 transition-all delay-100 duration-75 ease-in-out hover:bg-black"
            >
              <img
                src={close}
                alt="close"
                width={20}
                className="transition-all delay-100 duration-100 ease-in-out hover:scale-110"
              />
            </button>
          </div>
          <form
            onSubmit={editHandler}
            className="no-scrollbar mt-5 h-[500px] gap-3 space-y-4 overflow-auto rounded-2xl border border-white/50 px-5 pt-5"
          >
            <span className="mb-3 p-1 font-[SamimBold] text-[20px]">
              اطلاعات پایه محصول
            </span>
            <input
              type="text"
              placeholder="کد محصول"
              name="productCode"
              value={form.productCode}
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <input
              type="text"
              placeholder="نام محصول"
              name="productName"
              value={form.productName}
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <input
              type="text"
              placeholder="بازار هدف"
              name="market"
              value={form.market}
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <input
              type="text"
              placeholder="مشتری مرتبط با این محصول"
              name="customer"
              value={form.customer}
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <span className="col-span-4 p-3 font-[SamimBold] text-[20px]">
              مشخصات فنی بطری
            </span>
            <input
              type="number"
              step="0.01"
              name="brimfulCapacity"
              value={form.brimfulCapacity}
              placeholder="ظرفیت کامل بطری"
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <input
              type="number"
              step="0.01"
              placeholder="وزن بطری"
              name="weight"
              value={form.weight}
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <input
              type="number"
              step="0.01"
              placeholder="قطر بطری"
              name="diameter"
              value={form.diameter}
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <input
              type="number"
              step="0.01"
              placeholder="ارتفاع بطری"
              name="height"
              value={form.height}
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <input
              type="text"
              placeholder="رنگ بطری"
              name="color"
              value={form.color}
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <input
              type="text"
              placeholder="نوع دهانه بطری"
              name="finish"
              value={form.finish}
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
              value={form.palletDimensionLength}
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <input
              type="number"
              step="0.01"
              placeholder="عرض پالت"
              name="palletDimensionWidth"
              value={form.palletDimensionWidth}
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <input
              type="number"
              step="0.01"
              placeholder="ارتفاع پالت"
              name="palletDimensionHeight"
              value={form.palletDimensionHeight}
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <input
              type="number"
              step="0.01"
              placeholder="حجم پالت"
              name="palletVolume"
              value={form.palletVolume}
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <input
              type="number"
              step="0.01"
              placeholder="وزن کل پالت"
              name="palletTotalWeight"
              value={form.palletTotalWeight}
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <input
              type="number"
              step="0.01"
              placeholder="وزن بطری‌ها"
              name="palletBottlesWeight"
              value={form.palletBottlesWeight}
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <input
              type="number"
              step="0.01"
              placeholder="وزن متریال بسته بندی"
              name="palletPackingWeight"
              value={form.palletPackingWeight}
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <span className="p-3 font-[SamimBold] text-[18px]">
              اطلاعات چیدمان بطری روی پالت
            </span>
            <input
              type="number"
              step="0.01"
              placeholder="تعداد بطری در یک تن"
              name="numberOfBottlesIn1Ton"
              value={form.numberOfBottlesIn1Ton}
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <input
              type="number"
              step="0.01"
              placeholder="تعداد بطری در یک متر مکعب"
              name="numberOfBottlesIn1M3"
              value={form.numberOfBottlesIn1M3}
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <input
              type="number"
              step="0.01"
              placeholder="تعداد بطری در هر پالت"
              name="numberOfBottlesInPallet"
              value={form.numberOfBottlesInPallet}
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <input
              type="number"
              step="0.01"
              placeholder="تعداد لایه‌ها"
              name="numberOfLayers"
              value={form.numberOfLayers}
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <input
              type="number"
              step="0.01"
              placeholder="بطری در هر لایه"
              name="bottlesPerLayer"
              value={form.bottlesPerLayer}
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />

            <input
              type="text"
              placeholder="نوع چیدمان"
              name="typeOfArrangement"
              value={form.typeOfArrangement}
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <input
              type="text"
              placeholder="وضعیت لایه بالا"
              name="topLayerPosition"
              value={form.topLayerPosition}
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <input
              type="text"
              placeholder="وضعیت لایه پایین"
              name="bottomLayerPosition"
              value={form.bottomLayerPosition}
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />

            <input
              type="text"
              placeholder="آیا بین لایه‌ها مقوا هست یا نه"
              name="separatorLayer"
              value={form.separatorLayer}
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <span className="col-span-4 p-3 font-[SamimBold] text-[20px]">
              اطلاعات مالی / انبار
            </span>
            <input
              type="number"
              step="0.01"
              placeholder="موجودی اولیه محصول در انبار"
              name="openingBalance"
              value={form.openingBalance}
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
              value={form.preparedBy}
              onChange={inputHandler}
              className="h-[52px] w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <input
              type="text"
              placeholder="شماره ریویژن"
              name="revisionNumber"
              value={form.revisionNumber}
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
              value={form.preparedDate ? new Date(form.preparedDate) : null}
              inputClass="w-[266px] h-[52px] rounded-xl  bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />

            <input
              type="text"
              placeholder="تایید کننده"
              name="approvedBy"
              value={form.approvedBy}
              onChange={inputHandler}
              className="h-[52px] w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <span className="p-3 font-[SamimBold] text-[20px]">
              مواد بسته‌بندی
            </span>

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
            <p></p>
            <button
              type="submit"
              className="my-5 w-full cursor-pointer rounded-xl bg-linear-to-tl from-green-900 to-green-500 px-4 py-2 font-[Samim] transition-all delay-75 duration-150 ease-in-out hover:scale-105"
            >
              تایید
            </button>
          </form>
        </div>
      </div>
      ) : (
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
          openEditProducts
            ? 'pointer-events-auto opacity-100 '
            : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
        <div
          className={`relative w-[1600px] transform rounded-[15px] bg-linear-to-tl from-black to-gray-600 p-6 text-white shadow-2xl transition-all duration-300 ${
            openEditProducts
              ? 'translate-y-0 scale-100 opacity-100'
              : '-translate-y-10 scale-95 opacity-0'
          }`}
        >
          <div className="flex items-center justify-between pb-5">
            <h2 className="font-[SamimBold] text-[20px]">
              ویرایش شناسنامه محصول
            </h2>
            <button
              onClick={closeHandler}
              className="cursor-pointer rounded-[10px] bg-white/80 p-1.5 text-[30px] text-red-500 transition-all delay-100 duration-75 ease-in-out hover:bg-black"
            >
              <img
                src={close}
                alt="close"
                width={20}
                className="transition-all delay-100 duration-100 ease-in-out hover:scale-110"
              />
            </button>
          </div>
          <form
            onSubmit={editHandler}
            className="no-scrollbar mt-5 grid h-[700px] grid-cols-4 gap-3 overflow-auto rounded-2xl border border-white/50 px-5 pt-5"
          >
            <span className="col-span-4 mb-3 p-1 font-[SamimBold] text-[20px]">
              اطلاعات پایه محصول
            </span>

            <input
              type="text"
              placeholder="نام محصول"
              name="productName"
              value={form.productName}
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />

            <input
              type="text"
              placeholder="بازار هدف"
              name="market"
              value={form.market}
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <input
              type="text"
              placeholder="مشتری مرتبط با این محصول"
              name="customer"
              value={form.customer}
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <span className="col-span-4 p-3 font-[SamimBold] text-[20px]">
              مشخصات فنی بطری
            </span>
            <input
              type="number"
              step="0.01"
              name="brimfulCapacity"
              value={form.brimfulCapacity}
              placeholder="ظرفیت کامل بطری"
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <input
              type="number"
              step="0.01"
              placeholder="وزن بطری"
              name="weight"
              value={form.weight}
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <input
              type="number"
              step="0.01"
              placeholder="قطر بطری"
              name="diameter"
              value={form.diameter}
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <input
              type="number"
              step="0.01"
              placeholder="ارتفاع بطری"
              name="height"
              value={form.height}
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <input
              type="text"
              placeholder="رنگ بطری"
              name="color"
              value={form.color}
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <input
              type="text"
              placeholder="نوع دهانه بطری"
              name="finish"
              value={form.finish}
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
              value={form.palletDimensionLength}
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <input
              type="number"
              step="0.01"
              placeholder="عرض پالت"
              name="palletDimensionWidth"
              value={form.palletDimensionWidth}
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <input
              type="number"
              step="0.01"
              placeholder="ارتفاع پالت"
              name="palletDimensionHeight"
              value={form.palletDimensionHeight}
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <input
              type="number"
              step="0.01"
              placeholder="حجم پالت"
              name="palletVolume"
              value={form.palletVolume}
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <input
              type="number"
              step="0.01"
              placeholder="وزن کل پالت"
              name="palletTotalWeight"
              value={form.palletTotalWeight}
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <input
              type="number"
              step="0.01"
              placeholder="وزن بطری‌ها"
              name="palletBottlesWeight"
              value={form.palletBottlesWeight}
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <input
              type="number"
              step="0.01"
              placeholder="وزن متریال بسته بندی"
              name="palletPackingWeight"
              value={form.palletPackingWeight}
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <span className="col-span-4 p-3 font-[SamimBold] text-[20px]">
              اطلاعات چیدمان بطری روی پالت
            </span>
            <input
              type="number"
              step="0.01"
              placeholder="تعداد بطری در یک تن"
              name="numberOfBottlesIn1Ton"
              value={form.numberOfBottlesIn1Ton}
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <input
              type="number"
              step="0.01"
              placeholder="تعداد بطری در یک متر مکعب"
              name="numberOfBottlesIn1M3"
              value={form.numberOfBottlesIn1M3}
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <input
              type="number"
              step="0.01"
              placeholder="تعداد بطری در هر پالت"
              name="numberOfBottlesInPallet"
              value={form.numberOfBottlesInPallet}
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <input
              type="number"
              step="0.01"
              placeholder="تعداد لایه‌ها"
              name="numberOfLayers"
              value={form.numberOfLayers}
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <input
              type="number"
              step="0.01"
              placeholder="بطری در هر لایه"
              name="bottlesPerLayer"
              value={form.bottlesPerLayer}
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />

            <input
              type="text"
              placeholder="نوع چیدمان"
              name="typeOfArrangement"
              value={form.typeOfArrangement}
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <input
              type="text"
              placeholder="وضعیت لایه بالا"
              name="topLayerPosition"
              value={form.topLayerPosition}
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <input
              type="text"
              placeholder="وضعیت لایه پایین"
              name="bottomLayerPosition"
              value={form.bottomLayerPosition}
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />

            <input
              type="text"
              placeholder="آیا بین لایه‌ها مقوا هست یا نه"
              name="separatorLayer"
              value={form.separatorLayer}
              onChange={inputHandler}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <span className="col-span-4 p-3 font-[SamimBold] text-[20px]">
              اطلاعات مالی / انبار
            </span>
            <input
              type="number"
              step="0.01"
              placeholder="موجودی اولیه محصول در انبار"
              name="openingBalance"
              value={form.openingBalance}
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
              value={form.preparedBy}
              onChange={inputHandler}
              className="h-[52px] w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <input
              type="text"
              placeholder="شماره ریویژن"
              name="revisionNumber"
              value={form.revisionNumber}
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
              value={form.preparedDate ? new Date(form.preparedDate) : null}
              inputClass="w-full h-[52px] rounded-xl  bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />

            <input
              type="text"
              placeholder="تایید کننده"
              name="approvedBy"
              value={form.approvedBy}
              onChange={inputHandler}
              className="h-[52px] w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <span className="col-span-2 p-3 font-[SamimBold] text-[20px]">
              مواد بسته‌بندی
            </span>

            {(form.packagingMaterials || []).map((item, index) => (
              <div
                key={index}
                className="col-span-4 grid grid-cols-4 gap-3 rounded-xl border border-white/20 p-3"
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
            <p></p>
            <button
              type="submit"
              className="col-span-4 mx-100 my-5 cursor-pointer rounded-xl bg-linear-to-tl from-green-900 to-green-500 px-4 py-2 font-[Samim] transition-all delay-75 duration-150 ease-in-out hover:scale-105"
            >
              تایید
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProducts;
