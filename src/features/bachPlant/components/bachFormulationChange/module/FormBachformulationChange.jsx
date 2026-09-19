import React, { useEffect, useState } from 'react';
import FormBachFormulationChangeJsx from '../template/FormBachFormulationChangeJsx';
import { useSelector } from 'react-redux';
import { useGetMenu } from '../../../../../hooks/menu/menuApi';
import { findMenu } from '../../../../../utils/rbac';
import { useGetPermissionSignature } from '../../../../../hooks/user/userApi';
import { useGetProfile } from '../../../../../hooks/profile/profile';
import { useGetSignatureId } from '../../../../../hooks/Signature/Signature';
import {
  createSignFurnaceSupervisor,
  usecreateSignManagment,
  useCreateSignProductionEngineering,
  useCreateSignProductionManager,
} from '../../../Api/bachFormulationChange';

function FormBachformulationChange({
  openForm,
  setOpenForm,
  selectedFormulation,
  setSelectedFormulation,
}) {
  const { userInfo } = useSelector((state) => state.auth);

  const [selectedSignFurnace, setSelectedSignFurnace] = useState(null);
  const [selectedSignProductionManager, setSelectedSignProductionManager] =
    useState(null);
  const [selectedProductionEngineerin, setSelectedProductionEngineerin] =
    useState(null);
  const [selectedManagment, setSelectedManagment] = useState(null);
  const [openCode, setOpenCode] = useState(false);
  const [password, setPassword] = useState('');
  const [signatureType, setSignatureType] = useState(null);

  const handleOpenSignatureModal = (type) => {
    setSignatureType(type);
    setOpenCode(true);
  };

  const closeHandler = () => {
    setOpenForm(false);
    setSelectedFormulation(null);
  };

  // ---------------------------------------------------------------------
  // Sign
  // دسترسی امضاء
  const { data: menu } = useGetMenu();
  const productionWeight = findMenu(
    menu?.menus ?? [],
    'batch-formulation-change-report'
  );
  const menuId = productionWeight?.id;

  const { data: permission } = useGetPermissionSignature(userInfo?.userId);
  const canSign = permission?.data?.some(
    (p) => p.menuId === menuId && p.canSignature === true
  );

  // ---------------------------------------------------------------------

  const { data: profile } = useGetProfile();
  const isFurnace = profile?.data?.companyRoles?.some(
    (p) => p.roleId === 'e4a2f36a-a4da-42b0-b0c0-284bddb423ac'
  );
  const canSignFurnace = canSign && isFurnace;

  const isProductionManager = profile?.data?.companyRoles?.some(
    (p) => p.roleId === 'adbfa0b4-1f48-48a3-9c9e-da7caab1dc97'
  );
  const canSignProductionManager = canSign && isProductionManager;

  const isProductionEnginnering = profile?.data?.companyRoles?.some(
    (p) => p.roleId === 'c508d303-ac3c-45ba-b755-702dfe9a5ff6'
  );
  const canSignProductionEnginnering = canSign && isProductionEnginnering;

  const isManagment = profile?.data?.companyRoles?.some(
    (p) =>
      p.roleId === 'be56c065-9855-44d0-9f4d-929ef1d83b4f' ||
      p.roleId === 'cab6775e-e77b-4c8a-ba93-e169a7ecc4fa'
  );
  const canSignManagment = canSign && isManagment;

  // ---------------------------------------------------------------------

  const { data: signFur } = useGetSignatureId(
    selectedFormulation?.furnaceSupervisorSignedByUserId
  );

  const { data: signProductionManager } = useGetSignatureId(
    selectedFormulation?.productionManagerSignedByUserId
  );

  const { data: signProductionEnginnering } = useGetSignatureId(
    selectedFormulation?.productionEngineeringSignedByUserId
  );

  const { data: signManagment } = useGetSignatureId(
    selectedFormulation?.managementSignedByUserId
  );

  // ---------------------------------------------------------------------
  useEffect(() => {
    if (
      selectedFormulation?.isFurnaceSupervisorSigned === true &&
      signFur?.data?.signatureImageBase64
    ) {
      setSelectedSignFurnace(signFur?.data?.signatureImageBase64);
    } else {
      setSelectedSignFurnace(null);
    }

    if (
      selectedFormulation?.isProductionManagerSigned === true &&
      signProductionManager?.data?.signatureImageBase64
    ) {
      setSelectedSignProductionManager(
        signProductionManager?.data?.signatureImageBase64
      );
    } else {
      setSelectedSignProductionManager(null);
    }

    if (
      selectedFormulation?.isProductionEngineeringSigned === true &&
      signProductionManager?.data?.signatureImageBase64
    ) {
      setSelectedProductionEngineerin(
        signProductionEnginnering?.data?.signatureImageBase64
      );
    } else {
      setSelectedProductionEngineerin(null);
    }

    if (
      selectedFormulation?.isManagementSigned === true &&
      signManagment?.data?.signatureImageBase64
    ) {
      setSelectedManagment(signManagment?.data?.signatureImageBase64);
    } else {
      setSelectedManagment(null);
    }
  }, [
    signFur,
    signProductionManager,
    signProductionEnginnering,
    signManagment,
    selectedFormulation?.isFurnaceSupervisorSigned,
    selectedFormulation?.isProductionManagerSigned,
    selectedFormulation?.isProductionEngineeringSigned,
    selectedFormulation?.isManagementSigned,
  ]);
  // ---------------------------------------------------------------------

  const createSignFurnace = createSignFurnaceSupervisor();
  const createSignProductionManager = useCreateSignProductionManager();
  const createSignProductionEnginnering = useCreateSignProductionEngineering();
  const createSignManagment = usecreateSignManagment();

  const handleSubmitSign = (e) => {
    e.preventDefault();

    if (signatureType === 'furnace') {
      createSignFurnace.mutate(
        {
          id: selectedFormulation?.id,
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
          id: selectedFormulation?.id,
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

    if (signatureType === 'productionEngineerin') {
      createSignProductionEnginnering.mutate(
        {
          id: selectedFormulation?.id,
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

    if (signatureType === 'managment') {
      createSignManagment.mutate(
        {
          id: selectedFormulation?.id,
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
        className={`relative transform bg-white p-2 text-white shadow-2xl transition-all duration-300 max-md:p-2 print:scale-85! print:p-0 ${
          openForm
            ? '5xl:scale-150 max-3xl:scale-88 translate-y-0 scale-110 opacity-100 max-2xl:scale-78 max-xl:scale-75 max-md:scale-60 print:shadow-none '
            : '-translate-y-10 scale-0 opacity-0'
        }`}
      >
        <div
          className="border bg-white text-black"
          style={{ width: '148mm', minHeight: '210mm' }}
        >
          <FormBachFormulationChangeJsx
            selectedFormulation={selectedFormulation}
            handleSubmitSign={handleSubmitSign}
            openCode={openCode}
            setOpenCode={setOpenCode}
            setPassword={setPassword}
            handleOpenSignatureModal={handleOpenSignatureModal}
            selectedSignFurnace={selectedSignFurnace}
            canSignFurnace={canSignFurnace}
            selectedSignProductionManager={selectedSignProductionManager}
            canSignProductionManager={canSignProductionManager}
            selectedProductionEngineerin={selectedProductionEngineerin}
            canSignProductionEnginnering={canSignProductionEnginnering}
            selectedManagment={selectedManagment}
            canSignManagment={canSignManagment}
          />
        </div>
      </div>
    </div>
  );
}

export default FormBachformulationChange;
