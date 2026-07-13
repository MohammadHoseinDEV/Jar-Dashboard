import clos from '../../../../../../assets/images/close.png';

function DeleteModal({
  openDeleteModal,
  setOpenDeleteModal,
  selectedUser,
  deleteUser,
}) {
  const close = () => setOpenDeleteModal(false);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
        openDeleteModal ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

      {/* Modal */}
      <div
        className={`relative w-[450px] transform rounded-[15px] bg-linear-to-bl from-black to-gray-600 p-6 text-white shadow-2xl transition-all duration-300 ${
          openDeleteModal
            ? 'translate-y-0 scale-100 opacity-100'
            : '-translate-y-10 scale-95 opacity-0'
        }`}
      >
        
        <div className="flex items-center justify-between">
          <h2 className="font-[SamimBold] text-lg">حذف کاربر</h2>
          <button
            onClick={close}
            className="cursor-pointer rounded-[10px] bg-white/80 p-1.5 text-[30px] text-red-500 transition-all delay-100 duration-75 ease-in-out hover:bg-black"
          >
            <img
              src={clos}
              alt="close"
              width={20}
              className="transition-all delay-100 duration-100 ease-in-out hover:scale-110"
            />
          </button>
        </div>

        <p className="mt-4 font-[Samim] text-white/80">
          آیا از حذف {selectedUser?.fullName ?? '--'} مطمئن هستید؟
        </p>

        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={() =>
              deleteUser.mutate(selectedUser.id, {
                onSuccess: close,
              })
            }
            className="cursor-pointer rounded-xl bg-linear-to-bl from-red-500 to-red-800 px-4 py-2 font-[Samim] transition-all delay-100 duration-150 ease-in-out hover:scale-105 hover:bg-red-500/60"
          >
            حذف
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
