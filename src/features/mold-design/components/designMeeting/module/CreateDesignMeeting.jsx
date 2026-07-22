import React, { useMemo, useState } from 'react';
import CreateDesignMeetingJsx from '../template/CreateDesignMeetingJsx';
import { useGetProducts } from '../../../../product_wareHouse/Api/productsApi';
import { useCreateDesignMeeting } from '../../../Api/designMeeting';
import { toast } from 'react-toastify';

const initialState = {
  productName: '',
  productCode: '',
  dataFormNumber: '',
  meetingDate: '',
  designPhase: '',
  participants: '',
  weightOk: true,
  productToleranceOk: true,
  moldLifetimeOk: true,
  gypsumSampleOk: true,
  coolingPlungerOk: true,
  moldHolderCheckOk: true,
  blankHolderCheckOk: true,
  invertAndMoldHOk: true,
  invertAndBlankHOk: true,
  offsetScrewToHangGrooveDistanceCheckOk: true,
  insideProductMouthOk: true,
  parisonRunnerOk: true,
  baffleHolderOk: true,
  neckRingGuideRingPlungerToleranceOk: true,
  blankMoldAndNeckRingThroatToleranceOk: true,
  accessoriesMaterialOk: true,
  productNeedsRiskAssessmentOk: true,
  decisions: [
    {
      decision: '',
      responsible: '',
      deadline: '',
      notes: '',
    },
  ],
};

function CreateDesignMeeting({ openCreateModal, setOpenCreateModal }) {
  const [form, setForm] = useState(initialState);

  const addItems = () => {
    if (form.decisions?.length >= 8) {
      toast.warning('حداکثر 8 ردیف قابل اضافه کردن است .');
      return;
    }

    setForm((p) => ({
      ...p,
      decisions: [
        ...(p.decisions || []),
        {
          decision: '',
          responsible: '',
          deadline: '',
          notes: '',
        },
      ],
    }));
  };

  const removeItems = (index) => {
    setForm((p) => {
      const next = [...(p.decisions || [])];

      next.splice(index, 1);
      if (next.length === 0) {
        next.push({
          decision: '',
          responsible: '',
          deadline: '',
          notes: '',
        });
      }
      return { ...p, decisions: next };
    });
  };

  const updateItems = (index, field, value) => {
    setForm((p) => {
      const next = [...p.decisions];
      next[index] = { ...next[index], [field]: value };
      return { ...p, decisions: next };
    });
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

  const closeHandler = () => {
    setOpenCreateModal(false);
    setForm(initialState);
  };

  const createReport = useCreateDesignMeeting();

  const submitHandler = (e) => {
    e.preventDefault();

    createReport.mutate(form, {
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
        className={`relative flex max-h-[90vh] max-w-[80vw] transform flex-col overflow-hidden rounded-[15px] bg-linear-to-bl from-black to-gray-600 p-6 text-white shadow-2xl transition-all duration-300 max-2xl:scale-95 max-md:h-160 max-md:overflow-auto ${
          openCreateModal
            ? ' translate-y-0 scale-100 opacity-100'
            : '-translate-y-10 scale-0 opacity-0'
        }`}
      >
        <CreateDesignMeetingJsx
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
          addItems={addItems}
          removeItems={removeItems}
          updateItems={updateItems}
        />
      </div>
    </div>
  );
}

export default CreateDesignMeeting;
