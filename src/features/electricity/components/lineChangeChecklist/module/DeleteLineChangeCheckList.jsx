import React from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import { usedeleteLineChangeCheckList } from '../../../Api/LineChangeCheckList/lineChangeCheckList';

function DeleteLineChangeCheckList({
  openDeleteModal,
  setOpenDeleteModal,
  selectedCheckList,
}) {
  const closeHandler = () => {
    setOpenDeleteModal(false);
  };

  const deleteReport = usedeleteLineChangeCheckList();

  const removeHandler = () => {
    deleteReport.mutate(
      { id: selectedCheckList?.id },
      {
        onSuccess: () => {
          closeHandler();
        },
      }
    );
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
        openDeleteModal
          ? 'pointer-events-auto opacity-100 '
          : 'pointer-events-none opacity-0'
      }`}
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        onClick={closeHandler}
      />
      <div
        className={`relative transform rounded-[15px] bg-linear-to-bl from-black to-gray-600 p-6 text-white shadow-2xl transition-all duration-300 ${
          openDeleteModal
            ? 'translate-y-0 scale-100 opacity-100'
            : '-translate-y-10 scale-0 opacity-0'
        }`}
      >
        <div className="flex shrink-0 items-center justify-between">
          <h1 className="5xl:text-[35px] pr-1.5 font-[SamimBold] text-[22px]">
            حذف فرم
          </h1>
          <p
            onClick={closeHandler}
            className="5xl:size-12 5xl:text-[35px] flex size-8 cursor-pointer items-center justify-center rounded-full bg-[#343457] text-[20px] transition-all delay-75 duration-100 hover:scale-110"
          >
            <span>
              <IoCloseSharp />
            </span>
          </p>
        </div>
        <div className="flex space-x-1 pt-2">
          <p>آیا از حذف فرم با شماره </p>
          <p className="font-[AvenirLTProMedium]">
            {selectedCheckList?.checklistNumber}
          </p>
          <p>اطمینان دارید؟</p>
        </div>
        <div className="pt-5 text-left" onClick={removeHandler}>
          <button className="remove-line">حذف</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteLineChangeCheckList;
