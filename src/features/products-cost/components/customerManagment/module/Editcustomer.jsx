import React, { useEffect, useState } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import { useUpdateCustomer } from '../../../Api/customerManagment';

function Editcustomer({
  openEditModal,
  setOpenEditModal,
  selectedCustomer,
  setSelectedCustomer,
}) {
  const [form, setForm] = useState({
    customerCode: '',
    customerName: '',
  });

  useEffect(() => {
    if (!selectedCustomer) return;

    setForm({
      customerCode: selectedCustomer?.customerCode,
      customerName: selectedCustomer?.customerName,
    });
  }, [selectedCustomer]);

  const closeModal = () => {
    setOpenEditModal(false);
    setSelectedCustomer(null);
  };

  const updateCustomer = useUpdateCustomer();

  const submitHandler = (e) => {
    e.preventDefault();
    updateCustomer.mutate(
      { id: selectedCustomer?.id, form },
      {
        onSuccess: () => {
          closeModal();
        },
      }
    );
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex h-screen items-center justify-center p-4 transition-opacity duration-300 ${
        openEditModal
          ? 'pointer-events-auto opacity-100 '
          : 'pointer-events-none opacity-0'
      }`}
    >
      <div
        onClick={closeModal}
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
      />
      <div
        className={`relative flex flex-col gap-4 overflow-hidden rounded-[15px] bg-linear-to-tl from-black to-gray-600 p-6 text-white shadow-2xl transition-all duration-300 ${
          openEditModal
            ? 'translate-y-0 scale-100 opacity-100'
            : '-translate-y-10 scale-95 opacity-0'
        }`}
      >
        <div className="flex items-center justify-between">
          <h1 className="5xl:text-[35px] pr-1.5 font-[SamimBold] text-[22px]">
            ویرایش مشتری
          </h1>
          <p
            onClick={closeModal}
            className="5xl:size-12 5xl:text-[35px] flex size-8 cursor-pointer items-center justify-center rounded-full bg-[#343457] text-[20px] transition-all delay-75 duration-100 hover:scale-110"
          >
            <span>
              <IoCloseSharp />
            </span>
          </p>
        </div>
        <form onSubmit={submitHandler} className="my-5" id="customers">
          <label htmlFor="customerCode">
            <input
              type="text"
              placeholder="کد مشتری"
              name="customerCode"
              value={form?.customerCode || ''}
              onChange={(e) => {
                setForm((p) => ({
                  ...p,
                  [e.target.name]: e.target.value,
                }));
              }}
              className="5xl:text-[25px] my-2 w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] max-2xl:text-[14px] max-md:text-[13px]"
            />
          </label>
          <label htmlFor="customerName">
            <input
              type="text"
              placeholder="نام مشتری"
              name="customerName"
              value={form?.customerName || ''}
              onChange={(e) => {
                setForm((p) => ({
                  ...p,
                  [e.target.name]: e.target.value,
                }));
              }}
              className="5xl:text-[25px] my-2 w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none placeholder:font-[Samim] max-2xl:text-[14px] max-md:text-[13px]"
            />
          </label>
        </form>
        <button
          type="submit"
          form="customers"
          className="5xl:text-[25px] w-full cursor-pointer rounded-xl bg-linear-to-tl from-green-900 to-green-500 px-4 py-3 font-[Samim] transition-all delay-100 duration-150 ease-in-out hover:scale-[1.01]"
        >
          ثبت
        </button>
      </div>
    </div>
  );
}

export default Editcustomer;
