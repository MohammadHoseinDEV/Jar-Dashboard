import { useState } from 'react';
import { useCreateSignature } from '../../../../hooks/Signature/Signature';

import close from '../../../../assets/images/close.png';

import { RxEyeOpen } from 'react-icons/rx';
import { VscEyeClosed } from 'react-icons/vsc';
import { BsEyeFill, BsEyeSlash } from 'react-icons/bs';

import { IoCloseSharp } from 'react-icons/io5';

function Signature({ openSignature, setOpenSignature }) {
  const [form, setFrom] = useState({
    SignatureImage: null,
    SignaturePassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const uploadImage = useCreateSignature();

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (form.SignatureImage) {
      formData.append('SignatureImage', form.SignatureImage);
    }
    formData.append('SignaturePassword', form.SignaturePassword);

    uploadImage.mutate(formData, {
      onSuccess: () => {
        setOpenSignature(false);
      },
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;

    setFrom((p) => ({
      ...p,
      SignatureImage: file,
    }));
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
        openSignature ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

      <div
        className={`relative w-[550px] transform rounded-[15px] bg-linear-to-l from-[#242b5c] to-[#1f1f4a] p-6 text-white shadow-2xl transition-all duration-300 ${
          openSignature
            ? 'translate-y-0 scale-100 opacity-100'
            : '-translate-y-10 scale-95 opacity-0'
        }`}
      >
        <div className="flex items-center justify-between pb-5">
          <h1 className="pr-1.5 pb-5 font-[SamimBold] text-[20px]">
            آپلود امضاء
          </h1>
          <span
            onClick={() => {
              setOpenSignature(false);
            }}
            className="flex size-8 cursor-pointer items-center justify-center rounded-full bg-[#343457] text-[20px] transition-all delay-75 duration-100 hover:scale-110"
          >
            <IoCloseSharp />
          </span>
        </div>

        <form onSubmit={submitHandler} className="space-y-2">
          <label>
            تصویر امضاء
            <input
              type="file"
              alt="image"
              name="SignatureImage"
              onChange={handleFileChange}
              className="m-2 w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
          </label>
          <label className="relative">
            کد امضاء
            <input
              type={showPassword ? 'text' : 'password'}
              name="SignaturePassword"
              placeholder="کد امضاء خود را وارد کنید."
              value={form.SignaturePassword}
              onChange={(e) => {
                setFrom({ ...form, [e.target.name]: e.target.value });
              }}
              className="m-2 w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-15 left-5 -translate-y-1/2 cursor-pointer text-[25px] transition hover:scale-110"
            >
              {showPassword ? <BsEyeFill /> : <BsEyeSlash />}
            </button>
          </label>

          <button
            type="submit"
            className="float-end mt-5 cursor-pointer rounded-xl bg-green-500/50 px-4 py-2 font-[Samim] hover:bg-green-500/70 disabled:opacity-50"
          >
            آپلود
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signature;
