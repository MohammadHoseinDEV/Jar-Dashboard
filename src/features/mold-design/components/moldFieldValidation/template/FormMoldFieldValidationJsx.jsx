import React from 'react';

import logo from '../../../../../assets/images/logo.png';
import close from '../../../../../assets/images/close.png';
import { toShamsi } from '../../../../../Time/date';

function FormMoldFieldValidationJsx({
  selectedMold,
  openCode,
  setOpenCode,
  password,
  setPassword,
  signatureType,
  setSignatureType,
  handleOpenSignatureModal,
  handleSubmitSign,
  selectedSignDesigner,
  canSignDesigner,
  selectedSignProductionManager,
  canSignProductionManager,
}) {
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
            فرم صحه گذاری میدانی قالب
          </h1>
        </div>
        <div className="flex flex-col justify-center border-b pr-2 text-[11px]">
          <p className="space-x-1">
            <span className="font-[SamimBold]">کد سند :</span>
            <span className="font-[AvenirLTProHeavy]">F1008</span>
          </p>
          <p className="space-x-1">
            <span className="font-[SamimBold]">شماره ویرایش :</span>
            <span className="font-[AvenirLTProHeavy]">02</span>
          </p>
          <p className="space-x-1">
            <span className="font-[SamimBold]">تاریخ ویرایش :</span>
            <span className="font-[AvenirLTProHeavy]">1402/11/15</span>
          </p>
        </div>
      </div>
      <div className="flex items-center justify-around border-b text-[12px]">
        <p className="space-x-1">
          <span>تاریخ :</span>
          <span className="font-[AvenirLTProHeavy]">
            {toShamsi(selectedMold?.formDate)}
          </span>
        </p>
        <p className="space-x-1">
          <span>شماره :</span>
          <span className="font-[AvenirLTProHeavy]">
            {selectedMold?.formNumber}
          </span>
        </p>
      </div>
      <div className="flex items-center justify-around border-b text-[12px]">
        <p className="space-x-1">
          <span>نام محصول :</span>
          <span className="font-[AvenirLTProHeavy]">
            {selectedMold?.productName}
          </span>
        </p>
        <p className="space-x-1">
          <span>کد محصول :</span>
          <span className="font-[AvenirLTProHeavy]">
            {selectedMold?.productCode}
          </span>
        </p>
        <p className="space-x-1">
          <span>کد قالب :</span>
          <span className="font-[AvenirLTProHeavy]">
            {selectedMold?.moldCode}
          </span>
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-x-1 px-1 py-1 text-[14px]">
        <p>
          {`با توجه به نتایج صحه گذاری مطابق کنترل های زیر در تاریخ ${toShamsi(selectedMold?.validationDate)} به تعداد ${selectedMold?.quantity} تولید صورت گرفت که نتیجه به شرح زیر می باشد :`}
        </p>
      </div>
      <div>
        <div className="grid grid-cols-[10%_70%_20%] border-t border-b text-center">
          <div className="border-l font-bold">ردیف</div>
          <div className="border-l font-bold">آیتم کنترلی</div>
          <div className="font-bold">نتیجه</div>
        </div>
        <div className="grid grid-cols-[10%_70%_20%] text-center">
          <div className="border-b border-l font-[AvenirLTProMedium]">
            <p className="border-b py-1.5">1</p>
            <p className="border-b py-1.5">2</p>
            <p className="border-b py-1.5">3</p>
            <p className="border-b py-1.5">4</p>
            <p className="border-b py-1.5">5</p>
            <p className="border-b py-1.5">6</p>
            <p className="py-1.5">7</p>
          </div>
          <div className="border-l">
            <p className="border-b py-1.5">وزن محصول</p>
            <p className="border-b py-1.5">بسته بندی محصول</p>
            <p className="border-b py-1.5">راندمان</p>
            <p className="border-b py-1.5">کیفیت محصول</p>
            <p className="border-b py-1.5">ابعاد محصول</p>
            <p className="border-b py-1.5">ارزیابی پسماند های بسته بندی</p>
            <p className="border-b py-1.5">ارزیابی مصرف انرژی</p>
          </div>
          <div>
            <p className="border-b py-1.5">
              {selectedMold?.productWeightOk === true ? 'OK' : 'N.OK'}
            </p>
            <p className="border-b py-1.5">
              {selectedMold?.productPackagingOk === true ? 'OK' : 'N.OK'}
            </p>
            <p className="border-b py-1.5">
              {selectedMold?.efficiencyOk === true ? 'OK' : 'N.Ok'}
            </p>
            <p className="border-b py-1.5">
              {selectedMold?.productQualityOk === true ? 'OK' : 'N.Ok'}
            </p>
            <p className="border-b py-1.5">
              {selectedMold?.productDimensionsOk === true ? 'OK' : 'N.Ok'}
            </p>
            <p className="border-b py-1.5">
              {selectedMold?.packagingWasteAssessmentOk === true
                ? 'OK'
                : 'N.Ok'}
            </p>
            <p className="border-b py-1.5">
              {selectedMold?.energyConsumptionAssessmentOk === true
                ? 'OK'
                : 'N.Ok'}
            </p>
          </div>
        </div>
      </div>
      <div className="text-[13px border-b px-1 py-3 text-justify">
        {`نقشه های قالب و متعلقات مورد تایید ${selectedMold?.moldDrawingsAndAccessoriesApproved === true ? 'می باشد' : 'نمی باشد'} دستورالعمل های راه اندازی و تولید مورد تایید ${selectedMold?.startupAndProductionInstructionsApproved ? 'می باشد' : 'نمی باشد'}`}
      </div>
      <div className="space-y-1">
        <p className="p-1 font-bold">
          ملاحظات (شرح تغییرات مورد نیاز به شرح ذیر می باشد) :
        </p>
        <p className="flex items-center space-x-1 px-1 text-[15px]">
          <span>شدت آلایندگی پسماند :</span>
          <span>
            {selectedMold?.wastePollutionHigh === true ? 'سطح 1' : 'سطح 3'}
          </span>
        </p>
        <div className="flex items-center space-x-1 px-1 text-[15px]">
          <p>شدت مصرف انرژی :</p>
          <div className="flex items-center space-x-1">
            <p>پر مصرف</p>
            <p
              className={`size-6 rounded-full font-[Samim] text-[18px] ${
                selectedMold?.energyConsumptionIntensity === 1
                  ? 'bg-black'
                  : 'border-2 bg-white'
              }`}
            ></p>
          </div>
          <div className="flex items-center space-x-1">
            <p>مصرف متوسط</p>
            <p
              className={`size-6 rounded-full font-[Samim] text-[18px] ${
                selectedMold?.energyConsumptionIntensity === 2
                  ? 'bg-black'
                  : 'border-2 bg-white'
              }`}
            ></p>
          </div>
          <div className="flex items-center space-x-1">
            <p>کم مصرف</p>
            <p
              className={`size-6 rounded-full font-[Samim] text-[18px] ${
                selectedMold?.energyConsumptionIntensity === 3
                  ? 'bg-black'
                  : 'border-2 bg-white'
              }`}
            ></p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 border-b pt-10 pb-1">
        <div className="flex items-center space-x-1 px-1">
          <p>تاریخ :</p>
          <p className="font-[AvenirLTProMedium]">
            {toShamsi(selectedMold?.productionManagerSignedAt)}
          </p>
        </div>
        <div className="flex items-center space-x-1">
          <p>امضاء مدیر تولید :</p>
          <p>
            {selectedSignProductionManager ? (
              <img
                src={`data:image/png;base64,${selectedSignProductionManager}`}
                alt="signature"
                className="fixed bottom-37 left-10 h-21 w-30"
              />
            ) : canSignProductionManager ? (
              <button
                onClick={() => handleOpenSignatureModal('productionManager')}
                className="mr-3 cursor-pointer rounded-[10px] bg-linear-to-br from-cyan-400 to-black/10 p-1 text-[12px] transition-all delay-75 duration-100 ease-in-out hover:scale-110"
              >
                ثبت امضاء
              </button>
            ) : (
              <span className="rounded-[10px] bg-red-500 p-1 text-[10px] print:hidden">
                عدم دسترسی
              </span>
            )}
          </p>
        </div>
      </div>
      <p className="h-20 px-1 font-bold">
        ملاحظات فوق بررسی و مورد تایید می باشد :
      </p>
      <div className="grid grid-cols-2 pt-5 pb-1">
        <div className="flex items-center space-x-1 px-1">
          <p>تاریخ :</p>
          <p className="font-[AvenirLTProMedium]">
            {toShamsi(selectedMold?.designerSignedAt)}
          </p>
        </div>
        <div className="flex items-center space-x-1">
          <p>امضاء مسئول طراحی :</p>
          <p>
            {selectedSignDesigner ? (
              <img
                src={`data:image/png;base64,${selectedSignDesigner}`}
                alt="signature"
                className="fixed bottom-3 left-10 h-20 w-25"
              />
            ) : canSignDesigner ? (
              <button
                onClick={() => handleOpenSignatureModal('designer')}
                className="mr-3 cursor-pointer rounded-[10px] bg-linear-to-br from-cyan-400 to-black/10 p-1 text-[12px] transition-all delay-75 duration-100 ease-in-out hover:scale-110"
              >
                ثبت امضاء
              </button>
            ) : (
              <span className="rounded-[10px] bg-red-500 p-1 text-[10px] print:hidden">
                عدم دسترسی
              </span>
            )}
          </p>
        </div>
      </div>
      {/* open Code */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
          openCode ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
          onClick={() => {
            setOpenCode(false);
          }}
        />
        <div
          className={`relative transform rounded-[15px] bg-linear-to-br from-black to-gray-600 p-6 text-white shadow-2xl transition-all duration-300 ${
            openCode
              ? 'translate-y-0 scale-100 opacity-100'
              : '-translate-y-10 scale-0 opacity-0'
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
            onClick={handleSubmitSign}
            className="float-left mt-2 cursor-pointer rounded-[10px] bg-green-500 p-2 transition-all delay-75 duration-100 hover:bg-green-700"
          >
            تایید
          </button>
        </div>
      </div>
    </div>
  );
}

export default FormMoldFieldValidationJsx;
