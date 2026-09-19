import React, { useState } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import { useCreateCustomer } from '../../../Api/customerManagment';
import { toast } from 'react-toastify';

const initialState = {
  customerCode: '',
  customerName: '',
};

function CreateCustomer({ openCreateModal, setOpenCreateModal }) {
  const [form, setForm] = useState(initialState);

  const closeHandler = () => {
    setOpenCreateModal(false);
    setForm(initialState);
  };

  const createcustomer = useCreateCustomer();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!form.customerCode) {
      toast.warning('لطفا کد مشتری را وارد کنید');
      return;
    }
    if (!form.customerName) {
      toast.warning('لطفا نام مشتری را وارد کنید');
      return;
    }

    createcustomer.mutate(form, {
      onSuccess: () => {
        closeHandler();
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
        className={`relative flex max-h-[90vh] min-h-0 max-w-[80vw] transform flex-col overflow-hidden rounded-[15px] bg-linear-to-bl from-black to-gray-600 p-6 text-white shadow-2xl transition-all duration-300 max-2xl:scale-95 max-md:h-160 ${
          openCreateModal
            ? 'translate-y-0 scale-100 opacity-100'
            : '-translate-y-10 scale-0 opacity-0'
        }`}
      >
        <div className="flex items-center justify-between">
          <h1 className="5xl:text-[35px] pr-1.5 font-[SamimBold] text-[22px]">
            تعریف مشتری
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
        <form onSubmit={submitHandler} className="my-5" id="customer">
          <label htmlFor="customerCode">
            <input
              type="text"
              placeholder="کد مشتری"
              name="customerCode"
              autoComplete="off"
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
              autoComplete="off"
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
          form="customer"
          className="5xl:text-[25px] w-full cursor-pointer rounded-xl bg-linear-to-tl from-green-900 to-green-500 px-4 py-3 font-[Samim] transition-all delay-100 duration-150 ease-in-out hover:scale-[1.01]"
        >
          ثبت
        </button>
      </div>
    </div>
  );
}

export default CreateCustomer;
