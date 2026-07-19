import React from 'react';

import logo from '../../../../../assets/images/logo.png';
import { normalizeTime, toShamsi } from '../../../../../Time/date';

function FormDesignWorkRequestJsx({ selectedWorkRequest }) {
  console.log(selectedWorkRequest);
  return (
    <div
      className="border bg-white text-black"
      style={{ width: '148mm', minHeight: '210mm' }}
    >
      {/* Header */}
      <div className="grid grid-cols-4">
        <div className="flex items-center justify-center border-b border-l">
          <img src={logo} alt="logo" width={90} />
        </div>
        <div className="col-span-2 flex items-center justify-center border-b border-l">
          <h1 className="font-[SamimBold] text-[15px]">
            فرم درخواست کار واحد طراحی
          </h1>
        </div>
        <div className="flex flex-col justify-center border-b pr-2 text-[11px]">
          <p className="space-x-1">
            <span className="font-[SamimBold]">کد سند :</span>
            <span className="font-[AvenirLTProHeavy]">F1002</span>
          </p>
          <p className="space-x-1">
            <span className="font-[SamimBold]">شماره ویرایش :</span>
            <span className="font-[AvenirLTProHeavy]">00</span>
          </p>
          <p className="space-x-1">
            <span className="font-[SamimBold]">تاریخ ویرایش :</span>
            <span className="font-[AvenirLTProHeavy]">1401/05/01</span>
          </p>
        </div>
      </div>
      {/* Date & Number */}
      <div className="flex items-center justify-around text-[12px]">
        <p className="flex items-center space-x-1">
          <span className="font-bold">تاریخ :</span>
          <span className="font-[AvenirLTProMedium] text-[#3B82F6]">
            {toShamsi(selectedWorkRequest?.requestDate)}
          </span>
        </p>
        <p className="flex items-center space-x-1">
          <span className="font-bold">شماره :</span>
          <span className="font-[AvenirLTProMedium] text-[#3B82F6]">
            {selectedWorkRequest?.formNumber}
          </span>
        </p>
      </div>
      {/* Request */}
      <div className="grid h-60 grid-cols-[5%_95%]">
        <div className="flex items-center justify-center border-t border-b border-l">
          <p className="-rotate-90 text-[12px] font-bold">درخواست</p>
        </div>
        <div className="border-t border-b p-1 text-[13px]">
          <p className="flex items-center space-x-1">
            <span>واحد درخواست کننده :</span>
            <span className="text-[#3B82F6]">
              {selectedWorkRequest?.requestingUnit}
            </span>
          </p>
          <p className="flex items-center space-x-1">
            <span>ساعت در خواست :</span>
            <span className="font-[AvenirLTProMedium] text-[#3B82F6]">
              {normalizeTime(selectedWorkRequest?.requestTime)}
            </span>
          </p>
          <div className="grid grid-cols-5">
            <div className="col-span-2">
              <p>شرح درخواست :</p>
            </div>
            <p className="flex items-center space-x-1">
              <span>پیوست</span>
              <span className="text-[#3B82F6]">
                {selectedWorkRequest?.hasAttachment === true ? 'دارد' : 'ندارد'}
              </span>
            </p>
            <p className="col-span-2">
              <span>پیوست :</span>
            </p>
          </div>
          <div className="grid h-36 grid-cols-2 space-y-1 text-justify text-[10px]">
            <p className="px-1 text-[#3B82F6]">
              {selectedWorkRequest?.requestDescription === 'string' || ''
                ? 'بدون شرح درخواست'
                : ''}
            </p>
            <p className="px-1 text-[#3B82F6]"></p>
          </div>
          <div className="grid grid-cols-2">
            <p>
              <span>نام و امضاء درخواست کننده :</span>
              <span></span>
            </p>
            <p>
              <span>تایید مدیریت :</span>
              <span></span>
            </p>
          </div>
        </div>
      </div>
      {/* Designer */}
      <div className="grid h-60 grid-cols-[5%_95%]">
        <div className="flex items-center justify-center border-b border-l">
          <span className="-rotate-90 text-[12px] font-bold whitespace-nowrap">
            نظریه واحد طراحی
          </span>
        </div>
        <div className="border-b p-1 text-[12px]">
          <div>
            <p>درصورت موافقت اولویت انجام کار :</p>
            <p></p>
          </div>
          <div className="">
            <p>توضیحات :</p>
            <p className="h-40 text-justify text-[#3B82F6]"></p>
          </div>
          <div className="flex items-center justify-center pt-1 pr-30">
            <p>امضاء سرپرست طراحی :</p>
            <p></p>
          </div>
        </div>
      </div>
      {/* Designer S3 */}
      <div className="grid h-60 grid-cols-[5%_95%]">
        <div className="flex items-center justify-center border-b border-l">
          <span className="-rotate-90 text-[12px] font-bold whitespace-nowrap">
            رسید واحد طراحی
          </span>
        </div>
        <div className="space-y-1 p-1 text-[12px]">
          <div>
            <p>تاریخ تحویل کار به واحد درخواست کننده :</p>
            <p></p>
          </div>
          <div className="">
            <p>ساعت تحویل کار :</p>
            <p className="text-justify text-[#3B82F6]"></p>
          </div>
          <div>
            <p>پیش بینی زمان تحویل کار :</p>
            <p></p>
          </div>
          <div className="h-35 text-justify">
            <p>توضیحات :</p>
            <p></p>
          </div>
          <div className="flex items-center justify-center pt-1 pr-30">
            <p>امضاء تحویل گیرنده :</p>
            <p></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormDesignWorkRequestJsx;
