import React, { useEffect, useMemo, useState } from 'react';
import EditLinechangeJsx from './template/EditLinechangeJsx';
import { useGetProducts } from '../../../product_wareHouse/Api/productsApi';
import { toast } from 'react-toastify';
import { useUpdateLineChange } from '../../Api/planing';

function EditLinechange({
  openEdit,
  setOpenEdit,
  selectedLine,
  setSelectedLine,
}) {
  const [form, setForm] = useState({
    id: '',
    formDate: '',
    description: '',
    lineChangeDetails: [
      {
        lineNumber: '',
        currentProductName: '',
        currentProductCode: '',
        currentProductId: '',
        nextProductName: '',
        nextProductCode: '',
        nextProductId: '',
        averageProductionPerShift: 0,
        remainingProduction: 0,
        lineChangeDate: '',
        lineChangeTime: '',
        displayOrder: 0,
      },
    ],
  });

  const [searchProducts, setSearchProducts] = useState('');

  useEffect(() => {
    if (!selectedLine) return;

    setForm({
      id: selectedLine?.id,
      formDate: selectedLine?.formDate,
      description: selectedLine?.description,
      lineChangeDetails: selectedLine?.lineChangeDetails?.length
        ? selectedLine?.lineChangeDetails?.map((d) => ({
            lineNumber: d?.lineNumber,
            currentProductName: d?.currentProductName,
            currentProductCode: d?.currentProductCode,
            currentProductId: d?.currentProductId,
            nextProductName: d?.nextProductName,
            nextProductCode: d?.nextProductCode,
            nextProductId: d?.nextProductId,
            averageProductionPerShift: d?.averageProductionPerShift,
            remainingProduction: d?.remainingProduction,
            lineChangeDate: d?.lineChangeDate,
            lineChangeTime: d?.lineChangeTime,
            displayOrder: d?.displayOrder,
          }))
        : [
            {
              lineNumber: '',
              currentProductName: '',
              currentProductCode: '',
              currentProductId: '',
              nextProductName: '',
              nextProductCode: '',
              nextProductId: '',
              averageProductionPerShift: 0,
              remainingProduction: 0,
              lineChangeDate: '',
              lineChangeTime: '',
              displayOrder: 0,
            },
          ],
    });
  }, [selectedLine, openEdit]);

  const closeHandler = () => {
    setOpenEdit(false);
    setSelectedLine(null);
  };

  const updateLineChangeDetail = (index, field, value) => {
    setForm((prev) => {
      const details = prev.lineChangeDetails.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      );
      return { ...prev, lineChangeDetails: details };
    });
  };
  const addLineChangeDetail = () => {
    if (form.lineChangeDetails.length >= 3) {
      toast.warning('حداکثر 3 ردیف قابل اضافه کردن است.');
      return;
    }
    setForm((prev) => ({
      ...prev,
      lineChangeDetails: [
        ...(prev.lineChangeDetails || []),
        {
          lineNumber: '',
          currentProductName: '',
          currentProductCode: '',
          currentProductId: '',
          nextProductName: '',
          nextProductCode: '',
          nextProductId: '',
          averageProductionPerShift: 0,
          remainingProduction: 0,
          lineChangeDate: '',
          lineChangeTime: '',
          displayOrder: 0,
        },
      ],
    }));
  };

  const removeLineChangeDetail = (index) => {
    setForm((prev) => {
      const next = [...(prev.lineChangeDetails || [])];
      next.splice(index, 1);
      if (next.length === 0) {
        next.push({
          lineNumber: '',
          currentProductName: '',
          currentProductCode: '',
          currentProductId: '',
          nextProductName: '',
          nextProductCode: '',
          nextProductId: '',
          averageProductionPerShift: 0,
          remainingProduction: 0,
          lineChangeDate: '',
          lineChangeTime: '',
          displayOrder: 0,
        });
      }
      return { ...prev, lineChangeDetails: next };
    });
  };

  const { data: getProduct } = useGetProducts();

  const getProducts = useMemo(() => {
    const none = { id: '', name: '', code: '' };

    return [
      none,
      ...(getProduct ?? []).map((p) => ({
        id: p.id,
        name: p.productName,
        code: p.productCode,
      })),
    ];
  }, [getProduct]);

  const filterProducts = useMemo(() => {
    const q = searchProducts.trim().toLowerCase();
    if (!q) return getProducts;

    return getProducts?.filter((p) =>
      (p?.name || '').toLowerCase().includes(q)
    );
  }, [searchProducts, getProducts]);

  const getCurrentProductInfo = (productId) => {
    return getProducts.find((p) => p.id === productId) || getProducts[0];
  };

  const getNextProductInfo = (productId) => {
    return getProducts.find((p) => p.id === productId) || getProducts[0];
  };

  const updateReport = useUpdateLineChange();

  const submitHandler = (e) => {
    e.preventDefault();

    updateReport.mutate(
      { id: selectedLine?.id, form },
      {
        onSuccess: () => {
          setOpenEdit(false);
        },
      }
    );
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex h-screen items-center justify-center overflow-auto p-4 transition-opacity duration-300 ${
        openEdit
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
          openEdit
            ? ' translate-y-0 scale-100 opacity-100'
            : '-translate-y-10 scale-0 opacity-0'
        }`}
      >
        <EditLinechangeJsx
          openEdit={openEdit}
          closeHandler={closeHandler}
          selectedLine={selectedLine}
          getProducts={getProducts}
          form={form}
          setForm={setForm}
          submitHandler={submitHandler}
          searchProducts={searchProducts}
          setSearchProducts={setSearchProducts}
          filterProducts={filterProducts}
          getCurrentProductInfo={getCurrentProductInfo}
          getNextProductInfo={getNextProductInfo}
          updateLineChangeDetail={updateLineChangeDetail}
          addLineChangeDetail={addLineChangeDetail}
          removeLineChangeDetail={removeLineChangeDetail}
        />
      </div>
    </div>
  );
}

export default EditLinechange;
