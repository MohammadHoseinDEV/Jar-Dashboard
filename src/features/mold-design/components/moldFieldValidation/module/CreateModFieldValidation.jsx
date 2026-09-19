import React, { useMemo, useState } from 'react';
import CreateMoldFieldValidationJsx from '../template/CreateMoldFieldValidationJsx';
import { useGetProducts } from '../../../../product_wareHouse/Api/productsApi';
import { useCreateMoldFieldValidation } from '../../../Api/moldFieldValidation';
import { toast } from 'react-toastify';

const initialState = {
  formDate: '',
  productName: '',
  productCode: '',
  moldCode: '',
  validationDate: '',
  quantity: 0,
  productWeightOk: true,
  productPackagingOk: true,
  efficiencyOk: true,
  productQualityOk: true,
  productDimensionsOk: true,
  packagingWasteAssessmentOk: true,
  energyConsumptionAssessmentOk: true,
  moldDrawingsAndAccessoriesApproved: true,
  startupAndProductionInstructionsApproved: true,
  wastePollutionHigh: true,
  energyConsumptionIntensity: 1,
};

function CreateModFieldValidation({ openCreateModal, setOpenCreateModal }) {
  const [form, setForm] = useState(initialState);
  const closeHandler = () => {
    setOpenCreateModal(false);
    setForm(initialState);
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

  const createReport = useCreateMoldFieldValidation();

  const submitHandler = (e) => {
    e.preventDefault();

    if (!form.formDate) {
      toast.warning('لطفا تاریخ را انتخاب کنید');
      return;
    }

    createReport.mutate(form, {
      onSuccess: () => {
        setOpenCreateModal(false);
        setForm(initialState);
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
        className={`relative flex max-h-[90vh] max-w-[80vw] transform flex-col overflow-auto rounded-[15px] bg-linear-to-bl from-black to-gray-600 p-6 text-white shadow-2xl transition-all duration-300 max-2xl:scale-95 max-md:h-160 max-md:overflow-auto ${
          openCreateModal
            ? ' translate-y-0 scale-100 opacity-100'
            : '-translate-y-10 scale-0 opacity-0'
        }`}
      >
        <CreateMoldFieldValidationJsx
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

export default CreateModFieldValidation;
