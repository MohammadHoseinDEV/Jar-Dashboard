import React, { useEffect, useState } from 'react';

import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';

import close from '../../../../assets/images/close.png';
import { useGetProfile } from '../../../../hooks/profile/profile';
import { useCreateQualityReports } from '../../Api/QualityControl-Package/quality';

function QualityCreateReports({ openCreateReport, setOpenCreateReport }) {
  const [form, setForm] = useState({
    reportDate: '',
    shift: '',
    personnelName: '',
    line1_ProductName: '',
    line1_MachineSpeed: 0,
    line1_ProductWeight: 0,
    line1_OvenChainSpeed: 0,
    line1_CountPerTray: 0,
    line1_CountPerPallet: 0,
    line1_Shrinking: 0,
    line1_Cellophane: 0,
    line1_Palletizing: 0,
    line2_ProductName: '',
    line2_MachineSpeed: 0,
    line2_ProductWeight: 0,
    line2_OvenChainSpeed: 0,
    line2_CountPerTray: 0,
    line2_CountPerPallet: 0,

    line2_Shrinking: 0,
    line2_Cellophane: 0,
    line2_Palletizing: 0,
    line3_ProductName: '',
    line3_MachineSpeed: 0,
    line3_ProductWeight: 0,
    line3_OvenChainSpeed: 0,
    line3_CountPerTray: 0,
    line3_CountPerPallet: 0,
    line3_Shrinking: 0,
    line3_Cellophane: 0,
    line3_Palletizing: 0,
    mpC_Line1_FailureReport: '',
    mpC_Line1_SettingsReport: '',
    mpC_Line1_WasteStatistics: '',
    mpC_Line2_FailureReport: '',
    mpC_Line2_SettingsReport: '',
    mpC_Line2_WasteStatistics: '',
    mpC_Line3_FailureReport: '',
    mpC_Line3_SettingsReport: '',
    mpC_Line3_WasteStatistics: '',
    ebI_Line1_FailureReport: '',
    ebI_Line1_SettingsReport: '',
    ebI_Line1_WasteStatistics: '',
    ebI_Line2_FailureReport: '',
    ebI_Line2_SettingsReport: '',
    ebI_Line2_WasteStatistics: '',
    ebI_Line3_FailureReport: '',
    ebI_Line3_SettingsReport: '',
    ebI_Line3_WasteStatistics: '',
    packagingLine_FailureReport: '',
    packagingLine_SettingsReport: '',
    quarantinePallets_Statistics: '',
    quarantinePallets_Line1: '',
    quarantinePallets_Line2: '',
    quarantinePallets_Line3: '',
  });

  const { data: profile } = useGetProfile();

  useEffect(() => {
    if (profile?.data?.currentShift?.shiftName) {
      setForm((p) => ({
        ...p,
        shift: profile?.data?.currentShift?.shiftName,
      }));
    }

    if (profile?.data?.fullName) {
      setForm((p) => ({
        ...p,
        personnelName: profile?.data?.fullName,
      }));
    }
  }, [profile]);

  const createReport = useCreateQualityReports();
  const submitHandler = (e) => {
    e.preventDefault();

    createReport.mutate(form, {
      onSuccess: () => {
        setOpenCreateReport(!openCreateReport);
      },
    });
  };
  return (
    <div
      className={`fixed inset-0 z-50 flex h-screen items-center justify-center overflow-hidden p-4 transition-opacity duration-300 ${
        openCreateReport
          ? 'pointer-events-auto opacity-100 '
          : 'pointer-events-none opacity-0'
      }`}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
      <div
        className={`relative flex max-h-[90vh] w-[1000px] max-w-[95vw] flex-col gap-4 overflow-hidden rounded-[15px] bg-linear-to-bl from-black to-gray-600 p-6 text-white shadow-2xl transition-all duration-300 max-2xl:w-[900px] ${
          openCreateReport
            ? 'translate-y-0 scale-100 opacity-100 '
            : '-translate-y-10 scale-0 opacity-0'
        }`}
      >
        <div className="flex shrink-0 items-center justify-between pb-5">
          <p className="5 pr-1.5 font-[SamimBold] text-[20px]">
            ایجاد گزارش جدید
          </p>
          <button
            onClick={() => {
              setOpenCreateReport(!openCreateReport);
            }}
            className="cursor-pointer rounded-[10px] bg-white/80 p-1.5 text-[30px] text-red-500 transition-all delay-100 duration-75 ease-in-out hover:bg-black"
          >
            <img
              src={close}
              alt="close"
              width={20}
              className="transition-all delay-100 duration-100 ease-in-out hover:scale-110"
            />
          </button>
        </div>
        <form
          className="no-scrollbar flex min-h-0 flex-col overflow-x-hidden overflow-y-auto max-md:max-h-[70vh]"
          onSubmit={submitHandler}
        >
          {/* تاریخ-نام-شیفت */}
          <div className="grid grid-cols-3 gap-5 max-md:grid-cols-1">
            <label htmlFor="reportDate" className="flex flex-col">
              تاریخ
              <DatePicker
                calendar={persian}
                locale={persian_fa}
                placeholder="تاریخ ثبت گزارش"
                format="YYYY/MM/DD"
                calendarPosition="bottom-center"
                onChange={(value) => {
                  setForm({
                    ...form,
                    reportDate: value
                      ? value.toDate().toISOString().split('T')[0]
                      : '',
                  });
                }}
                inputClass="w-full rounded-xl max-md:mt-1  bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
              />
            </label>
            <label htmlFor="shift">
              نام شیفت
              <input
                type="text"
                readOnly
                name="shift"
                value={form.shift}
                className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none max-md:mt-1"
              />
            </label>
            <label htmlFor="personnelName">
              نام و نام خانوادگی
              <input
                type="text"
                name="personnelName"
                readOnly
                value={form.personnelName}
                className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none max-md:mt-1"
              />
            </label>
          </div>
          <p className="mx-10 mb-2 border-b border-white/50 pt-2"></p>
          {/* آمار پالت های قرنطینه و علت */}
          <div className="space-x-1 pr-1.5 pb-5 font-[SamimBold] text-[20px]">
            گزارش ضایعات خطوط
          </div>
          <div className="grid grid-cols-4 gap-5 max-md:grid-cols-1">
            <label htmlFor="quarantinePallets_Statistics">
              آمار پالت های قرنطینه و علت
              <input
                type="text"
                name="quarantinePallets_Statistics"
                placeholder="امار پالت ها"
                maxLength={200}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: e.target.value,
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] max-md:mt-1"
              />
            </label>
            <label htmlFor="quarantinePallets_Line1">
              خط 1
              <input
                type="text"
                name="quarantinePallets_Line1"
                placeholder="خط 1"
                maxLength={180}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: e.target.value,
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[VazirLight] text-[18px] text-white outline-none placeholder:font-[Samim] max-md:mt-1"
              />
            </label>
            <label htmlFor="quarantinePallets_Line2">
              خط 2
              <input
                type="text"
                name="quarantinePallets_Line2"
                placeholder="خط 2"
                maxLength={180}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: e.target.value,
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[VazirLight] text-[18px] text-white outline-none placeholder:font-[Samim] max-md:mt-1"
              />
            </label>
            <label htmlFor="quarantinePallets_Line3">
              خط 3
              <input
                type="text"
                name="quarantinePallets_Line3"
                placeholder="خط 3"
                maxLength={180}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: e.target.value,
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[VazirLight] text-[18px] text-white outline-none placeholder:font-[Samim] max-md:mt-1"
              />
            </label>
          </div>
          <p className="mx-10 mb-2 border-b border-white/50 pt-2"></p>
          {/* خط 1 */}
          <div className="space-x-1 pr-1.5 pb-5 font-[SamimBold] text-[20px]">
            <span>خط</span>
            <span className="font-[AvenirLTProMedium]">1</span>
          </div>
          <div className="grid grid-cols-3 gap-5 max-md:grid-cols-1">
            <label htmlFor="line1_ProductName">
              نام محصول
              <input
                type="text"
                name="line1_ProductName"
                placeholder="نام محصول خط 1"
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: e.target.value,
                  }));
                }}
                dir="ltr"
                className="w-full rounded-xl bg-white/10 p-3 text-right font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] max-md:mt-1"
              />
            </label>
            <label htmlFor="line1_MachineSpeed">
              سرعت ماشین
              <input
                type="text"
                name="line1_MachineSpeed"
                placeholder="سرعت ماشین خط 1"
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] max-md:mt-1"
              />
            </label>
            <label htmlFor="line1_ProductWeight">
              وزن محصول
              <input
                type="text"
                name="line1_ProductWeight"
                placeholder="وزن محصول خط 1"
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] max-md:mt-1"
              />
            </label>
            <label htmlFor="line1_OvenChainSpeed">
              سرعت زنجیر گرمخانه
              <input
                type="text"
                name="line1_OvenChainSpeed"
                placeholder="سرعت زنجیز گرمخانه خط 1"
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] max-md:mt-1"
              />
            </label>
            <label htmlFor="line1_CountPerTray">
              تعداد در سینی
              <input
                type="text"
                name="line1_CountPerTray"
                placeholder="تعداد در سینی خط 1"
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] max-md:mt-1"
              />
            </label>
            <label htmlFor="line1_CountPerPallet">
              تعداد در پالت
              <input
                type="text"
                name="line1_CountPerPallet"
                placeholder="تعداد در پالت خط 1"
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] max-md:mt-1"
              />
            </label>
            <label htmlFor="line1_Shrinking">
              نوع بسته بندی و مقدار تولید(شیرینک)
              <input
                type="text"
                name="line1_Shrinking"
                placeholder="شرینک"
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] max-md:mt-1"
              />
            </label>
            <label htmlFor="line1_Cellophane">
              نوع بسته بندی و مقدار تولید (سلفون)
              <input
                type="text"
                name="line1_Cellophane"
                placeholder="سلفون"
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] max-md:mt-1"
              />
            </label>
            <label htmlFor="line1_Palletizing">
              نوع بسته بندی و مقدار تولید (پالتایزری)
              <input
                type="text"
                name="line1_Cellophane"
                placeholder="پالتایزری"
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] max-md:mt-1"
              />
            </label>
          </div>
          <p className="mx-10 mb-2 border-b border-white/50 pt-2"></p>
          {/* خط 2 */}
          <div className="space-x-1 pr-1.5 pb-5 font-[SamimBold] text-[20px]">
            <span>خط</span>
            <span className="font-[AvenirLTProMedium]">2</span>
          </div>
          <div className="grid grid-cols-3 gap-5 max-md:grid-cols-1">
            <label htmlFor="line2_ProductName">
              نام محصول
              <input
                type="text"
                name="line2_ProductName"
                placeholder="نام محصول خط 2"
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: e.target.value,
                  }));
                }}
                dir="ltr"
                className="w-full rounded-xl bg-white/10 p-3 text-right font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] max-md:mt-1"
              />
            </label>
            <label htmlFor="line2_MachineSpeed">
              سرعت ماشین
              <input
                type="text"
                name="line2_MachineSpeed"
                placeholder="سرعت ماشین خط 2"
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] max-md:mt-1"
              />
            </label>
            <label htmlFor="line2_ProductWeight">
              وزن محصول
              <input
                type="text"
                name="line2_ProductWeight"
                placeholder="وزن محصول خط 2"
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] max-md:mt-1"
              />
            </label>
            <label htmlFor="line2_OvenChainSpeed">
              سرعت زنجیر گرمخانه
              <input
                type="text"
                name="line2_OvenChainSpeed"
                placeholder="سرعت زنجیر گرمخانه خط 2"
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] max-md:mt-1"
              />
            </label>
            <label htmlFor="line2_CountPerTray">
              تعداد در سینی
              <input
                type="text"
                name="line2_CountPerTray"
                placeholder="تعداد در سینی خط 2"
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] max-md:mt-1"
              />
            </label>
            <label htmlFor="line2_CountPerPallet">
              تعداد در پالت
              <input
                type="text"
                name="line2_CountPerPallet"
                placeholder="تعداد در پالت خط 2"
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] max-md:mt-1"
              />
            </label>
            <label htmlFor="line2_Shrinking">
              نوع بسته بندی و مقدار تولید(شیرینک)
              <input
                type="text"
                name="line2_Shrinking"
                placeholder="شرینک"
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] max-md:mt-1"
              />
            </label>
            <label htmlFor="line2_Cellophane">
              نوع بسته بندی و مقدار تولید (سلفون)
              <input
                type="text"
                name="line2_Cellophane"
                placeholder="سلفون"
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] max-md:mt-1"
              />
            </label>
            <label htmlFor="line2_Palletizing">
              نوع بسته بندی و مقدار تولید (پالتایزری)
              <input
                type="text"
                name="line2_Palletizing"
                placeholder="پالتایزری"
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] max-md:mt-1"
              />
            </label>
          </div>
          <p className="mx-10 mb-2 border-b border-white/50 pt-2"></p>
          {/* خط 3 */}
          <div className="space-x-1 pr-1.5 pb-5 font-[SamimBold] text-[20px]">
            <span>خط</span>
            <span className="font-[AvenirLTProMedium]">3</span>
          </div>
          <div className="grid grid-cols-3 gap-5 max-md:grid-cols-1">
            <label htmlFor="line2_ProductName">
              نام محصول
              <input
                type="text"
                name="line3_ProductName"
                placeholder="نام محصول خط 3"
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: e.target.value,
                  }));
                }}
                dir="ltr"
                className="w-full rounded-xl bg-white/10 p-3 text-right font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] max-md:mt-1"
              />
            </label>
            <label htmlFor="line3_MachineSpeed">
              سرعت ماشین
              <input
                type="text"
                name="line3_MachineSpeed"
                placeholder="سرعت ماشین خط 3"
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] max-md:mt-1"
              />
            </label>
            <label htmlFor="line3_ProductWeight">
              وزن محصول
              <input
                type="text"
                name="line3_ProductWeight"
                placeholder="وزن محصول خط 3"
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] max-md:mt-1"
              />
            </label>
            <label htmlFor="line3_OvenChainSpeed">
              سرعت زنجیر گرمخانه
              <input
                type="text"
                name="line3_OvenChainSpeed"
                placeholder="سرعت زنجیر گرمخانه خط 3"
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] max-md:mt-1"
              />
            </label>
            <label htmlFor="line3_CountPerTray">
              تعداد در سینی
              <input
                type="text"
                name="line3_CountPerTray"
                placeholder="تعداد در سینی خط 3"
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] max-md:mt-1"
              />
            </label>
            <label htmlFor="line3_CountPerPallet">
              تعداد در پالت
              <input
                type="text"
                name="line3_CountPerPallet"
                placeholder="تعداد در پالت خط 3"
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] max-md:mt-1"
              />
            </label>
            <label htmlFor="line3_Shrinking">
              نوع بسته بندی و مقدار تولید(شیرینک)
              <input
                type="text"
                name="line3_Shrinking"
                placeholder="شرینک"
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] max-md:mt-1"
              />
            </label>
            <label htmlFor="line3_Cellophane">
              نوع بسته بندی و مقدار تولید (سلفون)
              <input
                type="text"
                name="line3_Cellophane"
                placeholder="سلفون"
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] max-md:mt-1"
              />
            </label>
            <label htmlFor="line3_Palletizing">
              نوع بسته بندی و مقدار تولید (پالتایزری)
              <input
                type="text"
                name="line3_Palletizing"
                placeholder="پالتایزری"
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] max-md:mt-1"
              />
            </label>
          </div>
          <p className="mx-10 mb-2 border-b border-white/50 pt-2"></p>
          {/* دستگاه MPC */}
          <div className="space-x-1 pr-1.5 pb-5 font-[SamimBold] text-[20px]">
            <span>دستگاه</span>
            <span className="font-[AvenirLTProMedium]">M.P.C</span>
          </div>
          <div className="grid grid-cols-3 gap-5 max-md:grid-cols-1">
            <label htmlFor="mpC_Line1_FailureReport">
              اعلام خرابی خط 1
              <input
                type="text"
                name="mpC_Line1_FailureReport"
                placeholder="اعلام خرابی ها"
                maxLength={75}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: e.target.value,
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] max-md:mt-1"
              />
            </label>
            <label htmlFor="mpC_Line1_SettingsReport">
              اعلام تنظیمات توسط واحد اعمال کننده خط 1
              <input
                type="text"
                name="mpC_Line1_SettingsReport"
                placeholder="اعلام تنظیمات توسط واحد اعمال کننده"
                maxLength={45}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: e.target.value,
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] max-md:mt-1"
              />
            </label>
            <label htmlFor="mpC_Line1_WasteStatistics">
              آمار ضایعات خط 1
              <input
                type="text"
                name="mpC_Line1_WasteStatistics"
                placeholder="آمار ضایعات"
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: e.target.value,
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] max-md:mt-1"
              />
            </label>
            <label htmlFor="mpC_Line2_FailureReport">
              اعلام خرابی خط 2
              <input
                type="text"
                name="mpC_Line2_FailureReport"
                placeholder="اعلام خرابی ها"
                maxLength={75}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: e.target.value,
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] max-md:mt-1"
              />
            </label>
            <label htmlFor="mpC_Line2_SettingsReport">
              اعلام تنظیمات توسط واحد اعمال کننده خط 2
              <input
                type="text"
                name="mpC_Line2_SettingsReport"
                maxLength={45}
                placeholder="اعلام تنظیمات توسط واحد اعمال کننده"
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: e.target.value,
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] max-md:mt-1"
              />
            </label>
            <label htmlFor="mpC_Line2_WasteStatistics">
              آمار ضایعات خط 2
              <input
                type="text"
                name="mpC_Line2_WasteStatistics"
                placeholder="آمار ضایعات"
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: e.target.value,
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] max-md:mt-1"
              />
            </label>
            <label htmlFor="mpC_Line3_FailureReport">
              اعلام خرابی خط 3
              <input
                type="text"
                name="mpC_Line3_FailureReport"
                placeholder="اعلام خرابی ها"
                maxLength={75}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: e.target.value,
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] max-md:mt-1"
              />
            </label>
            <label htmlFor="mpC_Line3_SettingsReport">
              اعلام تنظیمات توسط واحد اعمال کننده خط 3
              <input
                type="text"
                name="mpC_Line3_SettingsReport"
                maxLength={45}
                placeholder="اعلام تنظیمات توسط واحد اعمال کننده"
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: e.target.value,
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] max-md:mt-1"
              />
            </label>
            <label htmlFor="mpC_Line3_WasteStatistics">
              آمار ضایعات خط 3
              <input
                type="text"
                name="mpC_Line3_WasteStatistics"
                placeholder="آمار ضایعات"
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: e.target.value,
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] max-md:mt-1"
              />
            </label>
          </div>
          <p className="mx-10 mb-2 border-b border-white/50 pt-2"></p>
          {/* دستگاه EBI */}
          <div className="space-x-1 pr-1.5 pb-5 font-[SamimBold] text-[20px]">
            <span>دستگاه</span>
            <span className="font-[AvenirLTProMedium]">E.B.I</span>
          </div>
          <div className="grid grid-cols-3 gap-5 max-md:grid-cols-1">
            <label htmlFor="ebI_Line1_FailureReport">
              اعلام خرابی خط 1
              <input
                type="text"
                name="ebI_Line1_FailureReport"
                placeholder="اعلام خرابی ها"
                max={75}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: e.target.value,
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] max-md:grid-cols-1"
              />
            </label>
            <label htmlFor="ebI_Line1_SettingsReport">
              اعلام تنظیمات توسط واحد اعمال کننده خط 1
              <input
                type="text"
                name="ebI_Line1_SettingsReport"
                placeholder="اعلام تنظیمات توسط واحد اعمال کننده"
                maxLength={45}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: e.target.value,
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] max-md:grid-cols-1"
              />
            </label>
            <label htmlFor="ebI_Line1_WasteStatistics">
              آمار ضایعات خط 1
              <input
                type="text"
                name="ebI_Line1_WasteStatistics"
                placeholder="آمار ضایعات"
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: e.target.value,
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] max-md:grid-cols-1"
              />
            </label>
            <label htmlFor="ebI_Line2_FailureReport">
              اعلام خرابی خط 2
              <input
                type="text"
                name="ebI_Line2_FailureReport"
                placeholder="اعلام خرابی ها"
                maxLength={75}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: e.target.value,
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] max-md:grid-cols-1"
              />
            </label>
            <label htmlFor="ebI_Line2_SettingsReport">
              اعلام تنظیمات توسط واحد اعمال کننده خط 2
              <input
                type="text"
                name="ebI_Line2_SettingsReport"
                placeholder="اعلام تنظیمات توسط واحد اعمال کننده"
                maxLength={45}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: e.target.value,
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] max-md:grid-cols-1"
              />
            </label>
            <label htmlFor="ebI_Line2_WasteStatistics">
              آمار ضایعات خط 2
              <input
                type="text"
                name="ebI_Line2_WasteStatistics"
                placeholder="آمار ضایعات"
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: e.target.value,
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] max-md:grid-cols-1"
              />
            </label>
            <label htmlFor="ebI_Line3_FailureReport">
              اعلام خرابی خط 3
              <input
                type="text"
                name="ebI_Line3_FailureReport"
                placeholder="اعلام خرابی ها"
                maxLength={75}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: e.target.value,
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] max-md:grid-cols-1"
              />
            </label>
            <label htmlFor="ebI_Line3_SettingsReport">
              اعلام تنظیمات توسط واحد اعمال کننده خط 3
              <input
                type="text"
                name="ebI_Line3_SettingsReport"
                placeholder="اعلام تنظیمات توسط واحد اعمال کننده"
                maxLength={45}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: e.target.value,
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] max-md:grid-cols-1"
              />
            </label>
            <label htmlFor="ebI_Line3_WasteStatistics">
              آمار ضایعات خط 3
              <input
                type="text"
                name="ebI_Line3_WasteStatistics"
                placeholder="آمار ضایعات"
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: e.target.value,
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] max-md:grid-cols-1"
              />
            </label>
          </div>
          <p className="mx-10 mb-2 border-b border-white/50 pt-2"></p>
          {/* خط بسته بندی */}
          <div className="space-x-1 pr-1.5 pb-5 font-[SamimBold] text-[20px]">
            خط بسته بندی
          </div>
          <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
            <label htmlFor="packagingLine_FailureReport">
              اعلام خرابی
              <input
                type="text"
                name="packagingLine_FailureReport"
                placeholder="اعلام خرابی خط بسته بندی"
                maxLength={230}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: e.target.value,
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] max-md:mt-1"
              />
            </label>
            <label htmlFor="packagingLine_SettingsReport">
              اعلام تنظیمات توسط واحد اعمال کننده
              <input
                type="text"
                name="packagingLine_SettingsReport"
                placeholder="اعلام تنظیمات خط بسته بندی"
                maxLength={230}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: e.target.value,
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] max-md:mt-1"
              />
            </label>
          </div>
          <button
            type="submit"
            className="col-span-4 float-left mx-2 my-2 shrink-0 cursor-pointer rounded-xl bg-linear-to-tl from-green-900 to-green-500 px-5 py-3 font-[Samim] transition-all delay-100 duration-150 ease-in-out hover:scale-105"
          >
            ثبت گزارش
          </button>
        </form>
      </div>
    </div>
  );
}

export default QualityCreateReports;
