import React, { useState } from 'react';
import { FiCalendar } from 'react-icons/fi';
import { normalizeTime, toShamsi } from '../../../../../Time/date';
import { CiClock2 } from 'react-icons/ci';
import LoadingProductImage from './LoadingProductImage';
import ReportActionLoadingProduct from '../module/ReportActionLoadingProduct';

function TablePageLoadingProduct({
  loading,
  canEdit,
  canDelete,
  openEdit,
  askDelete,
  setOpenFormReport,
  setSelectedLoading,
}) {
  const [productsImage, setProductsImage] = useState(false);
  const [selectedProductForImage, setSelectedProductForImage] = useState(null);

  const uploadImgHandler = (e) => {
    setSelectedProductForImage(e);
    setProductsImage(true);
  };
  return (
    <div>
      <table className="w-full border-separate border-spacing-y-0 max-md:hidden">
        <thead className="bg-[#0b0c12] text-white/70">
          <tr className="5xl:text-[25px] max-2xl:text-[12px]">
            <th className="5xl:py-5 rounded-tr-[10px] border-t border-r border-b border-white/30 py-3 pr-5 max-2xl:py-2">
              ردیف
            </th>
            <th className="border-t border-b border-white/30">شماره خروجی</th>

            <th className="border-t border-b border-white/30">نام محصول </th>
            <th className="border-t border-b border-white/30">کد محصول</th>

            <th className="border-t border-b border-white/30">مقصد</th>
            <th className="border-t border-b border-white/30">تعداد پالت</th>

            <th className="border-t border-b border-white/30">
              ساعت شروع بارگیری
            </th>
            <th className="5xl:w-70 w-55 border-t border-b border-white/30 max-2xl:w-50">
              ساعت پایان بارگیری
            </th>
            <th className="5xl:w-70 w-55 border-t border-b border-white/30 max-2xl:w-50">
              آپلود عکس
            </th>

            <th className="rounded-tl-[10px] border-t border-b border-l border-white/30">
              عملیات
            </th>
          </tr>
        </thead>
        <tbody>
          {loading?.data?.map((e, index) => {
            return (
              <tr key={e.id} className="text-center">
                <td className="size-5 border-b border-white/20">
                  <p className="5xl:text-[20px] my-3 mr-5 rounded-[10px] border border-white/10 bg-[#131720] py-1 font-[AvenirLTProMedium] text-white/70 max-2xl:text-[12px]">
                    {index + 1}
                  </p>
                </td>
                <td className="5xl:text-[28px] border-b border-white/20 max-2xl:text-[12px]">
                  <p className="mx-1 rounded-[10px] border border-[#32a3de]/40 bg-[#182228] font-[AvenirLTProBook] text-[#32a3de]">
                    {e?.outputNumber}
                  </p>
                </td>

                <td className="5xl:text-[28px] border-b border-white/20 max-2xl:text-[12px]">
                  <p className="mx-1 rounded-[10px]">{e?.productName}</p>
                </td>

                <td className="5xl:text-[28px] border-b border-white/20 max-2xl:text-[12px]">
                  <p className="mx-1 rounded-[10px] border border-[#32a3de]/40 bg-[#182228] font-[AvenirLTProBook] text-[#32a3de]">
                    {e?.productCode}
                  </p>
                </td>
                <td className="5xl:text-[28px] border-b border-white/20 max-2xl:text-[12px]">
                  <p>{e?.destination}</p>
                </td>
                <td className="5xl:text-[28px] border-b border-white/20 max-2xl:text-[12px]">
                  <p className="mx-1 rounded-[10px] border border-[#32a3de]/40 bg-[#182228] font-[AvenirLTProBook] text-[#32a3de]">
                    {e?.palletCount}
                  </p>
                </td>

                <td className="5xl:text-[28px] border-b border-white/20 max-2xl:text-[12px]">
                  <div className="flex items-center justify-center space-x-2">
                    <p className="5xl:text-[30px] text-[20px] text-[#863515] max-2xl:text-[15px]">
                      <CiClock2 />
                    </p>
                    <p className="font-[AvenirLTProBook] text-white">
                      {normalizeTime(e?.loadingStartTime)}
                    </p>
                  </div>
                </td>
                <td className="5xl:text-[28px] border-b border-white/20 max-2xl:text-[12px]">
                  <div className="flex items-center justify-center space-x-2">
                    <p className="5xl:text-[30px] text-[20px] text-[#863515] max-2xl:text-[15px]">
                      <CiClock2 />
                    </p>
                    <p className="font-[AvenirLTProBook] text-white">
                      {normalizeTime(e?.loadingEndTime)}
                    </p>
                  </div>
                </td>
                <td className="5xl:text-[28px] border-b border-white/20 max-2xl:text-[12px]">
                  <button onClick={() => uploadImgHandler(e)}>آپلود عکس</button>
                </td>
                <td className="border-b border-white/20">
                  <ReportActionLoadingProduct
                    report={e}
                    canEdit={canEdit}
                    canDelete={canDelete}
                    openEdit={openEdit}
                    askDelete={askDelete}
                    setOpenFormReport={setOpenFormReport}
                    setSelectedLoading={setSelectedLoading}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <LoadingProductImage
        productsImage={productsImage}
        setProductsImage={setProductsImage}
        uploadImgHandler={uploadImgHandler}
        selectedProductForImage={selectedProductForImage}
        setSelectedProductForImage={setSelectedProductForImage}
      />
    </div>
  );
}

export default TablePageLoadingProduct;
