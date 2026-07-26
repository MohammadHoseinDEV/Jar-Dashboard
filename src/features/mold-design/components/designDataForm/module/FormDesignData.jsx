import React, { useEffect, useState } from 'react';

import logo from '../../../../../assets/images/logo.png';
import close from '../../../../../assets/images/close.png';

import { toShamsi } from '../../../../../Time/date';
import { useSelector } from 'react-redux';
import { useGetMenu } from '../../../../../hooks/menu/menuApi';
import { findMenu } from '../../../../../utils/rbac';
import { useGetPermissionSignature } from '../../../../../hooks/user/userApi';
import { useGetSignatureId } from '../../../../../hooks/Signature/Signature';
import {
  useCreateSignDesigner,
  useCreateSignDesignerS3,
  useCreateSignFactoryManager,
  useCreateSignProductionManager,
} from '../../../Api/designData';
import { useGetProfile } from '../../../../../hooks/profile/profile';

function FormDesignData({
  openForm,
  setOpenForm,
  selectedDesign,
  setSelectedDesign,
}) {
  const { userInfo } = useSelector((state) => state.auth);

  const [selectedSignDesigner, setSelectedSignDesigner] = useState(null);
  const [selectedSignProductionManager, setSelectedSignProductionManager] =
    useState(null);
  const [selectedSignFactoryManager, setSelectedFactoryManager] =
    useState(null);
  const [selectedSignDesignerS3, setSelectedSignDesignS3] = useState(null);
  const [openCode, setOpenCode] = useState(false);
  const [password, setPassword] = useState('');
  const [signatureType, setSignatureType] = useState(null);

  const handleOpenSignatureModal = (type) => {
    setSignatureType(type);
    setOpenCode(true);
  };
  const closeHandler = () => {
    setOpenForm(false);
    setSelectedDesign(null);
  };

  // ---------------------------------------------------------------------
  // Sign
  // دسترسی امضاء
  const { data: menu } = useGetMenu();
  const designMenu = findMenu(
    menu?.menus ?? [],
    'design-data-and-drawing-verification-form'
  );
  const menuId = designMenu?.id;

  const { data: permission } = useGetPermissionSignature(userInfo?.userId);
  const canSign = permission?.data?.some(
    (p) => p.menuId === menuId && p.canSignature === true
  );
  // ---------------------------------------------------------------------
  const { data: profile } = useGetProfile();
  const isDesigner = profile?.data?.companyRoles?.some(
    (p) =>
      p.roleId === '7a0bcb84-1e92-4184-91ee-cda1b47a890a' ||
      p.roleId === 'fa1367da-ab36-44ef-b018-8e9911f1279e'
  );
  const canSignDesigner = canSign && isDesigner;

  const isProductionManager = profile?.data?.companyRoles?.some(
    (p) => p.roleId === 'adbfa0b4-1f48-48a3-9c9e-da7caab1dc97'
  );
  const canSignProductionManager = canSign && isProductionManager;

  const isSignFactoryManager = profile?.data?.companyRoles?.some(
    (p) =>
      p.roleId === '8132dd4b-2e30-458d-a9f4-7e3bb4c344db' ||
      p.roleId === 'fa1367da-ab36-44ef-b018-8e9911f1279e'
  );
  const canSignFactoryManager = canSign && isSignFactoryManager;

  // ---------------------------------------------------------------------

  // گرفتن عکس امضاء کاربران برای نمایش با ID کاربران
  const { data: signDesigner } = useGetSignatureId(
    selectedDesign?.designerSignedByUserId
  );
  const { data: signProductionManager } = useGetSignatureId(
    selectedDesign?.productionManagerSignedByUserId
  );
  const { data: signFactoryManager } = useGetSignatureId(
    selectedDesign?.factoryManagerSignedByUserId
  );
  const { data: signDesignS3 } = useGetSignatureId(
    selectedDesign?.designerSection3SignedByUserId
  );
  // ---------------------------------------------------------------------
  useEffect(() => {
    if (
      selectedDesign?.isDesignerSigned === true &&
      signDesigner?.data?.signatureImageBase64
    ) {
      setSelectedSignDesigner(signDesigner?.data?.signatureImageBase64);
    } else {
      setSelectedSignDesigner(null);
    }

    if (
      selectedDesign?.isProductionManagerSigned === true &&
      signProductionManager?.data?.signatureImageBase64
    ) {
      setSelectedSignProductionManager(
        signProductionManager?.data?.signatureImageBase64
      );
    } else {
      setSelectedSignProductionManager(null);
    }
    if (
      selectedDesign?.isFactoryManagerSigned === true &&
      signFactoryManager?.data?.signatureImageBase64
    ) {
      setSelectedFactoryManager(signFactoryManager?.data?.signatureImageBase64);
    } else {
      setSelectedFactoryManager(null);
    }
    if (
      selectedDesign?.isDesignerSection3Signed === true &&
      signDesignS3?.data?.signatureImageBase64
    ) {
      setSelectedSignDesignS3(signDesignS3?.data?.signatureImageBase64);
    } else {
      setSelectedSignDesignS3(null);
    }
  }, [
    signDesigner,
    signFactoryManager,
    signProductionManager,
    signDesignS3,
    selectedDesign?.isDesignerSigned,
    selectedDesign?.isProductionManagerSigned,
    selectedDesign?.isFactoryManagerSigned,
    selectedDesign?.isDesignerSection3Signed,
  ]);
  // ---------------------------------------------------------------------
  const createSignDesigner = useCreateSignDesigner();
  const createSignProductionManager = useCreateSignProductionManager();
  const createSignFactoryManager = useCreateSignFactoryManager();
  const createSignDesignerS3 = useCreateSignDesignerS3();

  const handleSubmitSign = (e) => {
    e.preventDefault();

    if (signatureType === 'designer') {
      createSignDesigner.mutate(
        {
          id: selectedDesign?.id,
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

    if (signatureType === 'productionManager') {
      createSignProductionManager.mutate(
        {
          id: selectedDesign?.id,
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
    if (signatureType === 'factoryManager') {
      createSignFactoryManager.mutate(
        {
          id: selectedDesign?.id,
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
    if (signatureType === 'designerS3') {
      createSignDesignerS3.mutate(
        {
          id: selectedDesign?.id,
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
        className={`relative transform rounded-[15px] bg-white p-2 text-white shadow-2xl transition-all duration-300 print:scale-86! ${
          openForm
            ? '5xl:scale-138 translate-y-0 scale-112 opacity-100 max-2xl:scale-78 max-xl:scale-75 max-md:scale-65 print:shadow-none '
            : '-translate-y-10 scale-0 opacity-0'
        }`}
      >
        <div
          className="border bg-white text-black"
          style={{ width: '148mm', minHeight: '210mm' }}
        >
          {/* Header */}
          <div className="grid grid-cols-4">
            <div className="flex items-center justify-center border-b border-l">
              <img src={logo} alt="logo" width={90} />
            </div>
            <div className="col-span-2 flex items-center justify-center border-b border-l">
              <h1 className="font-[SamimBold] text-[15px]">
                فرم داده های به طراحی و تصدیق نقشه نمونه
              </h1>
            </div>
            <div className="flex flex-col justify-center border-b pr-2 text-[11px]">
              <p className="space-x-1">
                <span className="font-[SamimBold]">کد سند :</span>
                <span className="font-[AvenirLTProHeavy]">F1007</span>
              </p>
              <p className="space-x-1">
                <span className="font-[SamimBold]">شماره ویرایش :</span>
                <span className="font-[AvenirLTProHeavy]">02</span>
              </p>
              <p className="space-x-1">
                <span className="font-[SamimBold]">تاریخ ویرایش :</span>
                <span className="font-[AvenirLTProHeavy]">1402/06/28</span>
              </p>
            </div>
          </div>
          {/* Date */}
          <div className="flex space-x-0.5 text-[12px]">
            <p>تاریخ :</p>
            <p className="font-[AvenirLTProMedium]">
              {toShamsi(selectedDesign?.formDate)}
            </p>
          </div>
          {/* Name-Code-Number */}
          <div className="flex items-center justify-around border-t border-b text-[12px]">
            <div className="flex">
              <p className="font-bold">نام محصول :</p>
              <p className="font-[AvenirLTProMedium]">
                {selectedDesign?.productName}
              </p>
            </div>
            <div className="flex">
              <p className="font-bold">کد محصول :</p>
              <p className="font-[AvenirLTProMedium]">
                {selectedDesign?.productCode}
              </p>
            </div>
            <div className="flex">
              <p className="font-bold">شماره فرم :</p>
              <p className="font-[AvenirLTProMedium]">
                {selectedDesign?.formNumber}
              </p>
            </div>
          </div>
          <div className="flex h-50 flex-col justify-around border-b px-1 text-[12px]">
            <p className="space-x-1">
              <span className="font-bold">
                محدودیت های ساخت با توجه به تجربیات قبلی :
              </span>
              <span>{selectedDesign?.manufacturingConstraints}</span>
            </p>
            <p className="space-x-1">
              <span className="font-bold">کاربرد محصول :</span>
              <span>{selectedDesign?.productApplication}</span>
            </p>
            <p className="space-x-1">
              <span className="font-bold">شرایط کاربردی محصول :</span>
              <span>{selectedDesign?.productApplicationConditions}</span>
            </p>
            <p className="space-x-1">
              <span className="font-bold">
                پیامدهای احتمالی شکست بنا به ماهیت محصول :
              </span>
              <span>{selectedDesign?.potentialFailureConsequences}</span>
            </p>
            <p className="space-x-1">
              <span className="font-bold">
                الزامات سازمان در خصوص بسته بندی و مدیریت پسماند :
              </span>
              <span>
                {selectedDesign?.packagingAndWasteManagementRequirements}
              </span>
            </p>
            <p className="space-x-1">
              <span className="font-bold">
                الزامات سازمانی در خصوص مدیریت مصرف انرژی :
              </span>
              <span>{selectedDesign?.energyManagementRequirements}</span>
            </p>
            <p className="space-x-1">
              <span className="font-bold">سایر موارد :</span>
              <span>{selectedDesign?.otherRequirements}</span>
            </p>
          </div>
          {/* Date & True/False */}
          <div className="border-b px-1 text-[12px]">
            <div className="flex space-x-10">
              <div className="flex items-center space-x-1 py-1">
                <p className="font-bold">
                  با توجه به کنترل های زیر نمونه قابل تولید
                </p>
                <div className="flex items-center space-x-1 font-bold">
                  <p
                    className={`flex h-3 w-5 rounded-[10px] border ${selectedDesign?.isProductionFeasible === true ? 'bg-black' : 'bg-white'}`}
                  ></p>
                  <p>می باشد</p>
                </div>

                <div className="flex items-center space-x-1 font-bold">
                  <p
                    className={`flex h-3 w-5 rounded-[10px] border ${selectedDesign?.isProductionFeasible === false ? 'bg-black' : 'bg-white'}`}
                  ></p>
                  <p>نمی باشد</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <p>تاریخ :</p>
                <p className="font-[AvenirLTProMedium]">
                  {toShamsi(selectedDesign?.sampleCheckDate)}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div>
                <div className="grid grid-cols-5 border">
                  <p className="border-l text-center font-bold">ردیف</p>
                  <p className="col-span-3 border-l text-center font-bold">
                    کنترل های انجام شده
                  </p>
                  <p className="text-center font-bold">نتیجه</p>
                </div>
              </div>
              <div>
                <div className="grid grid-cols-5 border-t border-b border-l">
                  <p className="border-l text-center font-bold">ردیف</p>
                  <p className="col-span-3 border-l text-center font-bold">
                    کنترل های انجام شده
                  </p>
                  <p className="text-center font-bold">نتیجه</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="grid grid-cols-5 border-r border-l">
                <p className="border-b border-l text-center font-[AvenirLTProMedium]">
                  1
                </p>
                <p className="col-span-3 border-b border-l text-center">
                  ابعادی
                </p>
                <p className="border-b text-center font-[AvenirLTProMedium]">
                  {selectedDesign?.sampleDimensions === true ? 'OK' : 'N.OK'}
                </p>
                <p className="border-b border-l text-center font-[AvenirLTProMedium]">
                  2
                </p>
                <p className="col-span-3 border-b border-l text-center">وزن</p>
                <p className="border-b text-center font-[AvenirLTProMedium]">
                  {selectedDesign?.sampleWeight === true ? 'OK' : 'N.OK'}
                </p>
                <p className="border-b border-l text-center font-[AvenirLTProMedium]">
                  3
                </p>
                <p className="col-span-3 border-b border-l text-center">حجم</p>
                <p className="border-b text-center font-[AvenirLTProMedium]">
                  {selectedDesign?.sampleVolume === true ? 'OK' : 'N.OK'}
                </p>
                <p className="border-b border-l text-center font-[AvenirLTProMedium]">
                  4
                </p>
                <p className="col-span-3 border-b border-l text-center">
                  درب بندی (پرینت 3 بعدی)
                </p>
                <p className="border-b text-center font-[AvenirLTProMedium]">
                  {selectedDesign?.sampleCapping3DPrint === true
                    ? 'OK'
                    : 'N.OK'}
                </p>
                <p className="border-b border-l text-center font-[AvenirLTProMedium]">
                  5
                </p>
                <p className="col-span-3 border-b border-l text-center">
                  ظاهری (پرینت 3 بعدی)
                </p>
                <p className="border-b text-center font-[AvenirLTProMedium]">
                  {selectedDesign?.sampleAppearance3DPrint === true
                    ? 'OK'
                    : 'N.OK'}
                </p>
              </div>
              <div className="grid grid-cols-5 border-b border-l">
                <p className="border-b border-l text-center font-[AvenirLTProMedium]">
                  6
                </p>
                <p className="col-span-3 border-b border-l text-center">
                  ضخامت
                </p>
                <p className="border-b text-center font-[AvenirLTProMedium]">
                  {selectedDesign?.sampleThickness === true ? 'OK' : 'N.OK'}
                </p>
                <p className="border-b border-l text-center font-[AvenirLTProMedium]">
                  7
                </p>
                <p className="col-span-3 border-b border-l text-center">
                  روش بسته بندی
                </p>
                <p className="border-b text-center font-[AvenirLTProMedium]">
                  {selectedDesign?.samplePackagingMethod === true
                    ? 'OK'
                    : 'N.OK'}
                </p>
                <p className="border-b border-l text-center font-[AvenirLTProMedium]">
                  8
                </p>
                <p className="col-span-3 border-b border-l text-center">
                  ویزگی های فیزیکی محصول
                </p>
                <p className="border-b text-center font-[AvenirLTProMedium]">
                  {selectedDesign?.samplePhysicalProperties === true
                    ? 'OK'
                    : 'N.OK'}
                </p>
                <p className="border-b border-l text-center font-[AvenirLTProMedium]">
                  9
                </p>
                <p className="col-span-3 border-b border-l text-center"></p>
                <p className="border-b text-center font-[AvenirLTProMedium]"></p>
                <p className="border-l text-center font-[AvenirLTProMedium]">
                  10
                </p>
                <p className="col-span-3 border-l text-center"></p>
                <p className="text-center font-[AvenirLTProMedium]"></p>
              </div>
            </div>
            {/* Sign */}
            <div className="grid grid-cols-3 pt-15 pb-2">
              <div className="flex items-center">
                <p>امضاء مسئول طراحی :</p>
                <p>
                  {selectedSignDesigner ? (
                    <img
                      src={`data:image/png;base64,${selectedSignDesigner}`}
                      alt="signature"
                      className="fixed right-25 bottom-66 h-20 w-25"
                    />
                  ) : canSignDesigner ? (
                    <button
                      onClick={() => handleOpenSignatureModal('designer')}
                      className="mr-3 cursor-pointer rounded-[10px] bg-linear-to-br from-cyan-400 to-black/10 p-1 text-[12px] transition-all delay-75 duration-100 ease-in-out hover:scale-110"
                    >
                      ثبت امضاء
                    </button>
                  ) : (
                    <span className="rounded-[10px] bg-red-500 p-1 text-[10px] print:hidden">
                      عدم دسترسی
                    </span>
                  )}
                </p>
              </div>
              <div className="flex items-center">
                <p>امضاء مدیر تولید :</p>
                <p>
                  {selectedSignProductionManager ? (
                    <img
                      src={`data:image/png;base64,${selectedSignProductionManager}`}
                      alt="signature"
                      className="fixed right-65 bottom-66 h-21 w-30"
                    />
                  ) : canSignProductionManager ? (
                    <button
                      onClick={() =>
                        handleOpenSignatureModal('productionManager')
                      }
                      className="mr-3 cursor-pointer rounded-[10px] bg-linear-to-br from-cyan-400 to-black/10 p-1 text-[12px] transition-all delay-75 duration-100 ease-in-out hover:scale-110"
                    >
                      ثبت امضاء
                    </button>
                  ) : (
                    <span className="rounded-[10px] bg-red-500 p-1 text-[10px] print:hidden">
                      عدم دسترسی
                    </span>
                  )}
                </p>
              </div>
              <div className="flex items-center">
                <p>امضاء مدیر کارخانه :</p>

                <p>
                  {selectedSignFactoryManager ? (
                    <img
                      src={`data:image/png;base64,${selectedSignFactoryManager}`}
                      alt="signature"
                      className="fixed bottom-66 left-1 h-21 w-30"
                    />
                  ) : canSignFactoryManager ? (
                    <button
                      onClick={() => handleOpenSignatureModal('factoryManager')}
                      className="mr-3 cursor-pointer rounded-[10px] bg-linear-to-br from-cyan-400 to-black/10 p-1 text-[12px] transition-all delay-75 duration-100 ease-in-out hover:scale-110"
                    >
                      ثبت امضاء
                    </button>
                  ) : (
                    <span className="rounded-[10px] bg-red-500 p-1 text-[10px] print:hidden">
                      عدم دسترسی
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
          <div className="flex space-x-1 px-1 text-[12px]">
            <p>شماره نقشه :</p>
            <p className="font-[AvenirLTProMedium]">
              {selectedDesign?.drawingNumber}
            </p>
          </div>
          <div className="border-t px-1 text-[12px]">
            <div className="flex items-center space-x-1 px-1">
              <p>با توجه به کنترل های زیر نقشه و نمونه در تاریخ</p>
              <p>{toShamsi(selectedDesign?.drawingReviewDate)}</p>
              <p>بررسی و مورد تایید</p>
              {selectedDesign?.drawingApproved === true ? (
                <p>می باشد</p>
              ) : (
                <p>نمی باشد</p>
              )}
            </div>
            <div className="grid grid-cols-2">
              <div>
                <div className="grid grid-cols-5 border">
                  <p className="border-l text-center font-bold">ردیف</p>
                  <p className="col-span-3 border-l text-center font-bold">
                    کنترل های انجام شده
                  </p>
                  <p className="text-center font-bold">نتیجه</p>
                </div>
              </div>
              <div>
                <div className="grid grid-cols-5 border-t border-b border-l">
                  <p className="border-l text-center font-bold">ردیف</p>
                  <p className="col-span-3 border-l text-center font-bold">
                    کنترل های انجام شده
                  </p>
                  <p className="text-center font-bold">نتیجه</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="grid grid-cols-5 border-r border-l">
                <p className="border-b border-l text-center font-[AvenirLTProMedium]">
                  1
                </p>
                <p className="col-span-3 border-b border-l text-center">
                  ابعادی
                </p>
                <p className="border-b text-center font-[AvenirLTProMedium]">
                  {selectedDesign?.drawingDimensions === true ? 'OK' : 'N.OK'}
                </p>
                <p className="border-b border-l text-center font-[AvenirLTProMedium]">
                  2
                </p>
                <p className="col-span-3 border-b border-l text-center">وزن</p>
                <p className="border-b text-center font-[AvenirLTProMedium]">
                  {selectedDesign?.drawingWeight === true ? 'OK' : 'N.OK'}
                </p>
                <p className="border-b border-l text-center font-[AvenirLTProMedium]">
                  3
                </p>
                <p className="col-span-3 border-b border-l text-center">حجم</p>
                <p className="border-b text-center font-[AvenirLTProMedium]">
                  {selectedDesign?.drawingVolume === true ? 'OK' : 'N.OK'}
                </p>
                <p className="border-b border-l text-center font-[AvenirLTProMedium]">
                  4
                </p>
                <p className="col-span-3 border-b border-l text-center">
                  تست شوک
                </p>
                <p className="border-b text-center font-[AvenirLTProMedium]">
                  {selectedDesign?.drawingShockTest === true ? 'OK' : 'N.OK'}
                </p>
                <p className="border-b border-l text-center font-[AvenirLTProMedium]">
                  5
                </p>
                <p className="col-span-3 border-b border-l text-center">
                  درب بندی (پرینت 3 بعدی)
                </p>
                <p className="border-b text-center font-[AvenirLTProMedium]">
                  {selectedDesign?.drawingCapping3DPrint === true
                    ? 'OK'
                    : 'N.OK'}
                </p>
              </div>
              <div className="grid grid-cols-5 border-b border-l">
                <p className="border-b border-l text-center font-[AvenirLTProMedium]">
                  6
                </p>
                <p className="col-span-3 border-b border-l text-center">
                  ظاهری (پرینت 3 بعدی)
                </p>
                <p className="border-b text-center font-[AvenirLTProMedium]">
                  {selectedDesign?.drawingAppearance3DPrint === true
                    ? 'OK'
                    : 'N.OK'}
                </p>
                <p className="border-b border-l text-center font-[AvenirLTProMedium]">
                  7
                </p>
                <p className="col-span-3 border-b border-l text-center">
                  ضخامت
                </p>
                <p className="border-b text-center font-[AvenirLTProMedium]">
                  {selectedDesign?.drawingThickness === true ? 'OK' : 'N.OK'}
                </p>
                <p className="border-b border-l text-center font-[AvenirLTProMedium]">
                  8
                </p>
                <p className="col-span-3 border-b border-l text-center">
                  تست فشار
                </p>
                <p className="border-b text-center font-[AvenirLTProMedium]">
                  {selectedDesign?.drawingPressureTest === true ? 'OK' : 'N.OK'}
                </p>
                <p className="border-b border-l text-center font-[AvenirLTProMedium]">
                  9
                </p>
                <p className="col-span-3 border-b border-l text-center"></p>
                <p className="border-b text-center font-[AvenirLTProMedium]"></p>
                <p className="border-l text-center font-[AvenirLTProMedium]">
                  10
                </p>
                <p className="col-span-3 border-l text-center"></p>
                <p className="text-center font-[AvenirLTProMedium]"></p>
              </div>
            </div>
          </div>
          <div className="grid h-[118px] grid-cols-3 space-x-1 text-[12px]">
            <p className="col-span-2 pr-1">
              <span>ملاحضات :</span>
              <span className="flex items-center break-all">
                {selectedDesign?.drawingNotes}
              </span>
            </p>
            <div className="mb-2 flex items-end">
              <p>امضاء مسئول طراحی :</p>
              <p>
                {selectedSignDesignerS3 ? (
                  <img
                    src={`data:image/png;base64,${selectedSignDesignerS3}`}
                    alt="signature"
                    className="fixed bottom-0 left-1 h-21 w-30"
                  />
                ) : canSignDesigner ? (
                  <button
                    onClick={() => handleOpenSignatureModal('designerS3')}
                    className="mr-3 cursor-pointer rounded-[10px] bg-linear-to-br from-cyan-400 to-black/10 p-1 text-[12px] transition-all delay-75 duration-100 ease-in-out hover:scale-110"
                  >
                    ثبت امضاء
                  </button>
                ) : (
                  <span className="rounded-[10px] bg-red-500 p-1 text-[10px] print:hidden">
                    عدم دسترسی
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* open Code */}
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

export default FormDesignData;
