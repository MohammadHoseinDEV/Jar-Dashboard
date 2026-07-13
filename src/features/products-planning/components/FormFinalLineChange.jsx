import { useSignatureVerify } from '../../../hooks/Signature/Signature';
import { toShamsi } from '../../../Time/date';

import logo from '../../../assets/images/logo.png';
import close from '../../../assets/images/close.png';
import React, { useState } from 'react';
import { useGetProfile } from '../../../hooks/profile/profile';

function FormFinalLineChange({ openForm, setOpenForm, selectedLine }) {
  const [selectedSignature, setSelectedSignature] = useState(null);
  const [selectedManegerSignature, setSelectedManagerSignature] =
    useState(null);

  const [signType, setSigntType] = useState(null);

  const [openCode, setOpenCode] = useState(false);
  const [password, setPassword] = useState('');

  const verifySignature = useSignatureVerify();
  const { data: profile } = useGetProfile();

  const rows = React.useMemo(() => {
    const arr = [...(selectedLine?.lineChangeDetails ?? [])];

    while (arr.length < 3) {
      arr.push({});
    }

    return arr.slice(0, 3);
  }, [selectedLine]);

  const closeHandler = () => {
    setOpenForm(false);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
        openForm
          ? 'pointer-events-auto opacity-100 '
          : 'pointer-events-none opacity-0'
      }`}
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        onClick={closeHandler}
      />

      <div
        className={`relative transform rounded-[15px] bg-white p-6 text-white shadow-2xl transition-all duration-300 print:scale-125 ${
          openForm
            ? 'translate-y-0 scale-120 opacity-100 print:mt-10 print:scale-120 print:scale-x-140'
            : '-translate-y-10 scale-0 opacity-0'
        }`}
      >
        <div
          className="border-2 bg-white text-black"
          style={{ width: '205mm', minHeight: '148mm' }}
        >
          {/* logo & hedear */}
          <div className="grid grid-cols-4">
            <div className="flex items-center justify-center border-b border-l">
              <img src={logo} alt="logo" width={150} className="scale-90" />
            </div>
            <div className="col-span-2 flex items-center justify-center border-b border-l">
              <h1 className="font-[SamimBold] text-[20px]">
                فرم اعلام قطعی زمان تعویض خط
              </h1>
            </div>

            <div className="flex flex-col justify-center border-b pr-2">
              <p className="space-x-1">
                <span className="font-[SamimBold]">کد سند :</span>
                <span className="font-[AvenirLTProHeavy]">F0203</span>
              </p>
              <p className="space-x-1">
                <span className="font-[SamimBold]">شماره بازنگری :</span>
                <span className="font-[AvenirLTProHeavy]">01</span>
              </p>
              <p className="space-x-1">
                <span className="font-[SamimBold]">تاریخ بازنگری :</span>
                <span className="font-[AvenirLTProHeavy]">1402/06/12</span>
              </p>
            </div>
          </div>
          {/* date & number & code */}
          <div className="flex space-x-40 pt-3">
            <p className="flex items-center justify-center space-x-1">
              <span className="font-[VazirLight] text-[14px]">تاریخ :</span>
              <span className="font-[AvenirLTProMedium] text-[13px]">
                {toShamsi(selectedLine?.formDate)}
              </span>
            </p>
            <p className="flex items-center justify-center space-x-1">
              <span className="text-[14px]">شماره :</span>
              <span className="font-[AvenirLTProMedium] text-[13px]">
                {selectedLine?.id}
              </span>
            </p>
          </div>
          <h1 className="pr-2 font-[SamimBold]">
            مدیریت محترم کاویان جار ساچی
          </h1>
          <p className="pt-1 pr-2 font-[VazirLight] text-[14px]">
            با سلام و احترام
          </p>
          <p className="pt-1 pr-2 font-[VazirLight] text-[14px]">
            پیش بینی زمان تعویض خط جهت صدور دستورات مقتضی، به شرح ذیل حضور
            محترمتان اعلام میگردد.
          </p>
          <p className="pt-1 pr-2 font-[VazirLight] text-[14px]">
            لازم به ذکر است پیش بینی بر اساس میانگین تولید بوده و بدون احتساب
            توقفات احتمالی و کاهش یا افزایش راندمان تولید می باشد.
          </p>

          <div className="pt-5">
            <table className="w-full">
              <thead className="w-full border-separate border-spacing-y-2 px-5">
                <tr className="text-center">
                  <td className="w-16 border-t border-b border-l px-1 py-1 text-[13px]">
                    شماره خط
                  </td>
                  <td className="w-40 border-t border-b border-l py-1 text-[13px]">
                    نام محصول فعلی
                  </td>
                  <td className="w-40 border-t border-b border-l py-1 text-[13px]">
                    نام محصول بعدی
                  </td>
                  <td className="border-t border-b border-l py-1 text-[13px]">
                    میانگین تولید در هرشیفت
                  </td>
                  <td className="border-t border-b border-l py-1 text-[13px]">
                    مانده تولید
                  </td>
                  <td className="p border-t border-b border-l py-1 text-[13px]">
                    تاریخ تعویض
                  </td>
                  <td className="border-t border-b py-1 text-[13px]">
                    ساعت تعویض
                  </td>
                </tr>
              </thead>
              <tbody>
                {rows.map((line, index) => (
                  <tr key={line.id ?? index} className="h-8">
                    <td className="border-b border-l py-1 pl-1 text-center font-[AvenirLTProMedium] text-[13px]">
                      {line.lineNumber ?? ''}
                    </td>

                    <td className="border-b border-l py-1 pl-1 text-center font-[AvenirLTProMedium] text-[13px]">
                      {line.currentProductName ?? ''}
                    </td>

                    <td className="border-b border-l py-1 pl-1 text-center font-[AvenirLTProMedium] text-[13px]">
                      {line.nextProductName ?? ''}
                    </td>

                    <td className="border-b border-l py-1 pl-1 text-center font-[AvenirLTProMedium] text-[13px]">
                      {line.averageProductionPerShift ?? ''}
                    </td>

                    <td className="border-b border-l py-1 pl-1 text-center font-[AvenirLTProMedium] text-[13px]">
                      {line.remainingProduction ?? ''}
                    </td>

                    <td className="border-b border-l py-1 pl-1 text-center font-[AvenirLTProMedium] text-[13px]">
                      {line.lineChangeDate ? toShamsi(line.lineChangeDate) : ''}
                    </td>

                    <td className="border-b py-1 pl-1 text-center font-[AvenirLTProMedium] text-[13px]">
                      {line.lineChangeTime ?? ''}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="grid grid-cols-2 border-b">
            <p className="space-x-2">
              <span className="pr-2">توضیحات :</span>
              <span className="">{selectedLine?.description}</span>
            </p>
            <p className="flex items-center justify-center pt-6 pb-2">
              <span>امضاء مسئول برنامه ریزی :</span>
              <span>
                {selectedSignature ? (
                  <img
                    src={`data:image/png;base64,${selectedSignature}`}
                    alt="signature"
                    width={180}
                    className="fixed top-95 left-px"
                  />
                ) : (
                  <button
                    onClick={() => {
                      setSigntType('planner');
                      setOpenCode(true);
                    }}
                  >
                    ثبت امضاء
                  </button>
                )}
              </span>
            </p>
          </div>
          <div className="grid grid-cols-3 border-b pt-16 pr-2">
            <p className="col-span-3 mb-4 flex items-center">
              <span>امضاء مدیر کارخانه:</span>
              <span>
                {selectedManegerSignature ? (
                  <img
                    src={`data:image/png;base64,${selectedManegerSignature}`}
                    alt="signature"
                    width={180}
                    className="fixed top-108"
                  />
                ) : (
                  <button
                    onClick={() => {
                      setSigntType('manager');
                      setOpenCode(true);
                    }}
                  >
                    ثبت امضاء
                  </button>
                )}
              </span>
            </p>
          </div>
          <p className="flex items-center pr-2 text-[13px]">
            توزیع نسخ : تولید- مدیرفنی-کوره-بسته بندی-پشتیبانی تولید و فنی-
            تراشکاری-بچ پلانت-اقلام بسته بندی-pm- موارد ریزی
          </p>
        </div>
      </div>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
          openCode ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
        <div
          className={`relative transform rounded-[15px] bg-linear-to-br from-black to-gray-600 p-6 text-white shadow-2xl transition-all duration-300 ${
            openCode
              ? 'translate-y-0 scale-100 opacity-100'
              : '-translate-y-10 scale-95 opacity-0'
          }`}
        >
          <div className="flex items-center justify-between pb-5">
            <h1>کد امضاء</h1>
            <span
              onClick={() => {
                setOpenCode(false);
              }}
              className="cursor-pointer rounded-[10px] bg-white/80 p-1.5 text-[30px] text-red-500 transition-all delay-100 duration-75 ease-in-out hover:bg-black"
            >
              <img src={close} alt="close" width={20} />
            </span>
          </div>

          <input
            type="text"
            placeholder="ثبت کدامضاء"
            autoComplete="off"
            name="signaturePassword"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="m-2 w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
          />

          <button
            // onClick={handleVerifySignature}
            className="float-left mt-2 cursor-pointer rounded-[10px] bg-green-500 p-2 transition-all delay-75 duration-100 hover:bg-green-700"
          >
            تایید
          </button>
        </div>
      </div>
    </div>
  );
}

export default FormFinalLineChange;
