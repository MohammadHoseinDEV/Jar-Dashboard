import React, { lazy, useEffect, useState } from 'react';

import close from '../../../../../assets/images/close.png';
import {
  useCreateSignDesigner,
  useCreatSignFactoryManager,
  useCreateSignDesignerS2,
} from '../../../Api/moldDarwing';
import { useSelector } from 'react-redux';
import { useGetMenu } from '../../../../../hooks/menu/menuApi';
import { findMenu } from '../../../../../utils/rbac';
import { useGetPermissionSignature } from '../../../../../hooks/user/userApi';
import { useGetProfile } from '../../../../../hooks/profile/profile';
import { useGetSignatureId } from '../../../../../hooks/Signature/Signature';

const FormMoldDarwingJsx = lazy(() => import('../template/FormMoldDarwingJsx'));

function FormMoldDarwing({
  openForm,
  setOpenForm,
  selectedMoldDarwing,
  setSelectedMoldDarwing,
}) {
  const { userInfo } = useSelector((state) => state.auth);

  const [selectedSignDesigner, setSelectedSignDesigner] = useState(null);
  const [selectedSignFactoryManager, setSelectedFactoryManager] =
    useState(null);
  const [selectedSignDesignerS2, setSelectedSignDesignS2] = useState(null);
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
  const designMenu = findMenu(
    menu?.menus ?? [],
    'mold-drawing-verification-form'
  );
  const menuId = designMenu?.id;

  const { data: permission } = useGetPermissionSignature(userInfo?.userId);
  const canSign = permission?.data?.some(
    (p) => p.menuId === menuId && p.canSignature === true
  );
  // ---------------------------------------------------------------------

  // ---------------------------------------------------------------------
  const { data: profile } = useGetProfile();
  const isDesigner = profile?.data?.companyRoles?.some(
    (p) =>
      p.roleId === '7a0bcb84-1e92-4184-91ee-cda1b47a890a' ||
      p.roleId === 'fa1367da-ab36-44ef-b018-8e9911f1279e' ||
      p.roleId === 'e8d691c5-827c-4c65-9d1a-14def8620ade'
  );
  const canSignDesigner = canSign && isDesigner;

  const isSignFactoryManager = profile?.data?.companyRoles?.some(
    (p) =>
      p.roleId === '8132dd4b-2e30-458d-a9f4-7e3bb4c344db' ||
      p.roleId === 'fa1367da-ab36-44ef-b018-8e9911f1279e' ||
      p.roleId === 'e8d691c5-827c-4c65-9d1a-14def8620ade'
  );
  const canSignFactoryManager = canSign && isSignFactoryManager;

  const isSignDesignerS2 = profile?.data?.companyRoles?.some(
    (p) =>
      p.roleId === '7a0bcb84-1e92-4184-91ee-cda1b47a890a' ||
      p.roleId === 'fa1367da-ab36-44ef-b018-8e9911f1279e' ||
      p.roleId === 'e8d691c5-827c-4c65-9d1a-14def8620ade'
  );
  const canSignDesignerS2 = canSign && isSignDesignerS2;

  // ---------------------------------------------------------------------

  // گرفتن عکس امضاء کاربران برای نمایش با ID کاربران
  const { data: signDesigner } = useGetSignatureId(
    selectedMoldDarwing?.designerSignedByUserId
  );

  const { data: signFactoryManager } = useGetSignatureId(
    selectedMoldDarwing?.factoryManagerSignedByUserId
  );
  const { data: signDesignS2 } = useGetSignatureId(
    selectedMoldDarwing?.designerSection2SignedByUserId
  );
  // ---------------------------------------------------------------------

  useEffect(() => {
    if (
      selectedMoldDarwing?.isDesignerSigned === true &&
      signDesigner?.data?.signatureImageBase64
    ) {
      setSelectedSignDesigner(signDesigner?.data?.signatureImageBase64);
    } else {
      setSelectedSignDesigner(null);
    }

    if (
      selectedMoldDarwing?.isFactoryManagerSigned === true &&
      signFactoryManager?.data?.signatureImageBase64
    ) {
      setSelectedFactoryManager(signFactoryManager?.data?.signatureImageBase64);
    } else {
      setSelectedFactoryManager(null);
    }
    if (
      selectedMoldDarwing?.isDesignerSection2Signed === true &&
      signDesignS2?.data?.signatureImageBase64
    ) {
      setSelectedSignDesignS2(signDesignS2?.data?.signatureImageBase64);
    } else {
      setSelectedSignDesignS2(null);
    }
  }, [
    signDesigner,
    signFactoryManager,
    signDesignS2,
    selectedMoldDarwing?.isDesignerSigned,
    selectedMoldDarwing?.isFactoryManagerSigned,
    selectedMoldDarwing?.isDesignerSection2Signed,
  ]);
  // ---------------------------------------------------------------------

  const createSignDesigner = useCreateSignDesigner();
  const createSignFactoryManager = useCreatSignFactoryManager();
  const createSignDesignerS2 = useCreateSignDesignerS2();

  const handleSubmitSign = (e) => {
    e.preventDefault();

    if (signatureType === 'designer') {
      createSignDesigner.mutate(
        {
          id: selectedMoldDarwing?.id,
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
          id: selectedMoldDarwing?.id,
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
    if (signatureType === 'designerS2') {
      createSignDesignerS2.mutate(
        {
          id: selectedMoldDarwing?.id,
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
        <FormMoldDarwingJsx
          selectedMoldDarwing={selectedMoldDarwing}
          selectedSignDesigner={selectedSignDesigner}
          canSignDesigner={canSignDesigner}
          selectedSignFactoryManager={selectedSignFactoryManager}
          canSignFactoryManager={canSignFactoryManager}
          selectedSignDesignerS2={selectedSignDesignerS2}
          canSignDesignerS2={canSignDesignerS2}
          openCode={openCode}
          setOpenCode={setOpenCode}
          handleSubmitSign={handleSubmitSign}
          setPassword={setPassword}
          handleOpenSignatureModal={handleOpenSignatureModal}
        />
      </div>
    </div>
  );
}

export default FormMoldDarwing;
