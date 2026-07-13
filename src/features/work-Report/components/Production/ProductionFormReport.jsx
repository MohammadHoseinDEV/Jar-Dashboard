import logo from '../../../../assets/images/logo.png';
import close from '../../../../assets/images/close.png';

import { toShamsi } from '../../../../Time/date';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useGetMenu } from '../../../../hooks/menu/menuApi';
import { findMenu } from '../../../../utils/rbac';
import { useGetPermissionSignature } from '../../../../hooks/user/userApi';
import {
  useGetSignature,
  useGetSignatureId,
} from '../../../../hooks/Signature/Signature';
import { useCreateSignatureProductionReports } from '../../Api/Production/Production';
import { useGetProfile } from '../../../../hooks/profile/profile';

function ProductionFormReport({
  openForm,
  setOpenForm,
  selectedProduction,
  mobile,
  production,
}) {
  const { userInfo } = useSelector((state) => state.auth);

  const [selectedSignature, setSelectedSignature] = useState(null);
  const [password, setPassword] = useState('');
  const [openCode, setOpenCode] = useState(false);

  // ---------------------------------------------------------------------
  const { data: menu } = useGetMenu();
  const productionMenu = findMenu(menu?.menus ?? [], 'production-report');
  const menuId = productionMenu?.id;

  const { data: permission } = useGetPermissionSignature(userInfo?.userId);

  const cansign = permission?.data?.some(
    (p) => p.menuId === menuId && p.canSignature === true
  );
  // ---------------------------------------------------------------------

  const { data: signature } = useGetSignatureId(
    selectedProduction?.signedByUserId
  );

  const { data: profile } = useGetProfile();

  const isHandover = selectedProduction?.createdBy === profile?.data?.id;

  const canSignHandover = cansign && isHandover;

  useEffect(() => {
    if (
      selectedProduction?.isSigned === true ||
      selectedProduction?.isSigned === 'true'
    ) {
      if (signature?.data?.signatureImageBase64) {
        setSelectedSignature(signature.data.signatureImageBase64);
      }
    } else {
      setSelectedSignature(null);
    }
  }, [selectedProduction?.isSigned, selectedProduction?.id, signature]);

  const createSignature = useCreateSignatureProductionReports(
    selectedProduction?.id
  );

  const handleSignature = () => {
    createSignature.mutate(
      { signaturePassword: password },
      {
        onSuccess: () => {
          setOpenCode(false);
          setOpenForm(false);
        },
      }
    );
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 print:fixed! print:inset-0! print:z-auto! print:flex! print:items-start! print:justify-start! print:border-none ${
        openForm
          ? 'pointer-events-auto opacity-100'
          : 'pointer-events-none opacity-0 print:pointer-events-auto! print:opacity-100!'
      }`}
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px] print:hidden!"
        onClick={() => {
          setOpenForm(false);
        }}
      />

      <div
        className={`relative transform rounded-[15px] bg-white p-6 text-black shadow-2xl transition-all duration-300 print:m-0! print:transform-none! print:rounded-none! print:p-0! print:shadow-none! ${
          openForm
            ? 'h-lenovo:scale-52 translate-y-0 scale-75 opacity-100 max-2xl:scale-60 max-md:scale-48'
            : '-translate-y-10 scale-0 opacity-0'
        } print:translate-y-0! print:scale-100! print:border-none! print:opacity-100!`}
      >
        {mobile ? (
          <div className="flex h-180 w-115 flex-col items-center justify-center">
            <button>
              <img src={close} alt="close" width={20} />
            </button>
            <div className="mb-10 h-[1123px] w-[794px] scale-55 border-2 bg-white text-black print:-mt-10 print:scale-90">
              <div className="grid grid-cols-5">
                <div className="flex items-center justify-center border-b border-l">
                  <img src={logo} alt="logo" width={100} />
                </div>
                <div className="col-span-3 flex items-center justify-center border-b border-l">
                  <h1 className="font-[SamimBold] text-[20px]">
                    فرم گزارش کار روزانه تولید
                  </h1>
                </div>
                <div className="flex flex-col justify-center border-b pr-1">
                  <p className="space-x-1">
                    <span className="font-[SamimBold] text-[13px]">
                      کد سند :
                    </span>
                    <span className="font-[AvenirLTProHeavy] text-[13px]">
                      F0532
                    </span>
                  </p>
                  <p className="space-x-1">
                    <span className="font-[SamimBold] text-[13px]">
                      شماره بازنگری :
                    </span>
                    <span className="font-[AvenirLTProHeavy] text-[13px]">
                      00
                    </span>
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
              <div className="grid grid-cols-2">
                <p className="col-span-1 flex items-center space-x-2 border-b border-l py-1 pr-2">
                  <span className="font-[SamimBold] text-[20px]">تاریخ :</span>
                  <span className="font-[AvenirLTProHeavy] text-[18px]">
                    {toShamsi(selectedProduction?.reportDate)}
                  </span>
                </p>
                <p className="col-span-1 space-x-2 border-b py-1 pr-1">
                  <span className="font-[SamimBold] text-[20px]">شیفت :</span>
                  <span className="font-[Samim] text-[18px]">
                    {selectedProduction?.shiftDisplay}
                  </span>
                </p>
              </div>
              <p className="flex items-center space-x-2 border-b py-1 pr-1">
                <span className="font-[SamimBold] text-[20px]">پرسنل :</span>
                <span className="flex items-center justify-center font-[Byekan+] text-[18px]">
                  {selectedProduction?.personnelName}
                </span>
              </p>
              <div className="pt-2">
                <p className="pr-2 font-[SamimBold] text-[20px]">
                  گزارش شیفت :
                </p>
                <p className="h-[850px] border-b px-3 pt-1 text-right font-[Byekan+] text-[18px] leading-10 print:h-[240mm]!">
                  {selectedProduction?.shiftReport}
                </p>
              </div>
              <div className="flex h-[106px] pt-2">
                <span className="pr-2 font-[SamimBold]">
                  نام و امضاء سرشیفت :
                </span>
              </div>
              <button
                onClick={() => {
                  setOpenForm(false);
                }}
                className="m-auto flex items-center justify-center rounded-[10px] bg-red-500 px-5 py-3 text-[20px] text-white"
              >
                بستن
              </button>
            </div>
          </div>
        ) : (
          <div className="min-h-[1123px] w-[794px] border-2 bg-white text-black print:-mt-20 print:-mr-10 print:scale-87">
            <div className="grid grid-cols-5">
              <div className="flex items-center justify-center border-b border-l">
                <img src={logo} alt="logo" width={100} />
              </div>
              <div className="col-span-3 flex items-center justify-center border-b border-l">
                <h1 className="font-[SamimBold] text-[20px]">
                  فرم گزارش کار روزانه تولید
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
                  <span className="font-[AvenirLTProHeavy] text-[13px]">
                    00
                  </span>
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
            <div className="grid grid-cols-2">
              <p className="col-span-1 flex items-center space-x-2 border-b border-l py-1 pr-2">
                <span className="font-[SamimBold] text-[20px]">تاریخ :</span>
                <span className="font-[AvenirLTProHeavy] text-[18px]">
                  {toShamsi(selectedProduction?.reportDate)}
                </span>
              </p>
              <p className="col-span-1 space-x-2 border-b py-1 pr-1">
                <span className="font-[SamimBold] text-[20px]">شیفت :</span>
                <span className="font-[Samim] text-[18px]">
                  {selectedProduction?.shiftDisplay}
                </span>
              </p>
            </div>
            <p className="flex items-center space-x-2 border-b py-1 pr-1">
              <span className="font-[SamimBold] text-[20px]">پرسنل :</span>
              <span className="flex items-center justify-center font-[Byekan+] text-[18px]">
                {selectedProduction?.personnelName}
              </span>
            </p>
            <div className="pt-2">
              <p className="pr-2 font-[SamimBold] text-[20px]">گزارش شیفت :</p>
              <p className="h-[850px] border-b px-3 pt-1 text-right font-[Byekan+] text-[18px] leading-10 print:h-[240mm]!">
                {selectedProduction?.shiftReport}
              </p>
            </div>
            <div className="flex h-[106px] pt-2">
              <span className="pr-2 font-[SamimBold]">
                نام و امضاء سرشیفت :
              </span>
              <span>
                {selectedSignature ? (
                  <img
                    src={`data:image/png;base64,${selectedSignature}`}
                    alt="signature"
                    className="fixed bottom-6 w-50"
                  />
                ) : canSignHandover ? (
                  <button
                    onClick={() => {
                      setOpenCode(true);
                    }}
                    className="mr-3 cursor-pointer rounded-[10px] bg-linear-to-br from-cyan-400 to-black/10 p-2 transition-all delay-75 duration-100 ease-in-out hover:scale-110"
                  >
                    ثبت امضاء
                  </button>
                ) : (
                  <span className="m-2 rounded-[10px] bg-red-500 p-1 text-[15px]">
                    عدم دسترسی
                  </span>
                )}
              </span>
            </div>
          </div>
        )}
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

export default ProductionFormReport;
