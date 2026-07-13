import React, { useMemo, useState } from 'react';
import CreateMoldDarwingJsx from '../template/CreateMoldDarwingJsx';
import { useGetProducts } from '../../../../product_wareHouse/Api/productsApi';
import { useCreateMoldDarwing } from '../../../Api/moldDarwing';

function CreateMoldDarwing({ openCreateModal, setOpenCreateModal }) {
  const [form, setForm] = useState({
    formDate: '',
    formNumber: '',
    productName: '',
    productCode: '',
    needsSampleProduction: 1,
    notes: '',
    drawingsApproved: 1,
    runAndWallThickness: 1,
    blankMainFormat: 1,
    blankMoldWallAndNeck: 1,
    shrinkage: 1,
    moldBlankHolderSelection: 1,
    offsetScrewToHangGroove: 1,
    invertAndMoldH: 1,
    brassTongDesign: 1,
    dimensionalControl: 1,
    changeDescriptionAndRework: '',
  });
  const closeHandler = () => {
    setOpenCreateModal(false);
  };

  const { data: product } = useGetProducts();
  const [searchProducts, setSearchProducts] = useState('');

  const getProducts = useMemo(() => {
    const none = { id: '', name: 'انتخاب  محصول' };
    return [
      none,
      ...(product ?? []).map((p) => ({
        id: p.id,
        name: p.productName,
        code: p.productCode,
      })),
    ];
  }, [product]);

  const filterProducts = useMemo(() => {
    const q = searchProducts.trim().toLowerCase();
    if (!q) return getProducts;

    return getProducts.filter((p) => (p?.name || '').toLowerCase().includes(q));
  }, [searchProducts, getProducts]);

  const selectedProducts = useMemo(() => {
    return getProducts.find((p) => p.id === (form.id || '')) || getProducts[0];
  }, [getProducts, form.id]);

  const createReport = useCreateMoldDarwing();

  const submitHandler = (e) => {
    e.preventDefault();
    createReport.mutate(form, {
      onSuccess: () => {
        setOpenCreateModal(false);
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
        className={`relative flex max-h-[90vh] max-w-[80vw] transform flex-col overflow-hidden rounded-[15px] bg-linear-to-bl from-black to-gray-600 p-6 text-white shadow-2xl transition-all duration-300 max-2xl:scale-95 max-md:h-160 max-md:overflow-auto ${
          openCreateModal
            ? ' translate-y-0 scale-100 opacity-100'
            : '-translate-y-10 scale-0 opacity-0'
        }`}
      >
        <CreateMoldDarwingJsx
          closeHandler={closeHandler}
          submitHandler={submitHandler}
          form={form}
          setForm={setForm}
          product={product}
          searchProducts={searchProducts}
          setSearchProducts={setSearchProducts}
          getProducts={getProducts}
          filterProducts={filterProducts}
          selectedProducts={selectedProducts}
        />
      </div>
    </div>
  );
}

export default CreateMoldDarwing;
