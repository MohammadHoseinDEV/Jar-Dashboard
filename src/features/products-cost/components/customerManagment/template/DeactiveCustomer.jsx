import React from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import { useInactiveCustomer } from '../../../Api/customerManagment';

function DeactiveCustomer({ openDeactiveCustomer, setOpenDeactivecustomer }) {
  const closeHandler = () => {
    setOpenDeactivecustomer(false);
  };

  const inactiveCustomer = useInactiveCustomer();

  const deactivecustomerHandler = () => {
    inactiveCustomer.mutate(openDeactiveCustomer?.id, {
      onSuccess: () => {
        setOpenDeactivecustomer(false);
      },
    });
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex h-screen items-center justify-center p-4 transition-opacity duration-300 ${
        openDeactiveCustomer
          ? 'pointer-events-auto opacity-100 '
          : 'pointer-events-none opacity-0'
      }`}
    >
      <div
        onClick={closeHandler}
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
      />
      <div
        className={`relative flex flex-col gap-4 overflow-hidden rounded-[15px] bg-linear-to-tl from-black to-gray-600 p-6 text-white shadow-2xl transition-all duration-300 ${
          openDeactiveCustomer
            ? 'translate-y-0 scale-100 opacity-100'
            : '-translate-y-10 scale-0 opacity-0'
        }`}
      >
        <div className="flex items-center justify-between">
          <h1 className="5xl:text-[35px] pr-1.5 font-[SamimBold] text-[22px]">
            غیرفعال کردن مشتری
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
        <div className="flex items-center space-x-1">
          <p>آیا از غیرفعال کردن مشتری </p>
          <p className="font-extrabold">{openDeactiveCustomer?.customerName}</p>
          <p>با کد</p>
          <p className="font-[AvenirLTProMedium] font-extrabold">
            {openDeactiveCustomer?.customerCode}
          </p>
          <p>اطمینان دارید؟</p>
        </div>
        <div className="flex justify-end">
          <button onClick={deactivecustomerHandler} className="btn-submit">
            تایید
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeactiveCustomer;
