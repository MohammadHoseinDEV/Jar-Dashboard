import React, { useEffect, useState } from 'react';

import logo from '../../../../assets/images/logo.png';
import close from '../../../../assets/images/close.png';

import { toShamsi } from '../../../../Time/date';
import {
  useCreateSignProducerControlChecklist,
  useCreateSignSupervisorControlChecklist,
} from '../../Api/controlChecklist/controlChecklist';
import { useSelector } from 'react-redux';
import { useGetMenu } from '../../../../hooks/menu/menuApi';
import { findMenu } from '../../../../utils/rbac';
import { useGetPermissionSignature } from '../../../../hooks/user/userApi';
import { useGetProfile } from '../../../../hooks/profile/profile';
import { useGetSignatureId } from '../../../../hooks/Signature/Signature';

function FormControlChecklist({
  openForm,
  setOpenForm,
  selectedControlChecklist,
}) {
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
  const shiftLabel = {
    2: 'روز کاری اول',
    4: 'روز کاری دوم',
    6: 'شب کاری اول',
    8: 'شب کاری دوم',
  };

  const closeHandler = () => {
    setOpenForm(false);
  };

  // ---------------------------------------------------------------------
  // Sign
  // دسترسی امضاء
  const { data: menu } = useGetMenu();
  const controlChecklistMenu = findMenu(
    menu?.menus ?? [],
    'controlChecklist-report'
  );
  const menuId = controlChecklistMenu?.id;

  const { data: permission } = useGetPermissionSignature(userInfo?.userId);
  const canSign = permission?.data?.some(
    (p) => p.menuId === menuId && p.canSignature === true
  );
  // ---------------------------------------------------------------------
  // دسترسی های پیشرفته
  const { data: profile } = useGetProfile();
  // isShiftSupervisorSigned
  const isProducer = selectedControlChecklist?.createdBy === profile?.data?.id;
  const canSignProducer = canSign && isProducer;

  // isSupervisorSigned
  const isSupervisor = profile?.data?.companyRoles?.some(
    (p) => p.roleId === '5e6bcab8-bb18-482f-9805-477ac64fa209'
  );
  const canSignSupervisor = canSign && isSupervisor;
  // ---------------------------------------------------------------------
  // گرفتن عکس امضاء کاربران برای نمایش با ID کاربران
  const { data: signProducer } = useGetSignatureId(
    selectedControlChecklist?.executorSignedByUserId
  );
  const { data: signSupervisor } = useGetSignatureId(
    selectedControlChecklist?.supervisorSignedByUserId
  );
  // ---------------------------------------------------------------------
  useEffect(() => {
    if (
      selectedControlChecklist?.isExecutorSigned === true &&
      signProducer?.data?.signatureImageBase64
    ) {
      setSelectedSignProducer(signProducer?.data?.signatureImageBase64);
    } else {
      setSelectedSignProducer(null);
    }

    if (
      selectedControlChecklist?.isSupervisorSigned === true &&
      signSupervisor?.data?.signatureImageBase64
    ) {
      setSelectedSignSupervisor(signSupervisor?.data?.signatureImageBase64);
    } else {
      setSelectedSignSupervisor(null);
    }
  }, [
    signProducer,
    signSupervisor,
    selectedControlChecklist?.isShiftSupervisorSigned,
    selectedControlChecklist?.isSupervisorSigned,
  ]);

  const createSignProducer = useCreateSignProducerControlChecklist();
  const createSignSupervisor = useCreateSignSupervisorControlChecklist();

  const handleSubmitSign = () => {
    if (signatureType === 'producer') {
      createSignProducer.mutate(
        {
          id: selectedControlChecklist?.id,
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
          id: selectedControlChecklist?.id,
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
        className={`relative transform rounded-[15px] bg-white p-6 text-white shadow-2xl transition-all duration-300 ${
          openForm
            ? 'translate-y-0 scale-110 opacity-100 max-2xl:scale-70 max-md:scale-60 print:scale-86 print:shadow-none'
            : '-translate-y-10 scale-0 opacity-0'
        }`}
      >
        <div
          className="border bg-white text-black"
          style={{ width: '148mm', minHeight: '205mm' }}
        >
          {/* Header */}
          <div className="grid grid-cols-4">
            <div className="flex items-center justify-center border">
              <img src={logo} alt="logo" width={90} />
            </div>
            <div className="col-span-2 flex items-center justify-center border-t border-b border-l">
              <h1 className="font-[SamimBold] text-[14px]">
                چک لیست کنترل اتاق های پست،توزیع و فرمان
              </h1>
            </div>
            <div className="flex flex-col justify-center border-t border-b border-l pr-2 text-[11px]">
              <p className="space-x-1">
                <span className="font-[SamimBold]">کد سند :</span>
                <span className="font-[AvenirLTProHeavy]">F1104</span>
              </p>
              <p className="space-x-1">
                <span className="font-[SamimBold]">شماره ویرایش :</span>
                <span className="font-[AvenirLTProHeavy]">03</span>
              </p>
              <p className="space-x-1">
                <span className="font-[SamimBold]">تاریخ ویرایش :</span>
                <span className="font-[AvenirLTProHeavy]">1403/10/02</span>
              </p>
            </div>
          </div>
          {/* Date-ReportNumber-Shift */}
          <div className="mt-3 flex items-center justify-around border text-[12px]">
            <p className="flex items-center justify-center space-x-1 text-[10px]">
              <span>تاریخ :</span>
              <span className="font-[AvenirLTProMedium]">
                {toShamsi(selectedControlChecklist?.checklistDate)}
              </span>
            </p>
            <p className="flex items-center justify-center space-x-1 text-[10px]">
              <span>شماره :</span>
              <span className="font-[AvenirLTProHeavy]">
                {selectedControlChecklist?.checklistNumber}
              </span>
            </p>
            <p className="flex items-center justify-center space-x-1 text-[10px]">
              <span>شیفت :</span>
              <span className="flex items-center justify-center font-semibold">
                {`${selectedControlChecklist?.shiftName} _ ${shiftLabel[selectedControlChecklist?.shiftFlags]}`}
              </span>
            </p>
          </div>
          <div className="border-r border-l">
            <table className="w-full">
              <thead className="border-b">
                <tr className="bg-gray-300 text-[12px]">
                  <th className="w-8 border-l">ردیف</th>
                  <th className="w-50 border-l">نام تجهیز</th>
                  <th className="w-27 border-l">محل قرارگیری</th>
                  <th className="w-8 border-l">دما</th>
                  <th className="w-8 border-l">آمپر</th>
                  <th className="w-17 border-l">بازدید ظاهری</th>
                  <th>Set Point</th>
                </tr>
              </thead>
              <tbody>
                {selectedControlChecklist?.items?.map((c, index) => (
                  <tr key={index}>
                    <td className="border-b border-l text-center font-[AvenirLTProMedium] text-[12px]">
                      {index + 1}
                    </td>
                    <td className="border-b border-l text-center text-[10.5px] font-bold">
                      {c?.equipmentName}
                    </td>
                    <td className="border-b border-l text-center text-[10px] font-bold">
                      {c?.location}
                    </td>
                    <td className="border-b border-l text-center font-[AvenirLTProMedium] text-[10px] font-bold">
                      {c?.temperature}
                    </td>
                    <td className="border-b border-l text-center font-[AvenirLTProMedium] text-[10px] font-bold">
                      {c?.ampere}
                    </td>
                    <td className="border-b border-l text-center font-[AvenirLTProMedium] text-[10px] font-bold">
                      {c?.visualInspection}
                    </td>
                    <td className="border-b text-center font-[AvenirLTProMedium] text-[10px] font-bold">
                      {c?.setpoint}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <div className="h-20 px-1">
              <p className="text-[12px] font-bold">توضیحات :</p>
              <p className="font-[VazirLight] text-[11px]">
                {selectedControlChecklist?.description}
              </p>
            </div>
            <div className="flex justify-around pt-2">
              <div className="flex items-center space-x-1">
                <p className="text-[12px]">امضاء مجری :</p>
                <p>
                  {selectedSignProducer ? (
                    <img
                      src={`data:image/png;base64,${selectedSignProducer}`}
                      alt="signature"
                      className="fixed right-45 bottom-6 h-15 w-30"
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
              <div className="flex items-center space-x-1">
                <p className="text-[12px]">امضاء سرپرست :</p>
                <p>
                  {selectedSignSupervisor ? (
                    <img
                      src={`data:image/png;base64,${selectedSignSupervisor}`}
                      alt="signature"
                      width={100}
                      className="fixed bottom-6 left-10"
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

export default FormControlChecklist;
