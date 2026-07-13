import { useSelector } from 'react-redux';
import logo from '../../../../assets/images/logo.png';
import close from '../../../../assets/images/close.png';
import { useEffect, useMemo, useState } from 'react';
import { useGetMenu } from '../../../../hooks/menu/menuApi';
import { findMenu } from '../../../../utils/rbac';
import { useGetPermissionSignature } from '../../../../hooks/user/userApi';
import { useGetSignatureId } from '../../../../hooks/Signature/Signature';
import { useGetProfile } from '../../../../hooks/profile/profile';
import {
  useCreateSignatureHandover,
  useCreateSignatureReceiver,
  useCreateSignatureSupervisor,
} from '../../Api/Mechanical/mechanical';
import { normalizeTime, toShamsi } from '../../../../Time/date';

function FormReport({
  openFormReport,
  setOpenFormReport,
  selectedMechanical,
  setSelectedMechanical,
  mechanical,
}) {
  const { userInfo } = useSelector((state) => state.auth);

  const [selectedSignatureHandover, setSelectedSignatureHandover] =
    useState(null);

  const [selectedSignatureReceiver, setSelectedSignatureReceiver] =
    useState(null);

  const [selectedSignatureSupervisor, setSelectedSignatureSupervisor] =
    useState(null);

  const [openCode, setOpenCode] = useState(false);
  const [password, setPassword] = useState('');
  const [signatureType, setSignatureType] = useState(null);

  const handleOpenSignatureModal = (type) => {
    setSignatureType(type);
    setOpenCode(!openCode);
  };

  const { data: menu } = useGetMenu();
  const mechanicalMenu = findMenu(menu?.menus ?? [], 'mechanical-report');

  const menuId = mechanicalMenu?.id;

  const { data: permission } = useGetPermissionSignature(userInfo?.userId);
  const canSign = permission?.data?.some(
    (p) => p.menuId === menuId && p.canSignature === true
  );

  const { data: signHandover } = useGetSignatureId(
    selectedMechanical?.shiftHandOverByUserId
  );

  const { data: signReceiver } = useGetSignatureId(
    selectedMechanical?.shiftReceiverByUserId
  );

  const { data: signSupervisor } = useGetSignatureId(
    selectedMechanical?.supervisorByUserId
  );

  const { data: profile } = useGetProfile();

  const isHandover = selectedMechanical?.createdBy === profile?.data?.id;

  const canSignHandover = canSign && isHandover;

  const isSupervisor = profile?.data?.companyRoles?.some(
    (p) => p.roleId === '4145c307-d316-4adf-afee-5bf7b0bc58f4'
  );
  const canSignSupervisor = canSign && isSupervisor;

  useEffect(() => {
    // handover
    if (
      selectedMechanical?.isShiftHandOverSigned === true &&
      signHandover?.data?.signatureImageBase64
    ) {
      setSelectedSignatureHandover(signHandover.data.signatureImageBase64);
    } else {
      setSelectedSignatureHandover(null);
    }
    // receiver
    if (
      selectedMechanical?.isShiftReceiverSigned === true &&
      signReceiver?.data?.signatureImageBase64
    ) {
      setSelectedSignatureReceiver(signReceiver.data.signatureImageBase64);
    } else {
      setSelectedSignatureReceiver(null);
    }
    // supervisor
    if (
      selectedMechanical?.isSupervisorSigned === true &&
      signSupervisor?.data?.signatureImageBase64
    ) {
      setSelectedSignatureSupervisor(
        signSupervisor?.data?.signatureImageBase64
      );
    } else {
      setSelectedSignatureSupervisor(null);
    }
  }, [
    signHandover,
    signReceiver,
    signSupervisor,
    selectedMechanical?.isShiftHandOverSigned,
    selectedMechanical?.isShiftReceiverSigned,
    selectedMechanical?.isSupervisorSigned,
  ]);

  const createSignatureHandover = useCreateSignatureHandover(
    selectedMechanical?.id
  );

  const createSignatureReceiver = useCreateSignatureReceiver(
    selectedMechanical?.id
  );

  const createSignatureSupervisor = useCreateSignatureSupervisor(
    selectedMechanical?.id
  );

  const handleSubmitSignature = () => {
    if (signatureType === 'handover') {
      createSignatureHandover.mutate(
        { signaturePassword: password },
        {
          onSuccess: () => {
            setOpenCode(!openCode);
            setOpenFormReport(!openFormReport);
          },
        }
      );
    }

    if (signatureType === 'receiver') {
      createSignatureReceiver.mutate(
        { signaturePassword: password },
        {
          onSuccess: () => {
            setOpenCode(!openCode);
            setOpenFormReport(!openFormReport);
          },
        }
      );
    }
    if (signatureType === 'supervisor') {
      createSignatureSupervisor.mutate(
        { signaturePassword: password },
        {
          onSuccess: () => {
            setOpenCode(!openCode);
            setOpenFormReport(!openFormReport);
          },
        }
      );
    }
  };

  const closeHandler = () => {
    setOpenFormReport(false);
  };

  const rows = useMemo(() => {
    const arr = [...(selectedMechanical?.operations ?? [])];

    while (arr.length < 12) {
      arr.push({});
    }

    return arr.slice(0, 12);
  }, [selectedMechanical]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
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
        className={`h-lenovo:scale-70 relative transform rounded-[15px] bg-white p-6 text-white shadow-2xl transition-all duration-300 max-2xl:scale-85 max-xl:scale-75 max-md:scale-45 max-md:rotate-90 print:scale-90! ${
          openFormReport
            ? 'translate-y-0 scale-100 opacity-100'
            : '-translate-y-10 scale-0 opacity-0'
        }`}
      >
        <div
          className="scale-90 border-2 bg-white text-black max-2xl:scale-100"
          style={{ width: '297mm', minHeight: '210mm' }}
        >
          {/* logo & hedear */}
          <div className="grid grid-cols-5">
            <div className="flex items-center justify-center border-b border-l">
              <img src={logo} alt="logo" width={115} />
            </div>
            <div className="col-span-3 flex items-center justify-center border-b border-l">
              <h1 className="font-[SamimBold] text-[20px]">
                گزارش کار روزانه واحد مکانیک
              </h1>
            </div>
            <div className="flex flex-col justify-center border-b pr-2">
              <p className="space-x-1 text-[15px]">
                <span className="font-[SamimBold]">کد سند :</span>
                <span className="font-[AvenirLTProHeavy]">F0609</span>
              </p>
              <p className="space-x-1 text-[15px]">
                <span className="font-[SamimBold]">شماره بازنگری :</span>
                <span className="font-[AvenirLTProHeavy]">00</span>
              </p>
              <p className="space-x-1 text-[15px]">
                <span className="font-[SamimBold]">تاریخ بازنگری :</span>
                <span className="font-[AvenirLTProHeavy]">1401/05/01</span>
              </p>
            </div>
          </div>
          {/* date & number & code */}
          <div className="flex justify-between px-2 pt-2">
            <p className="flex items-center justify-center space-x-1">
              <span className="font-[Samim] text-[15px]">تاریخ :</span>
              <span className="font-[AvenirLTProBook] text-[15px]">
                {toShamsi(selectedMechanical?.reportDate)}
              </span>
            </p>
            <p className="flex items-center justify-center space-x-1">
              <span className="font-[Samim] text-[15px]">شماره :</span>
              <span className="font-[AvenirLTProBook] text-[15px]">
                {selectedMechanical?.reportNumber}
              </span>
            </p>
            <p className="flex items-center justify-center space-x-1">
              <span className="font-[Samim] text-[15px]">شیفت :</span>
              <span className="font-[VazirLight] text-[15px]">
                {selectedMechanical?.shiftTypeDisplay}
              </span>
            </p>
          </div>
          {/* table */}
          <div className="pt-2">
            <table className="w-full">
              <thead className="w-full border-separate border-spacing-y-2 px-5">
                <tr className="text-center">
                  <th className="border-t border-b border-l px-2 text-[13px]">
                    ردیف
                  </th>
                  <th className="w-[800px] border-t border-b border-l text-[13px]">
                    شرح عملیات
                  </th>
                  <th className="w-[81px] border-t border-b border-l px-2 text-[13px]">
                    واحد درخواست‌کننده
                  </th>
                  <th className="border-t border-b border-l px-2 text-[13px]">
                    ساعت شروع
                  </th>
                  <th className="border-t border-b border-l px-2 text-[13px]">
                    ساعت پایان
                  </th>
                  <th className="w-20 border-t border-b px-2 text-[13px]">
                    مجری عملیات
                  </th>
                </tr>
              </thead>
              <tbody className="h-75 border-b">
                {rows.map((m, index) => (
                  <tr key={index} className="border-b text-center">
                    <td className="border-l py-1.5 font-[AvenirLTProHeavy]">
                      {index + 1}
                    </td>
                    <td className="border-l font-[VazirLight] text-[13px] font-semibold">
                      {m?.operationDescription}
                    </td>
                    <td className="border-l font-semibold">
                      {m?.requestingUnit}
                    </td>
                    <td className="border-l px-1 font-[AvenirLTProHeavy] text-[13px]">
                      {normalizeTime(m?.startTime)}
                    </td>
                    <td className="border-l px-1 font-[AvenirLTProHeavy] text-[13px]">
                      {normalizeTime(m?.endTime)}
                    </td>
                    <td className="font-[VazirLight] text-[13px] font-semibold">
                      {m?.operationExecutor}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="grid h-[110px] grid-cols-2">
            <div className="flex flex-col border-b border-l pt-1 pr-1 text-[15px]">
              <span className="">قطعات مصرف شده در طول شیفت کاری :</span>
              <div className="flex flex-wrap space-x-1">
                {selectedMechanical?.operations
                  ?.map((f, originalIndex) => ({
                    ...f,
                    originalIndex: originalIndex + 1,
                  }))
                  ?.filter(
                    (f) =>
                      f.consumedPartsInShift &&
                      f.consumedPartsInShift.trim() !== ''
                  )
                  ?.map((f, index) => (
                    <p
                      key={f.id}
                      className="flex items-center rounded py-1 break-all"
                    >
                      <span className="font-[AvenirLTProHeavy] text-sm">
                        {f.originalIndex}-
                      </span>
                      <span className="text-sm font-semibold">
                        {f.consumedPartsInShift}
                      </span>
                    </p>
                  ))}
              </div>
            </div>

            <div className="flex flex-col border-b pt-1 pr-1 text-[15px]">
              <span className="">اقلام تحویلی از انبار:</span>
              <div className="flex flex-wrap space-x-1">
                {selectedMechanical?.operations
                  ?.filter(
                    (f) =>
                      f.warehouseDeliveredItems &&
                      f.warehouseDeliveredItems.trim() !== ''
                  )
                  ?.map((f, index) => (
                    <p
                      key={index}
                      className="flex items-center rounded py-1 break-all"
                    >
                      <span className="font-[AvenirLTProHeavy] text-sm">
                        {index + 1}-
                      </span>
                      <span className="text-sm font-semibold">
                        {f.warehouseDeliveredItems}
                      </span>
                    </p>
                  ))}
              </div>
            </div>
          </div>
          <div className="flex pt-6 pr-2">
            <p className="pl-50">
              <span>تحویل دهنده شیفت :</span>
              <span>
                {selectedSignatureHandover ? (
                  <img
                    src={`data:image/png;base64,${selectedSignatureHandover}`}
                    alt="signature"
                    className="fixed top-173 right-37 h-25 w-40"
                  />
                ) : canSignHandover ? (
                  <button
                    onClick={() => handleOpenSignatureModal('handover')}
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
            <p className="pl-50">
              <span>تحویل گیرنده :</span>
              <span>
                {selectedSignatureReceiver ? (
                  <img
                    src={`data:image/png;base64,${selectedSignatureReceiver}`}
                    alt="signature"
                    className="fixed top-173 right-115 h-25 w-40"
                  />
                ) : canSign ? (
                  <button
                    onClick={() => handleOpenSignatureModal('receiver')}
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
            <p>
              <span>سرپرست واحد :</span>
              <span>
                {selectedSignatureSupervisor ? (
                  <img
                    src={`data:image/png;base64,${selectedSignatureSupervisor}`}
                    alt="signature"
                    className="fixed top-173 left-40 h-25 w-40"
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
            setOpenCode(!openCode);
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
                setOpenCode(!openCode);
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

export default FormReport;
