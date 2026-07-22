import React, { useEffect, useState } from 'react';
import FormMoldFieldValidationJsx from '../template/FormMoldFieldValidationJsx';
import { useSelector } from 'react-redux';
import { useGetMenu } from '../../../../../hooks/menu/menuApi';
import { findMenu } from '../../../../../utils/rbac';
import { useGetPermissionSignature } from '../../../../../hooks/user/userApi';
import { useGetProfile } from '../../../../../hooks/profile/profile';
import { useGetSignatureId } from '../../../../../hooks/Signature/Signature';
import {
  useCreateSignDesigner,
  useCreateSignProductionManager,
} from '../../../Api/moldFieldValidation';

function FormMoldFieldValidation({
  openForm,
  setOpenForm,
  selectedMold,
  setSelectedMold,
}) {
  const { userInfo } = useSelector((state) => state.auth);

  const [selectedSignDesigner, setSelectedSignDesigner] = useState(null);
  const [selectedSignProductionManager, setSelectedSignProductionManager] =
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
    setSelectedMold(null);
  };

  // ---------------------------------------------------------------------
  // Sign
  // دسترسی امضاء
  const { data: menu } = useGetMenu();
  const designMenu = findMenu(menu?.menus ?? [], 'mold-field-validation-form');
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
      p.roleId === 'fa1367da-ab36-44ef-b018-8e9911f1279e' ||
      p.roleId === 'e8d691c5-827c-4c65-9d1a-14def8620ade'
  );
  const canSignDesigner = canSign && isDesigner;

  const isProductionManager = profile?.data?.companyRoles?.some(
    (p) =>
      p.roleId === 'adbfa0b4-1f48-48a3-9c9e-da7caab1dc97' ||
      p.roleId === 'e8d691c5-827c-4c65-9d1a-14def8620ade'
  );
  const canSignProductionManager = canSign && isProductionManager;
  // ---------------------------------------------------------------------
  // گرفتن عکس امضاء کاربران برای نمایش با ID کاربران
  const { data: signDesigner } = useGetSignatureId(
    selectedMold?.designerSignedByUserId
  );
  const { data: signProductionManager } = useGetSignatureId(
    selectedMold?.productionManagerSignedByUserId
  );
  // ---------------------------------------------------------------------
  useEffect(() => {
    if (
      selectedMold?.isDesignerSigned === true &&
      signDesigner?.data?.signatureImageBase64
    ) {
      setSelectedSignDesigner(signDesigner?.data?.signatureImageBase64);
    } else {
      setSelectedSignDesigner(null);
    }

    if (
      selectedMold?.isProductionManagerSigned === true &&
      signProductionManager?.data?.signatureImageBase64
    ) {
      setSelectedSignProductionManager(
        signProductionManager?.data?.signatureImageBase64
      );
    } else {
      setSelectedSignProductionManager(null);
    }
  }, [
    signDesigner,
    signProductionManager,
    selectedMold?.isDesignerSigned,
    selectedMold?.isProductionManagerSigned,
  ]);
  // ---------------------------------------------------------------------

  const createSignProductionManager = useCreateSignProductionManager();
  const createSignDesigner = useCreateSignDesigner();

  const handleSubmitSign = (e) => {
    e.preventDefault();

    if (signatureType === 'designer') {
      createSignDesigner.mutate(
        {
          id: selectedMold?.id,
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
          id: selectedMold?.id,
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
            ? '5xl:scale-138 translate-y-0 scale-112 opacity-100 max-2xl:scale-78 max-xl:scale-75 max-md:scale-60 print:shadow-none '
            : '-translate-y-10 scale-0 opacity-0'
        }`}
      >
        <FormMoldFieldValidationJsx
          selectedMold={selectedMold}
          openCode={openCode}
          setOpenCode={setOpenCode}
          password={password}
          setPassword={setPassword}
          signatureType={signatureType}
          setSignatureType={setSignatureType}
          handleOpenSignatureModal={handleOpenSignatureModal}
          handleSubmitSign={handleSubmitSign}
          selectedSignDesigner={selectedSignDesigner}
          canSignDesigner={canSignDesigner}
          selectedSignProductionManager={selectedSignProductionManager}
          canSignProductionManager={canSignProductionManager}
        />
      </div>
    </div>
  );
}

export default FormMoldFieldValidation;
