import React, { useMemo, useState } from 'react';
import CreateTransferJsx from '../template/CreateTransferJsx';
import { useGetCustomers } from '../../../Api/customerManagment';
import { useGetProducts } from '../../../../product_wareHouse/Api/productsApi';
import { useGetProfile } from '../../../../../hooks/profile/profile';
import { useCreateSalesTransfer } from '../../../Api/salesTransfer';

const initialState = {
  transferCode: '',
  transferDate: '',
  customerId: '',
  customerCode: '',
  productId: '',
  productCode: '',
  quantity: 0,
  transferType: '',
  notes: '',
  createdBy: '',
};

function CreateTransfer({ openCreateModal, setOpenCreateModal }) {
  const [form, setForm] = useState(initialState);
  const [searchCustomer, setSearchCustomer] = useState('');
  const [searchProduct, setSearchproduct] = useState('');

  const closeHandler = () => {
    setOpenCreateModal(false);
    setForm(initialState);
  };

  const { data: customer } = useGetCustomers();
  const { data: product } = useGetProducts();
  const { data: profile } = useGetProfile();

  // ----------------------------------------------------
  // customer

  const getCustomers = useMemo(() => {
    const none = { id: '', name: 'انتخاب مشتری', code: 'انتخاب کد' };
    return [
      none,
      ...(customer ?? [])
        .filter((p) => p?.isActive)
        .map((p) => ({
          id: p?.id,
          name: p?.customerName,
          code: p?.customerCode,
          isActive: p?.isActive,
        })),
    ];
  }, [customer]);

  const filterCustomer = useMemo(() => {
    const c = searchCustomer.trim().toLowerCase();
    if (!c) return getCustomers;

    return getCustomers.filter(
      (p) =>
        (p?.name || '').toLowerCase().includes(c) ||
        (p?.code || '').toLowerCase().includes(c)
    );
  }, [searchCustomer, getCustomers]);

  const selectedCustomer = useMemo(() => {
    return (
      getCustomers.find((c) => c.id === (form.customerId || '')) ||
      getCustomers[0]
    );
  }, [getCustomers, form.customerId]);

  // ----------------------------------------------
  // products

  const getProduct = useMemo(() => {
    const none = { id: '', name: 'انتخاب محصول', code: 'انتخاب کد' };
    return [
      none,
      ...(product ?? []).map((p) => ({
        id: p?.id,
        name: p?.productName,
        code: p?.productCode,
      })),
    ];
  }, [product]);

  const filterProduct = useMemo(() => {
    const c = searchProduct.trim().toLowerCase();
    if (!c) return getProduct;

    return getProduct.filter(
      (p) =>
        (p?.name || '').toLowerCase().includes(c) ||
        (p?.code || '').toLowerCase().includes(c)
    );
  }, [searchProduct, getProduct]);

  const selectedProduct = useMemo(() => {
    return (
      getProduct.find((c) => c.id === (form.productId || '')) || getProduct[0]
    );
  }, [getProduct, form.productId]);

  const createSalestransfer = useCreateSalesTransfer();

  const { customerName, productName, ...payload } = form;

  const submitHandler = (e) => {
    e.preventDefault();

    createSalestransfer.mutate(payload, {
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
        className={`relative flex max-h-[90vh] min-h-0 w-[60vw] transform flex-col overflow-hidden rounded-[15px] bg-linear-to-bl from-black to-gray-600 p-6 text-white shadow-2xl transition-all duration-300 max-2xl:scale-95 max-md:h-160 ${
          openCreateModal
            ? 'translate-y-0 scale-100 opacity-100'
            : '-translate-y-10 scale-0 opacity-0'
        }`}
      >
        <CreateTransferJsx
          form={form}
          setForm={setForm}
          closeHandler={closeHandler}
          submitHandler={submitHandler}
          searchCustomer={searchCustomer}
          setSearchCustomer={setSearchCustomer}
          getCustomers={getCustomers}
          filterCustomer={filterCustomer}
          selectedCustomer={selectedCustomer}
          setSearchproduct={setSearchproduct}
          searchProduct={searchProduct}
          getProduct={getProduct}
          filterProduct={filterProduct}
          selectedProduct={selectedProduct}
          profile={profile}
        />
      </div>
    </div>
  );
}

export default CreateTransfer;
