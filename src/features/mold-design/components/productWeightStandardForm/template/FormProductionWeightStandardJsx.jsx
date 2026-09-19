import React from 'react';

import logo from '../../../../../assets/images/logo.png';
import close from '../../../../../assets/images/close.png';
import { toShamsi } from '../../../../../Time/date';

function FormProductionWeightStandardJsx({
  selectedProductWeigth,
  openCode,
  setOpenCode,
  setPassword,
  handleSubmitSign,
  handleOpenSignatureModal,
  selectedSignProductionManager,
  canSignProductionManager,
  selectedSignProductionPlanning,
  canSignProductionPlanning,
  selectedSignDesigner,
  canSignDesigner,
  selectedSignFactoryManager,
  canSignFactoryManager,
}) {
  
  
  return (
    <div>
      {/* Header */}
      <div className="grid grid-cols-5">
        <div className="flex items-center justify-center border-b border-l">
          <img src={logo} alt="logo" width={90} />
        </div>
        <div className="col-span-3 flex items-center justify-center border-b border-l">
          <h1 className="font-[SamimBold] text-[15px]">
            فرم تعیین استاندارد وزنی محصول و انتخاب خطوط تولید
          </h1>
        </div>
        <div className="flex flex-col justify-center border-b pr-2 text-[11px]">
          <p className="space-x-1">
            <span className="font-[SamimBold]">کد سند :</span>
            <span className="font-[AvenirLTProHeavy]">F1006</span>
          </p>
          <p className="space-x-1">
            <span className="font-[SamimBold]">شماره ویرایش :</span>
            <span className="font-[AvenirLTProHeavy]">01</span>
          </p>
          <p className="space-x-1">
            <span className="font-[SamimBold]">تاریخ ویرایش :</span>
            <span className="font-[AvenirLTProHeavy]">1404/05/04</span>
          </p>
        </div>
      </div>
      {/* Name & CodeProducts */}
      <div className="flex items-center justify-around border-b text-[12px]">
        <div className="flex items-center space-x-1">
          <p className="font-bold">نام محصول :</p>
          <p className="font-[AvenirLTProMedium]">
            {selectedProductWeigth?.productName}
          </p>
        </div>
        <div className="flex items-center space-x-1">
          <p className="font-bold">کد محصول :</p>
          <p className="font-[AvenirLTProMedium]">
            {selectedProductWeigth?.productCode}
          </p>
        </div>
      </div>
      {/* companyName & Date */}
      <div className="flex items-center justify-evenly border-b text-[12px]">
        <p className="flex items-center space-x-1">
          <span className="font-bold">نام شرکت :</span>
          <span>{selectedProductWeigth?.companyName}</span>
        </p>
        <p className="flex items-center space-x-1">
          <span className="font-bold">تاریخ :</span>
          <span className="font-[AvenirLTProMedium]">
            {toShamsi(selectedProductWeigth?.formDate)}
          </span>
        </p>
      </div>
      {/* Table */}
      <div className="border-b">
        <div className="grid grid-cols-9 bg-gray-300 text-[14px] font-bold">
          <p className="col-span-3 flex items-center justify-center border-b border-l">
            نوع دستگاه با قابلیت تولید محصول
          </p>
          <p className="flex items-center justify-center border-b border-l">
            وزن محصول
          </p>
          <p className="col-span-3 flex items-center justify-center border-b border-l">
            تلرانس وزنی
          </p>
          <p className="col-span-2 flex items-center justify-center border-b text-center">
            خطوط توصیه شده با توجه به ملاحظات اقتصادی
          </p>
        </div>
        <div className="grid grid-cols-9">
          <div className="col-span-3 border-l font-bold">
            <p className="flex h-12 items-center justify-center space-x-0.5 border-b">
              <span>ماشین</span>
              <span>IS</span>
              <span>خط</span>
              <span className="font-[AvenirLTProMedium]">1</span>
            </p>
            <p className="flex h-12 items-center justify-center space-x-0.5 border-b">
              <span>ماشین</span>
              <span>IS</span>
              <span>خط</span>
              <span className="font-[AvenirLTProMedium]">2</span>
            </p>
            <p className="flex h-12 items-center justify-center space-x-0.5">
              <span>ماشین</span>
              <span>IS</span>
              <span>خط</span>
              <span className="font-[AvenirLTProMedium]">3</span>
            </p>
          </div>
          <div className="border-l">
            <p className="flex h-12 items-center justify-center border-b font-[AvenirLTProMedium]">
              {selectedProductWeigth?.productWeightLine1}
            </p>
            <p className="flex h-12 items-center justify-center border-b font-[AvenirLTProMedium]">
              {selectedProductWeigth?.productWeightLine2}
            </p>
            <p className="flex h-12 items-center justify-center font-[AvenirLTProMedium]">
              {selectedProductWeigth?.productWeightLine3}
            </p>
          </div>
          <div className="col-span-3 border-l">
            <p className="flex h-12 items-center justify-center border-b font-[AvenirLTProMedium]">
              {selectedProductWeigth?.weightToleranceLine1}
            </p>
            <p className="flex h-12 items-center justify-center border-b font-[AvenirLTProMedium]">
              {selectedProductWeigth?.weightToleranceLine2}
            </p>
            <p className="flex h-12 items-center justify-center font-[AvenirLTProMedium]">
              {selectedProductWeigth?.weightToleranceLine3}
            </p>
          </div>
          <div className="col-span-2">
            <p className="flex h-12 items-center justify-center border-b font-[AvenirLTProMedium]">
              {selectedProductWeigth?.recommendedLine1}
            </p>
            <p className="flex h-12 items-center justify-center border-b font-[AvenirLTProMedium]">
              {selectedProductWeigth?.recommendedLine2}
            </p>
            <p className="flex h-12 items-center justify-center font-[AvenirLTProMedium]">
              {selectedProductWeigth?.recommendedLine3}
            </p>
          </div>
        </div>
      </div>
      <div className="h-45 border-b px-1 pt-1">
        <p className="font-bold">ملاحظات :</p>
        <p className="text-justify text-[13px]">
          {selectedProductWeigth?.notes}
        </p>
      </div>
      <div className="grid grid-cols-4 px-1">
        <div className="h-24 border-l">
          <p className="font-bold">امضاء سرپرست تولید :</p>
          <p className="flex items-center justify-center">
            {selectedSignProductionManager ? (
              <img
                src={`data:image/png;base64,${selectedSignProductionManager}`}
                alt="signature"
                className="fixed right-7 bottom-4 h-23 w-40"
              />
            ) : canSignProductionManager ? (
              <button
                onClick={() => handleOpenSignatureModal('productionManager')}
                className="mt-5 mr-3 cursor-pointer rounded-[10px] bg-linear-to-br from-cyan-400 to-black/10 p-1 text-[12px] transition-all delay-75 duration-100 ease-in-out hover:scale-110"
              >
                ثبت امضاء
              </button>
            ) : (
              <span className="mt-5 rounded-[10px] bg-red-500 p-1 text-[10px] print:hidden">
                عدم دسترسی
              </span>
            )}
          </p>
        </div>
        <div className="h-24 border-l pr-1">
          <p className="font-bold">امضاء مسئول برنامه ریزی :</p>
          <p className="flex items-center justify-center">
            {selectedSignProductionPlanning ? (
              <img
                src={`data:image/png;base64,${selectedSignProductionPlanning}`}
                alt="signature"
                className="fixed right-60 bottom-4 h-23 w-40"
              />
            ) : canSignProductionPlanning ? (
              <button
                onClick={() => handleOpenSignatureModal('productionPlanning')}
                className="mt-5 mr-3 cursor-pointer rounded-[10px] bg-linear-to-br from-cyan-400 to-black/10 p-1 text-[12px] transition-all delay-75 duration-100 ease-in-out hover:scale-110"
              >
                ثبت امضاء
              </button>
            ) : (
              <span className="mt-5 rounded-[10px] bg-red-500 p-1 text-[10px] print:hidden">
                عدم دسترسی
              </span>
            )}
          </p>
        </div>
        <div className="h-24 border-l pr-1">
          <p className="font-bold">امضاء مسئول طراحی :</p>
          <p className="flex items-center justify-center">
            {selectedSignDesigner ? (
              <img
                src={`data:image/png;base64,${selectedSignDesigner}`}
                alt="signature"
                className="fixed bottom-4 left-60 h-23 w-40"
              />
            ) : canSignDesigner ? (
              <button
                onClick={() => handleOpenSignatureModal('designer')}
                className="mt-5 mr-3 cursor-pointer rounded-[10px] bg-linear-to-br from-cyan-400 to-black/10 p-1 text-[12px] transition-all delay-75 duration-100 ease-in-out hover:scale-110"
              >
                ثبت امضاء
              </button>
            ) : (
              <span className="mt-5 rounded-[10px] bg-red-500 p-1 text-[10px] print:hidden">
                عدم دسترسی
              </span>
            )}
          </p>
          
        </div>
        <div className="h-24 pr-1">
          <p className="font-bold">امضاء مدیر کارخانه :</p>
          <p className="flex items-center justify-center">
            {selectedSignFactoryManager ? (
              <img
                src={`data:image/png;base64,${selectedSignFactoryManager}`}
                alt="signature"
                className="fixed bottom-4 left-7 h-23 w-40"
              />
            ) : canSignFactoryManager ? (
              <button
                onClick={() => handleOpenSignatureModal('factoryManager')}
                className="mt-5 mr-3 cursor-pointer rounded-[10px] bg-linear-to-br from-cyan-400 to-black/10 p-1 text-[12px] transition-all delay-75 duration-100 ease-in-out hover:scale-110"
              >
                ثبت امضاء
              </button>
            ) : (
              <span className="mt-5 rounded-[10px] bg-red-500 p-1 text-[10px] print:hidden">
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

export default FormProductionWeightStandardJsx;
