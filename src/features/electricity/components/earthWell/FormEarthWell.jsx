import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import logo from '../../../../assets/images/logo.png';
import close from '../../../../assets/images/close.png';
import { toShamsi } from '../../../../Time/date';
import { useGetMenu } from '../../../../hooks/menu/menuApi';
import { findMenu } from '../../../../utils/rbac';
import { useGetPermissionSignature } from '../../../../hooks/user/userApi';
import { useGetProfile } from '../../../../hooks/profile/profile';
import { useGetSignatureId } from '../../../../hooks/Signature/Signature';
import {
  useCreateSignProducer,
  useCreateSignSupervisor,
} from '../../Api/earthWell/earthWell';

function FormEarthWell({ openForm, setOpenForm, selectedEarthWell }) {
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
  const earthWellMenu = findMenu(menu?.menus ?? [], 'visit-earthWell');
  const menuId = earthWellMenu?.id;

  const { data: permission } = useGetPermissionSignature(userInfo?.userId);
  const canSign = permission?.data?.some(
    (p) => p.menuId === menuId && p.canSignature === true
  );
  // ---------------------------------------------------------------------
  // دسترسی های پیشرفته
  const { data: profile } = useGetProfile();
  // isShiftSupervisorSigned
  const isProducer = selectedEarthWell?.createdBy === profile?.data?.id;
  const canSignProducer = canSign && isProducer;

  // isSupervisorSigned
  const isSupervisor = profile?.data?.companyRoles?.some(
    (p) =>
      p.roleId === 'c3dab3b9-f727-4b6f-a7fb-fc0f5970dd04' ||
      p.roleId === '4db3846f-d8c1-4b9e-a710-62c7514cfd3c'
  );
  const canSignSupervisor = canSign && isSupervisor;
  // ---------------------------------------------------------------------
  // گرفتن عکس امضاء کاربران برای نمایش با ID کاربران
  const { data: signProducer } = useGetSignatureId(
    selectedEarthWell?.executorSignedByUserId
  );
  const { data: signSupervisor } = useGetSignatureId(
    selectedEarthWell?.pmSupervisorSignedByUserId
  );
  // ---------------------------------------------------------------------
  useEffect(() => {
    if (
      selectedEarthWell?.isExecutorSigned === true &&
      signProducer?.data?.signatureImageBase64
    ) {
      setSelectedSignProducer(signProducer?.data?.signatureImageBase64);
    } else {
      setSelectedSignProducer(null);
    }

    if (
      selectedEarthWell?.isPMSupervisorSigned === true &&
      signSupervisor?.data?.signatureImageBase64
    ) {
      setSelectedSignSupervisor(signSupervisor?.data?.signatureImageBase64);
    } else {
      setSelectedSignSupervisor(null);
    }
  }, [
    signProducer,
    signSupervisor,
    selectedEarthWell?.isShiftSupervisorSigned,
    selectedEarthWell?.isPMSupervisorSigned,
  ]);

  const createSignProducer = useCreateSignProducer();
  const createSignSupervisor = useCreateSignSupervisor();

  const handleSubmitSign = () => {
    if (signatureType === 'producer') {
      createSignProducer.mutate(
        {
          id: selectedEarthWell?.id,
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
          id: selectedEarthWell?.id,
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
            ? 'translate-y-0 scale-110 opacity-100 max-2xl:scale-70 max-md:scale-60 print:scale-97 '
            : '-translate-y-10 scale-0 opacity-0'
        }`}
      >
        <div className="h-[749px] w-[560px] bg-white text-black print:scale-87">
          <div className="grid grid-cols-4">
            <div className="flex items-center justify-center border">
              <img src={logo} alt="logo" width={80} />
            </div>
            <div className="col-span-2 flex items-center justify-center border-t border-b border-l">
              <h1 className="font-[SamimBold] text-[14px]">
                بازدید ماهیانه چاه های ارت
              </h1>
            </div>
            <div className="flex flex-col justify-center border-t border-b border-l pr-2 text-[11px]">
              <p className="space-x-1">
                <span className="font-[SamimBold]">کد سند :</span>
                <span className="font-[AvenirLTProHeavy]">F1105</span>
              </p>
              <p className="space-x-1">
                <span className="font-[SamimBold]">شماره ویرایش :</span>
                <span className="font-[AvenirLTProHeavy]">00</span>
              </p>
              <p className="space-x-1">
                <span className="font-[SamimBold]">تاریخ ویرایش :</span>
                <span className="font-[AvenirLTProHeavy]">1401/05/01</span>
              </p>
            </div>
          </div>
          <div className="my-1 flex items-center justify-around">
            <p className="flex items-center justify-center space-x-1 text-[10px]">
              <span>تاریخ :</span>
              <span className="font-[AvenirLTProMedium]">
                {toShamsi(selectedEarthWell?.inspectionDate)}
              </span>
            </p>
            <p className="flex items-center justify-center space-x-1 text-[10px]">
              <span>شماره :</span>
              <span className="font-[AvenirLTProMedium]">
                {selectedEarthWell?.inspectionNumber}
              </span>
            </p>
          </div>
          <div className="border-l">
            <table className="w-full">
              <thead className="border-t border-b">
                <tr className="bg-gray-300 text-[12px]">
                  <th className="w-8 border-r border-l">شماره چاه</th>
                  <th className="w-45 border-l">محل</th>
                  <th className="w-10 border-l">نتیجه</th>
                  <th className="">توضیحات</th>
                </tr>
              </thead>
              <tbody>
                {selectedEarthWell?.items?.map((e, index) => (
                  <tr key={index} className="h-[42px]">
                    <td className="border-r border-b border-l text-center font-[AvenirLTProMedium] text-[12px]">
                      {e?.wellNumber}
                    </td>
                    <td className="border-b border-l px-0.5 py-2 text-center text-[10px] font-bold">
                      {e?.wellLocation}
                    </td>
                    <td className="border-b border-l text-center text-[13px] font-bold">
                      {e?.inspectionResult === true ? 'OK' : 'N.OK'}
                    </td>
                    <td className="border-b text-center text-[10.5px] font-bold">
                      {e?.notes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-around pt-8">
            <div>
              <p>امضاء مجری :</p>
              <p>
                {selectedSignProducer ? (
                  <img
                    src={`data:image/png;base64,${selectedSignProducer}`}
                    alt="signature"
                    className="fixed right-50 bottom-1 h-27 w-35"
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
            <div>
              <p>امضاء سرپرست P.M :</p>
              <p>
                {selectedSignSupervisor ? (
                  <img
                    src={`data:image/png;base64,${selectedSignSupervisor}`}
                    alt="signature"
                    className="fixed bottom-1 left-0 h-27 w-35"
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
            autoComplete="off"
            placeholder="ثبت کدامضاء"
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

export default FormEarthWell;
