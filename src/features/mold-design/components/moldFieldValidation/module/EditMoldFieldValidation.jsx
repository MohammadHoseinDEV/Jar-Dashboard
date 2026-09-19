import React, { useEffect, useMemo, useState } from 'react';
import { useGetProducts } from '../../../../product_wareHouse/Api/productsApi';
import EditMoldFieldvalidationJsx from '../template/EditMoldFieldvalidationJsx';
import { useUpdateMoldFileValidation } from '../../../Api/moldFieldValidation';
import { FaS } from 'react-icons/fa6';
import { toast } from 'react-toastify';

const initialState = {
  id: '',
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

function EditMoldFieldValidation({
  openEditModal,
  setOpenEditModal,
  selectedMold,
  setSelectedMold,
}) {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (!selectedMold) return;

    setForm({
      id: selectedMold?.id,
      formDate: selectedMold?.formDate,
      productName: selectedMold?.productName,
      productCode: selectedMold?.productCode,
      moldCode: selectedMold?.moldCode,
      validationDate: selectedMold?.validationDate,
      quantity: selectedMold?.quantity,
      productWeightOk: selectedMold?.productWeightOk,
      productPackagingOk: selectedMold?.productPackagingOk,
      efficiencyOk: selectedMold?.efficiencyOk,
      productQualityOk: selectedMold?.productQualityOk,
      productDimensionsOk: selectedMold?.productDimensionsOk,
      packagingWasteAssessmentOk: selectedMold?.packagingWasteAssessmentOk,
      energyConsumptionAssessmentOk:
        selectedMold?.energyConsumptionAssessmentOk,
      moldDrawingsAndAccessoriesApproved:
        selectedMold?.moldDrawingsAndAccessoriesApproved,
      startupAndProductionInstructionsApproved:
        selectedMold?.startupAndProductionInstructionsApproved,
      wastePollutionHigh: selectedMold?.wastePollutionHigh,
      energyConsumptionIntensity: selectedMold?.energyConsumptionIntensity,
    });
  }, [selectedMold, openEditModal]);

  const closeHandler = () => {
    setOpenEditModal(false);
    setSelectedMold(null);
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

  const updateReport = useUpdateMoldFileValidation();

  const submitHandler = (e) => {
    e.preventDefault();

    if (!form.formDate) {
      toast.warning('لطفا تاریخ را انتخاب کنید');
      return;
    }

    updateReport.mutate(
      {
        id: selectedMold?.id,
        form,
      },
      {
        onSuccess: () => {
          setOpenEditModal(false);
          setForm(initialState);
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
        className={`relative flex max-h-[90vh] max-w-[80vw] transform flex-col overflow-auto rounded-[15px] bg-linear-to-bl from-black to-gray-600 p-6 text-white shadow-2xl transition-all duration-300 max-2xl:scale-95 max-md:h-160 max-md:overflow-auto ${
          openEditModal
            ? ' translate-y-0 scale-100 opacity-100'
            : '-translate-y-10 scale-0 opacity-0'
        }`}
      >
        <EditMoldFieldvalidationJsx
          selectedMold={selectedMold}
          closeHandler={closeHandler}
          form={form}
          setForm={setForm}
          product={product}
          submitHandler={submitHandler}
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

export default EditMoldFieldValidation;
