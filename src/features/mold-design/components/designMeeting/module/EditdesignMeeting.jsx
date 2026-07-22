import React, { useEffect, useMemo, useState } from 'react';
import { useUpdateDesignMeeting } from '../../../Api/designMeeting';
import EditDesignMeetingJsx from '../template/EditDesignMeetingJsx';
import { useGetProducts } from '../../../../product_wareHouse/Api/productsApi';
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

function EditdesignMeeting({
  openEditModal,
  setOpenEditModal,
  selectedDesignMeeting,
  setSelectedDesignMeeting,
}) {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (!selectedDesignMeeting) return;
    setForm({
      id: selectedDesignMeeting?.id,
      productName: selectedDesignMeeting?.productName,
      productCode: selectedDesignMeeting?.productCode,
      dataFormNumber: selectedDesignMeeting?.dataFormNumber,
      meetingDate: selectedDesignMeeting?.meetingDate,
      designPhase: selectedDesignMeeting?.designPhase,
      participants: selectedDesignMeeting?.participants,
      weightOk: selectedDesignMeeting?.weightOk,
      productToleranceOk: selectedDesignMeeting?.productToleranceOk,
      moldLifetimeOk: selectedDesignMeeting?.moldLifetimeOk,
      gypsumSampleOk: selectedDesignMeeting?.gypsumSampleOk,
      coolingPlungerOk: selectedDesignMeeting?.coolingPlungerOk,
      moldHolderCheckOk: selectedDesignMeeting?.moldHolderCheckOk,
      blankHolderCheckOk: selectedDesignMeeting?.blankHolderCheckOk,
      invertAndMoldHOk: selectedDesignMeeting?.invertAndMoldHOk,
      invertAndBlankHOk: selectedDesignMeeting?.invertAndBlankHOk,
      offsetScrewToHangGrooveDistanceCheckOk:
        selectedDesignMeeting?.offsetScrewToHangGrooveDistanceCheckOk,
      insideProductMouthOk: selectedDesignMeeting?.insideProductMouthOk,
      parisonRunnerOk: selectedDesignMeeting?.parisonRunnerOk,
      baffleHolderOk: selectedDesignMeeting?.baffleHolderOk,
      neckRingGuideRingPlungerToleranceOk:
        selectedDesignMeeting?.neckRingGuideRingPlungerToleranceOk,
      blankMoldAndNeckRingThroatToleranceOk:
        selectedDesignMeeting?.blankMoldAndNeckRingThroatToleranceOk,
      accessoriesMaterialOk: selectedDesignMeeting?.accessoriesMaterialOk,
      productNeedsRiskAssessmentOk:
        selectedDesignMeeting?.productNeedsRiskAssessmentOk,
      decisions: selectedDesignMeeting?.decisions?.length
        ? selectedDesignMeeting?.decisions?.map((d) => ({
            decision: d?.decision,
            responsible: d?.responsible,
            deadline: d?.deadline,
            notes: d?.notes,
          }))
        : [
            {
              decision: '',
              responsible: '',
              deadline: '',
              notes: '',
            },
          ],
    });
  }, [selectedDesignMeeting, openEditModal]);

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

  const closeHandler = () => {
    setOpenEditModal(false);
  };

  const updateReport = useUpdateDesignMeeting();

  const submitHandler = (e) => {
    e.preventDefault();

    updateReport.mutate(
      {
        id: selectedDesignMeeting?.id,
        form,
      },
      {
        onSuccess: () => {
          setOpenEditModal(false);
          setSelectedDesignMeeting(null);
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
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        onClick={() => {
          closeHandler();
        }}
      />
      <div
        className={`relative flex max-h-[90vh] max-w-[80vw] transform flex-col overflow-hidden rounded-[15px] bg-linear-to-bl from-black to-gray-600 p-6 text-white shadow-2xl transition-all duration-300 max-2xl:scale-95 max-md:h-160 max-md:overflow-auto ${
          openEditModal
            ? ' translate-y-0 scale-100 opacity-100'
            : '-translate-y-10 scale-0 opacity-0'
        }`}
      >
        <EditDesignMeetingJsx
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
          selectedDesignMeeting={selectedDesignMeeting}
          addItems={addItems}
          removeItems={removeItems}
          updateItems={updateItems}
        />
      </div>
    </div>
  );
}

export default EditdesignMeeting;
