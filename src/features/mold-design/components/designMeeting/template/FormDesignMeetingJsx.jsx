import React, { useMemo } from 'react';

import logo from '../../../../../assets/images/logo.png';
import { toShamsi } from '../../../../../Time/date';

function FormDesignMeetingJsx({ selectedDesignMeeting }) {
  const rows = useMemo(() => {
    const arr = [...(selectedDesignMeeting?.decisions ?? [])];

    while (arr.length < 8) {
      arr.push({});
    }

    return arr.slice(0, 8);
  }, [selectedDesignMeeting]);
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
          <h1 className="font-[SamimBold] text-[15px]">فرم صورتجلسه طراحی </h1>
        </div>
        <div className="flex flex-col justify-center border-b pr-2 text-[11px]">
          <p className="space-x-1">
            <span className="font-[SamimBold]">کد سند :</span>
            <span className="font-[AvenirLTProHeavy]">F1005</span>
          </p>
          <p className="space-x-1">
            <span className="font-[SamimBold]">شماره ویرایش :</span>
            <span className="font-[AvenirLTProHeavy]">02</span>
          </p>
          <p className="space-x-1">
            <span className="font-[SamimBold]">تاریخ ویرایش :</span>
            <span className="font-[AvenirLTProHeavy]">1402/12/15</span>
          </p>
        </div>
      </div>
      <div className="flex items-center justify-around gap-2 px-2 text-[11px]">
        <p>
          <span className="font-bold">نام محصول :</span>
          <span className="font-[AvenirLTProMedium]">
            {selectedDesignMeeting?.productName}
          </span>
        </p>
        <p>
          <span className="font-bold">کد محصول :</span>
          <span className="font-[AvenirLTProMedium]">
            {selectedDesignMeeting?.productCode}
          </span>
        </p>
        <p>
          <span className="font-bold">شماره فرم داده های به طراحی :</span>
          <span className="font-[AvenirLTProMedium]">
            {selectedDesignMeeting?.dataFormNumber}
          </span>
        </p>
      </div>
      <div className="grid grid-cols-4 gap-2 border-b p-2 text-[11px]">
        <p className="col-span-2">
          <span className="font-bold">تاریخ جلسه :</span>
          <span className="font-[AvenirLTProMedium]">
            {toShamsi(selectedDesignMeeting?.meetingDate)}
          </span>
        </p>
        <p>
          <span className="font-bold">فاز طراحی :</span>
          <span className="font-[AvenirLTProMedium]">
            {selectedDesignMeeting?.designPhase}
          </span>
        </p>
      </div>
      <div className="flex items-center justify-start space-x-1 border-b px-1 pb-2 text-justify text-[11px]">
        <p className="font-bold">اعضاء حاضر در جلسه :</p>
        <p>{selectedDesignMeeting?.participants}</p>
      </div>
      <div className="grid grid-cols-[10%_80%_10%] text-center text-[14px]">
        <div className="border-b border-l font-bold">ردیف</div>
        <div className="border-b border-l font-bold">کنترل های انجام شده</div>
        <div className="border-b font-bold">نتیجه</div>
      </div>
      <div className="grid grid-cols-[10%_80%_10%] text-center">
        <div className="border-b border-l font-[AvenirLTProMedium] text-[13px]">
          <p className="border-b">1</p>
          <p className="border-b">2</p>
          <p className="border-b">3</p>
          <p className="border-b">4</p>
          <p className="border-b">5</p>
          <p className="border-b">6</p>
          <p className="border-b">7</p>
          <p className="border-b">8</p>
          <p className="border-b">9</p>
          <p className="border-b">10</p>
          <p className="border-b">11</p>
          <p className="border-b">12</p>
          <p className="border-b">13</p>
          <p className="border-b">14</p>
          <p className="border-b">15</p>
          <p>16</p>
        </div>
        <div className="border-b border-l text-center text-[13px]">
          <p className="border-b px-1">وزن</p>
          <p className="border-b px-1">تلرانس محصول</p>
          <p className="border-b px-1">عمر قالب</p>
          <p className="border-b px-1">نمونه گچی</p>
          <p className="border-b px-1">کولینگ پلانچر</p>
          <p className="border-b px-1">بررسی هلدر قالب</p>
          <p className="border-b px-1">بررسی هلدر بلنک</p>
          <p className="border-b px-1">اینورت و H قالب</p>
          <p className="border-b px-1">اینورت و H بلنک</p>
          <p className="border-b px-1">
            بررسی فاصله پیچ آفست تا زیر شیار هنگ،قالب و بلنک
          </p>
          <p className="border-b px-1">دهانه داخلی محصول</p>
          <p className="border-b px-1">ران پاریزون</p>
          <p className="border-b px-1">هلدر بافل</p>
          <p className="border-b px-1">تلرانس نک رینگ ،گاید رینگ ، پلانجر</p>
          <p className="border-b px-1">تلرانس گلویی قالب ،بلنک و نک رینگ</p>
          <p className="px-1">متریال متعلقات</p>
        </div>
        <div>
          <p className="flex items-center justify-center border-b text-[13px]">
            {selectedDesignMeeting?.weightOk === true ? 'OK' : 'N.OK'}
          </p>
          <p className="flex items-center justify-center border-b text-[13px]">
            {selectedDesignMeeting?.productToleranceOk === true ? 'OK' : 'N.OK'}
          </p>
          <p className="flex items-center justify-center border-b text-[13px]">
            {selectedDesignMeeting?.moldLifetimeOk === true ? 'OK' : 'N.OK'}
          </p>
          <p className="flex items-center justify-center border-b text-[13px]">
            {selectedDesignMeeting?.gypsumSampleOk === true ? 'OK' : 'N.OK'}
          </p>
          <p className="flex items-center justify-center border-b text-[13px]">
            {selectedDesignMeeting?.coolingPlungerOk === true ? 'OK' : 'N.OK'}
          </p>
          <p className="flex items-center justify-center border-b text-[13px]">
            {selectedDesignMeeting?.moldHolderCheckOk === true ? 'OK' : 'N.OK'}
          </p>
          <p className="flex items-center justify-center border-b text-[13px]">
            {selectedDesignMeeting?.blankHolderCheckOk === true ? 'OK' : 'N.OK'}
          </p>
          <p className="flex items-center justify-center border-b text-[13px]">
            {selectedDesignMeeting?.invertAndMoldHOk === true ? 'OK' : 'N.OK'}
          </p>
          <p className="flex items-center justify-center border-b text-[13px]">
            {selectedDesignMeeting?.invertAndBlankHOk === true ? 'OK' : 'N.OK'}
          </p>
          <p className="flex items-center justify-center border-b text-[13px]">
            {selectedDesignMeeting?.offsetScrewToHangGrooveDistanceCheckOk ===
            true
              ? 'OK'
              : 'N.OK'}
          </p>
          <p className="flex items-center justify-center border-b text-[13px]">
            {selectedDesignMeeting?.insideProductMouthOk === true
              ? 'OK'
              : 'N.OK'}
          </p>
          <p className="flex items-center justify-center border-b text-[13px]">
            {selectedDesignMeeting?.parisonRunnerOk === true ? 'OK' : 'N.OK'}
          </p>
          <p className="flex items-center justify-center border-b text-[13px]">
            {selectedDesignMeeting?.baffleHolderOk === true ? 'OK' : 'N.OK'}
          </p>
          <p className="flex items-center justify-center border-b text-[13px]">
            {selectedDesignMeeting?.neckRingGuideRingPlungerToleranceOk === true
              ? 'OK'
              : 'N.OK'}
          </p>
          <p className="flex items-center justify-center border-b text-[13px]">
            {selectedDesignMeeting?.blankMoldAndNeckRingThroatToleranceOk ===
            true
              ? 'OK'
              : 'N.OK'}
          </p>
          <p className="flex items-center justify-center border-b text-[13px]">
            {selectedDesignMeeting?.accessoriesMaterialOk === true
              ? 'OK'
              : 'N.OK'}
          </p>
        </div>
      </div>
      <div>
        <table className="my-1 w-full border-t border-b">
          <thead>
            <tr className="border-b text-[12px]">
              <th className="w-14 border-l font-bold">ردیف</th>
              <th className="w-55 border-l font-bold">تصمیمات اخذ شده</th>
              <th className="border-l font-bold">مسئول اجرا</th>
              <th className="w-18 border-l font-bold">مهلت انجام</th>
              <th className="font-bold">ملاحظات</th>
            </tr>
          </thead>
          <tbody>
            {rows?.map((d, index) => (
              <tr className="h-8 border-b text-center text-[12px]" key={index}>
                <td className="border-l font-[AvenirLTProHeavy]">
                  {index + 1}
                </td>
                <td className="border-l">{d?.decision}</td>
                <td className="border-l">{d?.responsible}</td>
                <td className="border-l">{d?.deadline}</td>
                <td>{d?.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center space-x-1 px-1 text-[13px]">
        <p className="font-bold">
          محصول فوق نیاز به ارزیابی ریسک مطابق فرم "چک لیست کنترل ریسک"
        </p>
        <p className="font-bold">
          {selectedDesignMeeting?.productNeedsRiskAssessmentOk === true
            ? 'دارد'
            : 'ندارد'}
          .
        </p>
      </div>
    </div>
  );
}

export default FormDesignMeetingJsx;
