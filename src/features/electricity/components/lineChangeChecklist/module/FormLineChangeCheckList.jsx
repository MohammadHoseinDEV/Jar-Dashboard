import React, { useEffect, useState } from 'react';
import FormLineChangeCheckListJsx from '../template/FormLineChangeCheckListJsx';
import { useGetMenu } from '../../../../../hooks/menu/menuApi';
import { findMenu } from '../../../../../utils/rbac';
import { useGetPermissionSignature } from '../../../../../hooks/user/userApi';
import { useSelector } from 'react-redux';
import { useGetProfile } from '../../../../../hooks/profile/profile';
import { useGetSignatureId } from '../../../../../hooks/Signature/Signature';
import {
  useCreateSignOperationSupervisor,
  useCreateSignShiftSupervisor,
} from '../../../Api/LineChangeCheckList/lineChangeCheckList';

function FormLineChangeCheckList({
  openForm,
  setOpenForm,
  selectedCheckList,
  setSelectedCheckList,
}) {
  const { userInfo } = useSelector((state) => state.auth);

  const [selectedShiftSupervisor, setSelectedShiftSupervisor] = useState(null);
  const [selectedOperationSupervisor, setSelectedOperationSupervisor] =
    useState(null);
  const [openCode, setOpenCode] = useState(false);
  const [password, setPassword] = useState('');
  const [signatureType, setSignatureType] = useState(null);

  const closeHandler = () => {
    setOpenForm(false);
    setSelectedCheckList(null);
  };

  const handleOpenSignatureModal = (type) => {
    setSignatureType(type);
    setOpenCode(true);
  };

  // ---------------------------------------------------------------------
  // Sign
  // دسترسی امضاء
  const { data: menu } = useGetMenu();
  const productionWeight = findMenu(menu?.menus ?? [], 'line-change-checklist');
  const menuId = productionWeight?.id;

  const { data: permission } = useGetPermissionSignature(userInfo?.userId);
  const canSign = permission?.data?.some(
    (p) => p.menuId === menuId && p.canSignature === true
  );
  // ---------------------------------------------------------------------

  const { data: profile } = useGetProfile();

  const isShiftSupervisor = profile?.data?.companyRoles?.some(
    (p) => p.roleId === '93f39df4-1bf9-425c-8bbf-ed3db0567b48'
  );
  const canSignShiftSupervisor = canSign && isShiftSupervisor;

  const isOperationsSupervisor = profile?.data?.companyRoles?.some(
    (p) => p.roleId === '5e6bcab8-bb18-482f-9805-477ac64fa209'
  );
  const canSignOperationsSupervisor = canSign && isOperationsSupervisor;

  // ---------------------------------------------------------------------

  const { data: signShiftSupervisor } = useGetSignatureId(
    selectedCheckList?.shiftSupervisorSignedByUserId
  );
  const { data: signOperationsSupervisor } = useGetSignatureId(
    selectedCheckList?.operationsSupervisorSignedByUserId
  );

  // ---------------------------------------------------------------------
  useEffect(() => {
    if (
      selectedCheckList?.isShiftSupervisorSigned === true &&
      signShiftSupervisor?.data?.signatureImageBase64
    ) {
      setSelectedShiftSupervisor(
        signShiftSupervisor?.data?.signatureImageBase64
      );
    } else {
      setSelectedShiftSupervisor(null);
    }

    if (
      selectedCheckList?.isOperationsSupervisorSigned === true &&
      signOperationsSupervisor?.data?.signatureImageBase64
    ) {
      setSelectedOperationSupervisor(
        signOperationsSupervisor?.data?.signatureImageBase64
      );
    } else {
      setSelectedOperationSupervisor(null);
    }
  }, [
    signShiftSupervisor,
    signOperationsSupervisor,
    selectedCheckList?.isShiftSupervisorSigned,
    selectedCheckList?.isOperationsSupervisorSigned,
  ]);
  // ---------------------------------------------------------------------

  const createSignShiftSupervisor = useCreateSignShiftSupervisor();
  const createSignOperationSupervisor = useCreateSignOperationSupervisor();

  const handleSubmitSign = (e) => {
    e.preventDefault();

    if (signatureType === 'shiftSupervisor') {
      createSignShiftSupervisor.mutate(
        {
          id: selectedCheckList?.id,
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

    if (signatureType === 'operationSupervisor') {
      createSignOperationSupervisor.mutate(
        {
          id: selectedCheckList?.id,
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
        className={`relative transform bg-white p-3 text-white shadow-2xl transition-all duration-300 max-md:p-2 max-sm:rotate-90 print:scale-85! print:p-0 ${
          openForm
            ? '5xl:scale-138 translate-y-0 scale-95 opacity-100 max-2xl:scale-78 max-xl:scale-75 max-md:scale-60 print:shadow-none '
            : '-translate-y-10 scale-0 opacity-0'
        }`}
      >
        <div
          className="border bg-white text-black"
          style={{ width: '297mm', minHeight: '210mm' }}
        >
          <FormLineChangeCheckListJsx
            selectedCheckList={selectedCheckList}
            handleSubmitSign={handleSubmitSign}
            openCode={openCode}
            setOpenCode={setOpenCode}
            setPassword={setPassword}
            handleOpenSignatureModal={handleOpenSignatureModal}
            selectedShiftSupervisor={selectedShiftSupervisor}
            canSignShiftSupervisor={canSignShiftSupervisor}
            selectedOperationSupervisor={selectedOperationSupervisor}
            canSignOperationsSupervisor={canSignOperationsSupervisor}
          />
        </div>
      </div>
    </div>
  );
}

export default FormLineChangeCheckList;
