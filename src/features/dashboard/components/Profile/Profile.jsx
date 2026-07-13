import { lazy, useEffect, useState } from 'react';

import { useGetProfile } from '../../../../hooks/profile/profile';
import { useGetSignature } from '../../../../hooks/Signature/Signature';

import { IoCloseSharp } from 'react-icons/io5';

const Signature = lazy(() => import('../Signature/Signature'));
const DeleteSignature = lazy(() => import('../Signature/DeleteSignature'));
const ShowSignature = lazy(() => import('../Signature/ShowSignature'));
const PersonnelInfo = lazy(() => import('./modules/PersonnelInfo'));

function Profile({ openProfile, setOpenProfile }) {
  const [openSignature, setOpenSignature] = useState(false);
  const [userId, setUserId] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  const [signatureSrc, setSignatureSrc] = useState(null);

  const { data: profile, isLoading, isError } = useGetProfile();
  const { data: image } = useGetSignature();

  const closeHandler = () => {
    setOpenProfile(false);
  };

  useEffect(() => {
    if (image?.data?.signatureImageBase64) {
      const cleaned = image?.data?.signatureImageBase64.replace(/\s+/g, '');
      setSignatureSrc(`data:image/png;base64,${cleaned}`);
    } else {
      setSignatureSrc(null);
    }
  }, [image]);

  return (
    <div
      className={`fixed inset-0 z-50 flex h-screen items-center justify-center p-4 transition-opacity duration-300 ${
        openProfile
          ? 'pointer-events-auto opacity-100 '
          : 'pointer-events-none opacity-0'
      }`}
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        onClick={closeHandler}
      />

      <div
        className={`relative flex max-h-[90vh] w-[1000px] max-w-[95vw] transform flex-col rounded-[15px] bg-linear-to-l from-[#242b5c] to-[#1f1f4a] p-6 text-white shadow-2xl transition-all duration-300 max-2xl:scale-95 max-md:h-180 max-md:overflow-auto ${
          openProfile
            ? ' translate-y-0 scale-100 opacity-100'
            : '-translate-y-10 scale-0 opacity-0'
        }`}
      >
        <div className="flex items-center justify-between">
          <h1 className="pr-1.5 font-[SamimBold] text-[22px]">پروفایل</h1>
          <p
            onClick={closeHandler}
            className="flex size-8 cursor-pointer items-center justify-center rounded-full bg-[#343457] text-[20px] transition-all delay-75 duration-100 hover:scale-110"
          >
            <span>
              <IoCloseSharp />
            </span>
          </p>
        </div>
        <PersonnelInfo
          profile={profile}
          signatureSrc={signatureSrc}
          setOpenSignature={setOpenSignature}
          setUserId={setUserId}
          setOpenDelete={setOpenDelete}
        />
        <Signature
          openSignature={openSignature}
          setOpenSignature={setOpenSignature}
        />
        <DeleteSignature
          openDelete={openDelete}
          setOpenDelete={setOpenDelete}
          profile={profile}
        />
      </div>
    </div>
  );
}

export default Profile;
