import React, { useEffect, useState } from 'react';
import { FiBell, FiCalendar } from 'react-icons/fi';
import { SlPrinter } from 'react-icons/sl';
import { toShamsi } from '../../../../Time/date';
import { useGetLineChange } from '../../../products-planning/Api/planing';
import { useGetProfile } from '../../../../hooks/profile/profile';
import { usePrintNormalLabels } from '../../Api/printLabel';
import NextProducts from '../../components/labels/NextProducts';
import Quarantine from '../../components/labels/Quarantine.Jsx';
function PrintLabels() {
  const [search, setsearch] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPgeSize] = useState(10000);
  const [selectedLine, setSelectedLine] = useState(null);
  const [openNextProduct, setOpenNextProduct] = useState(false);
  const [openQuarantine, setOpenQuarantine] = useState(false);
  const [count, setcount] = useState(0);
  const date = new Date();

  const totalPalletNumber = () => {
    setcount(count + 1);
  };

  const [form, setForm] = useState({
    productId: '',
    productCode: '',
    lineNumber: 0,
    palletNumber: 0,
    shift: '',
    productionTime: '',
    copies: 0,
    isQuarantine: true,
    quarantineReason: '',
  });

  // useEffect(() => {
  //   if (!selectedLine) return;

  //   setForm({
  //     productId: '',
  //     productCode: '',
  //     lineNumber: 0,
  //     palletNumber: 0,
  //     shift: '',
  //     productionTime: '',
  //     copies: 0,
  //     isQuarantine: true,
  //     quarantineReason: '',
  //   });
  // }, []);

  const {
    data: productsLineChange,
    isLoading,
    isError,
  } = useGetLineChange({ search, page, pageSize });

  const { data: profile } = useGetProfile();

  const allDetails =
    productsLineChange?.data?.items?.flatMap((item) =>
      (item.lineChangeDetails ?? []).map((detail) => ({
        ...detail,
        formId: item.id,
        isActive: item.isActive,
      }))
    ) ?? [];

  const lines = [1, 2, 3].map((lineNumber) => ({
    lineNumber,
    detail: allDetails?.find((d) => d.lineNumber === lineNumber),
  }));

  const printlabels = usePrintNormalLabels();

  const printhandler = (detail) => {
    const productionTime = new Date().toISOString();

    printlabels.mutate({
      productId: detail?.isActive
        ? detail?.nextProductId
        : detail?.currentProductId,
      productCode: detail?.isActive
        ? detail?.nextProductCode
        : detail?.currentProductCode,
      lineNumber: detail?.lineNumber,
      palletNumber: count,
      shift: profile?.data?.currentShift?.shiftName.slice(11),
      productionTime,
      copies: 0,
      isQuarantine: false,
      quarantineReason: '',
    });
  };

  const quarantineHandler = (detail, quarantineReason) => {
    const productionTime = new Date().toISOString();

    printlabels.mutate({
      productId: detail?.isActive
        ? detail?.nextProductId
        : detail?.currentProductId,
      productCode: detail?.isActive
        ? detail?.nextProductCode
        : detail?.currentProductCode,
      lineNumber: detail?.lineNumber,
      palletNumber: count,
      shift: profile?.data?.currentShift?.shiftName.slice(11),
      productionTime,
      copies: 0,
      isQuarantine: true,
      quarantineReason: quarantineReason ?? '',
    });
  };

  return (
    <div className="h-screen overflow-hidden rounded-[15px] bg-[#0F090C]/30 text-white">
      <div className="flex h-full flex-col overflow-hidden rounded-[15px] bg-black/70">
        <div className="flex items-center justify-between rounded-[10px] p-[5px] max-md:w-full">
          {/* Title */}
          <div className="flex items-center space-x-5 text-white max-md:w-full max-md:justify-between">
            <p className="5xl:size-12 flex size-10 items-center justify-center rounded-[10px] bg-[#e54c00] max-2xl:size-8 max-md:hidden">
              <span className="5xl:text-[30px] text-[22px] max-2xl:text-[19px]">
                <SlPrinter />
              </span>
            </p>
            <p className="hidden w-3 opacity-0 max-md:block"></p>
            <p className="5xl:text-[25px] font-[SamimBold] text-[20px] max-2xl:text-[13px] max-md:flex max-md:items-center max-md:justify-center max-md:text-center max-md:text-[14px]">
              چاپ لیبل محصولات
            </p>
            <p className="hidden max-md:block max-md:pt-1 max-md:text-[20px]">
              <FiBell />
            </p>
          </div>
          {/* Details */}
          <div className="flex items-center space-x-5 pl-5 text-white max-md:hidden">
            <p className="flex items-center space-x-1">
              <span className="5xl:text-[25px] text-[17px] text-[#d84f15] max-2xl:text-[15px]">
                <FiCalendar />
              </span>
              <span className="5xl:text-[20px] font-[SamimBold] text-[15px] max-2xl:text-[10px]">
                تاریخ امروز :
              </span>
              <span className="5xl:text-[20px] font-[AvenirLTProMedium] text-[15px] max-2xl:text-[10px]">
                {toShamsi(date)}
              </span>
            </p>
          </div>
        </div>

        <div className="mx-5 grid h-200 grid-cols-3 gap-5">
          {lines.map(({ lineNumber, detail }) => (
            <div
              key={lineNumber}
              className="rounded-[10px] border border-white/10 bg-black/60"
            >
              {/* title */}
              <p className="mx-5 border-b border-white/10 py-3 text-[25px]">
                <span className="font-[SamimBold]">خط تولید شماره </span>
                <span className="font-[AvenirLTProMedium]">{lineNumber}</span>
              </p>
              {/* details */}
              <div className="mx-5 grid grid-cols-1 border-b border-white/10 py-3">
                <div className="flex flex-col space-y-5 space-x-1">
                  <p>نام محصول در حال تولید :</p>
                  <p className="flex items-center justify-center font-[AvenirLTProMedium] text-[30px] text-[#e54c00]">
                    {detail?.isActive === true
                      ? detail?.nextProductName
                      : detail?.currentProductName}
                  </p>
                </div>
                <div className="mt-5 flex flex-col space-y-5 space-x-1">
                  <p>کد محصول در حال تولید :</p>
                  <p className="flex items-center justify-center font-[AvenirLTProMedium] text-[30px] text-[#e54c00]">
                    {detail?.isActive === true
                      ? detail?.nextProductCode
                      : detail?.currentProductCode}
                  </p>
                </div>
                <div className="flex flex-col space-y-5 space-x-1">
                  <p>اپراتور :</p>
                  <p className="flex items-center justify-center text-[20px] text-[#e54c00]">
                    {profile?.data?.fullName}
                  </p>
                </div>
              </div>
              <div className="mx-5 grid grid-cols-1 gap-5 py-4">
                <button
                  onClick={() => printhandler(detail)}
                  className="cursor-pointer rounded-[10px] bg-[#10B981] py-8 transition-all delay-100 duration-150 hover:bg-[#10B981]/85 hover:text-black"
                >
                  لیبل عادی
                </button>
                <button
                  onClick={() => {
                    setSelectedLine(detail);
                    setOpenQuarantine(true);
                  }}
                  className="cursor-pointer rounded-[10px] bg-[#EF4444] py-8 transition-all delay-100 duration-150 hover:bg-[#EF4444]/80 hover:text-black"
                >
                  لیبل قرنطینه
                </button>
                <button
                  onClick={() => {
                    setSelectedLine(detail);
                    setOpenNextProduct(true);
                  }}
                  className="cursor-pointer rounded-[10px] bg-[#e54c00] py-8 transition-all delay-100 duration-150 hover:bg-[#e54c00]/70 hover:text-black"
                >
                  فعال سازی محصول جدید
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <NextProducts
        openNextproduct={openNextProduct}
        setOpenNextProduct={setOpenNextProduct}
        selectedLine={selectedLine}
      />
      <Quarantine
        openQuarantine={openQuarantine}
        setOpenQuarantine={setOpenQuarantine}
        selectedLine={selectedLine}
        quarantineHandler={quarantineHandler}
      />
    </div>
  );
}

export default PrintLabels;
