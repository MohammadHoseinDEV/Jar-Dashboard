import React, { lazy, Suspense, useMemo, useState } from 'react';
import { useGetProducts } from '../../../../product_wareHouse/Api/productsApi';
import { useCreateDesignData } from '../../../Api/designData';
import { toast } from 'react-toastify';

const CreateDesignDataJsx = lazy(
  () => import('../template/CreateDesignDataJsx')
);

function CreateDesignData({ openCreateModal, setOpenCreateModal }) {
  const [form, setForm] = useState({
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

  const createDesign = useCreateDesignData();

  const submitHandler = (e) => {
    e.preventDefault();

    if (!form.formDate) {
      toast.warning('لطفا تاریخ ثبت فرم را انتخاب کنید');
      return;
    }

    if (!form.formDate) {
      toast.warning('لطفا تاریخ را انتخاب کنید');
      return;
    }
    const { id, ...payload } = form;
    createDesign.mutate(payload, {
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
        <Suspense fallback={<div>Loading...</div>}>
          <CreateDesignDataJsx
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
        </Suspense>
      </div>
    </div>
  );
}

export default CreateDesignData;
