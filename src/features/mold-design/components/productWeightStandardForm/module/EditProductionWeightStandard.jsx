import React, { useEffect, useMemo, useState } from 'react';
import { useGetProducts } from '../../../../product_wareHouse/Api/productsApi';
import EditProductionWeightStandardJsx from '../template/EditProductionWeightStandardJsx';
import { useUpdateProductionWeightStandard } from '../../../Api/productWeightStandardForm';

function EditProductionWeightStandard({
  openEditModal,
  setOpenEditModal,
  selectedProductWeigth,
  setSelectedProductWeigth,
}) {
  const [form, setForm] = useState({
    id: '',
    productName: '',
    productCode: '',
    companyName: '',
    formDate: '',
    isMachineLine1: '',
    isMachineLine2: '',
    isMachineLine3: '',
    productWeightLine1: 0,
    productWeightLine2: 0,
    productWeightLine3: 0,
    weightToleranceLine1: '',
    weightToleranceLine2: '',
    weightToleranceLine3: '',
    recommendedLine1: '',
    recommendedLine2: '',
    recommendedLine3: '',
    notes: '',
  });

  useEffect(() => {
    if (!selectedProductWeigth) return;
    setForm({
      id: selectedProductWeigth?.id,
      productName: selectedProductWeigth?.productName,
      productCode: selectedProductWeigth?.productCode,
      companyName: selectedProductWeigth?.companyName,
      formDate: selectedProductWeigth?.formDate,
      isMachineLine1: selectedProductWeigth?.isMachineLine1,
      isMachineLine2: selectedProductWeigth?.isMachineLine2,
      isMachineLine3: selectedProductWeigth?.isMachineLine3,
      productWeightLine1: selectedProductWeigth?.productWeightLine1,
      productWeightLine2: selectedProductWeigth?.productWeightLine2,
      productWeightLine3: selectedProductWeigth?.productWeightLine3,
      weightToleranceLine1: selectedProductWeigth?.weightToleranceLine1,
      weightToleranceLine2: selectedProductWeigth?.weightToleranceLine2,
      weightToleranceLine3: selectedProductWeigth?.weightToleranceLine3,
      recommendedLine1: selectedProductWeigth?.recommendedLine1,
      recommendedLine2: selectedProductWeigth?.recommendedLine2,
      recommendedLine3: selectedProductWeigth?.recommendedLine3,
      notes: selectedProductWeigth?.notes,
    });
  }, [selectedProductWeigth, openEditModal]);

  const closeHandler = () => {
    setOpenEditModal(false);
    setSelectedProductWeigth(null);
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
    return (
      getProducts.find((p) => p.name === form.productName) ||
      getProducts.find((p) => p.id === form.id) ||
      getProducts[0]
    );
  }, [getProducts, form.productName, form.id]);

  const updateReport = useUpdateProductionWeightStandard();

  const submitHandler = (e) => {
    e.preventDefault();
    updateReport.mutate(
      { id: selectedProductWeigth?.id, form },
      {
        onSuccess: () => {
          setOpenEditModal(false);
          setSelectedProductWeigth(null);
        },
      }
    );
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex h-screen items-center justify-center overflow-auto p-4 transition-opacity duration-300 ${
        openEditModal
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
          openEditModal
            ? ' translate-y-0 scale-100 opacity-100'
            : '-translate-y-10 scale-0 opacity-0'
        }`}
      >
        <EditProductionWeightStandardJsx
          openEditModal={openEditModal}
          closeHandler={closeHandler}
          form={form}
          setForm={setForm}
          product={product}
          submitHandler={submitHandler}
          searchProducts={searchProducts}
          setSearchProducts={setSearchProducts}
          selectedProductWeigth={selectedProductWeigth}
          getProducts={getProducts}
          filterProducts={filterProducts}
          selectedProducts={selectedProducts}
        />
      </div>
    </div>
  );
}

export default EditProductionWeightStandard;
