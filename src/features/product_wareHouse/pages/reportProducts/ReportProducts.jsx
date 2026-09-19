import React, { useMemo, useState } from 'react';
import { useGetReportProducts } from '../../Api/reportProducts';
import { useGetProducts } from '../../Api/productsApi';
import API_HOST from '../../../../../API/api';
import { MdNumbers } from 'react-icons/md';
import { HashLoader } from 'react-spinners';

function ReportProducts() {
  const [filterStatus, setFilterStatus] = useState('all');
  const [search, setsearch] = useState('');

  const {
    data: reports,
    isLoading,
    isError,
  } = useGetReportProducts({ search });
  const { data: products } = useGetProducts({ search });

  const allBottle = products?.filter((b) => b.productType === false).length;
  const allJar = products?.filter((b) => b.productType === true).length;

  const filterData = useMemo(() => {
    if (filterStatus === 'all') return reports;

    return products?.filter((p) => {
      if (filterStatus === 'bottle') return p.productType === false;

      if (filterStatus === 'jar') return p.productType === true;

      return true;
    });
  }, [filterStatus, products]);

  return (
    <div className="h-screen overflow-hidden rounded-[15px] bg-[#0F090C]/30 text-white">
      <div className="flex h-full flex-col overflow-hidden rounded-[15px] bg-black/70">
        <div className="col-span-1 m-2 grid grid-cols-3 gap-5 rounded-[10px]">
          <div
            onClick={() => setFilterStatus('all')}
            className="flex h-20 cursor-pointer rounded-[10px] border border-[#be4615]"
          >
            <div className="my-auto p-5 text-[20px] max-lg:p-2 max-lg:text-[15px]">
              <p className="flex size-11 items-center justify-center rounded-[10px] bg-[#be4615]/25 text-[#be4615] max-lg:size-8">
                <MdNumbers />
              </p>
            </div>
            <p className="my-auto h-13 border-l-2 border-[#f35714]/70"></p>
            <div className="my-auto px-5">
              <p className="font-[AvenirLTProHeavy] text-[25px] font-extrabold text-white">
                {reports?.length}
              </p>
              <p className="text-white/60 max-2xl:text-[15px] max-lg:pb-2 max-lg:text-[10px]">
                کل محصولات
              </p>
            </div>
          </div>
          <div
            onClick={() => setFilterStatus('bottle')}
            className="flex h-20 cursor-pointer rounded-[10px] border border-[#f10033]"
          >
            <div className="my-auto p-5 text-[20px] max-lg:p-2 max-lg:text-[15px]">
              <p className="flex size-11 items-center justify-center rounded-[10px] bg-[#f10033]/25 text-[#f10033] max-lg:size-8">
                <MdNumbers />
              </p>
            </div>
            <p className="my-auto h-13 border-l-2 border-[#f10033]/70"></p>
            <div className="my-auto px-5">
              <p className="font-[AvenirLTProHeavy] text-[25px] font-extrabold text-white">
                {allBottle}
              </p>
              <p className="text-white/60 max-2xl:text-[15px] max-lg:pb-2 max-lg:text-[10px]">
                کل بطری ها
              </p>
            </div>
          </div>
          <div
            onClick={() => setFilterStatus('jar')}
            className="flex h-20 cursor-pointer rounded-[10px] border border-white"
          >
            <div className="my-auto p-5 text-[20px] max-lg:p-2 max-lg:text-[15px]">
              <p className="flex size-11 items-center justify-center rounded-[10px] bg-white/60 text-white max-lg:size-8">
                <MdNumbers />
              </p>
            </div>
            <p className="my-auto h-13 border-l-2 border-white/70"></p>
            <div className="my-auto px-5">
              <p className="font-[AvenirLTProHeavy] text-[25px] font-extrabold text-white">
                {allJar}
              </p>
              <p className="text-white/60 max-2xl:text-[15px] max-lg:pb-2 max-lg:text-[10px]">
                کل جار ها
              </p>
            </div>
          </div>
        </div>
        <div className="mx-5">
          <input
            type="text"
            value={search}
            placeholder="جستجو محصول ..."
            onChange={(e) => {
              setsearch(e.target.value);
            }}
            className="w-full rounded-[10px] border border-white/20 bg-[#07090f] py-2 text-white placeholder:pr-2 placeholder:text-white/50"
          />
        </div>
        {isLoading ? (
          <div className="flex min-h-0 flex-1 flex-col items-center justify-center space-y-5">
            <HashLoader color="#ffffff" size={80} speedMultiplier={1.5} />
            <p className="pt-10 text-[20px] text-white">لطفا منتظر بمانید😎</p>
          </div>
        ) : isError ? (
          <div className="flex min-h-0 flex-1 flex-col items-center justify-center space-y-5 py-20 text-[30px] text-white">
            خطا در دریافت اطلاعات 😟
          </div>
        ) : (
          <div className="no-scrollbar m-2 grid min-h-0 w-full grid-cols-3 gap-3 overflow-x-hidden overflow-y-auto">
            {filterData?.map((r, index) => {
              const matchedProduct = products?.find(
                (p) => p.productCode === r.productCode
              );

              const imgSrc = matchedProduct?.certificateImagePath
                ? `${API_HOST}:5258/${matchedProduct.certificateImagePath}`
                : null;

              return (
                <div key={index}>
                  <div className="flex space-x-2 rounded-[10px] border border-white/30 bg-black/10 p-2">
                    <div className="flex h-45 items-center">
                      <img
                        src={imgSrc}
                        alt="products"
                        className={`flex items-center justify-center ${matchedProduct?.productType ? 'h-35 rounded-[10px]' : 'h-45 rounded-[10px]'}`}
                      />
                    </div>
                    <div className="space-y-2">
                      <p className="space-x-1">
                        <span className="font-[Samimbold] text-[14px] text-white/70">
                          نام محصول :
                        </span>
                        <span
                          dir="ltr"
                          className="font-[AvenirLTProMedium] text-white"
                        >
                          {r.productName}
                        </span>
                      </p>
                      <p className="space-x-1">
                        <span className="font-[Samimbold] text-[14px] text-white/70">
                          کد محصول :
                        </span>
                        <span className="font-[AvenirLTProMedium]">
                          {r?.productCode}
                        </span>
                      </p>
                      <p className="space-x-1">
                        <span className="font-[Samimbold] text-[14px] text-white/70">
                          موجودی اول دوره :
                        </span>
                        <span className="font-[AvenirLTProMedium]">
                          {r?.openingBalance}
                        </span>
                      </p>
                      <p className="space-x-1">
                        <span className="font-[Samimbold] text-[14px] text-white/70">
                          موجودی فعلی :
                        </span>
                        <span className="font-[AvenirLTProMedium]">
                          {r?.currentInventory}
                        </span>
                      </p>
                      <p className="space-x-1">
                        <span className="font-[Samimbold] text-[14px] text-white/70">
                          موجودی قرنطینه :
                        </span>
                        <span className="font-[AvenirLTProMedium]">
                          {r?.quarantineStock}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default ReportProducts;
