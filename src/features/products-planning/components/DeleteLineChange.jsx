import React from 'react';
import close from '../../../assets/images/close.png';

function DeleteLineChange({
  selectedLine,
  setSelectedLine,
  openDeleteModal,
  setOpenDeleteModal,
}) {
  const deleteHandler = () => {};
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
        openDeleteModal ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
      <div
        className={`relative w-[450px] transform rounded-[15px] bg-linear-to-bl from-black to-gray-600 p-6 text-white shadow-2xl transition-all duration-300 ${
          openDeleteModal
            ? 'translate-y-0 scale-100 opacity-100'
            : '-translate-y-10 scale-95 opacity-0'
        }`}
      >
        <div className="flex items-center justify-between">
          <h1 className="font-[SamimBold] text-[20px]">حذف فرم</h1>
          <span
            onClick={() => {
              setOpenDeleteModal(false);
            }}
            className="cursor-pointer rounded-[10px] bg-white/80 p-1.5 text-[30px] text-red-500 transition-all delay-100 duration-75 ease-in-out hover:bg-black"
          >
            <img
              src={close}
              alt="close"
              width={20}
              className="transition-all delay-100 duration-100 ease-in-out hover:scale-110"
            />
          </span>
        </div>

        <h2 className="pt-6 font-[SamimBold] text-[15px]">
          آیا از حذف فرم اعلان قطعی تعویض خط اطمینان دارید؟
        </h2>

        <div>
          <button
            onClick={deleteHandler}
            className="float-left mt-5 cursor-pointer rounded-xl bg-linear-to-bl from-red-500 to-red-800 px-4 py-2 font-[Samim] transition-all delay-100 duration-150 ease-in-out hover:scale-105 hover:bg-red-500/60"
          >
            حذف
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteLineChange;
