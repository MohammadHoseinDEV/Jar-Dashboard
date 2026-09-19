import React, { useState } from 'react';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';
import { IoTimeOutline } from 'react-icons/io5';
import { normalizeTime, toShamsi } from '../../../../../Time/date';
import { HiHashtag } from 'react-icons/hi';

import edit from '../../../../../assets/images/edit.png';
import form from '../../../../../assets/images/form.png';
import { SiProducthunt } from 'react-icons/si';
import { MdOutlineNumbers } from 'react-icons/md';
import { GiPathDistance } from 'react-icons/gi';
import LoadingProductImage from './LoadingProductImage';

function MobilePageLoading({
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
    <div className="hidden max-md:block print:hidden">
      {loading?.data?.map((e, index) => (
        <div
          key={e.id}
          className="mx-2 my-2 rounded-[10px] border border-white/30"
        >
          <div className="mx-1 my-2 flex items-center justify-between border-b border-white/50 px-2 pb-2">
            <div className="flex items-center space-x-3">
              <p className="rounded-full bg-[#252d5a] p-2 text-[25px] text-white/50">
                <SiProducthunt />
              </p>
              <p className="flex flex-col space-y-0.5">
                <span className="font-[AvenirLTProMedium] text-[13px] font-bold">
                  {e?.productName}
                </span>
                <span className="font-[AvenirLTProMedium] text-[12px] text-white/60">
                  {e?.productCode}
                </span>
              </p>
            </div>
          </div>
          <div className="mx-1 mb-2 grid grid-cols-2 gap-2">
            <div className="flex items-center space-x-2">
              <p className="text-[22px] text-white/50">
                <MdOutlineNumbers />
              </p>
              <p className="flex flex-col">
                <span className="text-white/50"> شماره خروجی</span>
                <span className="font-[AvenirLTProMedium]">
                  {e?.outputNumber}
                </span>
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <p className="text-[22px] text-white/50">
                <MdOutlineNumbers />
              </p>
              <p className="flex flex-col">
                <span className="text-white/50">تعداد پالت</span>
                <span className="font-[AvenirLTProMedium]">
                  {e?.palletCount}
                </span>
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <p className="text-[22px] text-white/50">
                <GiPathDistance />
              </p>
              <p className="flex flex-col">
                <span className="text-white/50">مقصد</span>
                <span className="font-[AvenirLTProMedium]">
                  {e?.destination}
                </span>
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <p className="text-[22px] text-white/50">
                <HiHashtag />
              </p>
              <p className="flex flex-col">
                <span className="text-white/50">ساعت شروع</span>
                <span className="font-[AvenirLTProMedium]">
                  {normalizeTime(e?.loadingEndTime)}
                </span>
              </p>
            </div>
          </div>
          <div className="mx-2 grid grid-cols-8 gap-2">
            <button
              onClick={() => openEdit(e)}
              className={`col-span-3 mb-2 flex cursor-pointer items-center justify-center rounded-[10px] p-1 font-[Samim] ${
                canEdit
                  ? 'cursor-pointer bg-linear-to-bl from-green-500/10 to-green-800/50 transition-all delay-100 duration-150 ease-in-out hover:scale-106'
                  : 'hidden bg-white/5 opacity-50'
              }`}
            >
              <img src={edit} alt="edit" width={20} className="mx-3 py-1" />
              <span className="pl-4">ویرایش</span>
            </button>
            <button
              onClick={() => {
                setOpenFormReport(true);
                setSelectedLoading(e);
              }}
              className="col-span-3 mb-2 flex cursor-pointer items-center justify-center rounded-[10px] bg-linear-to-bl from-white/30 to-white/70 p-1 px-7 font-[Samim] transition-all delay-100 duration-150 ease-in-out hover:scale-106"
            >
              <img src={form} alt="form" width={20} className="mx-3 py-1" />
              نمایش
            </button>
            <button
              className="col-span-2 mb-2 flex cursor-pointer items-center justify-center rounded-[10px] bg-[#e54c00] p-1 text-[14px]"
              onClick={() => uploadImgHandler(e)}
            >
              آپلود عکس
            </button>
          </div>
        </div>
      ))}
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

export default MobilePageLoading;

