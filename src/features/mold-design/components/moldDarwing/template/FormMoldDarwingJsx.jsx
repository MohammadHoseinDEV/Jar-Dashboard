import React from 'react';

import logo from '../../../../../assets/images/logo.png';
import close from '../../../../../assets/images/close.png';
import { toShamsi } from '../../../../../Time/date';

function FormMoldDarwingJsx({
  selectedMoldDarwing,
  selectedSignDesigner,
  canSignDesigner,
  selectedSignFactoryManager,
  canSignFactoryManager,
  selectedSignDesignerS2,
  canSignDesignerS2,
  openCode,
  handleSubmitSign,
  setOpenCode,
  setPassword,
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
            فرم تصدیق نقشه قالب و متعلقات
          </h1>
        </div>
        <div className="flex flex-col justify-center border-b pr-2 text-[11px]">
          <p className="space-x-1">
            <span className="font-[SamimBold]">کد سند :</span>
            <span className="font-[AvenirLTProHeavy]">F1004</span>
          </p>
          <p className="space-x-1">
            <span className="font-[SamimBold]">شماره ویرایش :</span>
            <span className="font-[AvenirLTProHeavy]">03</span>
          </p>
          <p className="space-x-1">
            <span className="font-[SamimBold]">تاریخ ویرایش :</span>
            <span className="font-[AvenirLTProHeavy]">1404/05/04</span>
          </p>
        </div>
      </div>
      {/* Date */}
      <div className="flex items-center space-x-20 pr-1 text-[12px]">
        <div className="flex">
          <p className="font-bold">تاریخ :</p>
          <p className="font-[AvenirLTProMedium]">
            {toShamsi(selectedMoldDarwing?.formDate)}
          </p>
        </div>
        <div className="flex">
          <p className="font-bold">شماره فرم :</p>
          <p className="font-[AvenirLTProMedium]">
            {selectedMoldDarwing?.formNumber}
          </p>
        </div>
      </div>
      {/* Name-Code-Number */}
      <div className="flex items-center space-x-20 border-t border-b pr-1 text-[12px]">
        <div className="flex">
          <p className="font-bold">نام محصول :</p>
          <p className="font-[AvenirLTProMedium]">
            {selectedMoldDarwing?.productName}
          </p>
        </div>
        <div className="flex">
          <p className="font-bold">کد محصول :</p>
          <p className="font-[AvenirLTProMedium]">
            {selectedMoldDarwing?.productCode}
          </p>
        </div>
      </div>
      <div className="flex h-50 flex-col border-b px-1 text-[13px]">
        <div>
          <p className="font-bold">{`تصدیق نقشه ها و متعلقات نیاز به ساخت نمونه ${selectedMoldDarwing?.needsSampleProduction === 1 ? 'دارد' : 'ندارد'} .`}</p>
          <p className="flex flex-col">
            <span className="font-bold">ملاحظات</span>
            <span>{selectedMoldDarwing?.notes}</span>
          </p>
        </div>
        <div className="justify- flex items-center space-x-50 pt-28">
          <div className="flex items-center">
            <p>امضاء مسئول طراحی :</p>
            <p>
              {selectedSignDesigner ? (
                <img
                  src={`data:image/png;base64,${selectedSignDesigner}`}
                  alt="signature"
                  className="fixed top-55 right-33 h-20 w-25"
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
          <div>
            <p>امضاء مدیر کارخانه :</p>
            <p>
              {selectedSignFactoryManager ? (
                <img
                  src={`data:image/png;base64,${selectedSignFactoryManager}`}
                  alt="signature"
                  className="fixed top-55 left-10 h-20 w-25"
                />
              ) : canSignFactoryManager ? (
                <button
                  onClick={() => handleOpenSignatureModal('factoryManager')}
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
      <div className="flex items-center pr-1 text-[13px]">
        {`با توجه به کنترل های انجام شده مطابق داده های به طراحی نقشه مورد تایید ${selectedMoldDarwing?.drawingsApproved === 1 ? ' می باشد' : 'نمی باشد'}`}
      </div>
      <div className="m-2 flex flex-col text-[12px]">
        <div className="grid grid-cols-10 border bg-gray-300">
          <p className="border-l text-center font-bold">ردیف</p>
          <p className="col-span-7 flex items-center justify-center border-l font-bold">
            کنترل های انجام شده
          </p>
          <p className="col-span-2 text-center font-bold">نتیجه</p>
        </div>
        <div className="grid grid-cols-10 border-r border-b border-l">
          <div className="border-l text-center font-[AvenirLTProMedium]">
            <p className="border-b py-1">1</p>
            <p className="border-b py-1">2</p>
            <p className="border-b py-1">3</p>
            <p className="border-b py-1">4</p>
            <p className="border-b py-1">5</p>
            <p className="border-b py-1">6</p>
            <p className="border-b py-1">7</p>
            <p className="border-b py-1">8</p>
            <p className="py-1">9</p>
          </div>
          <div className="col-span-7 border-l">
            <p className="border-b py-1 pr-1">
              ران و ضخامت کف دیواره ها(نقشه Layout)
            </p>
            <p className="border-b py-1 pr-1">فرمت اصلی بلنک</p>
            <p className="border-b py-1 pr-1">
              جداره بلنک و قالب و ناحیه گردن محصول
            </p>
            <p className="border-b py-1 pr-1">میزان shrinkage</p>
            <p className="border-b py-1 pr-1">انتخاب هلدر قالب و بلنک</p>
            <p className="border-b py-1 pr-1">فاصله پیچ آفست تا شیار هنگ</p>
            <p className="border-b py-1 pr-1">اینورت و H قالب</p>
            <p className="border-b py-1 pr-1">
              طراحی انبر برنجی بر اساس نوع دهانه محصول
            </p>
            <p className="py-1 pr-1">کنترل ابعادی</p>
          </div>
          <div className="col-span-2 text-center">
            <p className="border-b py-1">
              {selectedMoldDarwing?.runAndWallThickness === 1 ? 'OK' : 'N.Ok'}
            </p>
            <p className="border-b py-1">
              {selectedMoldDarwing?.blankMainFormat === 1 ? 'OK' : 'N.Ok'}
            </p>
            <p className="border-b py-1">
              {selectedMoldDarwing?.blankMoldWallAndNeck === 1 ? 'OK' : 'N.OK'}
            </p>
            <p className="border-b py-1">
              {selectedMoldDarwing?.shrinkage === 1 ? 'OK' : 'N.OK'}
            </p>
            <p className="border-b py-1">
              {selectedMoldDarwing?.moldBlankHolderSelection === 1
                ? 'OK'
                : 'N.OK'}
            </p>
            <p className="border-b py-1">
              {selectedMoldDarwing?.offsetScrewToHangGroove === 1
                ? 'OK'
                : 'N.OK'}
            </p>
            <p className="border-b py-1">
              {selectedMoldDarwing?.invertAndMoldH === 1 ? 'OK' : 'N.OK'}
            </p>
            <p className="border-b py-1">
              {selectedMoldDarwing?.brassTongDesign === 1 ? 'OK' : 'N.OK'}
            </p>
            <p className="py-1">
              {selectedMoldDarwing?.dimensionalControl === 1 ? 'OK' : 'N.OK'}
            </p>
          </div>
        </div>
        <div className="my-1 h-40">
          <p>شرح تغییرات و تکرار مجدد مراحل طراحی مورد نیاز :</p>
          <p>{selectedMoldDarwing?.changeDescriptionAndRework}</p>
        </div>
        <div className="flex items-center justify-end pl-30">
          <p>امضاء مسئول طراحی :</p>
          <p>
            {selectedSignDesignerS2 ? (
              <img
                src={`data:image/png;base64,${selectedSignDesignerS2}`}
                alt="signature"
                className="fixed bottom-3 left-5 h-21 w-30"
              />
            ) : canSignDesignerS2 ? (
              <button
                onClick={() => handleOpenSignatureModal('designerS2')}
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

export default FormMoldDarwingJsx;
