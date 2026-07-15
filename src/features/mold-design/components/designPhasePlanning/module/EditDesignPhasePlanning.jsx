import React, { useEffect, useState } from 'react';
import EditDesignPhasePlanningJsx from '../template/EditDesignPhasePlanningJsx';
import { useUpdateDesignPhasePlanning } from '../../../Api/designPhasePlanning';

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

function EditDesignPhasePlanning({
  openEditModal,
  setOpenEditModal,
  selectedDesign,
  setSelectedDesign,
}) {
  const [form, setForm] = useState({
    id: '',
    startTime: '',
    endTime: '',
    items: designPhase.map((d) => ({
      id: '',
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
  });

  useEffect(() => {
    if (!selectedDesign) return;
    setForm({
      id: selectedDesign?.id,
      startTime: selectedDesign?.startTime,
      endTime: selectedDesign?.endTime,
      productNameOrSampleCode: selectedDesign?.productNameOrSampleCode,
      plannedStartDate: selectedDesign?.plannedStartDate,
      estimatedTotalHours: selectedDesign?.estimatedTotalHours,
      actualEndDate: selectedDesign?.actualEndDate,
      items: selectedDesign?.items?.length
        ? selectedDesign?.items?.map((e) => ({
            id: e.id,
            rowNumber: e.rowNumber,
            designPhase: e.designPhase,
            production: e.production,
            designManager: e.designManager,
            tehranDesignOffice: e.tehranDesignOffice,
            qualityControlPackaging: e.qualityControlPackaging,
            machining: e.machining,
            cartonmaking: e.cartonmaking,
            sales: e.sales,
            factoryManager: e.factoryManager,
          }))
        : DesignPhase.map((d) => ({
            id: '',
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
  }, [selectedDesign, openEditModal]);

  const handleItemChange = (index, field, value) => {
    setForm((prev) => {
      const items = [...prev.items];
      items[index] = { ...items[index], [field]: value };
      return { ...prev, items };
    });
  };
  const closeHandler = () => {
    setOpenEditModal(false);
    setSelectedDesign(null);
  };

  const updateReport = useUpdateDesignPhasePlanning();

  const submitHandler = (e) => {
    e.preventDefault();

    updateReport.mutate(
      {
        id: selectedDesign?.id,
        form,
      },
      {
        onSuccess: () => {
          setOpenEditModal(false);
          setSelectedDesign(null);
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
        onClick={closeHandler}
      />
      <div
        className={`relative flex max-h-[90vh] max-w-[95vw] transform flex-col rounded-[15px] bg-linear-to-tl from-black to-gray-600 p-6 text-white shadow-2xl transition-all duration-300 max-md:h-160 max-md:overflow-auto ${
          openEditModal
            ? 'translate-y-0 scale-100 opacity-100'
            : '-translate-y-10 scale-0 opacity-0'
        }`}
      >
        <EditDesignPhasePlanningJsx
          closeHandler={closeHandler}
          submitHandler={submitHandler}
          form={form}
          selectedDesign={selectedDesign}
          handleItemChange={handleItemChange}
          setForm={setForm}
        />
      </div>
    </div>
  );
}

export default EditDesignPhasePlanning;
