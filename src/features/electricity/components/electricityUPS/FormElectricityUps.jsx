import React, { useEffect, useMemo, useState } from 'react';

import logo from '../../../../assets/images/logo.png';
import close from '../../../../assets/images/close.png';
import { useGetMenu } from '../../../../hooks/menu/menuApi';
import { useGetPermissionSignature } from '../../../../hooks/user/userApi';
import { useSelector } from 'react-redux';
import { findMenu } from '../../../../utils/rbac';
import { useGetSignatureId } from '../../../../hooks/Signature/Signature';
import { useGetProfile } from '../../../../hooks/profile/profile';
import { toShamsi } from '../../../../Time/date';
import {
  useCreateSignExecutor,
  useCreateSignSupervisor,
} from '../../Api/electricityUPS/electricityUps';

function FormElectricityUps({
  openFormReport,
  setOpenFormReport,
  selectedReport,
}) {
  const { userInfo } = useSelector((state) => state.auth);

  const [selectedExecutor, setSelectedExecutor] = useState(null);
  const [selectedSupervisor, setSelectedSupervisor] = useState(null);
  const [openCode, setOpenCode] = useState(false);
  const [password, setPassword] = useState('');
  const [signatureType, setSignatureType] = useState(null);

  const rows = useMemo(() => {
    const arr = [...(selectedReport?.section1Items ?? [])];

    while (arr.length < 33) {
      arr.push({});
    }

    return arr.slice(0, 33);
  }, [selectedReport]);

  const row = useMemo(() => {
    const arr = [...(selectedReport?.section2Items ?? [])];

    while (arr.length < 4) {
      arr.push({});
    }

    return arr.slice(0, 4);
  }, [selectedReport]);

  const closeHandler = () => {
    setOpenFormReport(false);
  };

  const handleOpenSignatureModal = (type) => {
    setSignatureType(type);
    setOpenCode(true);
  };
  // ----------------------------------------
  const { data: menu } = useGetMenu();
  const upsMenu = findMenu(menu?.menus ?? [], 'upsBatteryVoltage-report');
  const menuId = upsMenu?.id;

  const { data: permission } = useGetPermissionSignature(userInfo?.userId, {
    enabled: !!userInfo?.userId && !!menuId && openFormReport,
  });

  const cansign = permission?.data?.some(
    (p) => p.menuId === menuId && p.canSignature === true
  );
  // ----------------------------------------
  const { data: signeExecutor } = useGetSignatureId(
    selectedReport?.executorSignedByUserId
  );
  const { data: signSupervisor } = useGetSignatureId(
    selectedReport?.supervisorSignedByUserId
  );
  // ----------------------------------------

  const { data: profile } = useGetProfile();

  const isHandover = selectedReport?.createdBy === profile?.data?.id;

  const canSignHandover = cansign && isHandover;

  const isSupervisor = profile?.data?.companyRoles?.some(
    (r) => r.roleId === '5e6bcab8-bb18-482f-9805-477ac64fa209'
  );
  // 5e6bcab8-bb18-482f-9805-477ac64fa209  سرپرست
  // e8d691c5-827c-4c65-9d1a-14def8620ade  کارشناس فناوری

  const canSignSupervisor = cansign && isSupervisor;

  // ------------------------------------------------------

  useEffect(() => {
    if (
      selectedReport?.isExecutorSigned === true &&
      signeExecutor?.data?.signatureImageBase64
    ) {
      setSelectedExecutor(signeExecutor?.data?.signatureImageBase64);
    } else {
      setSelectedExecutor(null);
    }

    if (
      selectedReport?.isSupervisorSigned === true &&
      signSupervisor?.data?.signatureImageBase64
    ) {
      setSelectedSupervisor(signSupervisor?.data?.signatureImageBase64);
    } else {
      setSelectedSupervisor(null);
    }
  }, [
    selectedReport?.isExecutorSigned,
    selectedReport?.isSupervisorSigned,
    signeExecutor,
    signSupervisor,
  ]);

  const createSignExecutor = useCreateSignExecutor();
  const createSignSupervisor = useCreateSignSupervisor();

  const handleSubmitSignature = () => {
    if (signatureType === 'executor') {
      createSignExecutor.mutate(
        {
          id: selectedReport?.id,
          signaturePassword: password,
        },
        {
          onSuccess: () => {
            setOpenCode(false);
            setOpenFormReport(false);
          },
        }
      );
    }

    if (signatureType === 'supervisor') {
      createSignSupervisor.mutate(
        {
          id: selectedReport?.id,
          signaturePassword: password,
        },
        {
          onSuccess: () => {
            setOpenCode(false);
            setOpenFormReport(false);
          },
        }
      );
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 print:p-0 ${
        openFormReport
          ? 'pointer-events-auto opacity-100 '
          : 'pointer-events-none opacity-0'
      }`}
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        onClick={closeHandler}
      />
      <div
        className={`relative transform rounded-[15px] bg-white p-2 text-white shadow-2xl transition-all duration-300 max-2xl:pb-0 print:scale-87! print:p-0 ${
          openFormReport
            ? 'translate-y-0 scale-112 opacity-100 max-2xl:scale-90 max-xl:scale-75 max-md:scale-65 max-md:scale-y-90 print:shadow-none '
            : '-translate-y-10 scale-0 opacity-0'
        }`}
      >
        <div
          className="border-2 text-black"
          style={{ width: '148mm', minHeight: '210mm' }}
        >
          <div className="grid grid-cols-8 border-b">
            <div className="col-span-2 flex items-center justify-center border-l">
              <img src={logo} alt="logo" width={115} />
            </div>
            <div className="col-span-4 flex items-center justify-center border-l">
              <h1 className="font-[SamimBold] text-[20px]">
                ولتاژگیری باطریهای UPS
              </h1>
            </div>

            <div className="col-span-2 flex flex-col justify-center pr-2">
              <p className="space-x-1 text-[11px]">
                <span className="font-[SamimBold]">کد سند :</span>
                <span className="font-[AvenirLTProHeavy]">F1102</span>
              </p>
              <p className="space-x-1 text-[11px]">
                <span className="font-[SamimBold]">شماره بازنگری :</span>
                <span className="font-[AvenirLTProHeavy]">00</span>
              </p>
              <p className="space-x-1 text-[11px]">
                <span className="font-[SamimBold]">تاریخ بازنگری :</span>
                <span className="font-[AvenirLTProHeavy]">1401/05/01</span>
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between space-x-1 p-1">
            <p className="flex items-center justify-center space-x-1">
              <span className="font-[Samim] text-[10px] font-bold">
                تاریخ :
              </span>
              <span className="font-[AvenirLTProBook] text-[10px] font-semibold">
                {toShamsi(selectedReport?.readingDate)}
              </span>
            </p>
            <p className="flex items-center justify-center space-x-1">
              <span className="font-[Samim] text-[10px] font-bold">
                نام و نام خانوادگی :
              </span>
              <span className="font-[VazirLight] text-[10px] font-bold">
                {selectedReport?.personnelName}
              </span>
            </p>
            <p className="flex items-center justify-center space-x-1">
              <span className="font-[Samim] text-[10px] font-bold">شیفت :</span>
              <span className="font-[VazirLight] text-[10px] font-bold">
                {selectedReport?.shiftName}
              </span>
            </p>
            <p className="flex items-center justify-center space-x-1">
              <span className="font-[Samim] text-[10px] font-bold">
                شماره :
              </span>
              <span className="font-[AvenirLTProBook] text-[10px] font-semibold">
                {selectedReport?.readingNumber}
              </span>
            </p>
          </div>
          <div className="mx-2 grid grid-cols-9 border-t bg-gray-500/40">
            <div className="col-span-1 flex items-center justify-center border-r border-b border-l font-semibold">
              <p>ردیف</p>
            </div>
            <div className="col-span-2 flex items-center justify-center border-b font-semibold">
              <p>ولتاژ</p>
            </div>
            <div className="col-span-1 flex items-center justify-center border-r border-b border-l font-semibold">
              <p>ردیف</p>
            </div>
            <div className="col-span-2 flex items-center justify-center border-b font-semibold">
              <p>ولتاژ</p>
            </div>
            <div className="col-span-1 flex items-center justify-center border-r border-b border-l font-semibold">
              <p>ردیف</p>
            </div>
            <div className="col-span-2 flex items-center justify-center border-b border-l font-semibold">
              <p>ولتاژ</p>
            </div>
          </div>
          <div>
            <div className="mx-2 grid min-h-60 grid-cols-3 border-l">
              {rows.map((m, index) => (
                <div key={index} className="flex">
                  {/* یا عرض مناسب دیگر */}
                  <p className="col-span-1 flex w-[60px] items-center justify-center border-r border-b border-l font-[AvenirLTProBook]">
                    {index + 1 || ''}
                  </p>
                  <span className="col-span-2 flex h-7 w-[119px] items-center justify-center border-b font-[AvenirLTProMedium]">
                    {m?.voltage || ''}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="m-2">
            <div className="grid grid-cols-9 border-t bg-gray-500/40">
              <p className="col-span-1 flex items-center justify-center border-r border-b border-l font-bold">
                ردیف
              </p>
              <p className="col-span-4 flex items-center justify-center border-b border-l font-[AvenirLTProBook] font-bold">
                G1
              </p>
              <p className="col-span-4 flex items-center justify-center border-b border-l font-[AvenirLTProBook] font-bold">
                G2
              </p>
            </div>

            {row.map((m, index) => (
              <div key={index} className="grid h-8 grid-cols-9">
                <span className="col-span-1 flex items-center justify-center border-r border-b border-l font-[AvenirLTProBook]">
                  {index + 1}
                </span>
                <span className="col-span-4 flex items-center justify-center border-b border-l font-[AvenirLTProMedium]">
                  {m?.g1 || ''}
                </span>
                <span className="col-span-4 flex items-center justify-center border-b border-l font-[AvenirLTProMedium]">
                  {m?.g2 || ''}
                </span>
              </div>
            ))}
          </div>
          <div className="m-2 flex justify-between px-2">
            <div className="fixed bottom-30 flex">
              <p className="text-[13px] font-bold">نام و امضاء تهیه کننده :</p>
              <p className="">
                {selectedExecutor ? (
                  <img
                    src={`data:image/png;base64,${selectedExecutor}`}
                    alt="signature"
                    className="fixed top-155 right-30 h-35 w-40"
                  />
                ) : canSignHandover ? (
                  <button
                    onClick={() => handleOpenSignatureModal('executor')}
                    className="mr-3 cursor-pointer rounded-[10px] bg-linear-to-br from-cyan-400 to-black/10 p-2 transition-all delay-75 duration-100 ease-in-out hover:scale-110"
                  >
                    ثبت امضاء
                  </button>
                ) : (
                  <span className="rounded-[10px] bg-red-500 p-1 text-[15px]">
                    عدم دسترسی
                  </span>
                )}
              </p>
            </div>
            <div className="fixed bottom-10 left-25 flex">
              <p className="text-[13px] font-bold">نام و امضاء تایید کننده :</p>
              <p>
                {selectedSupervisor ? (
                  <img
                    src={`data:image/png;base64,${selectedSupervisor}`}
                    alt="signature"
                    width={180}
                    className="fixed top-171 left-10"
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
            onClick={handleSubmitSignature}
            className="float-left mt-2 cursor-pointer rounded-[10px] bg-green-500 p-2 transition-all delay-75 duration-100 hover:bg-green-700"
          >
            تایید
          </button>
        </div>
      </div>
    </div>
  );
}

export default FormElectricityUps;
