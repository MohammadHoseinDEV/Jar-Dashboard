import React, { useEffect, useState } from 'react';
import CreateDesignWorkRequestJsx from '../template/CreateDesignWorkRequestJsx';
import { useGetProfile } from '../../../../../hooks/profile/profile';
import { toast } from 'react-toastify';
import { useCreateDesignWorkRequest } from '../../../Api/designWorkRequest';

const initialState = {
  requestingUnit: '',
  requestDate: '',
  requestTime: '',
  requestTime2: '',
  requestDescription: '',
  hasAttachment: true,
  priority: 3,
  managerNotes: '',
  deliveryDate: '',
  deliveryTime: '',
  deliveryNotes: '',
};

function CreateDesignWorkRequest({ openCreateModal, setOpenCreateModal }) {
  const [form, setForm] = useState(initialState);

  const closeHandler = () => {
    setOpenCreateModal(false);
    setForm(initialState);
  };
  const { data: profile, isLoading: profileLoading } = useGetProfile();
  const createReport = useCreateDesignWorkRequest();

  const submitHandler = (e) => {
    e.preventDefault();

    if (profileLoading || !profile?.data) {
      toast.warning('اطلاعات پروفایل هنوز بارگذاری نشده، لطفاً صبر کنید.');
      return;
    }

    const payload = {
      ...form,
      requestingUnit: profile?.data?.units[0]?.unitName || '',
    };

    createReport.mutate(payload, {
      onSuccess: () => {
        setOpenCreateModal(false);
        setForm(initialState);
      },
    });
  };
  return (
    <div
      className={`fixed inset-0 z-50 flex h-screen items-center justify-center overflow-auto p-4 transition-opacity duration-300 ${
        openCreateModal
          ? 'pointer-events-auto opacity-100 '
          : 'pointer-events-none opacity-0'
      }`}
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        onClick={closeHandler}
      />
      <div
        className={`relative flex max-h-[90vh] max-w-[80vw] transform flex-col overflow-hidden rounded-[15px] bg-linear-to-bl from-black to-gray-600 p-6 text-white shadow-2xl transition-all duration-300 max-2xl:scale-95 max-md:h-160 max-md:overflow-auto ${
          openCreateModal
            ? ' translate-y-0 scale-100 opacity-100'
            : '-translate-y-10 scale-0 opacity-0'
        }`}
      >
        <CreateDesignWorkRequestJsx
          closeHandler={closeHandler}
          submitHandler={submitHandler}
          form={form}
          setForm={setForm}
          profile={profile}
        />
      </div>
    </div>
  );
}

export default CreateDesignWorkRequest;
