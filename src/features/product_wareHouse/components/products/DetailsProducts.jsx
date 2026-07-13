import close from '../../../../assets/images/close.png';
import { toShamsi } from '../../../../Time/date';

function DetailsProducts({
  openDetails,
  setOpenDetails,
  seledtedProducts,
  setSelectedProducts,
}) {
  const closeHandler = () => {
    setOpenDetails(false);
  };

  return (
    <div>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
          openDetails
            ? 'pointer-events-auto opacity-100 '
            : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

        <div
          className={`relative w-90 transform rounded-[15px] bg-linear-to-tl from-black to-gray-600 py-6 text-white shadow-2xl transition-all duration-300 ${
            openDetails
              ? 'translate-y-0 scale-100 opacity-100'
              : '-translate-y-10 scale-95 opacity-0'
          }`}
        >
          <div className="mx-2 flex items-center justify-between pb-5">
            <h2 className="font-[SamimBold] text-[23px]">
              جزئیات شناسنامه محصولات
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
          <div className="no-scrollbar h-[500px] overflow-auto px-5">
            <h1 className="pb-2 font-[SamimBold] text-[21px]">
              اطلاعات پایه محصول
            </h1>
            <div className="mt-2 flex cursor-pointer flex-col space-y-3 space-x-5 rounded-[10px] border border-white/50 p-3 transition-all delay-100 duration-300 ease-in-out hover:scale-102 hover:rounded-2xl">
              <p className="flex flex-col">
                <span className="font-[SamimBold] text-[18px]">کد محصول :</span>
                <span className="pr-1 font-[AvenirLTProMedium] text-[17px] text-[#c7f44c]">
                  {seledtedProducts?.productCode}
                </span>
              </p>
              <p className="flex flex-col">
                <span className="font-[SamimBold] text-[18px]">
                  عنوان محصول :
                </span>
                <span
                  className="pr-1 text-right font-[AvenirLTProMedium] text-[17px] text-[#c7f44c]"
                  dir="ltr"
                >
                  {seledtedProducts?.productName}
                </span>
              </p>
              <p className="flex flex-col">
                <span className="font-[SamimBold] text-[18px]">
                  بازار هدف :
                </span>
                <span className="pr-1 font-[AvenirLTProMedium] text-[17px] text-[#c7f44c]">
                  {seledtedProducts?.market}
                </span>
              </p>
              <p className="flex flex-col">
                <span className="font-[SamimBold] text-[18px]">
                  مشتری مرتبط با این محصول :
                </span>
                <span className="pr-1 font-[AvenirLTProMedium] text-[17px] text-[#c7f44c]">
                  {seledtedProducts?.customer}
                </span>
              </p>
            </div>
            <h2 className="py-3 font-[SamimBold] text-[20px]">
              مشخصات فنی بطری
            </h2>
            <div className="flex cursor-pointer flex-col space-y-3 rounded-md border border-white/50 p-3 transition-all delay-100 duration-300 ease-in-out hover:scale-102 hover:rounded-2xl">
              <p className="font-[SamimBold] text-[18px]">
                ظرفیت بطری :
                <span className="pr-1 font-[AvenirLTProMedium] text-[#c7f44c]">
                  {seledtedProducts?.brimfulCapacity.toLocaleString()}cc
                </span>
              </p>
              <p className="font-[SamimBold] text-[18px]">
                وزن بطری :
                <span className="pr-1 font-[AvenirLTProMedium] text-[#c7f44c]">
                  {seledtedProducts?.weight}
                </span>
              </p>
              <p className="font-[SamimBold] text-[18px]">
                قطر بطری :
                <span className="pr-1 font-[AvenirLTProMedium] text-[#c7f44c]">
                  {seledtedProducts?.diameter}
                </span>
              </p>
              <p className="font-[SamimBold] text-[18px]">
                ارتفاع بطری :
                <span className="pr-1 font-[AvenirLTProMedium] text-[#c7f44c]">
                  {seledtedProducts?.height}
                </span>
              </p>
              <p className="font-[SamimBold] text-[18px]">
                رنگ بطری :
                <span className="pr-1 font-[AvenirLTProMedium] text-[#c7f44c]">
                  {seledtedProducts?.color
                    ? seledtedProducts.color.charAt(0).toUpperCase() +
                      seledtedProducts.color.slice(1)
                    : ''}
                </span>
              </p>
              <p className="font-[SamimBold] text-[18px]">
                نوع دهانه بطری :
                <span
                  dir="ltr"
                  className="pr-1 font-[AvenirLTProMedium] text-[#c7f44c]"
                >
                  {seledtedProducts?.finish}
                </span>
              </p>
            </div>
            <h1 className="py-3 font-[SamimBold] text-[20px]">مشخصات پالت</h1>
            <div className="flex cursor-pointer flex-col space-y-3 rounded-md border border-white/50 p-3 transition-all delay-100 duration-300 ease-in-out hover:scale-102 hover:rounded-2xl">
              <p className="font-[SamimBold] text-[18px]">
                طول پالت :
                <span className="pr-1 font-[AvenirLTProMedium] text-[#c7f44c]">
                  {seledtedProducts?.palletDimensionLength}
                </span>
              </p>
              <p className="font-[SamimBold] text-[18px]">
                عرض پالت :
                <span className="pr-1 font-[AvenirLTProMedium] text-[#c7f44c]">
                  {seledtedProducts?.palletDimensionWidth}
                </span>
              </p>
              <p className="font-[SamimBold] text-[18px]">
                ارتفاع پالت :
                <span className="pr-1 font-[AvenirLTProMedium] text-[#c7f44c]">
                  {seledtedProducts?.palletDimensionHeight}
                </span>
              </p>
              <p className="font-[SamimBold] text-[18px]">
                حجم پالت :
                <span className="pr-1 font-[AvenirLTProMedium] text-[#c7f44c]">
                  {seledtedProducts?.palletVolume}
                </span>
              </p>
              <p className="font-[SamimBold] text-[18px]">
                وزن پالت :
                <span className="pr-1 font-[AvenirLTProMedium] text-[#c7f44c]">
                  {seledtedProducts?.palletTotalWeight}
                </span>
              </p>
              <p className="font-[SamimBold] text-[18px]">
                وزن بطری ها :
                <span className="pr-1 font-[AvenirLTProMedium] text-[#c7f44c]">
                  {seledtedProducts?.palletBottlesWeight}
                </span>
              </p>
              <p className="font-[SamimBold] text-[18px]">
                وزن متریال بسته بندی :
                <span className="pr-1 font-[AvenirLTProMedium] text-[#c7f44c]">
                  {seledtedProducts?.palletPackingWeight}
                </span>
              </p>
            </div>
            <h1 className="py-3 font-[SamimBold] text-[20px]">
              اطلاعات چیدمان بطری روی پالت
            </h1>
            <div className="cursor-pointer space-y-3 rounded-[10px] border border-white/50 p-3 transition-all delay-100 duration-300 ease-in-out hover:scale-102 hover:rounded-2xl">
              <p className="font-[SamimBold] text-[18px]">
                تعداد بطری در یک تن :
                <span className="pr-1 font-[AvenirLTProMedium] text-[#c7f44c]">
                  {seledtedProducts?.numberOfBottlesIn1Ton}
                </span>
              </p>
              <p className="font-[SamimBold] text-[18px]">
                تعداد بطری در یک متر مکعب :
                <span className="pr-1 font-[AvenirLTProMedium] text-[#c7f44c]">
                  {seledtedProducts?.numberOfBottlesIn1M3}
                </span>
              </p>
              <p className="font-[SamimBold] text-[18px]">
                تعداد بطری در هر پالت :
                <span className="pr-1 font-[AvenirLTProMedium] text-[#c7f44c]">
                  {seledtedProducts?.numberOfBottlesInPallet}
                </span>
              </p>
              <p className="font-[SamimBold] text-[18px]">
                تعداد لایه ها :
                <span className="pr-1 font-[AvenirLTProMedium] text-[#c7f44c]">
                  {seledtedProducts?.numberOfLayers}
                </span>
              </p>
              <p className="font-[SamimBold] text-[18px]">
                بطری در هر لایه :
                <span className="pr-1 font-[AvenirLTProMedium] text-[#c7f44c]">
                  {seledtedProducts?.bottlesPerLayer}
                </span>
              </p>
              <p className="font-[SamimBold] text-[18px]">
                نوع چیدمان :
                <span className="pr-1 font-[AvenirLTProMedium] text-[#c7f44c]">
                  {seledtedProducts?.typeOfArrangement}
                </span>
              </p>
              <p className="font-[SamimBold] text-[18px]">
                وضعیت لایه بالا :
                <span className="pr-1 font-[AvenirLTProMedium] text-[#c7f44c]">
                  {seledtedProducts?.topLayerPosition}
                </span>
              </p>
              <p className="font-[SamimBold] text-[18px]">
                وضعیت لایه پایین :
                <span className="pr-1 font-[AvenirLTProMedium] text-[#c7f44c]">
                  {seledtedProducts?.bottomLayerPosition}
                </span>
              </p>
              <p className="font-[SamimBold] text-[18px]">
                بودن مقوا بین لایه ها :
                <span className="pr-1 font-[AvenirLTProMedium] text-[#c7f44c]">
                  {seledtedProducts?.separatorLayer}
                </span>
              </p>
            </div>
            <h1 className="py-3 font-[SamimBold] text-[21px]">
              اطلاعات مالی/انبار
            </h1>
            <div className="flex cursor-pointer flex-col space-y-3 rounded-[10px] border border-white/50 p-3 transition-all delay-100 duration-300 ease-in-out hover:scale-102 hover:rounded-2xl">
              <p className="font-[SamimBold] text-[18px]">
                موجودی اولیه :
                <span className="pr-1 font-[AvenirLTProMedium] text-[15px] text-[#c7f44c]">
                  {seledtedProducts?.openingBalance.toLocaleString()}
                </span>
              </p>
              <p className="font-[SamimBold] text-[18px]">
                موجودی فعلی :
                <span className="pr-1 font-[AvenirLTProMedium] text-[15px] text-[#c7f44c]">
                  {seledtedProducts?.currentInventory.toLocaleString()}
                </span>
              </p>
              <p className="font-[SamimBold] text-[18px]">
                موجودی قرنطینه :
                <span className="pr-1 font-[AvenirLTProMedium] text-[15px] text-[#c7f44c]">
                  {seledtedProducts?.quarantineStock.toLocaleString()}
                </span>
              </p>
            </div>
            <h1 className="py-3 font-[SamimBold] text-[21px]">
              اطلاعات مستندسازی
            </h1>
            <div className="flex cursor-pointer flex-col space-y-3 rounded-md border border-white/50 p-3 transition-all delay-100 duration-300 ease-in-out hover:scale-102 hover:rounded-2xl">
              <p className="font-[SamimBold] text-[18px]">
                تهیه کننده :
                <span className="pr-1 font-[AvenirLTProMedium] text-[#c7f44c]">
                  {seledtedProducts?.preparedBy}
                </span>
              </p>
              <p className="font-[SamimBold] text-[18px]">
                شماره ریویژن :
                <span className="pr-1 font-[AvenirLTProMedium] text-[#c7f44c]">
                  {seledtedProducts?.revisionNumber}
                </span>
              </p>
              <p className="font-[SamimBold] text-[18px]">
                تاریخ تهیه :
                <span className="pr-1 font-[AvenirLTProMedium] text-[#c7f44c]">
                  {toShamsi(seledtedProducts?.preparedDate)}
                </span>
              </p>
              <p className="font-[SamimBold] text-[18px]">
                تایید کننده :
                <span className="pr-1 font-[AvenirLTProMedium] text-[#c7f44c]">
                  {seledtedProducts?.approvedBy}
                </span>
              </p>
              <p className="font-[SamimBold] text-[18px]">
                زمان ایجاد :
                <span className="pr-1 font-[AvenirLTProMedium] text-[#c7f44c]">
                  {toShamsi(seledtedProducts?.createdAt)}
                </span>
              </p>
              <p className="font-[SamimBold] text-[18px]">
                به روز شده :
                <span className="pr-1 font-[AvenirLTProMedium] text-[#c7f44c]">
                  {toShamsi(seledtedProducts?.updatedAt)}
                </span>
              </p>
            </div>
            {seledtedProducts?.packagingMaterials.map((p, index) => (
              <div key={p.id}>
                <h1 className="py-3 font-[SamimBold] text-[21px]">
                  {index + 1}- مواد بسته‌بندی
                </h1>
                <div className="flex cursor-pointer flex-col space-y-3 rounded-[10px] border border-white/50 p-3 transition-all delay-100 duration-300 ease-in-out hover:scale-102 hover:rounded-2xl">
                  <p className="font-[SamimBold] text-[18px]">
                    نام متریال :
                    <span
                      className="pr-1 font-[AvenirLTProMedium] text-[15px] text-[#c7f44c]"
                      dir="ltr"
                    >
                      {p?.materialName}
                    </span>
                  </p>
                  <p className="font-[SamimBold] text-[18px]">
                    نوع متریال :
                    <span
                      className="pr-1 font-[AvenirLTProMedium] text-[15px] text-[#c7f44c]"
                      dir="ltr"
                    >
                      {p?.materialType}
                    </span>
                  </p>
                  <p className="font-[SamimBold] text-[18px]">
                    درجه کیفیت :
                    <span
                      className="pr-1 font-[AvenirLTProMedium] text-[15px] text-[#c7f44c]"
                      dir="ltr"
                    >
                      {p?.quality}
                    </span>
                  </p>
                  <p className="font-[SamimBold] text-[18px]">
                    ابعاد :
                    <span
                      className="font-[AvenirLTProMedium] text-[15px] text-[#c7f44c]"
                      dir="ltr"
                    >
                      {p?.dimensions}
                    </span>
                  </p>
                  <p className="font-[SamimBold] text-[18px]">
                    مقدار مصرف :
                    <span
                      className="pr-1 font-[AvenirLTProMedium] text-[15px] text-[#c7f44c]"
                      dir="ltr"
                    >
                      {p?.quantity}
                    </span>
                  </p>
                  <p className="font-[SamimBold] text-[18px]">
                    واحد :
                    <span
                      className="pr-1 font-[AvenirLTProMedium] text-[15px] text-[#c7f44c]"
                      dir="ltr"
                    >
                      {p?.unit}
                    </span>
                  </p>
                  <p className="col-span-6 font-[SamimBold] text-[18px]">
                    توضیحات :
                    <span
                      className="pr-1 font-[AvenirLTProMedium] text-[15px] text-[#c7f44c]"
                      dir="ltr"
                    >
                      {p?.description}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      ) : (
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
          openDetails
            ? 'pointer-events-auto opacity-100 '
            : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

        <div
          className={`relative transform rounded-[15px] bg-linear-to-tl from-black to-gray-600 p-6 text-white shadow-2xl transition-all duration-300 ${
            openDetails
              ? 'translate-y-0 scale-100 opacity-100'
              : '-translate-y-10 scale-95 opacity-0'
          }`}
        >
          <div className="flex items-center justify-between pb-5">
            <h2 className="font-[SamimBold] text-[23px]">
              جزئیات شناسنامه محصولات
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
          <div className="no-scrollbar h-[700px] overflow-auto px-5">
            <h1 className="pb-2 font-[SamimBold] text-[21px]">
              اطلاعات پایه محصول
            </h1>
            <div className="mt-2 flex cursor-pointer items-center justify-center space-x-5 rounded-md border border-white/50 p-3 transition-all delay-100 duration-300 ease-in-out hover:scale-102 hover:rounded-2xl">
              <p className="font-[VazirLight] text-[18px]">
                کد محصول :
                <span className="pr-1 font-[AvenirLTProMedium] text-[#c7f44c]">
                  {seledtedProducts?.productCode}
                </span>
              </p>
              <p className="font-[VazirLight] text-[18px]">
                عنوان محصول :
                <span
                  className="pr-1 font-[AvenirLTProMedium] text-[#c7f44c]"
                  dir="ltr"
                >
                  {seledtedProducts?.productName}
                </span>
              </p>
              <p className="font-[VazirLight] text-[18px]">
                بازار هدف :
                <span className="pr-1 font-[AvenirLTProMedium] text-[#c7f44c]">
                  {seledtedProducts?.market}
                </span>
              </p>
              <p className="font-[VazirLight] text-[18px]">
                مشتری مرتبط با این محصول :
                <span className="pr-1 font-[AvenirLTProMedium] text-[#c7f44c]">
                  {seledtedProducts?.customer}
                </span>
              </p>
            </div>
            <h2 className="py-3 font-[SamimBold] text-[20px]">
              مشخصات فنی بطری
            </h2>
            <div className="flex cursor-pointer items-center justify-center space-x-5 rounded-md border border-white/50 p-3 transition-all delay-100 duration-300 ease-in-out hover:scale-102 hover:rounded-2xl">
              <p className="font-[VazirLight] text-[18px]">
                ظرفیت بطری :
                <span className="pr-1 font-[AvenirLTProMedium]">
                  {seledtedProducts?.brimfulCapacity.toLocaleString()}cc
                </span>
              </p>
              <p className="font-[VazirLight] text-[18px]">
                وزن بطری :
                <span className="pr-1 font-[AvenirLTProMedium] text-[#c7f44c]">
                  {seledtedProducts?.weight}
                </span>
              </p>
              <p className="font-[VazirLight] text-[18px]">
                قطر بطری :
                <span className="pr-1 font-[AvenirLTProMedium] text-[#c7f44c]">
                  {seledtedProducts?.diameter}
                </span>
              </p>
              <p className="font-[VazirLight] text-[18px]">
                ارتفاع بطری :
                <span className="pr-1 font-[AvenirLTProMedium] text-[#c7f44c]">
                  {seledtedProducts?.height}
                </span>
              </p>
              <p className="font-[VazirLight] text-[18px]">
                رنگ بطری :
                <span className="pr-1 font-[AvenirLTProMedium] text-[#c7f44c]">
                  {seledtedProducts?.color
                    ? seledtedProducts.color.charAt(0).toUpperCase() +
                      seledtedProducts.color.slice(1)
                    : ''}
                </span>
              </p>
              <p className="font-[VazirLight] text-[18px]">
                نوع دهانه بطری :
                <span
                  dir="ltr"
                  className="pr-1 font-[AvenirLTProMedium] text-[#c7f44c]"
                >
                  {seledtedProducts?.finish}
                </span>
              </p>
            </div>
            <h1 className="py-3 font-[SamimBold] text-[20px]"> مشخصات پالت</h1>
            <div className="flex cursor-pointer items-center justify-center space-x-5 rounded-md border border-white/50 p-3 transition-all delay-100 duration-300 ease-in-out hover:scale-102 hover:rounded-2xl">
              <p className="font-[VazirLight] text-[18px]">
                طول پالت :
                <span className="pr-1 font-[AvenirLTProMedium] text-[#c7f44c]">
                  {seledtedProducts?.palletDimensionLength}
                </span>
              </p>
              <p className="font-[VazirLight] text-[18px]">
                عرض پالت :
                <span className="pr-1 font-[AvenirLTProMedium] text-[#c7f44c]">
                  {seledtedProducts?.palletDimensionWidth}
                </span>
              </p>
              <p className="font-[VazirLight] text-[18px]">
                ارتفاع پالت :
                <span className="pr-1 font-[AvenirLTProMedium] text-[#c7f44c]">
                  {seledtedProducts?.palletDimensionHeight}
                </span>
              </p>
              <p className="font-[VazirLight] text-[18px]">
                حجم پالت :
                <span className="pr-1 font-[AvenirLTProMedium] text-[#c7f44c]">
                  {seledtedProducts?.palletVolume}
                </span>
              </p>
              <p className="font-[VazirLight] text-[18px]">
                وزن پالت :
                <span className="pr-1 font-[AvenirLTProMedium] text-[#c7f44c]">
                  {seledtedProducts?.palletTotalWeight}
                </span>
              </p>
              <p className="font-[VazirLight] text-[18px]">
                وزن بطری ها :
                <span className="pr-1 font-[AvenirLTProMedium] text-[#c7f44c]">
                  {seledtedProducts?.palletBottlesWeight}
                </span>
              </p>
              <p className="font-[VazirLight] text-[18px]">
                وزن متریال بسته بندی :
                <span className="pr-1 font-[AvenirLTProMedium] text-[#c7f44c]">
                  {seledtedProducts?.palletPackingWeight}
                </span>
              </p>
            </div>
            <h1 className="py-3 font-[SamimBold] text-[20px]">
              اطلاعات چیدمان بطری روی پالت
            </h1>
            <div className="grid cursor-pointer grid-cols-5 gap-5 rounded-md border border-white/50 p-3 transition-all delay-100 duration-300 ease-in-out hover:scale-102 hover:rounded-2xl">
              <p className="font-[VazirLight] text-[18px]">
                تعداد بطری در یک تن :
                <span className="pr-1 font-[AvenirLTProMedium] text-[#c7f44c]">
                  {seledtedProducts?.numberOfBottlesIn1Ton}
                </span>
              </p>
              <p className="font-[VazirLight] text-[18px]">
                تعداد بطری در یک متر مکعب :
                <span className="pr-1 font-[AvenirLTProMedium] text-[#c7f44c]">
                  {seledtedProducts?.numberOfBottlesIn1M3}
                </span>
              </p>
              <p className="font-[VazirLight] text-[18px]">
                تعداد بطری در هر پالت :
                <span className="pr-1 font-[AvenirLTProMedium] text-[#c7f44c]">
                  {seledtedProducts?.numberOfBottlesInPallet}
                </span>
              </p>
              <p className="font-[VazirLight] text-[18px]">
                تعداد لایه ها :
                <span className="pr-1 font-[AvenirLTProMedium] text-[#c7f44c]">
                  {seledtedProducts?.numberOfLayers}
                </span>
              </p>
              <p className="font-[VazirLight] text-[18px]">
                بطری در هر لایه :
                <span className="pr-1 font-[AvenirLTProMedium] text-[#c7f44c]">
                  {seledtedProducts?.bottlesPerLayer}
                </span>
              </p>
              <p className="font-[VazirLight] text-[18px]">
                نوع چیدمان :
                <span className="pr-1 font-[AvenirLTProMedium] text-[#c7f44c]">
                  {seledtedProducts?.typeOfArrangement}
                </span>
              </p>
              <p className="font-[VazirLight] text-[18px]">
                وضعیت لایه بالا :
                <span className="pr-1 font-[AvenirLTProMedium] text-[#c7f44c]">
                  {seledtedProducts?.topLayerPosition}
                </span>
              </p>
              <p className="font-[VazirLight] text-[18px]">
                وضعیت لایه پایین :
                <span className="pr-1 font-[AvenirLTProMedium] text-[#c7f44c]">
                  {seledtedProducts?.bottomLayerPosition}
                </span>
              </p>
              <p className="font-[VazirLight] text-[18px]">
                بودن مقوا بین لایه ها :
                <span className="pr-1 font-[AvenirLTProMedium] text-[#c7f44c]">
                  {seledtedProducts?.separatorLayer}
                </span>
              </p>
            </div>
            <h1 className="py-3 font-[SamimBold] text-[21px]">
              اطلاعات مالی/انبار
            </h1>
            <div className="flex cursor-pointer items-center justify-center space-x-5 rounded-md border border-white/50 p-3 transition-all delay-100 duration-300 ease-in-out hover:scale-102 hover:rounded-2xl">
              <p className="font-[VazirLight] text-[18px]">
                موجودی اولیه :
                <span className="pr-1 font-[AvenirLTProMedium] text-[15px] text-[#c7f44c]">
                  {seledtedProducts?.openingBalance.toLocaleString()}
                </span>
              </p>
              <p className="font-[VazirLight] text-[18px]">
                موجودی فعلی :
                <span className="pr-1 font-[AvenirLTProMedium] text-[15px] text-[#c7f44c]">
                  {seledtedProducts?.currentInventory.toLocaleString()}
                </span>
              </p>
              <p className="font-[VazirLight] text-[18px]">
                موجودی قرنطینه :
                <span className="pr-1 font-[AvenirLTProMedium] text-[15px] text-[#c7f44c]">
                  {seledtedProducts?.quarantineStock.toLocaleString()}
                </span>
              </p>
            </div>
            <h1 className="py-3 font-[SamimBold] text-[21px]">
              اطلاعات مستندسازی
            </h1>
            <div className="flex cursor-pointer items-center justify-center space-x-5 rounded-md border border-white/50 p-3 transition-all delay-100 duration-300 ease-in-out hover:scale-102 hover:rounded-2xl">
              <p className="font-[VazirLight] text-[18px]">
                تهیه کننده :
                <span className="pr-1 font-[AvenirLTProMedium] text-[#c7f44c]">
                  {seledtedProducts?.preparedBy}
                </span>
              </p>
              <p className="font-[VazirLight] text-[18px]">
                شماره ریویژن :
                <span className="pr-1 font-[AvenirLTProMedium] text-[#c7f44c]">
                  {seledtedProducts?.revisionNumber}
                </span>
              </p>
              <p className="font-[VazirLight] text-[18px]">
                تاریخ تهیه :
                <span className="pr-1 font-[AvenirLTProMedium] text-[#c7f44c]">
                  {toShamsi(seledtedProducts?.preparedDate)}
                </span>
              </p>
              <p className="font-[VazirLight] text-[18px]">
                تایید کننده :
                <span className="pr-1 font-[AvenirLTProMedium] text-[#c7f44c]">
                  {seledtedProducts?.approvedBy}
                </span>
              </p>
              <p className="font-[VazirLight] text-[18px]">
                زمان ایجاد :
                <span className="pr-1 font-[AvenirLTProMedium] text-[#c7f44c]">
                  {toShamsi(seledtedProducts?.createdAt)}
                </span>
              </p>
              <p className="font-[VazirLight] text-[18px]">
                به روز شده :
                <span className="pr-1 font-[AvenirLTProMedium] text-[#c7f44c]">
                  {toShamsi(seledtedProducts?.updatedAt)}
                </span>
              </p>
            </div>
            {seledtedProducts?.packagingMaterials.map((p, index) => (
              <div key={p.id}>
                <h1 className="py-3 font-[SamimBold] text-[21px]">
                  {index + 1}- مواد بسته‌بندی
                </h1>
                <div className="grid cursor-pointer grid-cols-6 gap-3 rounded-md border border-white/50 p-3 transition-all delay-100 duration-300 ease-in-out hover:scale-102 hover:rounded-2xl">
                  <p className="font-[VazirLight] text-[18px]">
                    نام متریال :
                    <span
                      className="pr-1 font-[AvenirLTProMedium] text-[15px] text-[#c7f44c]"
                      dir="ltr"
                    >
                      {p?.materialName}
                    </span>
                  </p>
                  <p className="font-[VazirLight] text-[18px]">
                    نوع متریال :
                    <span
                      className="pr-1 font-[AvenirLTProMedium] text-[15px] text-[#c7f44c]"
                      dir="ltr"
                    >
                      {p?.materialType}
                    </span>
                  </p>
                  <p className="font-[VazirLight] text-[18px]">
                    درجه کیفیت :
                    <span
                      className="pr-1 font-[AvenirLTProMedium] text-[15px] text-[#c7f44c]"
                      dir="ltr"
                    >
                      {p?.quality}
                    </span>
                  </p>
                  <p className="font-[VazirLight] text-[18px]">
                    ابعاد :
                    <span
                      className="font-[AvenirLTProMedium] text-[15px] text-[#c7f44c]"
                      dir="ltr"
                    >
                      {p?.dimensions}
                    </span>
                  </p>
                  <p className="font-[VazirLight] text-[18px]">
                    مقدار مصرف :
                    <span
                      className="pr-1 font-[AvenirLTProMedium] text-[15px] text-[#c7f44c]"
                      dir="ltr"
                    >
                      {p?.quantity}
                    </span>
                  </p>
                  <p className="font-[VazirLight] text-[18px]">
                    واحد :
                    <span
                      className="pr-1 font-[AvenirLTProMedium] text-[15px] text-[#c7f44c]"
                      dir="ltr"
                    >
                      {p?.unit}
                    </span>
                  </p>
                  <p className="col-span-6 font-[VazirLight] text-[18px]">
                    توضیحات :
                    <span
                      className="pr-1 font-[AvenirLTProMedium] text-[15px] text-[#c7f44c]"
                      dir="ltr"
                    >
                      {p?.description}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsProducts;
