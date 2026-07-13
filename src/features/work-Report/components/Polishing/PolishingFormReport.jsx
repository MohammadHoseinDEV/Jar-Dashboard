import { useEffect, useMemo, useState } from 'react';
import { toShamsi } from '../../../../Time/date';
import { useGetMenu } from '../../../../hooks/menu/menuApi';
import { findMenu } from '../../../../utils/rbac';
import { useSelector } from 'react-redux';
import { useGetPermissionSignature } from '../../../../hooks/user/userApi';
import {
  useGetSignature,
  useGetSignatureId,
} from '../../../../hooks/Signature/Signature';
import { useCreateSignaturePolishingReports } from '../../Api/polishing/polishing';

import logo from '../../../../assets/images/logo.png';
import close from '../../../../assets/images/close.png';

function PolishingFormReport({
  openForm,
  setOpenForm,
  selectedReports,
  setSelectedReports,
}) {
  const { userInfo } = useSelector((state) => state.auth);

  const [selectedSignature, setSelectedSignature] = useState(null);
  const [name, setName] = useState(null);

  const [password, setPassword] = useState('');
  const [openCode, setOpenCode] = useState(false);

  const rows = useMemo(() => {
    const arr = [...(selectedReports?.items ?? [])];

    while (arr.length < 8) {
      arr.push({});
    }

    return arr.slice(0, 8);
  }, [selectedReports]);

  // ---------------------------------------------------------------------
  const { data: menu } = useGetMenu();
  const polishingMenu = findMenu(menu?.menus ?? [], 'polishing-report');
  const menuId = polishingMenu?.id;

  const { data: permission } = useGetPermissionSignature(userInfo?.userId, {
    enabled: !!userInfo?.userId && !!menuId && openForm,
  });

  const cansign = permission?.data?.some(
    (p) => p.menuId === menuId && p.canSignature === true
  );
  // ---------------------------------------------------------------------

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

  const createSignature = useCreateSignaturePolishingReports(
    selectedReports?.id
  );

  const handleSignature = () => {
    createSignature.mutate(
      { signaturePassword: password },
      {
        onSuccess: () => {
          setOpenCode(false);
          setOpenForm(false);
          setSelectedReports(null);
        },
      }
    );
  };

  const closeHandler = () => {
    setOpenForm(false);
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
        className={`relative transform rounded-[15px] bg-white p-6 text-white shadow-2xl transition-all duration-300 max-md:scale-45 max-md:rotate-90 print:scale-90! ${
          openForm
            ? 'h-lenovo:scale-70 translate-y-0 scale-100 opacity-100 max-2xl:scale-80'
            : '-translate-y-10 scale-95 opacity-0'
        }`}
      >
        <div
          className="scale-100 border-2 bg-white text-black"
          style={{ width: '297mm', minHeight: '210mm' }}
        >
          {/* header&logo */}

          <div className="grid grid-cols-5">
            <div className="flex items-center justify-center border-b border-l">
              <img src={logo} alt="logo" width={90} />
            </div>
            <div className="col-span-3 flex items-center justify-center border-b border-l">
              <h1 className="font-[SamimBold] text-[20px]">
                فرم گزارش کار روزانه پولیش
              </h1>
            </div>

            <div className="border-b py-1 pr-1">
              <p className="space-x-1 text-[12px]">
                <span className="font-[SamimBold]">کد‌ سند :</span>
                <span className="font-[AvenirLTProHeavy]">F1802</span>
              </p>
              <p className="space-x-1 text-[12px]">
                <span className="font-[SamimBold]">شماره‌ ویرایش :</span>
                <span className="font-[AvenirLTProHeavy]">00</span>
              </p>
              <p className="space-x-1 text-[12px]">
                <span className="font-[SamimBold]">تاریخ‌ ویرایش :</span>
                <span className="font-[AvenirLTProHeavy]">1401/05/01</span>
              </p>
            </div>
          </div>
          {/* date & Number & shift */}
          <div className="pt-1">
            <div className="flex items-center justify-between pr-2">
              <p className="flex items-center justify-center space-x-1">
                <span className="font-[VazirLight] text-[18px]">تاریخ :</span>
                <span className="font-[AvenirLTProMedium] text-[15px]">
                  {toShamsi(selectedReports?.reportDate)}
                </span>
              </p>
              <p className="flex items-center justify-center space-x-1">
                <span className="font-[VazirLight] text-[18px]">شماره :</span>
                <span className="font-[AvenirLTProMedium] text-[15px]">
                  {selectedReports?.reportNumber}
                </span>
              </p>
              <p className="flex items-center justify-center space-x-1">
                <span className="font-[VazirLight] text-[18px]">شیفت :</span>
                <span className="pl-2 font-[Samim] text-[15px]">
                  {selectedReports?.shiftDisplay}
                </span>
              </p>
            </div>
          </div>
          {/* table */}
          <div className="grid grid-cols-1 space-x-5">
            <div className="mt-2">
              <table className="w-full">
                <thead className="w-full border-separate border-spacing-y-2 px-5">
                  <tr className="text-center text-black/70">
                    <th className="w-15 border-t border-b bg-gray-500/40 px-1 py-1 font-[SamimBold] text-[13px]">
                      شماره خط
                    </th>
                    <th className="border bg-gray-500/40 px-1 py-1 font-[SamimBold] text-[13px]">
                      نام قطعه
                    </th>
                    <th className="border-t border-b border-l bg-gray-500/40 px-1 py-1 font-[SamimBold] text-[13px]">
                      شماره قطعه
                    </th>
                    <th className="border-t border-b border-l bg-gray-500/40 px-1 py-1 font-[SamimBold] text-[13px]">
                      نام اپراتور
                    </th>
                    <th className="w-[500px] border-t border-b border-l bg-gray-500/40 px-1 py-1 font-[SamimBold] text-[13px]">
                      شرح عملیات
                    </th>
                    <th className="w-20 border-t border-b border-l bg-gray-500/40 px-1 py-1 font-[SamimBold] text-[13px]">
                      ساعت شروع
                    </th>
                    <th className="w-20 border-t border-b bg-gray-500/40 px-1 py-1 font-[SamimBold] text-[13px]">
                      ساعت پایان
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, index) => (
                    <tr key={index} className="h-16 text-center">
                      <td className="border-b font-[AvenirLTProBook]">
                        {r?.lineNumber}
                      </td>
                      <td className="border font-[VazirLight] text-[15px]">
                        {r?.partName}
                      </td>
                      <td className="border font-[AvenirLTProBook]">
                        {r?.partNumber}
                      </td>
                      <td className="border font-[VazirLight] text-[15px]">
                        {r?.operatorName}
                      </td>
                      <td className="border font-[VazirLight] text-[14px]">
                        {r?.operationDescription}
                      </td>
                      <td className="border font-[AvenirLTProBook]">
                        {r?.fromTimeDisplay}
                      </td>
                      <td className="border-b font-[AvenirLTProBook]">
                        {r?.toTimeDisplay}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="grid grid-cols-3">
            <p className="col-span-2 h-32 pr-2 font-[SamimBold] text-[17px]">
              <span> توضیحات :</span>
              <span className="block text-[13px] break-all">
                {selectedReports?.notes}
              </span>
            </p>
            <div className="flex space-x-5 pt-20 pr-5 font-[SamimBold]">
              <p className="font-[SamimBold] text-[14px]">
                امضاء سرپرست پولیش :
              </p>
              <span>
                {selectedSignature ? (
                  <>
                    {/* <span>{name && <span>{name}</span>}</span> */}

                    <p>
                      <img
                        src={`data:image/png;base64,${selectedSignature}`}
                        alt="signature"
                        width={180}
                        className="fixed top-170 left-5 scale-110"
                      />
                    </p>
                  </>
                ) : cansign ? (
                  <button
                    onClick={() => {
                      setOpenCode(true);
                    }}
                    className="mr-3 cursor-pointer rounded-[10px] bg-linear-to-br from-cyan-400 to-black/10 p-2 transition-all delay-75 duration-100 ease-in-out hover:scale-110"
                  >
                    ثبت امضاء
                  </button>
                ) : (
                  <span className="rounded-[10px] bg-red-500 p-1 text-[13px]">
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
            autoComplete="off"
            placeholder="ثبت کدامضاء"
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

export default PolishingFormReport;
