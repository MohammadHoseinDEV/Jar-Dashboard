import { useState } from 'react';
import { useDeleteSignature } from '../../../../hooks/Signature/Signature';
import { toast } from 'react-toastify';
import { IoCloseSharp } from 'react-icons/io5';

function DeleteSignature({ openDelete, setOpenDelete, profile }) {
  const [code, setCode] = useState('');

  const user = profile?.data?.id;

  const data = {
    userId: user,
    signaturePassword: code,
  };

  const deleteImage = useDeleteSignature();

  const removeHandler = () => {
    if (!user) return toast.error('شناسه کاربر معتبر نیست');

    if (!code) return toast.error('کد امضاء را وارد کنید');
    deleteImage.mutate(data, {
      onSuccess: () => {
        setOpenDelete(false);
      },
    });
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
        openDelete ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
      <div
        className={`relative w-[450px] transform rounded-[15px] bg-linear-to-l from-[#242b5c] to-[#1f1f4a] p-6 text-white shadow-2xl transition-all duration-300 ${
          openDelete
            ? 'translate-y-0 scale-100 opacity-100'
            : '-translate-y-10 scale-95 opacity-0'
        }`}
      >
        <div className="flex items-center justify-between">
          <h1 className="pr-1.5 font-[SamimBold] text-[20px]">آپلود امضاء</h1>
          <span
            onClick={() => {
              setOpenDelete(false);
            }}
            className="flex size-8 cursor-pointer items-center justify-center rounded-full bg-[#343457] text-[20px] transition-all delay-75 duration-100 hover:scale-110"
          >
            <IoCloseSharp />
          </span>
        </div>

        <p className="mt-4 pb-3 font-[Samim] text-white/80">
          آیا از حذف امضاء خود مطمئن هستید؟
        </p>

        <label>
          کد امضاء
          <input
            type="text"
            placeholder="کد امضاء خود را وارد کنید."
            name="code"
            onChange={(e) => setCode(e.target.value)}
            className="m-2 w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
          />
        </label>

        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={() => {
              setOpenDelete(false);
            }}
            className="cursor-pointer rounded-xl bg-white/10 px-4 py-2 font-[Samim] transition-all delay-75 duration-150 ease-in-out hover:scale-110 hover:bg-white/15 active:scale-95"
          >
            انصراف
          </button>
          <button
            onClick={removeHandler}
            className="cursor-pointer rounded-xl bg-red-500 px-4 py-2 font-[Samim] transition-all delay-75 duration-150 ease-in-out hover:scale-110 hover:bg-red-600 active:scale-95"
          >
            حذف
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteSignature;
