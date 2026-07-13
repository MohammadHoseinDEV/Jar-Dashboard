import close from '../../../../assets/images/close.png';
import { useDeleteProductionReport } from '../../Api/Production/Production';

function DeleteProductionRepor({
  openDeleteModal,
  setOpenDeleteModal,
  selectedProduction,
  mobile,
}) {
  const closeHandler = () => {
    setOpenDeleteModal(false);
  };

  const deleteProductionReport = useDeleteProductionReport();

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
        {mobile ? (
          <>
            <div className="flex items-center justify-between">
              <h2 className="font-[SamimBold] text-[20px]">حذف گزارش</h2>

              <button
                onClick={closeHandler}
                className="cursor-pointer rounded-[10px] bg-white/80 p-1.5 text-[30px] text-red-500 transition-all delay-100 duration-75 ease-in-out hover:bg-black"
              >
                <img
                  src={close}
                  alt="close"
                  width={20}
                  className="transition-all delay-100 duration-100 ease-in-out hover:scale-110"
                />
              </button>
            </div>
            <div className="flex flex-col">
              <h4 className="pt-5 font-[SamimBold] text-[15px]">
                <span> آیا از حذف شماره گزارش</span>
                <span className="px-1 font-[AvenirLTProMedium]" dir="ltr">
                  {selectedProduction?.reportNumber}
                </span>
                <span>مطمئن هستید؟</span>
              </h4>
              <div
                className="mt-6 flex justify-end gap-2"
                onClick={() => {
                  deleteProductionReport.mutate(selectedProduction?.id, {
                    onSuccess: () => {
                      closeHandler();
                    },
                  });
                }}
              >
                <button className="cursor-pointer rounded-xl bg-linear-to-bl from-red-500 to-red-800 px-4 py-2 font-[Samim] transition-all delay-100 duration-150 ease-in-out hover:scale-105 hover:bg-red-500/60">
                  حذف
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <h2 className="font-[SamimBold] text-[20px]">حذف گزارش</h2>

              <button
                onClick={closeHandler}
                className="cursor-pointer rounded-[10px] bg-white/80 p-1.5 text-[30px] text-red-500 transition-all delay-100 duration-75 ease-in-out hover:bg-black"
              >
                <img
                  src={close}
                  alt="close"
                  width={20}
                  className="transition-all delay-100 duration-100 ease-in-out hover:scale-110"
                />
              </button>
            </div>
            <div>
              <h4 className="pt-5 font-[SamimBold]">
                آیا از حذف شماره گزارش
                <span className="px-2 font-[AvenirLTProMedium]" dir="ltr">
                  {selectedProduction?.reportNumber}
                </span>
                مطمئن هستید؟
              </h4>
              <div
                className="mt-6 flex justify-end gap-2"
                onClick={() => {
                  deleteProductionReport.mutate(selectedProduction?.id, {
                    onSuccess: () => {
                      closeHandler();
                    },
                  });
                }}
              >
                <button className="cursor-pointer rounded-xl bg-linear-to-bl from-red-500 to-red-800 px-4 py-2 font-[Samim] transition-all delay-100 duration-150 ease-in-out hover:scale-105 hover:bg-red-500/60">
                  حذف
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default DeleteProductionRepor;
