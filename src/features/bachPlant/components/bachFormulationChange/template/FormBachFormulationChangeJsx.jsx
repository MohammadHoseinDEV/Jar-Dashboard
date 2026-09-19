import React from 'react';

import logo from '../../../../../assets/images/logo.png';
import close from '../../../../../assets/images/close.png';
import { normalizeTime, toShamsi } from '../../../../../Time/date';

function FormBachFormulationChangeJsx({
  selectedFormulation,
  handleSubmitSign,
  openCode,
  setOpenCode,
  setPassword,
  handleOpenSignatureModal,
  selectedSignFurnace,
  canSignFurnace,
  selectedSignProductionManager,
  canSignProductionManager,
  selectedProductionEngineerin,
  canSignProductionEnginnering,
  selectedManagment,
  canSignManagment,
}) {
  return (
    <div>
      {/* Header */}
      <div className="grid grid-cols-4">
        <div className="flex items-center justify-center border-b border-l">
          <img src={logo} alt="logo" width={90} />
        </div>
        <div className="col-span-2 flex items-center justify-center border-b border-l">
          <h1 className="font-[SamimBold] text-[15px]">
            فرم تغییرات فرمولاسیون بچ
          </h1>
        </div>
        <div className="flex flex-col justify-center border-b pr-2 text-[11px]">
          <p className="space-x-1">
            <span className="font-[SamimBold]">کد سند :</span>
            <span className="font-[AvenirLTProHeavy]">F0505</span>
          </p>
          <p className="space-x-1">
            <span className="font-[SamimBold]">شماره ویرایش :</span>
            <span className="font-[AvenirLTProHeavy]">02</span>
          </p>
          <p className="space-x-1">
            <span className="font-[SamimBold]">تاریخ ویرایش :</span>
            <span className="font-[AvenirLTProHeavy]">1404/04/02</span>
          </p>
        </div>
      </div>
      <div className="flex items-center justify-around border-b px-2 text-[12px]">
        <p className="space-x-1">
          <span className="font-[SamimBold]">تاریخ :</span>
          <span className="font-[AvenirLTProHeavy]">
            {toShamsi(selectedFormulation?.date)}
          </span>
        </p>
        <p className="space-x-1">
          <span className="font-[SamimBold]">شماره :</span>
          <span className="font-[AvenirLTProHeavy]">
            {selectedFormulation?.reportNumber}
          </span>
        </p>
        <p className="space-x-1">
          <span className="font-[SamimBold]">تناژ کوره :</span>
          <span className="font-[AvenirLTProHeavy]">
            {selectedFormulation?.furnaceTonnage}
          </span>
        </p>
      </div>
      <div>
        <div className="grid grid-cols-12 border-b text-center font-[SamimBold] text-[12px]">
          <div className="flex items-center justify-center border-l">ردیف</div>
          <div className="col-span-2 flex items-center justify-center border-l">
            نام مواد
          </div>
          <div className="flex items-center justify-center border-l px-1">
            وزن فعلی
          </div>
          <div className="flex items-center justify-center border-l text-[10px]">
            وزن اصلاح شده
          </div>
          <div className="flex items-center justify-center border-l">
            درصد وزنی
          </div>
          <div className="flex items-center justify-center border-l">
            میزان تغییر
          </div>

          <div className="col-span-5 flex items-center justify-center">
            علت تغییر
          </div>
        </div>
        <div>
          {selectedFormulation?.items?.map((f, index) => (
            <div
              className="grid h-12 grid-cols-12 border-b text-center text-[12px]"
              key={index}
            >
              <div className="flex items-center justify-center border-l py-1 font-[AvenirLTProHeavy]">
                {index + 1}
              </div>
              <div className="col-span-2 flex items-center justify-center border-l font-[SamimBold]">
                {f?.materialName}
              </div>
              <div className="flex items-center justify-center border-l px-1 font-[AvenirLTProHeavy]">
                {f?.currentWeight}
              </div>
              <div className="flex items-center justify-center border-l font-[AvenirLTProHeavy]">
                {f?.correctedWeight}
              </div>
              <div className="flex items-center justify-center border-l font-[AvenirLTProHeavy]">
                {f?.weightPercentage}
              </div>
              <div className="flex items-center justify-center border-l font-[AvenirLTProHeavy]">
                {f?.changeAmount}
              </div>

              <div className="col-span-5 flex items-center justify-center text-[10px]">
                {f?.changeReason}
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-12 border-b text-center text-[12px]">
          <div className="col-span-3 flex flex-col border-l font-[SamimBold]">
            <p className="flex h-7 items-center justify-center border-b">
              جمع کل (وزن بچ)
            </p>
            <p className="flex h-7 items-center justify-center border-b">
              درصد شیشه خرده در بچ
            </p>
            <p className="flex h-7 items-center justify-center border-b">
              وزن شیشه خرده
            </p>
            <p className="flex h-7 items-center justify-center border-b">
              وزن بچ با شیشه خرده
            </p>
            <p className="flex h-7 items-center justify-center">تاریخ</p>
          </div>
          <div className="col-span-2 flex flex-col border-l font-[AvenirLTProHeavy]">
            <p className="flex h-7 items-center justify-center border-b">
              {selectedFormulation?.totalBatchWeight}
            </p>
            <p className="flex h-7 items-center justify-center border-b">
              {selectedFormulation?.glassWastePercentageInBatch}
            </p>
            <p className="flex h-7 items-center justify-center border-b">
              {selectedFormulation?.glassWasteWeight}
            </p>
            <p className="flex h-7 items-center justify-center border-b">
              {selectedFormulation?.batchWeightWithGlassWaste}
            </p>
            <p className="flex h-7 items-center justify-center">
              {toShamsi(selectedFormulation?.changeRealDate)}
            </p>
          </div>
          <div className="col-span-2 flex flex-col border-l font-[AvenirLTProHeavy]">
            <p className="flex h-7 items-center justify-center border-b">
              {selectedFormulation?.totalBatchWeight1}
            </p>
            <p className="flex h-7 items-center justify-center border-b">
              {selectedFormulation?.glassWastePercentageInBatch1}
            </p>
            <p className="flex h-7 items-center justify-center border-b">
              {selectedFormulation?.glassWasteWeight1}
            </p>
            <p className="flex h-7 items-center justify-center border-b">
              {selectedFormulation?.batchWeightWithGlassWaste1}
            </p>
            <p className="flex h-7 items-center justify-center"></p>
          </div>
          <div className="col-span-2 flex flex-col border-l font-[SamimBold]">
            <p className="flex h-7 items-center justify-center border-b"></p>
            <p className="flex h-7 items-center justify-center border-b"></p>
            <p className="flex h-7 items-center justify-center border-b"></p>
            <p className="flex h-7 items-center justify-center border-b"></p>
            <p className="flex h-7 items-center justify-center">ساعت</p>
          </div>
          <div className="col-span-3 flex flex-col font-[AvenirLTProHeavy]">
            <p className="flex h-7 items-center justify-center border-b"></p>
            <p className="flex h-7 items-center justify-center border-b"></p>
            <p className="flex h-7 items-center justify-center border-b"></p>
            <p className="flex h-7 items-center justify-center border-b"></p>
            <p className="flex h-7 items-center justify-center">
              {normalizeTime(selectedFormulation?.changeRealTime)}
            </p>
          </div>
        </div>
      </div>
      <div className="border-b">
        <div className="h-44 px-1">
          <p>توضیحات :</p>
          <p className="text-[12px]">{selectedFormulation?.notes}</p>
        </div>
        <div className="grid grid-cols-4 pr-1 pb-2 text-[10px]">
          <div className="">
            <p className="font-bold">امضاء سرپرست کوره :</p>
            <p className="flex items-center justify-center">
              {selectedSignFurnace ? (
                <img
                  src={`data:image/png;base64,${selectedSignFurnace}`}
                  alt="signature"
                  className="fixed right-8 bottom-16 h-20 w-30"
                />
              ) : canSignFurnace ? (
                <button
                  onClick={() => handleOpenSignatureModal('furnace')}
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
          <div className=" ">
            <p className="font-bold">امضاء مدیر تولید :</p>
            <p className="flex items-center justify-center">
              {selectedSignProductionManager ? (
                <img
                  src={`data:image/png;base64,${selectedSignProductionManager}`}
                  alt="signature"
                  className="fixed right-43 bottom-16 h-20 w-30"
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
          <div className=" ">
            <p className="font-bold">امضاء مهندسی تولید :</p>
            <p className="flex items-center justify-center">
              {selectedProductionEngineerin ? (
                <img
                  src={`data:image/png;base64,${selectedProductionEngineerin}`}
                  alt="signature"
                  className="fixed bottom-16 left-37 h-20 w-30"
                />
              ) : canSignProductionEnginnering ? (
                <button
                  onClick={() =>
                    handleOpenSignatureModal('productionEngineerin')
                  }
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
          <div className=" ">
            <p className="font-bold">امضاء مدیریت :</p>
            <p className="flex items-center justify-center">
              {selectedManagment ? (
                <img
                  src={`data:image/png;base64,${selectedManagment}`}
                  alt="signature"
                  className="fixed bottom-16 left-2 h-20 w-30"
                />
              ) : canSignManagment ? (
                <button
                  onClick={() => handleOpenSignatureModal('managment')}
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
      </div>
      <div className="px-1 font-[samimBold] text-[12px]">
        <p>مدیر تحقیق و توسعه دپارتمان :</p>
        <p className="">
          * درصورت در خواست تغییر فرمول از طرف مدیر تحقیق و توسعه دپارتمان این
          قسمت توسط وی امضاء می گردد..
        </p>
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

export default FormBachFormulationChangeJsx;
