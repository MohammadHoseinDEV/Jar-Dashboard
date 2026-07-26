import { useEffect, useState } from 'react';
import logo from '../../../../assets/images/logo.png';
import close from '../../../../assets/images/close.png';
import { toShamsi } from '../../../../Time/date';
import { useGetMenu } from '../../../../hooks/menu/menuApi';
import { useGetPermissionSignature } from '../../../../hooks/user/userApi';
import { useSelector } from 'react-redux';
import { findMenu } from '../../../../utils/rbac';
import { useGetSignatureId } from '../../../../hooks/Signature/Signature';
import { useGetProfile } from '../../../../hooks/profile/profile';
import {
  useCreateSignatureHandover,
  useCreateSignatureReceiver,
} from '../../Api/QualityControl-Package/quality';

function FormReport({
  openForm,
  setOpenForm,
  selectedQuality,
  setSelectedQuality,
  quality,
}) {
  const { userInfo } = useSelector((state) => state.auth);

  const [selectedSignatureHandover, setSelectedSignatureHandover] =
    useState(null);
  const [selectedSignatureReceiver, setSelectedSignatureReceiver] =
    useState(null);

  const [openCode, setOpenCode] = useState(false);
  const [password, setPassword] = useState('');
  const [signatureType, setSignatureType] = useState(null);

  const handleOpenSignatureModal = (type) => {
    setSignatureType(type);
    setOpenCode(!openCode);
  };
  // ---------------------------------------

  // برای بسته شدن مدال
  const closeHandler = () => {
    setOpenForm(!openForm);
  };
  // -----------------------------------
  // برای بررسی دسترسی امضاء
  const { data: menu } = useGetMenu();
  const electricalMenu = findMenu(
    menu?.menus ?? [],
    'qualitycontrol&package-report'
  );
  const menuId = electricalMenu?.id;

  const { data: permission } = useGetPermissionSignature(userInfo?.userId);
  const canSign = permission?.data?.some(
    (p) => p.menuId === menuId && p.canSignature === true
  );
  // -----------------------------------

  // گرفتن عکس امضاء برا اساس آی دی کاربر
  const { data: signatureHandover } = useGetSignatureId(
    selectedQuality?.shiftHandOverByUserId
  );

  const { data: signatureReceiver } = useGetSignatureId(
    selectedQuality?.shiftReceiverByUserId
  );

  // ------------------------------------------
  // مشخص شدن برای اینکه کسی که گزارش را ایجاد کرده فقط بتواند امضاء کند
  const { data: profile } = useGetProfile();

  const isHandover = selectedQuality?.createdBy === profile?.data?.id;

  const canSignHandover = canSign && isHandover;

  // -----------------------------------------------------------

  useEffect(() => {
    if (
      selectedQuality?.isShiftHandOverSigned === true &&
      signatureHandover?.data?.signatureImageBase64
    ) {
      setSelectedSignatureHandover(
        signatureHandover?.data?.signatureImageBase64
      );
    } else {
      setSelectedSignatureHandover(null);
    }

    if (
      selectedQuality?.isShiftReceiverSigned === true &&
      signatureReceiver?.data?.signatureImageBase64
    ) {
      setSelectedSignatureReceiver(signatureReceiver.data.signatureImageBase64);
    } else {
      setSelectedSignatureReceiver(null);
    }
  }, [
    signatureHandover,
    signatureReceiver,
    selectedQuality?.isShiftHandOverSigned,
    selectedQuality?.isShiftReceiverSigned,
  ]);

  const createSignatureHandover = useCreateSignatureHandover(
    selectedQuality?.id
  );

  const createSignatureReceiver = useCreateSignatureReceiver(
    selectedQuality?.id
  );

  const handleSubmitSign = () => {
    if (signatureType === 'handover') {
      createSignatureHandover.mutate(
        { signaturePassword: password },
        {
          onSuccess: () => {
            setOpenCode(false);
            setOpenForm(false);
          },
        }
      );
    }
    if (signatureType === 'receiver') {
      createSignatureReceiver.mutate(
        {
          signaturePassword: password,
        },
        {
          onSuccess: () => {
            setOpenCode(!openCode);
            setOpenForm(!openForm);
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
        className={`h-lenovo:scale-70 relative transform rounded-[15px] bg-white p-6 text-white shadow-2xl transition-all duration-300 max-2xl:scale-83 max-xl:scale-80 max-md:scale-45 max-md:rotate-90 print:scale-90 ${
          openForm
            ? 'translate-y-0 scale-100 opacity-100 '
            : '-translate-y-10 scale-95 opacity-0'
        }`}
      >
        <div
          className="scale-90 border-2 bg-white text-black max-2xl:scale-100"
          style={{ width: '297mm', minHeight: '210mm' }}
        >
          {/* logo & hedear */}
          <div className="grid grid-cols-5">
            <div className="flex items-center justify-center border-b border-l">
              <img src={logo} alt="logo" width={90} />
            </div>
            <div className="col-span-3 flex items-center justify-center border-b border-l">
              <h1 className="font-[SamimBold] text-[20px]">
                فرم گزارش کار روزانه واحد کنترل کیفیت و بسته بندی محصول
              </h1>
            </div>
            <div className="border-b py-1 pr-1">
              <p className="space-x-1 text-[13px]">
                <span className="font-[SamimBold]">کد‌ سند :</span>
                <span className="font-[AvenirLTProHeavy]">F0702</span>
              </p>
              <p className="space-x-1 text-[13px]">
                <span className="font-[SamimBold]">شماره‌ بازنگری :</span>

                <span className="font-[AvenirLTProHeavy]">01</span>
              </p>
              <p className="space-x-1 text-[13px]">
                <span className="font-[SamimBold]">تاریخ‌ ویرایش :</span>
                <span className="font-[AvenirLTProHeavy]">1401/10/10</span>
              </p>
            </div>
          </div>
          {/* date & shift */}
          <div className="flex justify-center space-x-60 pt-2 pr-0.5">
            <p>
              <span className="font-[Samim] text-[14px]">تاریخ :</span>
              <span className="font-[AvenirLTProBook] text-[13px]">
                {toShamsi(selectedQuality?.reportDate)}
              </span>
            </p>
            <p>
              <span className="font-[Samim] text-[14px]">شماره :</span>
              <span className="font-[AvenirLTProBook] text-[13px]">
                {selectedQuality?.reportNumber}
              </span>
            </p>
            <p>
              <span className="font-[Samim] text-[14px]">شیفت :</span>
              <span className="font-[VazirLight] text-[14px]">
                {selectedQuality?.shiftDisplay}
              </span>
            </p>
          </div>
          <div className="grid grid-cols-2">
            {/* گزارش ضایعات خطوط */}
            <div className="mt-1 border-t border-l">
              <p className="border-b bg-gray-500/40 p-0.5 text-center font-[SamimBold]">
                گزارش ضایعات خطوط
              </p>
              <p className="h-20 space-x-1 border-b pt-0.5 text-[15px]">
                <span className="pr-1 font-[SamimBold] leading-4">
                  آمار پالت های قرنطینه و علت :
                </span>
                <span className="font-[VazirLight] break-all">
                  {selectedQuality?.quarantinePallets_Statistics}
                </span>
              </p>
              <div className="border-b pr-1">
                <p className="h-[41px] items-center space-x-1 border-b pt-1 leading-4">
                  <span className="font-[SamimBold]">خط 1 :</span>
                  <span className="font-[VazirLight] text-[12px]">
                    {selectedQuality?.quarantinePallets_Line1}
                  </span>
                </p>
                <p className="h-[41px] items-center space-x-1 border-b pt-1 leading-4">
                  <span className="font-[SamimBold]">خط 2 :</span>
                  <span className="font-[VazirLight] text-[12px]">
                    {selectedQuality?.quarantinePallets_Line2}
                  </span>
                </p>
                <p className="h-[41px] items-center space-x-1 pt-1 leading-4">
                  <span className="font-[SamimBold]">خط 3 :</span>
                  <span className="font-[VazirLight] text-[12px]">
                    {selectedQuality?.quarantinePallets_Line3}
                  </span>
                </p>
              </div>
            </div>
            <div className="mt-1 flex border-t border-b">
              {/* نام محصول */}
              <div className="text-center" dir="ltr">
                <p className="flex h-27 items-center justify-center border-l bg-gray-500/40 px-8">
                  نام محصول
                </p>
                <p className="flex flex-col">
                  <span className="flex h-[41px] items-center justify-center border-t border-l font-[AvenirLTProBook] text-[12px]">
                    {selectedQuality?.line1_ProductName}
                  </span>
                  <span className="flex h-[41px] items-center justify-center border-t border-l font-[AvenirLTProBook] text-[12px]">
                    {selectedQuality?.line2_ProductName}
                  </span>
                  <span className="flex h-[41px] items-center justify-center border-t border-l font-[AvenirLTProBook] text-[12px]">
                    {selectedQuality?.line3_ProductName}
                  </span>
                </p>
              </div>
              {/* سرعت ماشین */}
              <div className="flex flex-col border-l">
                <div className="flex h-[109px] w-10 flex-col items-center justify-center border-b bg-gray-500/40">
                  <p className="rotate-90 whitespace-nowrap">سرعت ماشین</p>
                </div>
                <div className="text-center">
                  <p className="flex h-[41px] items-center justify-center border-b font-[AvenirLTProBook]">
                    {selectedQuality?.line1_MachineSpeed}
                  </p>
                  <p className="flex h-[41px] items-center justify-center border-b font-[AvenirLTProBook]">
                    {selectedQuality?.line2_MachineSpeed}
                  </p>
                  <p className="flex h-[41px] items-center justify-center font-[AvenirLTProBook]">
                    {selectedQuality?.line3_MachineSpeed}
                  </p>
                </div>
              </div>
              {/* وزن محصول */}
              <div className="flex flex-col border-l">
                <div className="flex h-[109px] w-10 flex-col items-center justify-center border-b bg-gray-500/40">
                  <p className="rotate-90 whitespace-nowrap">وزن محصول</p>
                </div>
                <div className="text-center">
                  <p className="flex h-[41px] items-center justify-center border-b font-[AvenirLTProBook]">
                    {selectedQuality?.line1_ProductWeight}
                  </p>
                  <p className="flex h-[41px] items-center justify-center border-b font-[AvenirLTProBook]">
                    {selectedQuality?.line2_ProductWeight}
                  </p>
                  <p className="flex h-[41px] items-center justify-center font-[AvenirLTProBook]">
                    {selectedQuality?.line3_ProductWeight}
                  </p>
                </div>
              </div>
              {/* گرمخانه */}
              <div className="flex flex-col border-l">
                <div className="flex h-[109px] w-10 flex-col items-center justify-center border-b bg-gray-500/40">
                  <p className="rotate-90 text-[11px] whitespace-nowrap">
                    سرعت زنجیر گرمخانه
                  </p>
                </div>
                <div className="text-center">
                  <p className="flex h-[41px] items-center justify-center border-b font-[AvenirLTProBook]">
                    {selectedQuality?.line1_OvenChainSpeed}
                  </p>
                  <p className="flex h-[41px] items-center justify-center border-b font-[AvenirLTProBook]">
                    {selectedQuality?.line2_OvenChainSpeed}
                  </p>
                  <p className="flex h-[41px] items-center justify-center font-[AvenirLTProBook]">
                    {selectedQuality?.line3_OvenChainSpeed}
                  </p>
                </div>
              </div>
              {/* تعداد در */}
              <div className="flex flex-col">
                {/* header */}
                <div className="flex items-center justify-center border-l bg-gray-500/40 px-4">
                  <p className="whitespace-nowrap">تعداد در</p>
                </div>

                {/* sub headers */}
                <div className="grid h-[85px] grid-cols-2 border-b border-l bg-gray-500/40">
                  <span className="flex items-center justify-center border-l">
                    <span className="-rotate-90 text-[12px] whitespace-nowrap">
                      سینی
                    </span>
                  </span>
                  <span className="flex items-center justify-center">
                    <span className="-rotate-90 text-[12px] whitespace-nowrap">
                      پالت
                    </span>
                  </span>
                </div>

                {/* rows */}
                <div className="grid grid-cols-2 border-l text-center">
                  <span className="flex h-[41px] items-center justify-center border-b border-l font-[AvenirLTProBook]">
                    {selectedQuality?.line1_CountPerTray}
                  </span>
                  <span className="flex h-[41px] items-center justify-center border-b font-[AvenirLTProBook]">
                    {selectedQuality?.line1_CountPerPallet}
                  </span>

                  <span className="flex h-[41px] items-center justify-center border-b border-l font-[AvenirLTProBook]">
                    {selectedQuality?.line2_CountPerTray}
                  </span>
                  <span className="flex h-[41px] items-center justify-center border-b font-[AvenirLTProBook]">
                    {selectedQuality?.line2_CountPerPallet}
                  </span>

                  <span className="flex h-[41px] items-center justify-center border-l font-[AvenirLTProBook]">
                    {selectedQuality?.line3_CountPerTray}
                  </span>
                  <span className="flex h-[41px] items-center justify-center font-[AvenirLTProBook]">
                    {selectedQuality?.line3_CountPerPallet}
                  </span>
                </div>
              </div>
              {/* نوع بسته بندی و مقدار */}
              <div className="flex flex-col">
                <div className="flex items-center justify-center border-b border-l bg-gray-500/40 px-4">
                  <p className="font-[SamimBold] text-[12px] whitespace-nowrap">
                    نوع بسته بندی و مقدار تولید
                  </p>
                </div>
                <div className="grid h-[90px] grid-cols-3 border-b border-l bg-gray-500/40">
                  <span className="flex items-center justify-center border-l">
                    <span className="-rotate-90 text-[12px] whitespace-nowrap">
                      شیرینک
                    </span>
                  </span>
                  <span className="flex items-center justify-center border-l">
                    <span className="-rotate-90 text-[12px] whitespace-nowrap">
                      سلفون
                    </span>
                  </span>
                  <span className="flex items-center justify-center">
                    <span className="-rotate-90 text-[12px] whitespace-nowrap">
                      پالتایزری
                    </span>
                  </span>
                </div>
                <div className="grid grid-cols-3 border-l text-center">
                  <span className="flex h-[41px] items-center justify-center border-b border-l font-[AvenirLTProBook]">
                    {selectedQuality?.line1_Shrinking}
                  </span>
                  <span className="flex h-[41px] items-center justify-center border-b border-l font-[AvenirLTProBook]">
                    {selectedQuality?.line1_Cellophane}
                  </span>
                  <span className="flex h-[41px] items-center justify-center border-b font-[AvenirLTProBook]">
                    {selectedQuality?.line1_Palletizing}
                  </span>
                  <span className="flex h-[41px] items-center justify-center border-b border-l font-[AvenirLTProBook]">
                    {selectedQuality?.line2_Shrinking}
                  </span>
                  <span className="flex h-[41px] items-center justify-center border-b border-l font-[AvenirLTProBook]">
                    {selectedQuality?.line2_Cellophane}
                  </span>
                  <span className="flex h-[41px] items-center justify-center border-b font-[AvenirLTProBook]">
                    {selectedQuality?.line2_Palletizing}
                  </span>
                  <span className="flex h-[41px] items-center justify-center border-l font-[AvenirLTProBook]">
                    {selectedQuality?.line3_Shrinking}
                  </span>
                  <span className="flex h-[41px] items-center justify-center border-l font-[AvenirLTProBook]">
                    {selectedQuality?.line3_Cellophane}
                  </span>
                  <span className="flex h-[41px] items-center justify-center font-[AvenirLTProBook]">
                    {selectedQuality?.line3_Palletizing}
                  </span>
                </div>
              </div>
              {/* جمع کل تولید */}
              <div className="text-center">
                <p className="flex h-[109px] items-center justify-center border-b bg-gray-500/40 font-[SamimBold] text-[10px]">
                  جمع کل تولید
                  <br />
                  (محصول)
                </p>
                <p className="flex flex-col">
                  <span className="flex h-[41px] items-center justify-center border-b font-[AvenirLTProBook]">
                    {selectedQuality?.line1_TotalProduction}
                  </span>
                  <span className="flex h-[41px] items-center justify-center border-b font-[AvenirLTProBook]">
                    {selectedQuality?.line2_TotalProduction}
                  </span>
                  <span className="flex h-[41px] items-center justify-center font-[AvenirLTProBook]">
                    {selectedQuality?.line3_TotalProduction}
                  </span>
                </p>
              </div>
            </div>
            {/* دستگاه M.P.C - دستگاه E.B.I */}
            <div>
              {/* دستگاه M.P.C */}
              <p className="border-b border-l bg-gray-500/40 py-2 text-center font-[SamimBold]">
                دستگاه M.P.C
              </p>
              <div className="text-center">
                <table className="w-full border-b border-l">
                  <thead>
                    <tr>
                      <th className="w-2.5 -rotate-90 border-l py-10 text-[12px] whitespace-nowrap">
                        شماره خط
                      </th>
                      <th className="w-25 border-l text-[12px]">
                        اعلام خرابی ها
                      </th>
                      <th className="w-34 border-l text-[12px]">
                        اعلام تنظیمات توسط واحد اعمال کننده
                      </th>
                      <th className="text-[12px]">امار ضایعات</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="h-[50px]">
                      <td className="border-t border-b border-l text-center">
                        خط 1
                      </td>
                      <td className="border px-0.5 text-center font-[VazirLight] text-[12px] break-all">
                        {selectedQuality?.mpC_Line1_FailureReport}
                      </td>
                      <td className="border px-0.5 text-center font-[VazirLight] text-[12px]">
                        {selectedQuality?.mpC_Line1_SettingsReport}
                      </td>
                      <td className="border text-center font-[AvenirLTProBook]">
                        {selectedQuality?.mpC_Line1_WasteStatistics}
                      </td>
                    </tr>
                    <tr className="h-[50px]">
                      <td className="border-t border-b border-l">خط 2</td>
                      <td className="border px-1 text-center font-[VazirLight] text-[12px] break-all">
                        {selectedQuality?.mpC_Line2_FailureReport}
                      </td>
                      <td className="border px-0.5 text-center font-[VazirLight] text-[12px]">
                        {selectedQuality?.mpC_Line2_SettingsReport}
                      </td>
                      <td className="border text-center font-[AvenirLTProBook]">
                        {selectedQuality?.mpC_Line2_WasteStatistics}
                      </td>
                    </tr>
                    <tr className="h-[50px]">
                      <td className="border-t border-b border-l"> خط 3</td>
                      <td className="border px-1 text-center font-[VazirLight] text-[12px] break-all">
                        {selectedQuality?.mpC_Line3_FailureReport}
                      </td>
                      <td className="border px-0.5 text-center font-[VazirLight] text-[12px]">
                        {selectedQuality?.mpC_Line3_SettingsReport}
                      </td>
                      <td className="border text-center font-[AvenirLTProBook]">
                        {selectedQuality?.mpC_Line3_WasteStatistics}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* خط بسته بندی */}
              <div>
                <p className="border-b border-l bg-gray-500/40 py-1 text-center font-[SamimBold]">
                  خط بسته بندی
                </p>
                <div className="text-center">
                  <table className="w-full border-l">
                    <thead>
                      <tr>
                        <th className="w-65 border-l py-2">اعلام خرابی</th>
                        <th>اعلام تنظیمات توسط واحد اعمال کننده</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="h-[90px]">
                        <td className="border-t px-0.5 font-[VazirLight] text-[12px] leading-4">
                          {selectedQuality?.packagingLine_FailureReport}
                        </td>
                        <td className="border-t border-r px-0.5 font-[VazirLight] text-[12px] leading-4">
                          {selectedQuality?.packagingLine_SettingsReport}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {/* دستگاه E.B.I */}
            <div>
              <p className="border-b bg-gray-500/40 py-2 text-center font-[SamimBold]">
                دستگاه E.B.I
              </p>
              <div className="grid grid-cols-9 text-center">
                <p className="col-span-2 border-b border-l py-[39.5px] font-[SamimBold] text-[13px]">
                  اعلام خرابی ها
                </p>
                <p className="col-span-2 flex items-center justify-center border-b border-l font-[SamimBold] text-[13px]">
                  اعلام تنظیمات توسط واحد اعمال کننده
                </p>
                <p className="col-span-5 flex items-center justify-center border-b font-[SamimBold] text-[13px]">
                  آمار ضایعات
                </p>
              </div>
              <div className="grid grid-cols-9">
                <p className="col-span-2 flex flex-col text-center">
                  <span className="flex h-[50px] items-center justify-center border-b border-l font-[VazirLight] text-[12px]">
                    {selectedQuality?.ebI_Line1_FailureReport}
                  </span>
                  <span className="flex h-[50px] items-center justify-center border-b border-l font-[VazirLight] text-[12px]">
                    {selectedQuality?.ebI_Line2_FailureReport}
                  </span>
                  <span className="flex h-[50px] items-center justify-center border-b border-l font-[VazirLight] text-[12px]">
                    {selectedQuality?.ebI_Line3_FailureReport}
                  </span>
                </p>
                <p className="col-span-2 flex flex-col text-center">
                  <span className="flex h-[50px] items-center justify-center border-b border-l font-[VazirLight] text-[12px]">
                    {selectedQuality?.ebI_Line1_SettingsReport}
                  </span>
                  <span className="flex h-[50px] items-center justify-center border-b border-l font-[VazirLight] text-[12px]">
                    {selectedQuality?.ebI_Line2_SettingsReport}
                  </span>
                  <span className="flex h-[50px] items-center justify-center border-b border-l font-[VazirLight] text-[12px]">
                    {selectedQuality?.ebI_Line3_SettingsReport}
                  </span>
                </p>
                <p className="col-span-5 flex flex-col text-center">
                  <span className="flex h-[50px] items-center justify-center border-b font-[AvenirLTProBook]">
                    {selectedQuality?.ebI_Line1_WasteStatistics}
                  </span>
                  <span className="flex h-[50px] items-center justify-center border-b font-[AvenirLTProBook]">
                    {selectedQuality?.ebI_Line2_WasteStatistics}
                  </span>
                  <span className="flex h-[50px] items-center justify-center border-b font-[AvenirLTProBook]">
                    {selectedQuality?.ebI_Line3_WasteStatistics}
                  </span>
                </p>
              </div>
              <div className="grid grid-cols-9">
                <div className="col-span-4 flex flex-col items-center justify-center border-l">
                  <p className="pt-1"> امضاء تحویل دهنده شیفت</p>
                  <div className="h-[134px]">
                    <div className="pt-10">
                      {selectedSignatureHandover ? (
                        <img
                          src={`data:image/png;base64,${selectedSignatureHandover}`}
                          alt="signature"
                          className="fixed top-165 left-85 h-34 w-50"
                        />
                      ) : canSignHandover ? (
                        <button
                          onClick={() => handleOpenSignatureModal('handover')}
                          className="mr-3 cursor-pointer rounded-[10px] bg-linear-to-br from-cyan-400 to-black/10 p-2 transition-all delay-75 duration-100 ease-in-out hover:scale-110"
                        >
                          ثبت امضاء
                        </button>
                      ) : (
                        <span className="flex items-center justify-center rounded-[10px] bg-red-500 p-1 text-[15px]">
                          شما دسترسی امضاء ندارید
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-span-5 flex flex-col items-center justify-center">
                  <p className="pt-1"> امضاء تحویل گیرنده شیفت</p>
                  <p className="h-[134px] pt-10">
                    <span>
                      {selectedSignatureReceiver ? (
                        <img
                          src={`data:image/png;base64,${selectedSignatureReceiver}`}
                          alt="signature"
                          className="fixed top-165 left-10 h-34 w-50"
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
                </div>
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

export default FormReport;
