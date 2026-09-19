import React, { lazy, Suspense, useEffect, useMemo, useState } from 'react';

const EditDesignDataJsx = lazy(() => import('../template/EditDesignDataJsx'));
import { useUpdateDesignData } from '../../../Api/designData';
import { useGetProducts } from '../../../../product_wareHouse/Api/productsApi';
import { toast } from 'react-toastify';

function EditDesignData({
  openEditModal,
  setOpenEditModal,
  selectedDesign,
  setSelectedDesign,
}) {
  const [form, setForm] = useState({
    id: '',
    formDate: '',
    productName: '',
    productCode: '',
    formNumber: '',
    manufacturingConstraints: '',
    productApplication: '',
    productApplicationConditions: '',
    potentialFailureConsequences: '',
    packagingAndWasteManagementRequirements: '',
    energyManagementRequirements: '',
    otherRequirements: '',
    isProductionFeasible: true,
    sampleCheckDate: '',
    sampleDimensions: true,
    sampleWeight: true,
    sampleVolume: true,
    sampleCapping3DPrint: true,
    sampleAppearance3DPrint: true,
    sampleThickness: true,
    samplePackagingMethod: true,
    samplePhysicalProperties: true,
    drawingNumber: '',
    drawingReviewDate: '',
    drawingApproved: true,
    drawingDimensions: true,
    drawingWeight: true,
    drawingVolume: true,
    drawingShockTest: true,
    drawingCapping3DPrint: true,
    drawingAppearance3DPrint: true,
    drawingThickness: true,
    drawingPressureTest: true,
    drawingNotes: '',
  });

  useEffect(() => {
    if (!selectedDesign) return;
    setForm({
      id: selectedDesign?.id,
      formDate: selectedDesign?.formDate,
      productName: selectedDesign?.productName,
      productCode: selectedDesign?.productCode,
      formNumber: selectedDesign?.formNumber,
      manufacturingConstraints: selectedDesign?.manufacturingConstraints,
      productApplication: selectedDesign?.productApplication,
      productApplicationConditions:
        selectedDesign?.productApplicationConditions,
      potentialFailureConsequences:
        selectedDesign?.potentialFailureConsequences,
      packagingAndWasteManagementRequirements:
        selectedDesign?.packagingAndWasteManagementRequirements,
      energyManagementRequirements:
        selectedDesign?.energyManagementRequirements,
      otherRequirements: selectedDesign?.otherRequirements,
      isProductionFeasible: selectedDesign?.isProductionFeasible,
      sampleCheckDate: selectedDesign?.sampleCheckDate,
      sampleDimensions: selectedDesign?.sampleDimensions,
      sampleWeight: selectedDesign?.sampleWeight,
      sampleVolume: selectedDesign?.sampleVolume,
      sampleCapping3DPrint: selectedDesign?.sampleCapping3DPrint,
      sampleAppearance3DPrint: selectedDesign?.sampleAppearance3DPrint,
      sampleThickness: selectedDesign?.sampleThickness,
      samplePackagingMethod: selectedDesign?.samplePackagingMethod,
      samplePhysicalProperties: selectedDesign?.samplePhysicalProperties,
      drawingNumber: selectedDesign?.drawingNumber,
      drawingReviewDate: selectedDesign?.drawingReviewDate,
      drawingApproved: selectedDesign?.drawingApproved,
      drawingDimensions: selectedDesign?.drawingDimensions,
      drawingWeight: selectedDesign?.drawingWeight,
      drawingVolume: selectedDesign?.drawingVolume,
      drawingShockTest: selectedDesign?.drawingShockTest,
      drawingCapping3DPrint: selectedDesign?.drawingCapping3DPrint,
      drawingAppearance3DPrint: selectedDesign?.drawingAppearance3DPrint,
      drawingThickness: selectedDesign?.drawingThickness,
      drawingPressureTest: selectedDesign?.drawingPressureTest,
      drawingNotes: selectedDesign?.drawingNotes,
    });
  }, [selectedDesign, openEditModal]);
  const closeHandler = () => {
    setOpenEditModal(false);
    setSelectedDesign(null);
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

  const updateReport = useUpdateDesignData();
  const submitHandler = (e) => {
    e.preventDefault();

    if (!form.formDate) {
      toast.warning('لطفا تاریخ را انتخاب کنید');
      return;
    }
    updateReport.mutate(
      { id: selectedDesign?.id, form },
      {
        onSuccess: () => {
          setOpenEditModal(false);
          setSelectedDesign(false);
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
        <EditDesignDataJsx
          selectedDesign={selectedDesign}
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

export default EditDesignData;
