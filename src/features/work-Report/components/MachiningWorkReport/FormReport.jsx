import { useEffect, useMemo, useState } from 'react';

import logo from '../../../../assets/images/logo.png';
import close from '../../../../assets/images/close.png';

import {
  useGetSignature,
  useGetSignatureId,
} from '../../../../hooks/Signature/Signature';
import { useSelector } from 'react-redux';
import { useGetPermissionSignature } from '../../../../hooks/user/userApi';
import { useGetMenu } from '../../../../hooks/menu/menuApi';
import { findMenu } from '../../../../utils/rbac';
import {
  usecreateSignatureMachiningReport,
  useGetSignatureForMachining,
} from '../../Api/MachiningWorkReport/machiningApi';

import { toShamsi } from '../../../../Time/date';
import { useGetProfile } from '../../../../hooks/profile/profile';

function FormReport({
  openFormReport,
  setOpenFormReport,
  selectedReports,
  setSelectedReports,
  page,
  pageSize,
  search,
}) {
  const { userInfo } = useSelector((state) => state.auth);

  const [selectedSignature, setSelectedSignature] = useState(null);
  const [password, setPassword] = useState(null);
  const [name, setName] = useState('');
  const [openCode, setOpenCode] = useState(false);

  const rows = useMemo(() => {
    const arr = [...(selectedReports?.items ?? [])];

    while (arr.length < 8) {
      arr.push({});
    }

    return arr.slice(0, 8);
  }, [selectedReports]);

  // --------------------------------------------------------------------------
  const { data: menu } = useGetMenu();

  const machiningMenu = findMenu(menu?.menus ?? [], 'machining-report');
  const menuId = machiningMenu?.id;

  const { data: permission } = useGetPermissionSignature(userInfo?.userId);

  const canSign = permission?.data?.some(
    (p) => p.menuId === menuId && p.canSignature === true
  );
  // --------------------------------------------------------------------------

  const { data: signature } = useGetSignatureId(
    selectedReports?.signedByUserId
  );

  useEffect(() => {
    if (
      selectedReports?.isSigned === true ||
      selectedReports?.isSigned === 'true'
    ) {
      if (signature?.data?.signatureImageBase64) {
        setSelectedSignature(signature.data.signatureImageBase64);
      }
    } else {
      setSelectedSignature(null);
    }
  }, [selectedReports?.isSigned, selectedReports?.id, signature]);

  const createSignature = usecreateSignatureMachiningReport(
    selectedReports?.id
  );
  const handleSignature = () => {
    createSignature.mutate(
      {
        signaturePassword: password,
      },
      {
        onSuccess: () => {
          setOpenCode(false);
          setOpenFormReport(false);
        },
      }
    );
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
        openFormReport
          ? 'pointer-events-auto opacity-100'
          : 'pointer-events-none opacity-0'
      }`}
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        onClick={() => {
          setOpenFormReport(false);
        }}
      />
      <div
        className={`h-lenovo:scale-75 relative transform rounded-[15px] bg-white text-black shadow-2xl transition-all duration-300 max-2xl:scale-86 max-md:scale-45 max-md:rotate-90 print:scale-100! ${
          openFormReport
            ? 'translate-y-0 scale-100 opacity-100'
            : '-translate-y-10 scale-0 opacity-0'
        }`}
      >
        <div
          className="scale-90 border-2 bg-white text-black"
          style={{ width: '297mm', minHeight: '210mm' }}
        >
          <div className="grid grid-cols-5">
            <div className="flex items-center justify-center border-b border-l">
              <img src={logo} alt="logo" width={100} />
            </div>
            <div className="col-span-3 flex items-center justify-center border-b border-l">
              <h1 className="font-[SamimBold] text-[20px]">
                فرم گزارش کار واحد تراشکاری
              </h1>
            </div>
            <div className="flex flex-col justify-center border-b pr-1">
              <p className="space-x-1">
                <span className="font-[SamimBold] text-[13px]">کد سند :</span>
                <span className="font-[AvenirLTProHeavy] text-[13px]">
                  F1801
                </span>
              </p>
              <p className="space-x-1">
                <span className="font-[SamimBold] text-[13px]">
                  شماره ویرایش :
                </span>
                <span className="font-[AvenirLTProHeavy] text-[13px]">00</span>
              </p>
              <p className="space-x-1">
                <span className="font-[SamimBold] text-[13px]">
                  تاریخ ویرایش:
                </span>
                <span className="font-[AvenirLTProHeavy] text-[13px]">
                  1401/05/01
                </span>
              </p>
            </div>
          </div>
          <div className="flex space-x-60 pt-2 pr-2">
            <p className="flex items-center justify-center space-x-1">
              <span className="font-[VazirLight] text-[18px]">تاریخ :</span>
              <span className="font-[AvenirLTProMedium] text-[15px]">
                {toShamsi(selectedReports?.reportDate)}
              </span>
            </p>
            <p className="flex items-center justify-center space-x-1">
              <span className="font-[VazirLight] text-[18px]">شماره : </span>
              <span className="font-[AvenirLTProMedium] text-[15px]">
                {selectedReports?.reportNumber}
              </span>
            </p>
            <p className="flex items-center justify-center space-x-1">
              <span className="font-[VazirLight] text-[18px]">شیفت :</span>
              <span className="font-[Samim] text-[15px]">
                {selectedReports?.shiftDisplay}
              </span>
            </p>
          </div>
          <div className="pt-3">
            <table className="w-full">
              <thead className="w-full border-separate border-spacing-y-2 px-5">
                <tr className="text-center">
                  <td className="border-t border-b border-l bg-gray-500/40 px-1 py-1 font-[SamimBold] text-[13px]">
                    ردیف
                  </td>
                  <td className="w-20 border-t border-b border-l bg-gray-500/40 py-2 font-[SamimBold] text-[13px]">
                    نام دستگاه
                  </td>
                  <td className="w-20 border-t border-b border-l bg-gray-500/40 py-1 font-[SamimBold] text-[13px]">
                    نام اپراتور
                  </td>
                  <td className="w-20 border-t border-b border-l bg-gray-500/40 py-1 font-[SamimBold] text-[13px]">
                    نام قطعه
                  </td>
                  <td className="w-[500px] border-t border-b border-l bg-gray-500/40 py-1 font-[SamimBold] text-[13px]">
                    شرح عملیات
                  </td>
                  <td className="w-40 border-t border-b border-l bg-gray-500/40 py-1 font-[SamimBold] text-[13px]">
                    شماره قطعه
                  </td>
                  <td className="w-14 border-t border-b border-l bg-gray-500/40 px-1 py-1 font-[SamimBold] text-[13px]">
                    تعداد
                  </td>
                  <td className="w-23 border-t border-b border-l bg-gray-500/40 px-1 py-1 font-[SamimBold] text-[13px]">
                    زمان پیش بینی (دقیقه)
                  </td>
                  <td className="border-t border-b bg-gray-500/40 px-1 py-1 font-[SamimBold] text-[13px]">
                    زمان ساخت (دقیقه)
                  </td>
                </tr>
              </thead>
              <tbody>
                {rows.map((line, index) => (
                  <tr key={index} className="text-center">
                    <td className="border-b py-4.5 font-[AvenirLTProHeavy]">
                      {index + 1}
                    </td>
                    <td className="border text-[14px]">{line?.machineName}</td>
                    <td className="border">{line?.operatorName}</td>
                    <td className="border">{line?.partName}</td>
                    <td className="border font-[VazirLight]">
                      {line?.operationDescription}
                    </td>
                    <td className="border font-[AvenirLTProBook] text-[12px]">
                      {line?.partNumber}
                    </td>
                    <td className="border font-[AvenirLTProHeavy]">
                      {line?.quantity}
                    </td>
                    <td className="border font-[AvenirLTProHeavy]">
                      {line?.estimatedTime}
                    </td>
                    <td className="border-b font-[AvenirLTProHeavy]" dir="ltr">
                      {line?.timeDifference}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="grid grid-cols-7 space-x-5">
            <p className="col-span-5 space-x-1 pt-1 pr-1">
              <span className="font-[SamimBold] text-[14px]">
                کارهای محوله در شیفت بعد توسط اپراتور :
              </span>
              <span className="blcok text-[12px] break-all">
                {selectedReports?.assignedTasksForNextShift}
              </span>
            </p>

            <div className="col-span-2 pt-18">
              <span className="font-[SamimBold] text-[14px]">
                امضاء سرپرست تراشکاری :
              </span>
              <span>
                {selectedSignature ? (
                  <>
                    <span className="px-2">{name && <span>{name}</span>}</span>

                    <p>
                      <img
                        src={`data:image/png;base64,${selectedSignature}`}
                        alt="signature"
                        className="fixed top-170 left-1 h-28 w-40"
                      />
                    </p>
                  </>
                ) : canSign ? (
                  <button
                    onClick={() => {
                      setOpenCode(true);
                    }}
                    className="mr-3 cursor-pointer rounded-[10px] bg-linear-to-br from-cyan-400 to-black/10 p-2 transition-all delay-75 duration-100 ease-in-out hover:scale-110"
                  >
                    ثبت امضاء
                  </button>
                ) : (
                  <span className="mr-3 rounded-[10px] bg-red-500 p-2 text-[13px]">
                    عدم دسترسی
                  </span>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
          openCode ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
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
            onClick={handleSignature}
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
