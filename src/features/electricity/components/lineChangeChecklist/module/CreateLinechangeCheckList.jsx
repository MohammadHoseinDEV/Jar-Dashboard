import React, { useEffect, useState } from 'react';
import { useGetProfile } from '../../../../../hooks/profile/profile';
import CreateLineChangeCheckListJsx from '../template/CreateLineChangeCheckListJsx';
import { useCreateLineChangeCheckList } from '../../../Api/LineChangeCheckList/lineChangeCheckList';

const operations = [
  { id: 1, name: 'بازدید و چک کردن سربندی موتورها' },
  {
    id: 2,
    name: 'بازدید و چک کردن کابل های ورودی، ایزوله های موجود و سینی کابل ها ماشین های IS',
  },
  { id: 3, name: 'نظافت الکتروموتورها' },
  { id: 4, name: 'بازدید و چک کردن مدارات فرمان و قدرت ماشین IS و گرمخانه' },
  {
    id: 5,
    name: 'بازدید و چک کردن کلیه رله ها و کنتاکتورها ماشین IS و گرمخانه',
  },
  { id: 6, name: 'بازدید و چک کردن تمامی مشعل های گرمخانه' },
  {
    id: 7,
    name: 'چک کردن و بررسی سیستم خنک کاری و کاور سرو موتورها و پوشرهای ماشین IS ',
  },
  { id: 8, name: 'بازدید و چک کردن سنسورها و میکروسوئیچ ها' },
  { id: 9, name: 'چک کردن شماره ها و لیبل گذاری های روی کابل ها و تجهیزات' },
  {
    id: 10,
    name: 'چک کردن و بررسی امرجنسی ها، کلیدهای کلنگی و شستی های استارت استپ ',
  },
  { id: 11, name: 'آچار کشی تابلوهای Localماشین IS' },
  {
    id: 12,
    name: 'اطمینان از آماده بکار بودن فن کولینگ ماشین و فن کولینگ کانوایر SPARE',
  },
  { id: 13, name: 'بازدید و چک کردن کلیه سربوبین ها و شیر برقی ها' },
  { id: 14, name: 'نظافت کامل تابلوها و بادگیری آن ها به وسیله بلوئر' },
  { id: 15, name: 'چک کردن و کنترل عایق نسوز کابل های ماشین IS ' },
  { id: 16, name: 'چک کردن و بررسی تمامی اتصالات و کانکتورها ماشین IS ' },
  {
    id: 17,
    name: 'اطمینان از خنک کاری پروانه الکتروموتورها و سالم بودن پره های آن',
  },
];

const initioalState = {
  companyId: '',
  checklistDate: '',
  checklistTime: '',
  lineName: '',
  shiftFlags: 2,
  description: '',
  items: operations?.map((e) => ({
    operationName: e?.name,
    isCompleted: true,
    description: '',
    executorName: '',
  })),
};

function CreateLinechangeCheckList({ openCreateModal, setOpenCreateModal }) {
  const [form, setForm] = useState(initioalState);

  const { data: profile } = useGetProfile();

  const findcompany = profile?.data?.companyRoles.find(
    (c) => c.companyId
  )?.companyId;

  useEffect(() => {
    if (!profile?.data) return;
    setForm((p) => ({
      ...p,
      companyId: findcompany,
      description: profile?.data?.currentShift?.shiftName,
    }));
  }, [profile]);

  const closeHandler = () => {
    setOpenCreateModal(false);
    setForm({
      ...initioalState,
      companyId: findcompany,
      description: profile?.data?.currentShift?.shiftName || '',
    });
  };

  const createReport = useCreateLineChangeCheckList();

  const toHHmmss = (value) => (value ? `${value}:00` : '');

  const submitHandler = (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      checklistTime: toHHmmss(form.checklistTime),
    };

    createReport.mutate(payload, {
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
        className={`relative flex max-h-[90vh] min-h-0 max-w-[80vw] transform flex-col overflow-hidden rounded-[15px] bg-linear-to-bl from-black to-gray-600 p-6 text-white shadow-2xl transition-all duration-300 max-2xl:scale-95 max-md:h-160 ${
          openCreateModal
            ? 'translate-y-0 scale-100 opacity-100'
            : '-translate-y-10 scale-0 opacity-0'
        }`}
      >
        <CreateLineChangeCheckListJsx
          closeHandler={closeHandler}
          form={form}
          setForm={setForm}
          submitHandler={submitHandler}
        />
      </div>
    </div>
  );
}

export default CreateLinechangeCheckList;
