import React from 'react';

import logo from '../../../../../assets/images/logo.png';
import { toShamsi } from '../../../../../Time/date';
import { FcCheckmark } from 'react-icons/fc';

function FormInternalDesignjsx({ selectedInternal }) {
  return (
    <div>
      <div
        className="border bg-white text-black"
        style={{ width: '148mm', minHeight: '210mm' }}
      >
        {/* Header */}
        <div className="grid grid-cols-4">
          <div className="flex items-center justify-center border-b border-l">
            <img src={logo} alt="logo" width={90} />
          </div>
          <div className="col-span-2 flex flex-col items-center justify-center border-b border-l">
            <p className="font-[SamimBold] text-[13px]">
              طرح ریزی فاز های طراحی و واحدهای سازمانی
            </p>
            <p className="font-[SamimBold] text-[13px]">
              ( تهیه قالب و متعلقات داخلی )
            </p>
          </div>
          <div className="flex flex-col justify-center border-b pr-2 text-[11px]">
            <p className="space-x-1">
              <span className="font-[SamimBold]">کد سند :</span>
              <span className="font-[AvenirLTProHeavy]">M1001</span>
            </p>
            <p className="space-x-1">
              <span className="font-[SamimBold]">شماره ویرایش :</span>
              <span className="font-[AvenirLTProHeavy]">02</span>
            </p>
            <p className="space-x-1">
              <span className="font-[SamimBold]">تاریخ ویرایش :</span>
              <span className="font-[AvenirLTProHeavy]">1402/06/06</span>
            </p>
          </div>
        </div>
        {/* Date */}
        <div className="flex space-x-20 border-b pr-5 text-[12px]">
          <p>
            <span className="font-semibold">زمان شروع :</span>
            <span className="font-[AvenirLTProMedium]">
              {toShamsi(selectedInternal?.startTime)}
            </span>
          </p>
          <p>
            <span className="font-semibold">زمان پایان :</span>
            <span className="font-[AvenirLTProMedium]">
              {toShamsi(selectedInternal?.endTime)}
            </span>
          </p>
        </div>
        <div className="flex items-center justify-around border-b py-1 text-[9px]">
          <p>
            <span className="font-bold">نام محصول / کد نمونه :</span>
            <span className="font-[AvenirLTProHeavy]">
              {selectedInternal?.productNameOrSampleCode}
            </span>
          </p>
          <p>
            <span className="font-bold">تاریخ شروع برنامه ریزی شده :</span>
            <span className="font-[AvenirLTProHeavy]">
              {toShamsi(selectedInternal?.plannedStartDate)}
            </span>
          </p>
          <p>
            <span className="font-bold">کل زمان پیش بینی :</span>
            <span className="font-[AvenirLTProHeavy]">
              {selectedInternal?.estimatedTotalHours}
            </span>
          </p>
        </div>
        <div>
          <div className="grid grid-cols-[6%_50%_5%_5%_5%_9%_5%_5%_5%_5%] bg-[#D9D9D9] text-center text-[10px]">
            <div className="flex min-h-[70px] items-center justify-center border-b border-black">
              <span className="-rotate-90 whitespace-nowrap">ردیف</span>
            </div>
            <div className="flex items-center justify-center border-r border-b border-black text-[15px]">
              فازهای طراحی
            </div>
            <div className="flex min-h-[70px] items-center justify-center border-r border-b border-black">
              <span className="-rotate-90 whitespace-nowrap">تولید</span>
            </div>
            <div className="flex min-h-[70px] items-center justify-center border-r border-b border-black">
              <span className="-rotate-90 whitespace-nowrap">مسئول طراحی</span>
            </div>
            <div className="flex min-h-[70px] items-center justify-center border-r border-b border-black text-[9px]">
              <span className="-rotate-90 whitespace-nowrap">
                دفتر تهران طراحی
              </span>
            </div>
            <div className="flex min-h-[70px] items-center justify-center border-r border-b border-black text-[9px]">
              <p className="-rotate-90">کنترل کیفیت و بسته بندی </p>
            </div>
            <div className="flex min-h-[70px] items-center justify-center border-r border-b border-black">
              <span className="-rotate-90 whitespace-nowrap">تراشکاری</span>
            </div>
            <div className="flex min-h-[70px] items-center justify-center border-r border-b border-black">
              <span className="-rotate-90 whitespace-nowrap">کارتن سازی</span>
            </div>
            <div className="flex min-h-[70px] items-center justify-center border-r border-b border-black">
              <span className="-rotate-90 whitespace-nowrap">فروش</span>
            </div>
            <div className="flex min-h-[70px] items-center justify-center border-r border-b border-black">
              <span className="-rotate-90 whitespace-nowrap">مدیر کارخانه</span>
            </div>
          </div>

          {selectedInternal?.items?.map((s) => (
            <div
              key={s.id}
              className="grid grid-cols-[6%_50%_5%_5%_5%_9%_5%_5%_5%_5%] text-center text-[10px]"
            >
              <div className="flex items-center justify-center border-b border-black py-2 font-[AvenirLTProHeavy]">
                {s.rowNumber}
              </div>
              <div className="border-r border-b border-black px-1 py-1 text-center">
                {s.designPhase}
              </div>
              <div className="flex items-center justify-center border-r border-b border-black text-[15px]">
                {s.production ? <FcCheckmark /> : ''}
              </div>
              <div className="flex items-center justify-center border-r border-b border-black text-[15px]">
                {s.designManager ? <FcCheckmark /> : ''}
              </div>
              <div className="flex items-center justify-center border-r border-b border-black text-[15px]">
                {s.tehranDesignOffice ? <FcCheckmark /> : ''}
              </div>
              <div className="flex items-center justify-center border-r border-b border-black text-[15px]">
                {s.qualityControlPackaging ? <FcCheckmark /> : ''}
              </div>
              <div className="flex items-center justify-center border-r border-b border-black text-[15px]">
                {s.machining ? <FcCheckmark /> : ''}
              </div>
              <div className="flex items-center justify-center border-r border-b border-black text-[15px]">
                {s.cartonmaking ? <FcCheckmark /> : ''}
              </div>
              <div className="flex items-center justify-center border-r border-b border-black text-[15px]">
                {s.sales ? <FcCheckmark /> : ''}
              </div>
              <div className="flex items-center justify-center border-r border-b border-black text-[15px]">
                {s.factoryManager ? <FcCheckmark /> : ''}
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center space-x-1 pt-2 text-[13px]">
          <p className="pr-1 font-bold">
            تاریخ پایان واقعی (صحه گذاری محصول) :
          </p>
          <p className="font-[AvenirLTProMedium]">
            {toShamsi(selectedInternal?.actualEndDate)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default FormInternalDesignjsx;
