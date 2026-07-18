import React from 'react';

import logo from '../../../../../assets/images/logo.png';
import { toShamsi } from '../../../../../Time/date';
import { FcCheckmark } from 'react-icons/fc';

function FormDesignPhasePlanningJsx({ selectedDesign }) {
  return (
    <div
      className="border-t border-r border-l bg-white text-black"
      style={{ width: '148mm', minHeight: '210mm' }}
    >
      {/* Header */}
      <div className="grid grid-cols-4">
        <div className="flex items-center justify-center border-b border-l">
          <img src={logo} alt="logo" width={90} />
        </div>
        <div className="col-span-2 flex flex-col items-center justify-center border-b border-l">
          <p className="font-[SamimBold] text-[13px]">
            طرح ریزی فاز های طراحی واحد های خارج سازمانی
          </p>
          <p className="font-[SamimBold] text-[13px]">
            ( تهیه قالب و متعلقات داخلی )
          </p>
        </div>
        <div className="flex flex-col justify-center border-b pr-2 text-[11px]">
          <p className="space-x-1">
            <span className="font-[SamimBold]">کد سند :</span>
            <span className="font-[AvenirLTProHeavy]">M1002</span>
          </p>
          <p className="space-x-1">
            <span className="font-[SamimBold]">شماره ویرایش :</span>
            <span className="font-[AvenirLTProHeavy]">00</span>
          </p>
          <p className="space-x-1">
            <span className="font-[SamimBold]">تاریخ ویرایش :</span>
            <span className="font-[AvenirLTProHeavy]">1401/10/10</span>
          </p>
        </div>
      </div>
      {/* Date */}
      <div className="flex items-center justify-center space-x-20 border-b pr-5 text-[12px]">
        <p>
          <span className="font-semibold">زمان شروع :</span>
          <span className="font-[AvenirLTProMedium]">
            {toShamsi(selectedDesign?.startTime)}
          </span>
        </p>
        <p>
          <span className="font-semibold">زمان پایان :</span>
          <span className="font-[AvenirLTProMedium]">
            {toShamsi(selectedDesign?.endTime)}
          </span>
        </p>
      </div>
      <div className="grid grid-cols-[6%_55%_5%_5%_5%_9%_5%_5%_5%] bg-[#D9D9D9] text-center text-[10px]">
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
          <span className="-rotate-90 whitespace-nowrap">طراحی</span>
        </div>
        <div className="flex min-h-[70px] items-center justify-center border-r border-b border-black text-[9px]">
          <span className="-rotate-90 whitespace-nowrap">تامین کننده</span>
        </div>
        <div className="flex min-h-[70px] items-center justify-center border-r border-b border-black text-[9px]">
          <p className="-rotate-90">کنترل کیفیت و بسته بندی </p>
        </div>
        <div className="flex min-h-[70px] items-center justify-center border-r border-b border-black">
          <span className="-rotate-90 whitespace-nowrap">تراشکاری</span>
        </div>

        <div className="flex min-h-[70px] items-center justify-center border-r border-b border-black">
          <span className="-rotate-90 whitespace-nowrap">فروش</span>
        </div>
        <div className="flex min-h-[70px] items-center justify-center border-r border-l border-b border-black">
          <span className="-rotate-90 whitespace-nowrap">مدیر کارخانه</span>
        </div>
      </div>

      {selectedDesign?.items?.map((s) => (
        <div
          key={s.id}
          className="grid grid-cols-[6%_55%_5%_5%_5%_9%_5%_5%_5%] text-center text-[13px]"
        >
          <div className="flex items-center justify-center border-b border-black py-2 font-[AvenirLTProHeavy]">
            {s.rowNumber}
          </div>
          <div className="border-r border-b border-black px-1 py-2 text-center">
            {s.designPhase}
          </div>
          <div className="flex items-center justify-center border-r border-b border-black text-[15px]">
            {s.production ? <FcCheckmark /> : ''}
          </div>
          <div className="flex items-center justify-center border-r border-b border-black text-[15px]">
            {s.design ? <FcCheckmark /> : ''}
          </div>
          <div className="flex items-center justify-center border-r border-b border-black text-[15px]">
            {s.supplier ? <FcCheckmark /> : ''}
          </div>
          <div className="flex items-center justify-center border-r border-b border-black text-[15px]">
            {s.qualityControlPackaging ? <FcCheckmark /> : ''}
          </div>
          <div className="flex items-center justify-center border-r border-b border-black text-[15px]">
            {s.machining ? <FcCheckmark /> : ''}
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
  );
}

export default FormDesignPhasePlanningJsx;
