import React, { useEffect, useMemo, useState } from 'react';
import { useGetProducts } from '../../../../product_wareHouse/Api/productsApi';
import EditMoldDarwingJsx from '../template/EditMoldDarwingJsx';
import { useUpdateMoldDarwing } from '../../../Api/moldDarwing';

function EditMoldDarwing({
  openEditModal,
  setOpenEditModal,
  selectedMoldDarwing,
  setSelectedMoldDarwing,
}) {
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
    id: '',
  });

  useEffect(() => {
    if (!selectedMoldDarwing) return;

    setForm({
      id: selectedMoldDarwing?.id,
      formDate: selectedMoldDarwing?.formDate,
      formNumber: selectedMoldDarwing.formNumber,
      productName: selectedMoldDarwing?.productName,
      productCode: selectedMoldDarwing?.productCode,
      needsSampleProduction: selectedMoldDarwing?.needsSampleProduction,
      notes: selectedMoldDarwing?.notes,
      drawingsApproved: selectedMoldDarwing?.drawingsApproved,
      runAndWallThickness: selectedMoldDarwing?.runAndWallThickness,
      blankMainFormat: selectedMoldDarwing?.blankMainFormat,
      blankMoldWallAndNeck: selectedMoldDarwing?.blankMoldWallAndNeck,
      shrinkage: selectedMoldDarwing?.shrinkage,
      moldBlankHolderSelection: selectedMoldDarwing?.moldBlankHolderSelection,
      offsetScrewToHangGroove: selectedMoldDarwing?.offsetScrewToHangGroove,
      invertAndMoldH: selectedMoldDarwing?.invertAndMoldH,
      brassTongDesign: selectedMoldDarwing?.brassTongDesign,
      dimensionalControl: selectedMoldDarwing?.dimensionalControl,
      changeDescriptionAndRework:
        selectedMoldDarwing?.changeDescriptionAndRework,
    });
  }, [selectedMoldDarwing, openEditModal]);

  const closeHandler = () => {
    setOpenEditModal(false);
    setSelectedMoldDarwing(null);
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

  const updateReport = useUpdateMoldDarwing();

  const submitHandler = (e) => {
    e.preventDefault();

    updateReport.mutate(
      { id: selectedMoldDarwing?.id, form },
      {
        onSuccess: () => {
          setOpenEditModal(false);
          setSelectedMoldDarwing(null);
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
        className={`no-scrollbar relative flex max-h-[90vh] max-w-[80vw] transform flex-col overflow-auto rounded-[15px] bg-linear-to-bl from-black to-gray-600 p-6 text-white shadow-2xl transition-all duration-300 max-2xl:scale-95 max-md:h-160 max-md:overflow-auto ${
          openEditModal
            ? ' translate-y-0 scale-100 opacity-100'
            : '-translate-y-10 scale-0 opacity-0'
        }`}
      >
        <EditMoldDarwingJsx
          selectedMoldDarwing={selectedMoldDarwing}
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

export default EditMoldDarwing;
