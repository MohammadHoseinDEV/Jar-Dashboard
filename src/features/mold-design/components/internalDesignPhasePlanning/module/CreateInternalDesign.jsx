import React, { useMemo, useState } from 'react';
import CreateInternalDesignJsx from '../template/CreateInternalDesignJsx';
import { useGetProducts } from '../../../../product_wareHouse/Api/productsApi';
import { useCreateInternalDesignPhasePlanning } from '../../../Api/internalDesignPhasePlanning';

const DesignPhase = [
  {
    id: 1,
    name: 'بررسی اولیه نمونه/نقشه تکمیل داده های طراحی در فرم فرم داده ها به طراحی و تصدیق نقشه نمونه به شماره F1007',
  },
  { id: 2, name: 'تهیه نقشه نمونه / محصول نهایی' },
  { id: 3, name: 'تهیه نقشه متعلقات قالب' },
  {
    id: 4,
    name: 'تصدیق نقشه های متعلقات قالب در فرم داده ها به طراحی و تصدیق نقشه نمونه به شماره F1007',
  },
  { id: 5, name: 'تهیه قالب نمونه' },
  { id: 6, name: 'تهیه نمونه "گچی محصول' },
  { id: 7, name: 'تصدیق قالب و نمونه گچی محصول' },
  { id: 8, name: 'ساخت متعلقات قالب' },
  {
    id: 9,
    name: 'طراحی فرآیند تولید بلور در دستورالعمل پارامترهای راه اندازی اختصاصی خطوط تولید',
  },
  { id: 10, name: 'تصدیق و بازنگری نهایی مدارک تولید' },
  {
    id: 11,
    name: 'تاییدیه در جلسه بازنگری طراحی در فرم صورتجلسه طراحی به شماره F1005',
  },
  { id: 12, name: 'تایید نمونه توسط واحد فروش' },
  {
    id: 13,
    name: 'صحه گذاری میدانی و بازنگری نهایی طراحی قالب و دستورالعمل های تولید در فرم فرم صحه گذاری کیدانی قالب به شماره F1008',
  },
  { id: 14, name: 'طراحی اقلام بسته بندی و نحوه بسته بندی' },
  {
    id: 15,
    name: 'تصدیق صحه گذاری و بازنگری نهایی نمونه های ارسالی اقلام بسته بندی',
  },
  {
    id: 16,
    name: 'تعیین ابعاد کارتن و سایر اقلام بسته بندی و اعلام به تامین کننده',
  },
  { id: 17, name: 'صحه گذاری اقلام بسته بندی تهیه شده' },
];

function CreateInternalDesign({ openCreateModal, setOpenCreateModal }) {
  const [form, setForm] = useState({
    startTime: '',
    endTime: '',
    productNameOrSampleCode: '',
    plannedStartDate: '',
    estimatedTotalHours: 0,
    actualEndDate: '',
    items: DesignPhase.map((d) => ({
      rowNumber: d.id,
      designPhase: d.name,
      production: true,
      designManager: false,
      tehranDesignOffice: true,
      qualityControlPackaging: false,
      machining: true,
      cartonmaking: false,
      sales: true,
      factoryManager: false,
    })),
  });

  const handleItemChange = (index, field, value) => {
    setForm((prev) => {
      const items = [...prev.items];
      items[index] = { ...items[index], [field]: value };
      return { ...prev, items };
    });
  };
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

  const createReport = useCreateInternalDesignPhasePlanning();

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
        <CreateInternalDesignJsx
          closeHandler={closeHandler}
          handleItemChange={handleItemChange}
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

export default CreateInternalDesign;
