import React, { useEffect, useMemo, useState } from 'react';

import logo from '../../../../assets/images/logo.png';
import close from '../../../../assets/images/close.png';
import { normalizeTime, toShamsi } from '../../../../Time/date';
import { useGetMenu } from '../../../../hooks/menu/menuApi';
import { findMenu } from '../../../../utils/rbac';
import { useGetPermissionSignature } from '../../../../hooks/user/userApi';
import { useSelector } from 'react-redux';
import { useGetSignatureId } from '../../../../hooks/Signature/Signature';
import { useGetProfile } from '../../../../hooks/profile/profile';
import {
  useCreateSignShiftLeader,
  useCreateSignSupervisor,
} from '../../Api/Bachplant/bachplantApi';

function FormBachplantReport({ openForm, setOpenForm, selectedReports }) {
  const { userInfo } = useSelector((state) => state.auth);

  const [selectedSignShiftLeader, setSelectedSignShiftLeader] = useState(null);
  const [selectedSignSupervisor, setSelectedSignSupervisor] = useState(null);
  const [openCode, setOpenCode] = useState(false);
  const [password, setPassword] = useState('');
  const [signatureType, setSignatureType] = useState(null);

  const handleOpenSignatureModal = (type) => {
    setSignatureType(type);
    setOpenCode(true);
  };

  const closeHandler = () => {
    setOpenForm(false);
  };

  const rows = useMemo(() => {
    const arr = [...(selectedReports?.section2Items ?? [])];

    while (arr.length < 6) {
      arr.push({});
    }

    return arr.slice(0, 6);
  }, [selectedReports]);

  // ------------------------------------------------------
  const { data: menu } = useGetMenu();
  const bachPlantMenu = findMenu(menu?.menus ?? [], 'bachplant-report');
  const menuId = bachPlantMenu?.id;

  const { data: permission } = useGetPermissionSignature(userInfo?.userId, {
    enabled: !!userInfo?.userId && !!menuId && openForm,
  });

  const cansign = permission?.data?.some(
    (p) => p.menuId === menuId && p.canSignature === true
  );
  // ------------------------------------------------------

  const { data: signatureShiftLeader } = useGetSignatureId(
    selectedReports?.shiftLeaderSignedByUserId
  );
  const { data: signatureSupervisor } = useGetSignatureId(
    selectedReports?.unitSupervisorSignedByUserId
  );
  // -------------------------------------------------------------
  const { data: profile } = useGetProfile();

  // // Handover
  const isHandover = selectedReports?.createdBy === profile?.data?.id;

  const canSignHandover = cansign && isHandover;

  const isSupervisor = profile?.data?.companyRoles?.some(
    (p) => p.roleId === 'e4a2f36a-a4da-42b0-b0c0-284bddb423ac'
  );

  const canSignSupervisor = cansign && isSupervisor;

  // ------------------------------------------------------

  useEffect(() => {
    if (
      selectedReports?.isSignedByShiftLeader === true &&
      signatureShiftLeader?.data?.signatureImageBase64
    ) {
      setSelectedSignShiftLeader(
        signatureShiftLeader?.data?.signatureImageBase64
      );
    } else {
      setSelectedSignShiftLeader(null);
    }

    if (
      selectedReports?.isSignedByUnitSupervisor === true &&
      signatureSupervisor?.data?.signatureImageBase64
    ) {
      setSelectedSignSupervisor(
        signatureSupervisor?.data?.signatureImageBase64
      );
    } else {
      setSelectedSignSupervisor(null);
    }
  }, [
    selectedReports?.isSignedByShiftLeader,
    selectedReports?.isSignedByUnitSupervisor,
    signatureShiftLeader,
    signatureSupervisor,
  ]);

  const signShiftLeader = useCreateSignShiftLeader();
  const signSupervisor = useCreateSignSupervisor();

  const handleSubmitSign = () => {
    if (signatureType === 'leader') {
      signShiftLeader.mutate(
        {
          id: selectedReports?.id,
          signaturePassword: password,
        },
        {
          onSuccess: () => {
            setOpenCode(false);
            setOpenForm(false);
          },
        }
      );
    }
    if (signatureType === 'supervisor') {
      signSupervisor.mutate(
        {
          id: selectedReports?.id,
          signaturePassword: password,
        },
        {
          onSuccess: () => {
            setOpenCode(false);
            setOpenForm(false);
          },
        }
      );
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
        openForm
          ? 'pointer-events-auto opacity-100'
          : 'pointer-events-none opacity-0 '
      }`}
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px] print:hidden!"
        onClick={closeHandler}
      />
      <div
        className={`h-lenovo:scale-52 relative transform rounded-[15px] bg-white p-3 text-black transition-all duration-300 max-md:scale-45 print:scale-90 print:shadow-none ${
          openForm
            ? 'translate-y-0 scale-80 opacity-100 max-2xl:scale-65'
            : '-translate-y-10 scale-0 opacity-0'
        } `}
      >
        <div className="min-h-[1123px] w-[794px] border-2 bg-white text-black">
          <div className="grid grid-cols-5">
            <div className="flex items-center justify-center border-b border-l">
              <img src={logo} alt="logo" width={100} />
            </div>
            <div className="col-span-3 flex items-center justify-center border-b border-l">
              <h1 className="font-[SamimBold] text-[20px]">
                فرم گزارش کار روزانه بچ پلنت
              </h1>
            </div>
            <div className="flex flex-col justify-center border-b pr-1">
              <p className="space-x-1">
                <span className="font-[SamimBold] text-[13px]">کد سند :</span>
                <span className="font-[AvenirLTProHeavy] text-[13px]">
                  F0532
                </span>
              </p>
              <p className="space-x-1">
                <span className="font-[SamimBold] text-[13px]">
                  شماره بازنگری :
                </span>
                <span className="font-[AvenirLTProHeavy] text-[13px]">00</span>
              </p>
              <p className="space-x-1">
                <span className="font-[SamimBold] text-[13px]">
                  تاریخ بازنگری :
                </span>
                <span className="font-[AvenirLTProHeavy] text-[13px]">
                  1402/04/20
                </span>
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between px-2 py-1">
            <div className="flex items-center space-x-1 pr-0.5">
              <p className="font-[SamimBold] text-[20px]">تاریخ :</p>
              <p className="font-[AvenirLTProBook] text-[18px]">
                {toShamsi(selectedReports?.reportDate)}
              </p>
            </div>
            <div className="flex items-center justify-center">
              <p className="font-[SamimBold] text-[20px]">نام اپراتور :</p>
              <p className="flex items-center justify-center font-[Samim] text-[18px]">
                {selectedReports?.operatorName}
              </p>
            </div>

            <div className="flex">
              <p className="font-[SamimBold] text-[20px]">شماره :</p>
              <p className="font-[AvenirLTProBook] text-[18px]">
                {selectedReports?.reportNumber}
              </p>
            </div>
          </div>
          <div className="mx-2 flex items-center justify-between rounded-2xl border border-black px-2 py-1">
            <div className="flex items-center space-x-2">
              <p className="font-[SamimBold] text-[20px]">روز کاری اول</p>
              <p
                className={`size-6 rounded-full font-[Samim] text-[18px] ${
                  selectedReports?.shiftFlags === 2
                    ? 'bg-black'
                    : 'border-2 bg-white'
                }`}
              ></p>
            </div>
            <div className="flex items-center space-x-2">
              <p className="font-[SamimBold] text-[20px]">روز کاری دوم</p>
              <p
                className={`size-6 rounded-full font-[Samim] text-[18px] ${
                  selectedReports?.shiftFlags === 4
                    ? 'bg-black'
                    : 'border-2 bg-white'
                }`}
              ></p>
            </div>
            <div className="flex items-center space-x-2">
              <p className="font-[SamimBold] text-[20px]">شب کاری اول</p>
              <p
                className={`size-6 rounded-full font-[Samim] text-[18px] ${
                  selectedReports?.shiftFlags === 6
                    ? 'bg-black'
                    : 'border-2 bg-white'
                }`}
              ></p>
            </div>
            <div className="flex items-center space-x-2">
              <p className="font-[SamimBold] text-[20px]">شب کاری دوم</p>
              <p
                className={`size-6 rounded-full font-[Samim] text-[18px] ${
                  selectedReports?.shiftFlags === 8
                    ? 'bg-black'
                    : 'border-2 bg-white'
                }`}
              ></p>
            </div>
          </div>
          <div className="mx-2 mt-2 grid grid-cols-9 border">
            <p className="flex items-center justify-center border-l px-1 py-2 text-center font-[SamimBold] text-[15px] max-2xl:text-[14px]">
              {selectedReports?.shift}
            </p>
            <p className="flex items-center justify-center border-l bg-gray-400/40 px-1 py-2 text-center text-[15px] max-2xl:text-[14px]">
              بازدید از سیلوهای بچ
            </p>
            <p className="flex items-center justify-center border-l bg-gray-400/40 px-1 py-2 text-center text-[15px] max-2xl:text-[14px]">
              بازدید از نوار نقاله ها
            </p>
            <p className="flex items-center justify-center border-l bg-gray-400/40 px-1 py-2 text-center text-[15px] max-2xl:text-[14px]">
              بازدید از الواتورها
            </p>
            <p className="flex items-center justify-center border-l bg-gray-400/40 px-1 py-2 text-center text-[15px] max-2xl:text-[14px]">
              تست ترازوها
            </p>
            <p className="flex items-center justify-center border-l bg-gray-400/40 px-1 py-2 text-center text-[15px] max-2xl:text-[14px]">
              دریافت رطوبت ها
            </p>
            <p className="flex items-center justify-center border-l bg-gray-400/40 px-1 py-2 text-center text-[15px] max-2xl:text-[14px]">
              تعداد بچ
            </p>
            <p className="col-span-2 flex items-center justify-center bg-gray-400/40 px-1 py-2 text-center text-[15px] max-2xl:text-[14px]">
              نظافت بچ پلنت
            </p>
          </div>
          <div className="mx-2 grid grid-cols-9 border-r border-b border-l">
            <p className="flex items-center justify-center border-l px-1 py-2 text-center font-[SamimBold] text-[15px] max-2xl:text-[14px]">
              ساعت انجام
            </p>
            <p className="flex items-center justify-center border-l px-1 py-2 text-center font-[AvenirLTProBook] text-[15px] max-2xl:text-[14px]">
              {normalizeTime(selectedReports?.siloVisitTime)}
            </p>
            <p className="flex items-center justify-center border-l px-1 py-2 text-center font-[AvenirLTProBook] text-[15px] max-2xl:text-[14px]">
              {normalizeTime(selectedReports?.conveyorBeltVisitTime)}
            </p>
            <p className="flex items-center justify-center border-l px-1 py-2 text-center font-[AvenirLTProBook] text-[15px] max-2xl:text-[14px]">
              {normalizeTime(selectedReports?.elevatorVisitTime)}
            </p>
            <p className="flex items-center justify-center border-l px-1 py-2 text-center font-[AvenirLTProBook] text-[15px] max-2xl:text-[14px]">
              {normalizeTime(selectedReports?.scaleTestTime)}
            </p>
            <p className="flex items-center justify-center border-l px-1 py-2 text-center font-[AvenirLTProBook] text-[15px] max-2xl:text-[14px]">
              {normalizeTime(selectedReports?.moistureReceptionTime)}
            </p>
            <p className="flex items-center justify-center border-l px-1 py-2 text-center font-[AvenirLTProBook] text-[15px] max-2xl:text-[14px]">
              {selectedReports?.batchCount}
            </p>
            <p className="col-span-2 flex items-center justify-center space-x-1 px-1 py-2 text-center font-[AvenirLTProBook] text-[15px] max-2xl:text-[14px]">
              <span>{normalizeTime(selectedReports?.cleaningaz)}</span>
              <span className="font-[Samim]">الی</span>
              <span>{normalizeTime(selectedReports?.cleaningta)}</span>
            </p>
          </div>
          <div>
            <div className="mx-2 mt-5 grid grid-cols-9 border bg-gray-400/40">
              <p className="col-span-7 flex items-center justify-center border-l py-1 font-[SamimBold] text-[30px]">
                بـــــــــــــــــــچ
              </p>
              <p className="col-span-2 flex items-center justify-center px-2 py-1 font-[SamimBold] text-[30px]">
                سیلیس
              </p>
            </div>
            <div className="mx-2 grid grid-cols-9 border">
              <div className="col-span-7 flex items-center bg-gray-400/40 text-center">
                <div className="w-[174px] border-l py-2">خط تولید</div>
                <div className="w-[114px] border-l py-2">مقدار آب (لیتر)</div>
                <div className="w-[126px] border-l py-2">رطوبت بچ میکسر</div>
                <div className="w-[123px] border-l py-2">رطوبت بچ پارویی</div>
                <div className="w-[77px] border-l py-2">وزن نمونه</div>
              </div>
              <div className="col-span-2 flex w-full bg-gray-400/40">
                <div className="flex w-[184px] items-center justify-center border-l py-2 text-center">
                  رطوبت سنج
                </div>
                <div className="m-auto flex w-full items-center justify-center text-center">
                  ساعت
                </div>
              </div>
            </div>
            <div className="mx-2 grid h-[20vh] grid-cols-9 border-r border-l">
              <div className="col-span-7 flex border-l">
                <div className="grid h-full w-[171px] grid-cols-2 border-l">
                  <p className="flex items-center justify-center border-b border-l">
                    بچ پلنت
                  </p>
                  <p className="flex items-center justify-center border-b">
                    کوره
                  </p>
                </div>
                <div className="flex flex-col items-center justify-between border-l pt-1">
                  {rows.map((r, index) => (
                    <div key={index} className="">
                      <p className="h-[25px] w-[109px] border-b text-center font-[AvenirLTProMedium]">
                        {r?.waterAmount}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col items-center justify-between border-l pt-1">
                  {rows.map((r, index) => (
                    <div key={index} className="">
                      <p className="h-[25px] w-[123px] border-b text-center font-[AvenirLTProMedium]">
                        {r?.mixerMoisture}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col items-center justify-between border-l pt-1">
                  {rows.map((r, index) => (
                    <div key={index} className="">
                      <p className="h-[25px] w-[119px] border-b text-center font-[AvenirLTProMedium]">
                        {r?.sidelineMoisture}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col items-center justify-between pt-1">
                  {rows.map((r, index) => (
                    <div key={index} className="">
                      <p className="h-[25px] w-[74px] border-b text-center font-[AvenirLTProMedium]">
                        {r?.sampleWeight}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-span-2 flex">
                <div className="flex w-[184px] flex-col items-center justify-between border-l pt-1">
                  {rows.map((r, index) => (
                    <div key={index} className="w-full">
                      <p className="h-[25px] w-full border-b text-center font-[AvenirLTProMedium]">
                        {r?.silicaHumidityReading}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="flex w-full flex-col items-center justify-between pt-1 text-center">
                  {rows.map((r, index) => (
                    <div key={index} className="w-full">
                      <p className="h-[25px] w-full border-b text-center font-[AvenirLTProMedium]">
                        {normalizeTime(r?.measurementTime)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="mx-2 my-5 flex border">
            <div className="flex w-[20vh] items-center justify-center border-l bg-gray-400/40 print:text-center">
              رطوبت آزمایشگاه
            </div>
            <div className="flex">
              <div className="w-[15vh]">
                <p className="flex items-center justify-center border-b border-l bg-gray-400/40">
                  سیلیس کوره
                </p>
                <p className="flex items-center justify-center border-l py-5 font-[AvenirLTProMedium]">
                  {selectedReports?.furnaceSilica}
                </p>
              </div>
              <div className="w-[25vh]">
                <p className="flex items-center justify-center border-b border-l bg-gray-400/40">
                  بچ کوره
                </p>
                <p className="flex items-center justify-center border-l py-5 font-[AvenirLTProMedium]">
                  {selectedReports?.furnaceBatch}
                </p>
              </div>
              <div className="w-[24vh]">
                <p className="flex items-center justify-center border-b bg-gray-400/40">
                  ساعت
                </p>
                <p className="flex items-center justify-center py-5 font-[AvenirLTProMedium]">
                  {normalizeTime(selectedReports?.measurementTime)}
                </p>
              </div>
            </div>
          </div>
          <div className="mx-2 grid grid-cols-3 border">
            <div className="col-span-1 flex flex-col border-l">
              <p className="flex items-center justify-center border-b bg-gray-400/40 py-1">
                مصرف مواد اولیه در
                <span className="font-[AvenirLTProMedium]">24</span>
                ساعت
              </p>
              <p className="flex items-center justify-center border-b bg-gray-400/40 py-1">
                بدون شیشه خرده
              </p>
              <p className="flex items-center justify-center bg-gray-400/40 py-1">
                با شیشه خرده
              </p>
            </div>
            <div className="col-span-2">
              <p className="flex items-center justify-center border-b bg-gray-400/40 py-1 font-[AvenirLTProMedium]">
                IS
              </p>
              <p className="flex h-[33px] items-center justify-center border-b font-[AvenirLTProMedium]">
                {selectedReports?.withoutGlassFragment}
              </p>
              <p className="flex h-[33px] items-center justify-center font-[AvenirLTProMedium]">
                {selectedReports?.withGlassFragment}
              </p>
            </div>
          </div>
          <div className="mx-2 my-5 flex flex-col px-2 py-1">
            <p className="text-[20px] font-extrabold">توضیحات :</p>
            <p className="float-right h-[210px] text-right font-[VazirLight]">
              {selectedReports?.notes}
            </p>
          </div>
          <div className="flex items-center justify-between px-10">
            <div className="flex space-x-2">
              <p className="font-semibold">اپراتور شیفت</p>
              <p className="mb-5 flex">
                <span>
                  {selectedSignShiftLeader ? (
                    <img
                      src={`data:image/png;base64,${selectedSignShiftLeader}`}
                      alt="signature"
                      className="fixed right-35 bottom-0 h-35 w-45 pt-5"
                    />
                  ) : canSignHandover ? (
                    <button
                      onClick={() => handleOpenSignatureModal('leader')}
                      className="mr-3 cursor-pointer rounded-[10px] bg-linear-to-br from-cyan-400 to-black/10 p-2 transition-all delay-75 duration-100 ease-in-out hover:scale-110"
                    >
                      ثبت امضاء
                    </button>
                  ) : (
                    <span className="rounded-[10px] bg-red-500 p-1 text-[15px]">
                      عدم دسترسی
                    </span>
                  )}
                </span>
              </p>
            </div>
            <div className="flex space-x-2 pl-30">
              <p className="font-semibold">سرپرست واحد</p>
              <p className="mb-5">
                <span>
                  {selectedSignSupervisor ? (
                    <img
                      src={`data:image/png;base64,${selectedSignSupervisor}`}
                      alt="signature"
                      className="fixed bottom-0 left-5 h-35 w-45"
                    />
                  ) : canSignSupervisor ? (
                    <button
                      onClick={() => handleOpenSignatureModal('supervisor')}
                      className="mr-3 cursor-pointer rounded-[10px] bg-linear-to-br from-cyan-400 to-black/10 p-2 transition-all delay-75 duration-100 ease-in-out hover:scale-110"
                    >
                      ثبت امضاء
                    </button>
                  ) : (
                    <span className="rounded-[10px] bg-red-500 p-1 text-[15px]">
                      عدم دسترسی
                    </span>
                  )}
                </span>
              </p>
            </div>
          </div>
        </div>
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
              onClick={handleSubmitSign}
              className="float-left mt-2 cursor-pointer rounded-[10px] bg-green-500 p-2 transition-all delay-75 duration-100 hover:bg-green-700"
            >
              تایید
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormBachplantReport;
