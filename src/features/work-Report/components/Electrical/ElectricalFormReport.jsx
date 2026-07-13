import { useEffect, useMemo, useState } from 'react';
import logo from '../../../../assets/images/logo.png';
import close from '../../../../assets/images/close.png';
import { normalizeTime, toShamsi } from '../../../../Time/date';
import { useSelector } from 'react-redux';
import { useGetMenu } from '../../../../hooks/menu/menuApi';
import { findMenu } from '../../../../utils/rbac';
import { useGetPermissionSignature } from '../../../../hooks/user/userApi';
import { useGetSignatureId } from '../../../../hooks/Signature/Signature';
import {
  useCreateSignatureHandover,
  useCreateSignatureReceiver,
  useCreateSignatureSupervisor,
} from '../../Api/Electrical/electrical';
import { useGetProfile } from '../../../../hooks/profile/profile';

function ElectricalFormReport({
  openForm,
  setOpenForm,
  selectedElectrical,
  setSelectedElectrical,
  electrical,
}) {
  const { userInfo } = useSelector((state) => state.auth);

  const [selectedSignatureHandover, setSelectedSignatureHandover] =
    useState(null);
  const [selectedSignatureReceiver, setSelectedSignatureReceiver] =
    useState(null);
  const [selectedSignatureSuperVisor, setSelectedSignatureSuperVisor] =
    useState(null);

  const [page, setPage] = useState(1);
  const [openCode, setOpenCode] = useState(false);
  const [password, setPassword] = useState('');
  const [signatureType, setSignatureType] = useState(null);

  const closeHandler = () => {
    setOpenForm(false);
  };

  const handleOpenSignatureModal = (type) => {
    setSignatureType(type);
    setOpenCode(true);
  };

  const rows = useMemo(() => {
    const arr = [...(selectedElectrical?.workTasks ?? [])];

    while (arr.length < 15) {
      arr.push({});
    }

    return arr.slice(0, 15);
  }, [selectedElectrical]);
  // ---------------------------------------------------------------------
  const { data: menu } = useGetMenu();
  const electricalMenu = findMenu(menu?.menus ?? [], 'electrical-report');
  const menuId = electricalMenu?.id;

  const { data: permission } = useGetPermissionSignature(userInfo?.userId);
  const canSign = permission?.data?.some(
    (p) => p.menuId === menuId && p.canSignature === true
  );
  // ---------------------------------------------------------------------

  const { data: signatureHandover } = useGetSignatureId(
    selectedElectrical?.shiftHandOverByUserId
  );
  const { data: signatureReceiver } = useGetSignatureId(
    selectedElectrical?.shiftReceiverByUserId
  );

  const { data: signatureSupervisor } = useGetSignatureId(
    selectedElectrical?.supervisorByUserId
  );
  // -----------------------------------------------------
  const { data: profile } = useGetProfile();

  // Handover
  const isHandover = selectedElectrical?.createdBy === profile?.data?.id;

  const canSignHandover = canSign && isHandover;

  // --------------------------------------------------------------

  // Supervisor
  const isSupervisor = profile?.data?.companyRoles?.some(
    (p) => p.roleId === '5e6bcab8-bb18-482f-9805-477ac64fa209'
  );

  const canSignSupervisor = canSign && isSupervisor;
  // --------------------------------------------------------------
  useEffect(() => {
    // Handover
    if (
      selectedElectrical?.isShiftHandOverSigned === true &&
      signatureHandover?.data?.signatureImageBase64
    ) {
      setSelectedSignatureHandover(signatureHandover.data.signatureImageBase64);
    } else {
      setSelectedSignatureHandover(null);
    }

    // Receiver
    if (
      selectedElectrical?.isShiftReceiverSigned === true &&
      signatureReceiver?.data?.signatureImageBase64
    ) {
      setSelectedSignatureReceiver(signatureReceiver.data.signatureImageBase64);
    } else {
      setSelectedSignatureReceiver(null);
    }

    // Supervisor
    if (
      selectedElectrical?.isSupervisorSigned === true &&
      signatureSupervisor?.data?.signatureImageBase64
    ) {
      setSelectedSignatureSuperVisor(
        signatureSupervisor.data.signatureImageBase64
      );
    } else {
      setSelectedSignatureSuperVisor(null);
    }
  }, [
    signatureHandover,
    signatureReceiver,
    signatureSupervisor,
    selectedElectrical?.isShiftHandOverSigned,
    selectedElectrical?.isShiftReceiverSigned,
    selectedElectrical?.isSupervisorSigned,
  ]);

  const createSignatureHandover = useCreateSignatureHandover(
    selectedElectrical?.id
  );

  const createSignatureReceiver = useCreateSignatureReceiver(
    selectedElectrical?.id
  );

  const createSignatureSupervisor = useCreateSignatureSupervisor(
    selectedElectrical?.id
  );

  const handleSubmitSignature = () => {
    if (signatureType === 'handover') {
      createSignatureHandover.mutate(
        {
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
    if (signatureType === 'receiver') {
      createSignatureReceiver.mutate(
        { signaturePassword: password },
        {
          onSuccess: () => {
            setOpenCode(false);
            setOpenForm(false);
          },
        }
      );
    }
    if (signatureType === 'supervisor') {
      createSignatureSupervisor.mutate(
        {
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
        className={`relative transform rounded-[15px] bg-white pb-2 text-white shadow-2xl transition-all duration-300 max-2xl:pb-0 print:mb-2.5 print:scale-94! ${
          openForm
            ? ' translate-y-0 scale-100 opacity-100 max-2xl:scale-75 max-md:scale-45 max-md:rotate-90'
            : '-translate-y-10 scale-0 opacity-0'
        }`}
      >
        <div className="scale-97 perspective-[2000px] max-2xl:scale-96">
          <div
            className={`relative transition-transform duration-700 transform-3d ${
              page === 2 ? 'transform-[rotateY(180deg)]' : ''
            }`}
            style={{ width: '297mm', minHeight: '210mm' }}
          >
            {/* page 1 */}
            {page === 1 && (
              <div className="absolute inset-0 border-2 bg-white text-black backface-hidden">
                {/* logo & hedear */}
                <div className="grid grid-cols-5">
                  <div className="flex items-center justify-center border-b border-l">
                    <img src={logo} alt="logo" width={115} />
                  </div>
                  <div className="col-span-3 flex items-center justify-center border-b border-l">
                    <h1 className="font-[SamimBold] text-[20px]">
                      فرم گزارش روزانه واحد برق
                    </h1>
                  </div>
                  <div className="flex flex-col justify-center border-b pr-2">
                    <p className="space-x-1 text-[15px]">
                      <span className="font-[SamimBold]">کدسند :</span>
                      <span className="font-[AvenirLTProHeavy]">F1101</span>
                    </p>
                    <p className="space-x-1 text-[15px]">
                      <span className="font-[SamimBold]">شماره ویرایش :</span>
                      <span className="font-[AvenirLTProHeavy]">04</span>
                    </p>
                    <p className="space-x-1 text-[15px]">
                      <span className="font-[SamimBold]">تاریخ ویرایش :</span>
                      <span className="font-[AvenirLTProHeavy]">
                        1403/06/03
                      </span>
                    </p>
                  </div>
                </div>
                {/* date & number & code */}
                <div className="flex justify-between border-b px-2 pt-1">
                  <p className="flex items-center justify-center space-x-1">
                    <span className="font-[Samim] text-[14px] font-bold">
                      تاریخ:
                    </span>
                    <span className="font-[AvenirLTProBook] text-[13px] font-semibold">
                      {toShamsi(selectedElectrical?.reportDate)}
                    </span>
                  </p>
                  <p className="flex items-center justify-center space-x-1">
                    <span className="font-[VazirLight] text-[14px] font-bold">
                      روز هفته:
                    </span>
                    <span className="font-[Samim] text-[13px] font-semibold">
                      {selectedElectrical?.dayOfWeekDisplay}
                    </span>
                  </p>

                  <p className="flex items-center justify-center space-x-1">
                    <span className="font-[VazirLight] text-[14px] font-bold">
                      نام شیفت:
                    </span>
                    <span className="font-[Samim] text-[13px] font-semibold">
                      {selectedElectrical?.shiftName}
                    </span>
                  </p>
                  <p className="flex items-center justify-center space-x-1">
                    <span className="font-[VazirLight] text-[14px] font-bold">
                      نام سرشیفت:
                    </span>
                    <span className="font-[Samim] text-[13px] font-semibold">
                      {selectedElectrical?.shiftSupervisorName}
                    </span>
                  </p>
                </div>
                {/* وضعیت حصور پرسنل */}
                <div className="border-b-2 pb-2">
                  <p className="py-2 pr-1 font-[SamimBold]">
                    وضعیت حضور پرسنل:
                  </p>
                  <div className="grid grid-cols-2 text-center">
                    <div className="grid grid-cols-6 border-t border-b border-l">
                      <div className="col-span-2 flex items-center justify-center border-l">
                        <span className="font-[SamimBold]">حاضر</span>
                      </div>
                      <div className="col-span-3">
                        <p className="border-b font-[SamimBold]">مرخصی</p>
                        <div className="grid grid-cols-2">
                          <p className="font-[SamimBold]">استحقاقی</p>
                          <p className="border-r font-[SamimBold]">استعلاجی</p>
                        </div>
                      </div>
                      <div className="col-span-1 flex items-center justify-center border-r font-[SamimBold]">
                        غیبت
                      </div>
                    </div>

                    <div className="grid grid-cols-3 pr-5">
                      <div className="flex flex-col items-center justify-center border-t border-r border-b">
                        <p className="font-[SamimBold]">واحد / ساعت</p>
                      </div>
                      <div className="col-span-2 border-t border-r border-b">
                        <div className="grid grid-cols-6">
                          <div className="col-span-3 border-l">
                            <div className="grid grid-cols-3"></div>
                            <p className="border-b font-[SamimBold]">NET A</p>
                            <p className="grid grid-cols-3">
                              <span className="flex h-6 items-center justify-center border-l text-center font-[AvenirLTProHeavy] text-[12px]">
                                {normalizeTime(
                                  selectedElectrical?.netA_Row1_Time
                                )}
                              </span>
                              <span className="flex h-6 items-center justify-center text-center font-[AvenirLTProHeavy] text-[12px]">
                                {normalizeTime(
                                  selectedElectrical?.netA_Row2_Time
                                )}
                              </span>
                              <span className="flex h-6 items-center justify-center border-r text-center font-[AvenirLTProHeavy] text-[12px]">
                                {normalizeTime(
                                  selectedElectrical?.netA_Row3_Time
                                )}
                              </span>
                            </p>
                          </div>
                          <div className="col-span-3">
                            <div className="grid grid-cols-3"></div>
                            <p className="border-b font-[SamimBold]">NET B</p>
                            <p className="grid grid-cols-3">
                              <span className="flex h-6 items-center justify-center border-l text-center font-[AvenirLTProHeavy] text-[12px]">
                                {normalizeTime(
                                  selectedElectrical?.netB_Row1_Time
                                )}
                              </span>
                              <span className="flex h-6 items-center justify-center border-l text-center font-[AvenirLTProHeavy] text-[12px]">
                                {normalizeTime(
                                  selectedElectrical?.netB_Row2_Time
                                )}
                              </span>
                              <span className="flex h-6 items-center justify-center text-center font-[AvenirLTProHeavy] text-[12px]">
                                {normalizeTime(
                                  selectedElectrical?.netB_Row3_Time
                                )}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* قسمت پایین وضعیت حضور پرسنل */}
                  <div className="grid grid-cols-2">
                    {/* راست */}
                    <div className="grid grid-cols-6">
                      <div className="col-span-2 flex h-20 items-center justify-center border-b border-l text-center">
                        {selectedElectrical?.presentPersonnel}
                      </div>
                      <div className="col-span-3 border-b">
                        <p className="grid h-20 grid-cols-2">
                          <span className="flex items-center justify-center border-l px-1 text-center break-all">
                            {selectedElectrical?.vacationEntitlementPersonnel}
                          </span>
                          <span className="flex items-center justify-center border-l px-1 text-center break-all">
                            {selectedElectrical?.sickLeavePersonnel}
                          </span>
                        </p>
                      </div>
                      <div className="col-span-1 flex items-center justify-center border-b border-l text-center">
                        {selectedElectrical?.absentPersonnel}
                      </div>
                    </div>
                    {/* چپ */}
                    <div className="grid grid-cols-3 pr-5">
                      <div className="">
                        <p className="flex h-10 items-center justify-center border-r border-b text-center">
                          <span className="font-[SamimBold]">آمپر</span>
                          <span className="font-[AvenirLTProMedium]">20KV</span>
                        </p>
                        <p className="flex h-10 items-center justify-center border-r border-b text-center">
                          <span className="font-[SamimBold]">آمپر</span>
                          <span className="font-[AvenirLTProMedium]">380V</span>
                        </p>
                      </div>
                      <div className="col-span-2">
                        <div className="grid grid-cols-6">
                          <div className="col-span-3 border-r">
                            <p className="grid grid-cols-3">
                              <span className="flex h-[39px] items-center justify-center border-l font-[AvenirLTProBlack]">
                                {selectedElectrical?.netA_Row1_Ampere20KV}
                              </span>
                              <span className="flex items-center justify-center border-l font-[AvenirLTProBlack]">
                                {selectedElectrical?.netA_Row2_Ampere20KV}
                              </span>
                              <span className="flex items-center justify-center font-[AvenirLTProBlack]">
                                {selectedElectrical?.netA_Row3_Ampere20KV}
                              </span>
                            </p>
                          </div>
                          <div className="col-span-3">
                            <p className="grid grid-cols-3">
                              <span className="flex h-[39px] items-center justify-center border-r border-l font-[AvenirLTProBlack]">
                                {selectedElectrical?.netB_Row1_Ampere20KV}
                              </span>
                              <span className="flex items-center justify-center border-l font-[AvenirLTProBlack]">
                                {selectedElectrical?.netB_Row2_Ampere20KV}
                              </span>

                              <span className="flex items-center justify-center font-[AvenirLTProBlack]">
                                {selectedElectrical?.netB_Row3_Ampere20KV}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="grid grid-cols-6">
                          <div className="col-span-3 border-t border-r border-b">
                            <p className="grid grid-cols-3">
                              <span className="flex h-[39px] items-center justify-center border-l font-[AvenirLTProBlack]">
                                {selectedElectrical?.netA_Row1_Ampere380V}
                              </span>
                              <span className="flex items-center justify-center border-l font-[AvenirLTProBlack]">
                                {selectedElectrical?.netA_Row2_Ampere380V}
                              </span>
                              <span className="flex items-center justify-center font-[AvenirLTProBlack]">
                                {selectedElectrical?.netA_Row3_Ampere380V}
                              </span>
                            </p>
                          </div>
                          <div className="col-span-3 border-t border-b">
                            <p className="grid grid-cols-3">
                              <span className="flex h-[39px] items-center justify-center border-r border-l font-[AvenirLTProBlack]">
                                {selectedElectrical?.netB_Row1_Ampere380V}
                              </span>
                              <span className="flex items-center justify-center border-l font-[AvenirLTProBlack]">
                                {selectedElectrical?.netB_Row2_Ampere380V}
                              </span>
                              <span className="flex items-center justify-center font-[AvenirLTProBlack]">
                                {selectedElectrical?.netB_Row3_Ampere380V}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* ---------------------------------------------------- */}
                {/* ردیف زیر حضور پرسنل */}
                <div className="mt-2 grid grid-cols-2 border-b-2">
                  {/* right */}
                  <div className="space-y-2 pb-2">
                    <div className="flex pt-1 pr-2">
                      <p>
                        <span className="font-[SamimBold]">
                          بازدیدهای روزانه :
                        </span>
                      </p>
                      <div className="flex">
                        <div className="flex items-center justify-center space-x-1">
                          <p className="pr-1">ژنراتورها</p>
                          {selectedElectrical?.inspection_Generators ===
                          true ? (
                            <p className="ml-5 h-5 w-5 rounded-full border-green-600 bg-black"></p>
                          ) : (
                            <p className="ml-5 size-5 rounded-full border bg-white"></p>
                          )}
                        </div>
                        <div className="flex items-center justify-center space-x-1">
                          <p> باتری ها</p>
                          {selectedElectrical?.inspection_Batteries === true ? (
                            <p className="ml-5 h-5 w-5 rounded-full border-green-600 bg-black"></p>
                          ) : (
                            <p className="ml-5 size-5 rounded-full border bg-white"></p>
                          )}
                        </div>
                        <div className="flex items-center justify-center space-x-1">
                          <p>UPS</p>
                          {selectedElectrical?.inspection_UPS === true ? (
                            <p className="ml-5 h-5 w-5 rounded-full border-green-600 bg-black"></p>
                          ) : (
                            <p className="ml-5 size-5 rounded-full border bg-white"></p>
                          )}
                        </div>
                        <div className="flex items-center justify-center space-x-1">
                          <p>کلیدهای اصلی</p>
                          {selectedElectrical?.inspection_MainSwitches ===
                          true ? (
                            <p className="ml-5 h-5 w-5 rounded-full border-green-600 bg-black"></p>
                          ) : (
                            <p className="ml-5 size-5 rounded-full border bg-white"></p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-20 pr-2">
                      <p className="space-x-2">
                        <span className="font-[SamimBold]">
                          دمای اتاق توزیع :
                        </span>
                        <span className="font-[AvenirLTProBlack]">
                          {selectedElectrical?.distributionRoomTemperature}
                        </span>
                      </p>
                      <p className="space-x-2">
                        <span className="font-[SamimBold]">
                          دمای اتاق پست :
                        </span>
                        <span className="font-[AvenirLTProBlack]">
                          {selectedElectrical?.substationRoomTemperature}
                        </span>
                      </p>
                    </div>
                    <div className="flex space-x-5 pr-2 font-[SamimBold]">
                      کمپرسور های هوای در حال کار :
                      {selectedElectrical?.airCompressor1_Working === true ? (
                        <p className="mr-2 flex size-6 items-center justify-center rounded-full border bg-black font-[AvenirLTProBlack] text-white">
                          1
                        </p>
                      ) : (
                        <p className="mr-2 flex size-6 items-center justify-center rounded-full border bg-white font-[AvenirLTProBlack]">
                          1
                        </p>
                      )}
                      {selectedElectrical?.airCompressor2_Working === true ? (
                        <p className="mr-2 flex size-6 items-center justify-center rounded-full border bg-black font-[AvenirLTProBlack] text-white">
                          2
                        </p>
                      ) : (
                        <p className="mr-2 flex size-6 items-center justify-center rounded-full border bg-white font-[AvenirLTProBlack]">
                          2
                        </p>
                      )}
                      {selectedElectrical?.airCompressor3_Working === true ? (
                        <p className="mr-2 flex size-6 items-center justify-center rounded-full border bg-black font-[AvenirLTProBlack] text-white">
                          3
                        </p>
                      ) : (
                        <p className="mr-2 flex size-6 items-center justify-center rounded-full border bg-white font-[AvenirLTProBlack]">
                          3
                        </p>
                      )}
                      {selectedElectrical?.airCompressor4_Working === true ? (
                        <p className="mr-2 flex size-6 items-center justify-center rounded-full border bg-black font-[AvenirLTProBlack] text-white">
                          4
                        </p>
                      ) : (
                        <p className="mr-2 flex size-6 items-center justify-center rounded-full border bg-white font-[AvenirLTProBlack]">
                          4
                        </p>
                      )}
                    </div>
                    <div className="flex space-x-2 pr-2">
                      <div className="flex">
                        <p>نظافت اتاق توزیع</p>
                        {selectedElectrical?.cleaning_DistributionRoom ===
                        true ? (
                          <p className="mr-2 flex size-5 items-center justify-center rounded-full border bg-black font-[AvenirLTProBlack] text-white"></p>
                        ) : (
                          <p className="mr-2 flex size-5 items-center justify-center rounded-full border bg-white font-[AvenirLTProBlack]"></p>
                        )}
                      </div>
                      <div className="flex">
                        <p>نظافت اتاق برق</p>
                        {selectedElectrical?.cleaning_ElectricalRoom ===
                        true ? (
                          <p className="mr-2 flex size-5 items-center justify-center rounded-full border bg-black font-[AvenirLTProBlack] text-white"></p>
                        ) : (
                          <p className="mr-2 flex size-5 items-center justify-center rounded-full border bg-white font-[AvenirLTProBlack]"></p>
                        )}
                      </div>
                      <div className="flex">
                        <p>روشنایی محوطه</p>
                        {selectedElectrical?.lighting_Yard === true ? (
                          <p className="mr-2 flex size-5 items-center justify-center rounded-full border bg-black font-[AvenirLTProBlack] text-white"></p>
                        ) : (
                          <p className="mr-2 flex size-5 items-center justify-center rounded-full border bg-white font-[AvenirLTProBlack]"></p>
                        )}
                      </div>
                      <div className="flex">
                        <p>روشنایی سالن </p>
                        {selectedElectrical?.lighting_Hall === true ? (
                          <p className="mr-2 flex size-5 items-center justify-center rounded-full border bg-black font-[AvenirLTProBlack] text-white"></p>
                        ) : (
                          <p className="mr-2 flex size-5 items-center justify-center rounded-full border bg-white font-[AvenirLTProBlack]"></p>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* left */}
                  <div className="pl-2">
                    <div className="grid grid-cols-7">
                      <div className="border">
                        <p className="h-[45px] text-white">
                          <span></span>
                          <span className="font-[AvenirLTProBlack]"></span>
                        </p>
                        <p className="border-t border-b py-1 text-center font-[SamimBold]">
                          آمپر
                        </p>
                        <p className="py-1 text-center font-[SamimBold]">
                          هرتز
                        </p>
                      </div>
                      <div className="col-span-6">
                        <div className="grid grid-cols-3">
                          <div>
                            <p className="space-x-0.5 border-t border-b border-l py-2.5 text-center font-[SamimBold]">
                              <span> کمپرسور هوا شماره</span>
                              <span className="font-[AvenirLTProBlack]">1</span>
                            </p>
                            <p className="flex h-[33px] items-center justify-center border-b border-l font-[AvenirLTProBlack]">
                              {selectedElectrical?.airCompressor1_Ampere}
                            </p>
                            <p className="flex h-[33px] items-center justify-center border-b border-l font-[AvenirLTProBlack]">
                              {selectedElectrical?.airCompressor1_Hertz}
                            </p>
                          </div>
                          <div>
                            <p className="space-x-0.5 border-t border-b border-l py-2.5 text-center font-[SamimBold]">
                              <span>کمپرسور هوا شماره</span>
                              <span className="font-[AvenirLTProBlack]">2</span>
                            </p>
                            <p className="flex h-[33px] items-center justify-center border-b border-l font-[AvenirLTProBlack]">
                              {selectedElectrical?.airCompressor2_Ampere}
                            </p>
                            <p className="flex h-[33px] items-center justify-center border-b border-l font-[AvenirLTProBlack]">
                              {selectedElectrical?.airCompressor2_Hertz}
                            </p>
                          </div>
                          <div>
                            <p className="space-x-0.5 border-t border-b border-l py-2.5 text-center font-[SamimBold]">
                              <span> کمپرسور هوا شماره</span>
                              <span className="font-[AvenirLTProBlack]">3</span>
                            </p>
                            <p className="items- flex h-[33px] justify-center border-b border-l font-[AvenirLTProBlack]">
                              {selectedElectrical?.airCompressor3_Ampere}
                            </p>
                            <p className="flex h-[33px] items-center justify-center border-b border-l font-[AvenirLTProBlack]">
                              {selectedElectrical?.airCompressor3_Hertz}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-10 border-b-2 px-5 pt-2 pb-2">
                  <div className="border text-center">
                    <p className="h-[29px] border-b py-0.5 font-[SamimBold] text-[13px]">
                      بازدید های روزانه
                    </p>
                    <p className="h-[29px] border-b py-0.5 font-[SamimBold] text-[13px]">
                      شماره تجهیز
                    </p>
                    <p className="h-[29px] border-b py-0.5 font-[SamimBold] text-[13px]">
                      آمپر
                    </p>
                    <p className="h-[29px] py-0.5 font-[SamimBold] text-[13px]">
                      هرتز
                    </p>
                  </div>
                  <div className="col-span-9">
                    <div className="flex">
                      <div className="w-35 border-t border-b border-l">
                        <p className="space-x-1 border-b px-1 py-0.5 text-center">
                          <span className="font-[SamimBold] text-[13px]">
                            فن احتراق
                          </span>
                          <span className="font-[AvenirLTProBlack] text-[13px]">
                            110KW
                          </span>
                        </p>
                        <p className="h-[29px] border-b py-0.5 text-center font-[AvenirLTProBlack]">
                          {
                            selectedElectrical?.combustionFan110KW_EquipmentNumber
                          }
                        </p>
                        <p className="h-[29px] border-b py-0.5 text-center font-[AvenirLTProBlack]">
                          {selectedElectrical?.combustionFan110KW_Ampere}
                        </p>
                        <p className="h-[29px] py-0.5 text-center font-[AvenirLTProBlack]">
                          {selectedElectrical?.combustionFan110KW_Hertz}
                        </p>
                      </div>
                      <div className="w-30 border-t border-b border-l">
                        <p className="space-x-1 border-b px-1 py-0.5 text-center">
                          <span className="font-[SamimBold] text-[13px]">
                            فن ساکشن
                          </span>
                          <span className="font-[AvenirLTProBlack] text-[13px]">
                            55KW
                          </span>
                        </p>
                        <p className="h-[29px] border-b py-0.5 text-center font-[AvenirLTProBlack]">
                          {selectedElectrical?.suctionFan55KW_EquipmentNumber}
                        </p>
                        <p className="h-[29px] border-b py-0.5 text-center font-[AvenirLTProBlack]">
                          {selectedElectrical?.suctionFan55KW_Ampere}
                        </p>
                        <p className="h-[29px] py-0.5 text-center font-[AvenirLTProBlack]">
                          {selectedElectrical?.suctionFan55KW_Hertz}
                        </p>
                      </div>
                      <div className="w-40 border-t border-b border-l">
                        <p className="space-x-1 border-b py-0.5 text-center">
                          <span className="font-[SamimBold] text-[13px]">
                            فن کولینگ دیواره
                          </span>
                          <span className="font-[AvenirLTProBlack] text-[13px]">
                            110KW
                          </span>
                        </p>
                        <p className="h-[29px] border-b py-0.5 text-center font-[AvenirLTProBlack]">
                          {
                            selectedElectrical?.wallCoolingFan110KW_EquipmentNumber
                          }
                        </p>
                        <p className="h-[29px] border-b py-0.5 text-center font-[AvenirLTProBlack]">
                          {selectedElectrical?.wallCoolingFan110KW_Ampere}
                        </p>
                        <p className="h-[29px] py-0.5 text-center font-[AvenirLTProBlack]">
                          {selectedElectrical?.wallCoolingFan110KW_Hertz}
                        </p>
                      </div>
                      <div className="w-20 border-t border-b border-l">
                        <p className="space-x-1 border-b py-0.5 text-center">
                          <span className="font-[SamimBold] text-[13px]">
                            ورکینگ
                          </span>
                        </p>
                        <p className="h-[29px] border-b py-0.5 text-center font-[AvenirLTProBlack]">
                          {selectedElectrical?.working_EquipmentNumber}
                        </p>
                        <p className="h-[29px] border-b py-0.5 text-center font-[AvenirLTProBlack]">
                          {selectedElectrical?.working_Ampere}
                        </p>
                        <p className="h-[29px] py-0.5 text-center font-[AvenirLTProBlack]">
                          {selectedElectrical?.working_Hertz}
                        </p>
                      </div>
                      <div className="w-20 border-t border-b border-l">
                        <p className="space-x-1 border-b py-0.5 text-center">
                          <span className="font-[SamimBold] text-[13px]">
                            گلوگاه
                          </span>
                        </p>
                        <p className="h-[29px] border-b py-0.5 text-center font-[AvenirLTProBlack]">
                          {selectedElectrical?.gologah_EquipmentNumber}
                        </p>
                        <p className="h-[29px] border-b py-0.5 text-center font-[AvenirLTProBlack]">
                          {selectedElectrical?.gologah_Ampere}
                        </p>
                        <p className="h-[29px] py-0.5 text-center font-[AvenirLTProBlack]">
                          {selectedElectrical?.gologah_Hertz}
                        </p>
                      </div>
                      <div className="w-50 border-t border-b border-l">
                        <p className="space-x-1 border-b py-0.5 text-center">
                          <span className="font-[SamimBold] text-[13px]">
                            فن فورهارث
                          </span>
                        </p>
                        <div className="border- grid h-[29px] grid-cols-3 text-center font-[SamimBold]">
                          <p className="border-b border-l py-0.5">
                            <span className="font-[SamimBold]">خط</span>
                            <span className="font-[AvenirLTProBlack]">1</span>
                          </p>
                          <p className="border-b border-l py-0.5">
                            <span className="font-[SamimBold]">خط</span>
                            <span className="font-[AvenirLTProBlack]">2</span>
                          </p>
                          <p className="border-b py-0.5">
                            <span className="font-[SamimBold]">خط</span>
                            <span className="font-[AvenirLTProBlack]">3</span>
                          </p>
                        </div>
                        <div className="border- grid h-[29px] grid-cols-3 text-center font-[AvenirLTProBlack]">
                          <div className="border-b border-l py-0.5">
                            {selectedElectrical?.forehearthFanLine1_Ampere}
                          </div>
                          <div className="border-b border-l py-0.5">
                            {selectedElectrical?.forehearthFanLine2_Ampere}
                          </div>
                          <div className="border-b py-0.5">
                            {selectedElectrical?.forehearthFanLine3_Ampere}
                          </div>
                        </div>
                        <div className="border- grid h-[29px] grid-cols-3 text-center font-[AvenirLTProBlack]">
                          <div className="border-l py-0.5">
                            {selectedElectrical?.forehearthFanLine1_Hertz}
                          </div>
                          <div className="border-l py-0.5">
                            {selectedElectrical?.forehearthFanLine2_Hertz}
                          </div>
                          <div className="py-0.5">
                            {selectedElectrical?.forehearthFanLine3_Hertz}
                          </div>
                        </div>
                      </div>
                      <div className="border-t border-b border-l">
                        <div className="w-22 space-x-1 border-b py-0.5 text-center">
                          <span className="font-[SamimBold] text-[13px]">
                            فن پاتاقی
                          </span>
                        </div>
                        <div className="h-[29px] border-b py-0.5 text-center font-[AvenirLTProBlack]">
                          {selectedElectrical?.pataqiFan_EquipmentNumber}
                        </div>
                        <div className="h-[29px] border-b py-0.5 text-center font-[AvenirLTProBlack]">
                          {selectedElectrical?.pataqiFan_Ampere}
                        </div>
                        <div className="h-[29px] py-0.5 text-center font-[AvenirLTProBlack]">
                          {selectedElectrical?.pataqiFan_Hertz}
                        </div>
                      </div>
                      <div className="border-t border-b border-l">
                        <div className="w-30 space-x-1 border-b py-0.5 text-center">
                          <span className="font-[SamimBold] text-[13px]">
                            پمپ آب برگشتی
                          </span>
                        </div>
                        <div className="h-[29px] border-b py-0.5 text-center font-[AvenirLTProBlack]">
                          {selectedElectrical?.returnWaterPump_EquipmentNumber}
                        </div>
                        <div className="h-[29px] border-b py-0.5 text-center font-[AvenirLTProBlack]">
                          {selectedElectrical?.returnWaterPump_Ampere}
                        </div>
                        <div className="h-[29px] py-0.5 text-center font-[AvenirLTProBlack]">
                          {selectedElectrical?.returnWaterPump_Hertz}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-2 flex border-b-2 pr-5 pb-2">
                  <div className="border-l text-center">
                    <p className="h-[29px] w-26 border-t border-r border-b py-0.5 font-[SamimBold] text-[13px]">
                      بازدید های روزانه
                    </p>
                    <p className="h-[29px] border-r border-b py-0.5 font-[SamimBold] text-[13px]">
                      شماره تجهیز
                    </p>
                    <p className="h-[29px] border-r border-b py-0.5 font-[SamimBold] text-[13px]">
                      آمپر
                    </p>
                    <p className="h-[29px] border-r border-b py-0.5 font-[SamimBold] text-[13px]">
                      هرتز
                    </p>
                  </div>
                  <div className="border-l text-center">
                    <p className="h-[29px] w-35 space-x-1 border-t border-b py-1 font-[SamimBold] text-[13px]">
                      <span className="font-[SamimBold] text-[13px]">
                        فن کولینگ ماشین
                      </span>
                      <span className="font-[AvenirLTProBlack] text-[13px]">
                        1
                      </span>
                    </p>
                    <p className="h-[29px] border-b py-0.5 text-center font-[AvenirLTProBlack]">
                      {selectedElectrical?.machineCoolingFan1_EquipmentNumber}
                    </p>
                    <p className="h-[29px] border-b py-0.5 text-center font-[AvenirLTProBlack]">
                      {selectedElectrical?.machineCoolingFan1_Ampere}
                    </p>
                    <p className="h-[29px] border-b py-0.5 text-center font-[AvenirLTProBlack]">
                      {selectedElectrical?.machineCoolingFan1_Hertz}
                    </p>
                  </div>
                  <div className="border-l text-center">
                    <p className="h-[29px] w-40 space-x-1 border-t border-b py-1 font-[SamimBold] text-[13px]">
                      <span className="font-[SamimBold] text-[13px]">
                        فن کولینگ کانوایر
                      </span>
                      <span className="font-[AvenirLTProBlack] text-[13px]">
                        1
                      </span>
                    </p>
                    <p className="h-[29px] border-b py-0.5 text-center font-[AvenirLTProBlack]">
                      {selectedElectrical?.conveyorCoolingFan1_EquipmentNumber}
                    </p>
                    <p className="h-[29px] border-b py-0.5 text-center font-[AvenirLTProBlack]">
                      {selectedElectrical?.conveyorCoolingFan1_Ampere}
                    </p>
                    <p className="h-[29px] border-b py-0.5 text-center font-[AvenirLTProBlack]">
                      {selectedElectrical?.conveyorCoolingFan1_Hertz}
                    </p>
                  </div>
                  <div className="border-l text-center">
                    <p className="h-[29px] w-40 space-x-1 border-t border-b py-1 font-[SamimBold] text-[13px]">
                      <span className="font-[SamimBold] text-[13px]">
                        فن کولینگ ماشین
                      </span>
                      <span className="font-[AvenirLTProBlack] text-[13px]">
                        2
                      </span>
                    </p>
                    <p className="h-[29px] border-b py-0.5 text-center font-[AvenirLTProBlack]">
                      {selectedElectrical?.machineCoolingFan2_EquipmentNumber}
                    </p>
                    <p className="h-[29px] border-b py-0.5 text-center font-[AvenirLTProBlack]">
                      {selectedElectrical?.machineCoolingFan2_Ampere}
                    </p>
                    <p className="h-[29px] border-b py-0.5 text-center font-[AvenirLTProBlack]">
                      {selectedElectrical?.machineCoolingFan2_Hertz}
                    </p>
                  </div>
                  <div className="border-l text-center">
                    <p className="h-[29px] w-40 space-x-1 border-t border-b py-1 font-[SamimBold] text-[13px]">
                      <span className="font-[SamimBold] text-[13px]">
                        فن کولینگ کانوایر
                      </span>
                      <span className="font-[AvenirLTProBlack] text-[13px]">
                        2
                      </span>
                    </p>
                    <p className="h-[29px] border-b py-0.5 text-center font-[AvenirLTProBlack]">
                      {selectedElectrical?.conveyorCoolingFan2_EquipmentNumber}
                    </p>
                    <p className="h-[29px] border-b py-0.5 text-center font-[AvenirLTProBlack]">
                      {selectedElectrical?.conveyorCoolingFan2_Ampere}
                    </p>
                    <p className="h-[29px] border-b py-0.5 text-center font-[AvenirLTProBlack]">
                      {selectedElectrical?.conveyorCoolingFan2_Hertz}
                    </p>
                  </div>
                  <div className="border-l text-center">
                    <p className="h-[29px] w-40 space-x-1 border-t border-b py-1 font-[SamimBold] text-[13px]">
                      <span className="font-[SamimBold] text-[13px]">
                        فن کولینگ ماشین
                      </span>
                      <span className="font-[AvenirLTProBlack] text-[13px]">
                        3
                      </span>
                    </p>
                    <p className="h-[29px] border-b py-0.5 text-center font-[AvenirLTProBlack]">
                      {selectedElectrical?.machineCoolingFan3_EquipmentNumber}
                    </p>
                    <p className="h-[29px] border-b py-0.5 text-center font-[AvenirLTProBlack]">
                      {selectedElectrical?.machineCoolingFan3_Ampere}
                    </p>
                    <p className="h-[29px] border-b py-0.5 text-center font-[AvenirLTProBlack]">
                      {selectedElectrical?.machineCoolingFan3_Hertz}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="h-[29px] w-45 space-x-1 border-t border-b border-l py-1 font-[SamimBold] text-[13px]">
                      <span className="font-[SamimBold] text-[13px]">
                        فن کولینگ کانوایر
                      </span>
                      <span className="font-[AvenirLTProBlack] text-[13px]">
                        3
                      </span>
                    </p>
                    <p className="h-[29px] border-b border-l py-0.5 text-center font-[AvenirLTProBlack]">
                      {selectedElectrical?.conveyorCoolingFan3_EquipmentNumber}
                    </p>
                    <p className="h-[29px] border-b border-l py-0.5 text-center font-[AvenirLTProBlack]">
                      {selectedElectrical?.conveyorCoolingFan3_Ampere}
                    </p>
                    <p className="h-[29px] border-b border-l py-0.5 text-center font-[AvenirLTProBlack]">
                      {selectedElectrical?.conveyorCoolingFan3_Hertz}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="h-[50px] space-x-1 border-b-2 pt-0.5 pr-1">
                    <span className="font-[SamimBold] text-[15px]">
                      گزارش انجام برگه های P.M با ذکر موارد انجام نشده :
                    </span>
                    <span className="font-[VazirLight] text-[13px]">
                      {selectedElectrical?.pmReport}
                    </span>
                  </p>
                  <p className="h-[50px] space-x-1 pt-0.5 pr-1">
                    <span className="font-[SamimBold] text-[15px]">
                      فعالیت هایی که توسط سر شیفت بعدی نیاز به پیگیری دارد :
                    </span>
                    <span className="font-[VazirLight] text-[13px]">
                      {selectedElectrical?.followUpActivities}
                    </span>
                  </p>
                </div>
              </div>
            )}

            {/* page 2 */}
            {page === 2 && (
              <div className="absolute inset-0 transform-[rotateY(180deg)] border-2 bg-white text-black backface-hidden">
                <div className="grid grid-cols-5">
                  <div className="flex items-center justify-center border-b border-l">
                    <img src={logo} alt="logo" width={115} />
                  </div>
                  <div className="col-span-3 flex items-center justify-center border-b border-l">
                    <h1 className="font-[SamimBold] text-[20px]">
                      فرم گزارش روزانه واحد برق
                    </h1>
                  </div>
                  <div className="flex flex-col justify-center border-b pr-2">
                    <p className="space-x-1 text-[15px]">
                      <span className="font-[SamimBold]">کدسند :</span>
                      <span className="font-[AvenirLTProHeavy]">F1101</span>
                    </p>
                    <p className="space-x-1 text-[15px]">
                      <span className="font-[SamimBold]">شماره ویرایش :</span>
                      <span className="font-[AvenirLTProHeavy]">04</span>
                    </p>
                    <p className="space-x-1 text-[15px]">
                      <span className="font-[SamimBold]">تاریخ ویرایش :</span>
                      <span className="font-[AvenirLTProHeavy]">
                        1403/06/03
                      </span>
                    </p>
                  </div>
                </div>
                {/* date & number & code */}
                <div className="flex justify-between px-2 pt-1">
                  <p className="flex items-center justify-center space-x-1">
                    <span className="font-[Samim] text-[14px] font-bold">
                      تاریخ:
                    </span>
                    <span className="font-[AvenirLTProBook] text-[13px] font-semibold">
                      {toShamsi(selectedElectrical?.reportDate)}
                    </span>
                  </p>
                  <p className="flex items-center justify-center space-x-1">
                    <span className="font-[Samim] text-[14px] font-bold">
                      روز هفته:
                    </span>
                    <span className="font-[VazirLight] text-[13px] font-semibold">
                      {selectedElectrical?.dayOfWeekDisplay}
                    </span>
                  </p>
                  <p className="flex items-center justify-center space-x-1">
                    <span className="font-[Samim] text-[14px] font-bold">
                      نام شیفت:
                    </span>
                    <span className="font-[VazirLight] text-[13px] font-semibold">
                      {selectedElectrical?.shiftName}
                    </span>
                  </p>
                  <p className="flex items-center justify-center space-x-1">
                    <span className="font-[Samim] text-[14px] font-bold">
                      نام سرشیفت:
                    </span>
                    <span className="font-[VazirLight] text-[13px] font-semibold">
                      {selectedElectrical?.shiftSupervisorName}
                    </span>
                  </p>
                </div>
                {/* ------------------------------------------------- */}
                <div>
                  <table className="w-full">
                    <thead className="w-full border-separate border-spacing-y-2 px-5">
                      <tr className="text-center">
                        <th className="border-t border-b border-l px-2 py-1 text-[13px]">
                          ردیف
                        </th>
                        <th className="w-[700px] border-t border-b border-l text-[13px]">
                          شرح کار انجام شده
                        </th>
                        <th className="border-t border-b border-l px-2 py-1 text-[13px]">
                          ساعت شروع
                        </th>
                        <th className="border-t border-b border-l px-2 py-1 text-[13px]">
                          ساعت پایان
                        </th>
                        <th className="w-[130px] border-t border-b border-l px-2 text-[13px]">
                          مجری عملیات
                        </th>
                        <th className="border-t border-b px-2 text-[13px]">
                          واحد درخواست کننده
                        </th>
                      </tr>
                    </thead>
                    <tbody className="border-b">
                      {rows.map((l, index) => (
                        <tr key={index} className="border-b text-center">
                          <td className="border-l py-1.5 font-[AvenirLTProHeavy]">
                            {index + 1}
                          </td>
                          <td className="border-l font-[VazirLight] font-extrabold">
                            {l?.workDescription}
                          </td>
                          <td className="border-l font-[AvenirLTProHeavy] text-[15px]">
                            {normalizeTime(l?.startTime)}
                          </td>
                          <td className="border-l font-[AvenirLTProHeavy] text-[15px]">
                            {normalizeTime(l?.endTime)}
                          </td>
                          <td className="border-l font-[VazirLight] text-[0.8rem] font-semibold">
                            {l?.executor}
                          </td>
                          <td className="font-[VazirLight] font-semibold">
                            {l?.requestingUnit}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="grid grid-cols-3 pt-1 pr-2">
                  <div className="flex space-x-1">
                    <p> امضاء تحویل دهنده شیفت:</p>
                    <p className="">
                      {selectedSignatureHandover ? (
                        <img
                          src={`data:image/png;base64,${selectedSignatureHandover}`}
                          alt="signature"
                          className="fixed top-178 h-20 w-40"
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
                    </p>
                  </div>
                  <p className="pr-15">
                    <span> امضاء تحویل گیرنده شیفت:</span>
                    <span>
                      {selectedSignatureReceiver ? (
                        <img
                          src={`data:image/png;base64,${selectedSignatureReceiver}`}
                          alt="signature"
                          className="fixed top-178 right-152 h-20 w-40"
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
                  <p className="space-x-1 pr-15">
                    <span> امضاء سرپرست:</span>
                    <span>
                      {selectedSignatureSuperVisor ? (
                        <img
                          src={`data:image/png;base64,${selectedSignatureSuperVisor}`}
                          alt="signature"
                          className="fixed top-178 left-10 h-20 w-40"
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
            )}
          </div>
        </div>
        <div className="no-print flex justify-center max-2xl:-mt-3">
          {page === 2 ? (
            <button
              onClick={() => {
                setPage(1);
              }}
              className="cursor-pointer rounded-[10px] bg-linear-to-tr from-blue-600 to-blue-300 px-4 py-2 text-black transition-all delay-75 duration-100 ease-in-out hover:scale-105 print:hidden"
            >
              صفحه اول
            </button>
          ) : (
            <button
              onClick={() => {
                setPage(2);
              }}
              className="cursor-pointer rounded-[10px] bg-linear-to-tr from-blue-600 to-blue-300 px-4 py-2 text-black transition-all delay-75 duration-100 ease-in-out hover:scale-105 print:hidden"
            >
              صفحه دوم
            </button>
          )}
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

export default ElectricalFormReport;
