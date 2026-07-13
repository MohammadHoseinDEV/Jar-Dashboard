import React from 'react';

import logo from '../../../../../assets/images/logo.png';
import { toShamsi } from '../../../../../Time/date';
import { FcCheckmark } from 'react-icons/fc';

function FormInternalDesignjsx({ selectedInternal }) {
  return (
    <div>
      {' '}
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
        <div className="flex justify-around border-b text-[12px]">
          <p>
            <span className="font-semibold">نام محصول / کدنمونه :</span>
            <span className="font-[AvenirLTProMedium] text-[10px]">
              {selectedInternal?.productNameOrSampleCode}
            </span>
          </p>
          <p>
            <span className="font-semibold">تاریخ شروع برنامه ریزی شده :</span>
            <span className="font-[AvenirLTProMedium] text-[10px]">
              {toShamsi(selectedInternal?.plannedStartDate)}
            </span>
          </p>
          <p>
            <span className="font-semibold">کل زمان پیش بینی :</span>
            <span className="font-[AvenirLTProMedium] text-[10px]">
              {selectedInternal?.estimatedTotalHours}
            </span>
          </p>
        </div>
        <div>
          <table className="w-full">
            <thead className="h-25">
              <tr className="border-b">
                <th className="-rotate-90 border-l text-[12px]">ردیف</th>
                <th className="border-l text-[15px]">فازهای طراحی</th>
                <th className="-rotate-90 border-l text-[10px]">تولید</th>
                <th className="-rotate-90 border-l text-[9px] whitespace-nowrap">
                  مسئول طراحی
                </th>
                <th className="-rotate-90 border-l text-[9px] whitespace-nowrap">
                  دفتر تهران طراحی
                </th>
                <th className="w-13 -rotate-90 border-l text-[9px]">
                  کنترل کیفیت و بسته بندی
                </th>
                <th className="-rotate-90 border-l text-[12px]">تراشکاری</th>
                <th className="-rotate-90 border-l text-[9px]">
                  <span className="whitespace-nowrap">کارتن سازی</span>
                </th>
                <th className="-rotate-90 border-l text-[9px]">فروش</th>
                <th className="-rotate-90 text-[9px] whitespace-nowrap">
                  مدیر کارخانه
                </th>
              </tr>
            </thead>
            <tbody>
              {selectedInternal?.items?.map((s) => (
                <tr key={s.id} className="">
                  <td className="border-b border-l text-center font-[AvenirLTProMedium] text-[10px]">
                    {s.rowNumber}
                  </td>
                  <td className="border-b border-l py-1 text-center text-[10px]">
                    {s.designPhase}
                  </td>
                  <td className="border-b border-l">
                    {s.production === true ? (
                      <p className="flex items-center justify-center">
                        <FcCheckmark />
                      </p>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="border-b border-l">
                    {s.designManager === true ? (
                      <p className="flex items-center justify-center">
                        <FcCheckmark />
                      </p>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="border-b border-l">
                    {s.tehranDesignOffice === true ? (
                      <p className="flex items-center justify-center">
                        <FcCheckmark />
                      </p>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="border-b border-l">
                    {s.qualityControlPackaging === true ? (
                      <p className="flex items-center justify-center">
                        <FcCheckmark />
                      </p>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="border-b border-l">
                    {s.machining === true ? (
                      <p className="flex items-center justify-center">
                        <FcCheckmark />
                      </p>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="border-b border-l">
                    {s.cartonmaking === true ? (
                      <p className="flex items-center justify-center">
                        <FcCheckmark />
                      </p>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="border-b border-l">
                    {s.sales === true ? (
                      <p className="flex items-center justify-center">
                        <FcCheckmark />
                      </p>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="border-b">
                    {s.factoryManager === true ? (
                      <p className="flex items-center justify-center">
                        <FcCheckmark />
                      </p>
                    ) : (
                      ''
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
