import React, { useEffect, useState } from 'react';

import logo from '../../../../assets/images/logo.png';
import close from '../../../../assets/images/close.png';

import { FiCheck } from 'react-icons/fi';
import { toShamsi } from '../../../../Time/date';
import { useGetMenu } from '../../../../hooks/menu/menuApi';
import { findMenu } from '../../../../utils/rbac';
import { useGetPermissionSignature } from '../../../../hooks/user/userApi';
import { useSelector } from 'react-redux';
import { useGetSignatureId } from '../../../../hooks/Signature/Signature';
import { useGetProfile } from '../../../../hooks/profile/profile';
import {
  useRegistrationSignProducerDailyAmpReport,
  useRegistrationSignSupervisorDailyAmp,
} from '../../Api/dailyAmp/dailyAmp';

function FormDailyAmpReport({ openForm, setOpenForm, selectedDailyAmp }) {
  const { userInfo } = useSelector((state) => state.auth);

  const [selectedSignProducer, setSelectedSignProducer] = useState(null);
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

  // ---------------------------------------------------------------------
  // Sign
  // دسترسی امضاء
  const { data: menu } = useGetMenu();
  const electricalMenu = findMenu(menu?.menus ?? [], 'DailyAmp-report');
  const menuId = electricalMenu?.id;

  const { data: permission } = useGetPermissionSignature(userInfo?.userId);
  const canSign = permission?.data?.some(
    (p) => p.menuId === menuId && p.canSignature === true
  );
  // ---------------------------------------------------------------------
  // دسترسی های پیشرفته
  const { data: profile } = useGetProfile();
  // isShiftSupervisorSigned
  const isProducer = selectedDailyAmp?.createdBy === profile?.data?.id;
  const canSignProducer = canSign && isProducer;

  // isSupervisorSigned
  const isSupervisor = profile?.data?.companyRoles?.some(
    (p) => p.roleId === '5e6bcab8-bb18-482f-9805-477ac64fa209'
  );
  const canSignSupervisor = canSign && isSupervisor;
  // ---------------------------------------------------------------------
  // گرفتن عکس امضاء کاربران برای نمایش با ID کاربران
  const { data: signProducer } = useGetSignatureId(
    selectedDailyAmp?.shiftSupervisorSignedByUserId
  );
  const { data: signSupervisor } = useGetSignatureId(
    selectedDailyAmp?.supervisorSignedByUserId
  );
  // ---------------------------------------------------------------------
  useEffect(() => {
    if (
      selectedDailyAmp?.isShiftSupervisorSigned === true &&
      signProducer?.data?.signatureImageBase64
    ) {
      setSelectedSignProducer(signProducer?.data?.signatureImageBase64);
    } else {
      setSelectedSignProducer(null);
    }

    if (
      selectedDailyAmp?.isSupervisorSigned === true &&
      signSupervisor?.data?.signatureImageBase64
    ) {
      setSelectedSignSupervisor(signSupervisor?.data?.signatureImageBase64);
    } else {
      setSelectedSignSupervisor(null);
    }
  }, [
    signProducer,
    signSupervisor,
    selectedDailyAmp?.isShiftSupervisorSigned,
    selectedDailyAmp?.isSupervisorSigned,
  ]);

  const createSignProducer = useRegistrationSignProducerDailyAmpReport();
  const createSignSupervisor = useRegistrationSignSupervisorDailyAmp();

  const handleSubmitSign = () => {
    if (signatureType === 'producer') {
      createSignProducer.mutate(
        {
          id: selectedDailyAmp?.id,
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
      createSignSupervisor.mutate(
        {
          id: selectedDailyAmp?.id,
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
        className={`relative transform rounded-[15px] bg-white p-6 text-white shadow-2xl transition-all duration-300 print:rotate-0${
          openForm
            ? 'translate-y-0 scale-130 opacity-100 max-2xl:scale-95 max-md:scale-60 max-sm:rotate-90 print:mb-3 print:scale-83 print:shadow-none '
            : '-translate-y-10 scale-0 opacity-0'
        }`}
      >
        <div
          className="bg-white text-black"
          style={{ width: '205mm', minHeight: '148mm' }}
        >
          {/* Header */}
          <div className="grid grid-cols-4">
            <div className="flex items-center justify-center border">
              <img src={logo} alt="logo" width={90} />
            </div>
            <div className="col-span-2 flex items-center justify-center border-t border-b border-l">
              <h1 className="font-[SamimBold] text-[20px]">
                جدول گزارش آمپرگیری
              </h1>
            </div>
            <div className="flex flex-col justify-center border-t border-b border-l pr-2 text-[11px]">
              <p className="space-x-1">
                <span className="font-[SamimBold]">کد سند :</span>
                <span className="font-[AvenirLTProHeavy]">F1103</span>
              </p>
              <p className="space-x-1">
                <span className="font-[SamimBold]">شماره ویرایش :</span>
                <span className="font-[AvenirLTProHeavy]">01</span>
              </p>
              <p className="space-x-1">
                <span className="font-[SamimBold]">تاریخ ویرایش :</span>
                <span className="font-[AvenirLTProHeavy]">1402/11/15</span>
              </p>
            </div>
          </div>
          {/* Daily-Weekly-15 days */}
          <div className="my-1 flex items-center justify-center space-x-10 text-[10px]">
            <div className="flex space-x-2">
              <p>روزانه</p>
              <p className="flex size-4 items-center justify-center rounded-full border-2 bg-white text-[13px] text-black">
                <FiCheck />
              </p>
            </div>
            <div className="flex space-x-2">
              <p>هفتگی</p>
              <p className="flex size-4 items-center justify-center rounded-full border-2 bg-white text-black"></p>
            </div>
            <div className="flex space-x-2">
              <p>پانزده روزه</p>
              <p className="flex size-4 items-center justify-center rounded-full border-2 bg-white text-black"></p>
            </div>
          </div>
          {/* Date-ReportNumber-Shift */}
          <div className="flex items-center justify-around border py-0.5 text-[15px]">
            <div className="flex items-center justify-center space-x-1 text-[10px]">
              <p>تاریخ :</p>
              <p className="font-[AvenirLTProMedium]">
                {toShamsi(selectedDailyAmp?.reportDate)}
              </p>
            </div>
            <div className="flex items-center justify-center space-x-1 text-[10px]">
              <p>شماره :</p>
              <p className="font-[AvenirLTProHeavy]">
                {selectedDailyAmp?.reportNumber}
              </p>
            </div>
            <div className="flex items-center justify-center space-x-1 text-[10px]">
              <p>نام شیفت :</p>
              <p className="font-semibold">{selectedDailyAmp?.shiftName}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 border-b text-center">
            <div className="flex items-center border-l bg-gray-300 text-center font-bold">
              <p className="w-10 border-r border-l text-[12px]">ردیف</p>
              <p className="w-[169px] border-l text-[12px]">نام دستگاه</p>
              <p className="w-[55px] border-l text-[12px]">فرکانس</p>
              <p className="w-[31px] border-l text-[12px]">توان</p>
              <p className="w-[30px] border-l text-[12px]">T</p>
              <p className="w-[30px] border-l text-[12px]">S</p>
              <p className="w-[30px] text-[12px]">R</p>
            </div>
            <div className="flex items-center bg-gray-300 text-center font-bold">
              <p className="w-[39px] border-r border-l text-[12px]">ردیف</p>
              <p className="w-[170px] border-l text-[12px]">نام دستگاه</p>
              <p className="w-[55px] border-l text-[12px]">فرکانس</p>
              <p className="w-[30px] border-l text-[12px]">توان</p>
              <p className="w-[30px] border-l text-[12px]">T</p>
              <p className="w-[30px] border-l text-[12px]">S</p>
              <p className="w-[33px] border-l text-[12px]">R</p>
            </div>
          </div>
          <div className="grid grid-cols-2">
            {selectedDailyAmp?.items?.map((d, index) => (
              <div key={d.id} className="h-5">
                <div className="flex border-r border-b border-l">
                  <p className="flex w-[39px] items-center justify-center border-l pt-1 font-[AvenirLTProMedium] text-[10px]">
                    {index + 1}
                  </p>
                  <p className="flex w-[170px] items-center border-l pr-1 text-[10px]">
                    {d?.deviceName}
                  </p>
                  <p className="flex w-[55px] items-center justify-center border-l text-center font-[AvenirLTProMedium] text-[10px]">
                    {d?.frequency}
                  </p>
                  <p className="flex w-[31px] items-center justify-center border-l text-center font-[AvenirLTProMedium] text-[10px]">
                    {d?.power}
                  </p>
                  <p className="flex w-[30px] items-center justify-center border-l text-center font-[AvenirLTProMedium] text-[10px]">
                    {d?.r}
                  </p>

                  <p className="flex w-[30px] items-center justify-center border-l text-center font-[AvenirLTProMedium] text-[10px]">
                    {d?.s}
                  </p>
                  <p className="flex w-8 items-center justify-center text-center font-[AvenirLTProMedium] text-[10px]">
                    {d?.t}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-around pt-3">
            <div className="space-y-1">
              <p className="text-[12px]">امضاء تهیه کننده</p>
              <p>
                {selectedSignProducer ? (
                  <img
                    src={`data:image/png;base64,${selectedSignProducer}`}
                    alt="signature"
                    className="fixed right-65 bottom-0 h-21 w-30"
                  />
                ) : canSignProducer ? (
                  <button
                    onClick={() => handleOpenSignatureModal('producer')}
                    className="mr-3 cursor-pointer rounded-[10px] bg-linear-to-br from-cyan-400 to-black/10 p-2 transition-all delay-75 duration-100 ease-in-out hover:scale-110"
                  >
                    ثبت امضاء
                  </button>
                ) : (
                  <span className="rounded-[10px] bg-red-500 p-1 text-[10px]">
                    عدم دسترسی
                  </span>
                )}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-[12px]">امضاء تایید کننده</p>
              <p>
                {selectedSignSupervisor ? (
                  <img
                    src={`data:image/png;base64,${selectedSignSupervisor}`}
                    alt="signature"
                    className="fixed bottom-0 left-10 h-21 w-30"
                  />
                ) : canSignSupervisor ? (
                  <button
                    onClick={() => handleOpenSignatureModal('supervisor')}
                    className="mr-3 cursor-pointer rounded-[10px] bg-linear-to-br from-cyan-400 to-black/10 p-2 transition-all delay-75 duration-100 ease-in-out hover:scale-110"
                  >
                    ثبت امضاء
                  </button>
                ) : (
                  <span className="rounded-[10px] bg-red-500 p-1 text-[10px]">
                    عدم دسترسی
                  </span>
                )}
              </p>
            </div>
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

export default FormDailyAmpReport;
