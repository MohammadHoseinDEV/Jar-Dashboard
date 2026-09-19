import React, { useMemo, useState } from 'react';
import { useCreateDesignPhasePlanning } from '../../../Api/designPhasePlanning';
import CreateDesignPhasePlanningJsx from '../template/CreateDesignPhasePlanningJsx';
import { useGetProducts } from '../../../../product_wareHouse/Api/productsApi';
import { toast } from 'react-toastify';

const designPhase = [
  {
    id: 1,
    name: ' بررسی اولیه نمونه / نقشه تکمیل داد های طراحی در فرم فرم داد ها به طراحی و تصدیق نقشه نمونه به شماره F1007',
  },
  { id: 2, name: 'تهیه نقشه محصول و تصدیق در کارخانه' },
  { id: 3, name: 'تهیه نقشه قالب و متعلقات قالب' },
  {
    id: 4,
    name: 'تصدیق نقشه های متعلقات قالب در فرم داده ها به طراحی و تصدیق نقشه نمونه به شماره F1007',
  },
  {
    id: 5,
    name: 'تهیه پرینت سه بعدی نمونه یا قالب نمونه یا نمونه گچی (درصورت نیاز)',
  },
  { id: 6, name: 'تصدیق پرینت سه بعدی یا نمونه گچی' },
  { id: 7, name: 'تهیه نمونه قالب و صحه گذاری طراحی' },
  { id: 8, name: 'نمونه گیری خط تولید و اصلاح نقشه ها' },
  { id: 9, name: 'تایید نمونه توسط واحد فروش' },
  { id: 10, name: 'تصدیق و بازنگری نهایی مدارک تولید' },
  {
    id: 11,
    name: 'تاییدیه در جلسه بازنگری طراحی در فرم صورتجلسه طراحی به شماره F1005',
  },
  { id: 12, name: 'تایید نمونه توسط واحد فروش' },
  {
    id: 13,
    name: 'صحه گذاری میدانی و بازنگری نهایی طراحی قالب و دستور العمل های تولید در فرم فرم صحه گذاری میدانی قالب به شماره F1008',
  },
  { id: 14, name: 'تهیه شناسنامه محصول' },
];

const initialState = {
  startTime: '',
  endTime: '',
  productName: '',
  productCode: '',
  formNumber: '',
  items: designPhase.map((d) => ({
    rowNumber: d.id,
    designPhase: d.name,
    production: true,
    design: false,
    supplier: true,
    qualityControlPackaging: false,
    machining: true,
    sales: false,
    factoryManager: true,
  })),
};

function CreateDesignPhasePlanning({ openCreateModal, setOpenCreateModal }) {
  const [form, setForm] = useState(initialState);

  const handleItemChange = (index, field, value) => {
    setForm((prev) => {
      const items = [...prev.items];
      items[index] = { ...items[index], [field]: value };
      return { ...prev, items };
    });
  };

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
  const createReport = useCreateDesignPhasePlanning();

  const submitHandler = (e) => {
    e.preventDefault();

    if (!form.formDate) {
      toast.warning('لطفا تاریخ را انتخاب کنید');
      return;
    }
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
        <CreateDesignPhasePlanningJsx
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

export default CreateDesignPhasePlanning;
