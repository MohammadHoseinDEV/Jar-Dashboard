import React, { useEffect, useState } from 'react';
import FormProductionWeightStandardJsx from '../template/FormProductionWeightStandardJsx';
import { useSelector } from 'react-redux';
import { useGetMenu } from '../../../../../hooks/menu/menuApi';
import { findMenu } from '../../../../../utils/rbac';
import { useGetPermissionSignature } from '../../../../../hooks/user/userApi';
import { useGetProfile } from '../../../../../hooks/profile/profile';
import { useGetSignatureId } from '../../../../../hooks/Signature/Signature';
import {
  useCreateSignDesigner,
  useCreateSignFactoryManager,
  useCreateSignProductionManager,
  useCreateSignProductionPlanning,
} from '../../../Api/productWeightStandardForm';

function FormProductionWeightStandard({
  openForm,
  setOpenForm,
  selectedProductWeigth,
  setSelectedProductWeigth,
}) {
  console.log(selectedProductWeigth);
  const { userInfo } = useSelector((state) => state.auth);

  const [selectedSignProductionManager, setSelectedSignProductionManager] =
    useState(null);
  const [selectedSignProductionPlanning, setSelectedSignProductionPlanning] =
    useState(null);
  const [selectedSignDesigner, setSelectedSignDesigner] = useState(null);
  const [selectedSignFactoryManager, setSelectedFactoryManager] =
    useState(null);
  const [openCode, setOpenCode] = useState(false);
  const [password, setPassword] = useState('');
  const [signatureType, setSignatureType] = useState(null);

  const handleOpenSignatureModal = (type) => {
    setSignatureType(type);
    setOpenCode(true);
  };

  const closeHandler = () => {
    setOpenForm(false);
    setSelectedProductWeigth(null);
  };

  // ---------------------------------------------------------------------
  // Sign
  // دسترسی امضاء
  const { data: menu } = useGetMenu();
  const productionWeight = findMenu(
    menu?.menus ?? [],
    'product-weight-standard-form'
  );
  const menuId = productionWeight?.id;

  const { data: permission } = useGetPermissionSignature(userInfo?.userId);
  const canSign = permission?.data?.some(
    (p) => p.menuId === menuId && p.canSignature === true
  );
  // ---------------------------------------------------------------------

  const { data: profile } = useGetProfile();
  const isProductionPlanning = profile?.data?.companyRoles?.some(
    (p) => p.roleId === 'e858a3f2-4bce-4942-b7c3-cb1b550c607b'
  );
  const canSignProductionPlanning = canSign && isProductionPlanning;

  const isProductionManager = profile?.data?.companyRoles?.some(
    (p) => p.roleId === 'adbfa0b4-1f48-48a3-9c9e-da7caab1dc97'
  );
  const canSignProductionManager = canSign && isProductionManager;

  const isDesigner = profile?.data?.companyRoles?.some(
    (p) =>
      p.roleId === '7a0bcb84-1e92-4184-91ee-cda1b47a890a' ||
      p.roleId === 'fa1367da-ab36-44ef-b018-8e9911f1279e'
  );
  const canSignDesigner = canSign && isDesigner;

  const isSignFactoryManager = profile?.data?.companyRoles?.some(
    (p) =>
      p.roleId === '8132dd4b-2e30-458d-a9f4-7e3bb4c344db' ||
      p.roleId === 'fa1367da-ab36-44ef-b018-8e9911f1279e' ||
      p.roleId === 'e8d691c5-827c-4c65-9d1a-14def8620ade'
  );
  const canSignFactoryManager = canSign && isSignFactoryManager;

  // ---------------------------------------------------------------------

  // گرفتن عکس امضاء کاربران برای نمایش با ID کاربران

  const { data: signProductionManager } = useGetSignatureId(
    selectedProductWeigth?.productionSupervisorSignedByUserId
  );

  const { data: signProductionPlanning } = useGetSignatureId(
    selectedProductWeigth?.productionPlannerSignedByUserId
  );

  const { data: signDesigner } = useGetSignatureId(
    selectedProductWeigth?.designerSignedByUserId
  );

  const { data: signFactoryManager } = useGetSignatureId(
    selectedProductWeigth?.factoryManagerSignedByUserId
  );
  // ---------------------------------------------------------------------
  useEffect(() => {
    if (
      selectedProductWeigth?.isProductionSupervisorSigned === true &&
      signProductionManager?.data?.signatureImageBase64
    ) {
      setSelectedSignProductionManager(
        signProductionManager?.data?.signatureImageBase64
      );
    } else {
      setSelectedSignProductionManager(null);
    }

    if (
      selectedProductWeigth?.isProductionPlannerSigned === true &&
      signProductionPlanning?.data?.signatureImageBase64
    ) {
      setSelectedSignProductionPlanning(
        signProductionPlanning?.data?.signatureImageBase64
      );
    } else {
      setSelectedSignProductionPlanning(null);
    }

    if (
      selectedProductWeigth?.isDesignerSigned === true &&
      signDesigner?.data?.signatureImageBase64
    ) {
      setSelectedSignDesigner(signDesigner?.data?.signatureImageBase64);
    } else {
      setSelectedSignDesigner(null);
    }

    if (
      selectedProductWeigth?.isFactoryManagerSigned === true &&
      signFactoryManager?.data?.signatureImageBase64
    ) {
      setSelectedFactoryManager(signFactoryManager?.data?.signatureImageBase64);
    } else {
      setSelectedFactoryManager(null);
    }
  }, [
    signProductionManager,
    signProductionPlanning,
    signDesigner,
    signFactoryManager,
    selectedProductWeigth?.isProductionManagerSigned,
    selectedProductWeigth?.isProductionPlannerSigned,
    selectedProductWeigth?.isDesignerSigned,
    selectedProductWeigth?.isFactoryManagerSigned,
  ]);
  // ---------------------------------------------------------------------

  const createSignProductionManager = useCreateSignProductionManager();
  const createSignProductionPlanning = useCreateSignProductionPlanning();
  const createSignDesigner = useCreateSignDesigner();
  const createSignFactoryManager = useCreateSignFactoryManager();

  const handleSubmitSign = (e) => {
    e.preventDefault();

    if (signatureType === 'productionManager') {
      createSignProductionManager.mutate(
        {
          id: selectedProductWeigth?.id,
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

    if (signatureType === 'productionPlanning') {
      createSignProductionPlanning.mutate(
        {
          id: selectedProductWeigth?.id,
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

    if (signatureType === 'designer') {
      createSignDesigner.mutate(
        {
          id: selectedProductWeigth?.id,
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
          id: selectedProductWeigth?.id,
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
        className={`relative transform bg-white p-3 text-white shadow-2xl transition-all duration-300 max-2xl:pb-0 print:scale-85! print:p-0 ${
          openForm
            ? '5xl:scale-138 translate-y-0 scale-112 opacity-100 max-2xl:scale-78 max-xl:scale-75 max-md:scale-65 max-md:scale-y-90 print:shadow-none '
            : '-translate-y-10 scale-0 opacity-0'
        }`}
      >
        <div
          className="border bg-white text-black"
          style={{ width: '210mm', minHeight: '148mm' }}
        >
          <FormProductionWeightStandardJsx
            selectedProductWeigth={selectedProductWeigth}
            handleSubmitSign={handleSubmitSign}
            openCode={openCode}
            setOpenCode={setOpenCode}
            setPassword={setPassword}
            handleOpenSignatureModal={handleOpenSignatureModal}
            selectedSignProductionManager={selectedSignProductionManager}
            canSignProductionManager={canSignProductionManager}
            selectedSignProductionPlanning={selectedSignProductionPlanning}
            canSignProductionPlanning={canSignProductionPlanning}
            selectedSignDesigner={selectedSignDesigner}
            canSignDesigner={canSignDesigner}
            selectedSignFactoryManager={selectedSignFactoryManager}
            canSignFactoryManager={canSignFactoryManager}
          />
        </div>
      </div>
    </div>
  );
}

export default FormProductionWeightStandard;
