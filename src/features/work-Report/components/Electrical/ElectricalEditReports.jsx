import React, { useEffect, useState } from 'react';

import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';

import close from '../../../../assets/images/close.png';
import TimePickerInput from '../../../../Time/TimePickerInput';
import { toast } from 'react-toastify';
import { useUpdateElectericalReports } from '../../Api/Electrical/electrical';

function ElectricalEditReports({
  openEditModal,
  setOpenEditModal,
  selectedElectrical,
  setSelectedElectrical,
}) {
  const [form, setForm] = useState({
    id: '',
    reportDate: '',
    dayOfWeek: 1,
    shiftName: '',
    personnelName: '',
    shiftSupervisorName: '',
    presentPersonnel: '',
    vacationEntitlementPersonnel: '',
    sickLeavePersonnel: '',
    absentPersonnel: '',
    netA_Row1_Time: '',
    netA_Row1_Ampere20KV: 0,
    netA_Row1_Ampere380V: 0,
    netA_Row2_Time: '',
    netA_Row2_Ampere20KV: 0,
    netA_Row2_Ampere380V: 0,
    netA_Row3_Time: '',
    netA_Row3_Ampere20KV: 0,
    netA_Row3_Ampere380V: 0,
    netB_Row1_Time: '',
    netB_Row1_Ampere20KV: 0,
    netB_Row1_Ampere380V: 0,
    netB_Row2_Time: '',
    netB_Row2_Ampere20KV: 0,
    netB_Row2_Ampere380V: 0,
    netB_Row3_Time: '',
    netB_Row3_Ampere20KV: 0,
    netB_Row3_Ampere380V: 0,
    inspection_Generators: true,
    inspection_Batteries: true,
    inspection_UPS: true,
    inspection_MainSwitches: true,
    distributionRoomTemperature: 0,
    substationRoomTemperature: 0,
    airCompressor1_Working: true,
    airCompressor2_Working: true,
    airCompressor3_Working: true,
    airCompressor4_Working: true,
    cleaning_DistributionRoom: true,
    cleaning_ElectricalRoom: true,
    lighting_Yard: true,
    lighting_Hall: true,
    airCompressor1_Ampere: 0,
    airCompressor1_Hertz: 0,
    airCompressor2_Ampere: 0,
    airCompressor2_Hertz: 0,
    airCompressor3_Ampere: 0,
    airCompressor3_Hertz: 0,
    combustionFan110KW_EquipmentNumber: '',
    combustionFan110KW_Ampere: 0,
    combustionFan110KW_Hertz: 0,
    suctionFan55KW_EquipmentNumber: '',
    suctionFan55KW_Ampere: 0,
    suctionFan55KW_Hertz: 0,
    wallCoolingFan110KW_EquipmentNumber: '',
    wallCoolingFan110KW_Ampere: 0,
    wallCoolingFan110KW_Hertz: 0,
    working_EquipmentNumber: '',
    working_Ampere: 0,
    working_Hertz: 0,
    gologah_EquipmentNumber: '',
    gologah_Ampere: 0,
    gologah_Hertz: 0,
    forehearthFanLine1_Ampere: 0,
    forehearthFanLine1_Hertz: 0,
    forehearthFanLine2_Ampere: 0,
    forehearthFanLine2_Hertz: 0,
    forehearthFanLine3_Ampere: 0,
    forehearthFanLine3_Hertz: 0,
    pataqiFan_EquipmentNumber: '',
    pataqiFan_Ampere: 0,
    pataqiFan_Hertz: 0,
    returnWaterPump_EquipmentNumber: '',
    returnWaterPump_Ampere: 0,
    returnWaterPump_Hertz: 0,
    machineCoolingFan1_EquipmentNumber: '',
    machineCoolingFan1_Ampere: 0,
    machineCoolingFan1_Hertz: 0,
    conveyorCoolingFan1_EquipmentNumber: '',
    conveyorCoolingFan1_Ampere: 0,
    conveyorCoolingFan1_Hertz: 0,
    machineCoolingFan2_EquipmentNumber: '',
    machineCoolingFan2_Ampere: 0,
    machineCoolingFan2_Hertz: 0,
    conveyorCoolingFan2_EquipmentNumber: '',
    conveyorCoolingFan2_Ampere: 0,
    conveyorCoolingFan2_Hertz: 0,
    machineCoolingFan3_EquipmentNumber: '',
    machineCoolingFan3_Ampere: 0,
    machineCoolingFan3_Hertz: 0,
    conveyorCoolingFan3_EquipmentNumber: '',
    conveyorCoolingFan3_Ampere: 0,
    conveyorCoolingFan3_Hertz: 0,
    pmReport: '',
    followUpActivities: '',
    workTasks: [
      {
        id: '',
        workDescription: '',
        startTime: '',
        endTime: '',
        executor: '',
        requestingUnit: '',
      },
    ],
  });

  function normalizeTime(time) {
    if (!time) return '';
    return time.slice(0, 5);
  }

  useEffect(() => {
    if (!selectedElectrical) return;

    setForm({
      id: selectedElectrical?.id,
      reportDate: selectedElectrical?.reportDate,
      dayOfWeek: selectedElectrical?.dayOfWeek,
      shiftName: selectedElectrical?.shiftName,
      personnelName: selectedElectrical?.personnelName,
      shiftSupervisorName: selectedElectrical?.shiftSupervisorName,
      presentPersonnel: selectedElectrical?.presentPersonnel,
      vacationEntitlementPersonnel:
        selectedElectrical?.vacationEntitlementPersonnel,
      sickLeavePersonnel: selectedElectrical?.sickLeavePersonnel,
      absentPersonnel: selectedElectrical?.absentPersonnel,
      netA_Row1_Time: normalizeTime(selectedElectrical?.netA_Row1_Time),
      netA_Row1_Ampere20KV: selectedElectrical?.netA_Row1_Ampere20KV,
      netA_Row1_Ampere380V: selectedElectrical?.netA_Row1_Ampere380V,
      netA_Row2_Time: normalizeTime(selectedElectrical?.netA_Row2_Time),
      netA_Row2_Ampere20KV: selectedElectrical?.netA_Row2_Ampere20KV,
      netA_Row2_Ampere380V: selectedElectrical?.netA_Row2_Ampere380V,
      netA_Row3_Time: normalizeTime(selectedElectrical?.netA_Row3_Time),
      netA_Row3_Ampere20KV: selectedElectrical?.netA_Row3_Ampere20KV,
      netA_Row3_Ampere380V: selectedElectrical?.netA_Row3_Ampere380V,
      netB_Row1_Time: normalizeTime(selectedElectrical?.netB_Row1_Time),
      netB_Row1_Ampere20KV: selectedElectrical?.netB_Row1_Ampere20KV,
      netB_Row1_Ampere380V: selectedElectrical?.netB_Row1_Ampere380V,
      netB_Row2_Time: normalizeTime(selectedElectrical?.netB_Row2_Time),
      netB_Row2_Ampere20KV: selectedElectrical?.netB_Row2_Ampere20KV,
      netB_Row2_Ampere380V: selectedElectrical?.netB_Row2_Ampere380V,
      netB_Row3_Time: normalizeTime(selectedElectrical?.netB_Row3_Time),
      netB_Row3_Ampere20KV: selectedElectrical?.netB_Row3_Ampere20KV,
      netB_Row3_Ampere380V: selectedElectrical?.netB_Row3_Ampere380V,
      inspection_Generators: selectedElectrical?.inspection_Generators,
      inspection_Batteries: selectedElectrical?.inspection_Batteries,
      inspection_UPS: selectedElectrical?.inspection_UPS,
      inspection_MainSwitches: selectedElectrical?.inspection_MainSwitches,
      distributionRoomTemperature:
        selectedElectrical?.distributionRoomTemperature,
      substationRoomTemperature: selectedElectrical?.substationRoomTemperature,
      airCompressor1_Working: selectedElectrical?.airCompressor1_Working,
      airCompressor2_Working: selectedElectrical?.airCompressor2_Working,
      airCompressor3_Working: selectedElectrical?.airCompressor3_Working,
      airCompressor4_Working: selectedElectrical?.airCompressor4_Working,
      cleaning_DistributionRoom: selectedElectrical?.cleaning_DistributionRoom,
      cleaning_ElectricalRoom: selectedElectrical?.cleaning_ElectricalRoom,
      lighting_Yard: selectedElectrical?.lighting_Yard,
      lighting_Hall: selectedElectrical?.lighting_Hall,
      airCompressor1_Ampere: selectedElectrical?.airCompressor1_Ampere,
      airCompressor1_Hertz: selectedElectrical?.airCompressor1_Hertz,
      airCompressor2_Ampere: selectedElectrical?.airCompressor2_Ampere,
      airCompressor2_Hertz: selectedElectrical?.airCompressor2_Hertz,
      airCompressor3_Ampere: selectedElectrical?.airCompressor3_Ampere,
      airCompressor3_Hertz: selectedElectrical?.airCompressor3_Hertz,
      combustionFan110KW_EquipmentNumber:
        selectedElectrical?.combustionFan110KW_EquipmentNumber,
      combustionFan110KW_Ampere: selectedElectrical?.combustionFan110KW_Ampere,
      combustionFan110KW_Hertz: selectedElectrical?.combustionFan110KW_Hertz,
      suctionFan55KW_EquipmentNumber:
        selectedElectrical?.suctionFan55KW_EquipmentNumber,
      suctionFan55KW_Ampere: selectedElectrical?.suctionFan55KW_Ampere,
      suctionFan55KW_Hertz: selectedElectrical?.suctionFan55KW_Hertz,
      wallCoolingFan110KW_EquipmentNumber:
        selectedElectrical?.wallCoolingFan110KW_EquipmentNumber,
      wallCoolingFan110KW_Ampere:
        selectedElectrical?.wallCoolingFan110KW_Ampere,
      wallCoolingFan110KW_Hertz: selectedElectrical?.wallCoolingFan110KW_Hertz,
      working_EquipmentNumber: selectedElectrical?.working_EquipmentNumber,
      working_Ampere: selectedElectrical?.working_Ampere,
      working_Hertz: selectedElectrical?.working_Hertz,
      gologah_EquipmentNumber: selectedElectrical?.gologah_EquipmentNumber,
      gologah_Ampere: selectedElectrical?.gologah_Ampere,
      gologah_Hertz: selectedElectrical?.gologah_Hertz,
      forehearthFanLine1_Ampere: selectedElectrical?.forehearthFanLine1_Ampere,
      forehearthFanLine1_Hertz: selectedElectrical?.forehearthFanLine1_Hertz,
      forehearthFanLine2_Ampere: selectedElectrical?.forehearthFanLine2_Ampere,
      forehearthFanLine2_Hertz: selectedElectrical?.forehearthFanLine2_Hertz,
      forehearthFanLine3_Ampere: selectedElectrical?.forehearthFanLine3_Ampere,
      forehearthFanLine3_Hertz: selectedElectrical?.forehearthFanLine3_Hertz,
      pataqiFan_EquipmentNumber: selectedElectrical?.pataqiFan_EquipmentNumber,
      pataqiFan_Ampere: selectedElectrical?.pataqiFan_Ampere,
      pataqiFan_Hertz: selectedElectrical?.pataqiFan_Hertz,
      returnWaterPump_EquipmentNumber:
        selectedElectrical?.returnWaterPump_EquipmentNumber,
      returnWaterPump_Ampere: selectedElectrical?.returnWaterPump_Ampere,
      returnWaterPump_Hertz: selectedElectrical?.returnWaterPump_Hertz,
      machineCoolingFan1_EquipmentNumber:
        selectedElectrical?.machineCoolingFan1_EquipmentNumber,
      machineCoolingFan1_Ampere: selectedElectrical?.machineCoolingFan1_Ampere,
      machineCoolingFan1_Hertz: selectedElectrical?.machineCoolingFan1_Hertz,
      conveyorCoolingFan1_EquipmentNumber:
        selectedElectrical?.conveyorCoolingFan1_EquipmentNumber,
      conveyorCoolingFan1_Ampere:
        selectedElectrical?.conveyorCoolingFan1_Ampere,
      conveyorCoolingFan1_Hertz: selectedElectrical?.conveyorCoolingFan1_Hertz,
      machineCoolingFan2_EquipmentNumber:
        selectedElectrical?.machineCoolingFan2_EquipmentNumber,
      machineCoolingFan2_Ampere: selectedElectrical?.machineCoolingFan2_Ampere,
      machineCoolingFan2_Hertz: selectedElectrical?.machineCoolingFan2_Hertz,
      conveyorCoolingFan2_EquipmentNumber:
        selectedElectrical?.conveyorCoolingFan2_EquipmentNumber,
      conveyorCoolingFan2_Ampere:
        selectedElectrical?.conveyorCoolingFan2_Ampere,
      conveyorCoolingFan2_Hertz: selectedElectrical?.conveyorCoolingFan2_Hertz,
      machineCoolingFan3_EquipmentNumber:
        selectedElectrical?.machineCoolingFan3_EquipmentNumber,
      machineCoolingFan3_Ampere: selectedElectrical?.machineCoolingFan3_Ampere,
      machineCoolingFan3_Hertz: selectedElectrical?.machineCoolingFan3_Hertz,
      conveyorCoolingFan3_EquipmentNumber:
        selectedElectrical?.conveyorCoolingFan3_EquipmentNumber,
      conveyorCoolingFan3_Ampere:
        selectedElectrical?.conveyorCoolingFan3_Ampere,
      conveyorCoolingFan3_Hertz: selectedElectrical?.conveyorCoolingFan3_Hertz,
      pmReport: selectedElectrical?.pmReport,
      followUpActivities: selectedElectrical?.followUpActivities,
      workTasks: selectedElectrical?.workTasks?.length
        ? selectedElectrical.workTasks?.map((elec) => ({
            id: elec?.id,
            workDescription: elec?.workDescription,
            startTime: normalizeTime(elec?.startTime),
            endTime: normalizeTime(elec?.endTime),
            executor: elec?.executor,
            requestingUnit: elec?.requestingUnit,
          }))
        : [
            {
              id: '',
              workDescription: '',
              startTime: '',
              endTime: '',
              executor: '',
              requestingUnit: '',
            },
          ],
    });
  }, [selectedElectrical, openEditModal]);

  const addItems = () => {
    if (form.workTasks?.length >= 16) {
      toast.warning('حداکثر 16 ردیف قابل اضافه کردن است');
      return;
    }

    setForm((p) => ({
      ...p,
      workTasks: [
        ...(p.workTasks || []),
        {
          workDescription: '',
          startTime: '',
          endTime: '',
          executor: '',
          requestingUnit: '',
        },
      ],
    }));
  };

  const removeItems = (index) => {
    setForm((p) => {
      const next = [...(p.workTasks || [])];

      next.splice(index, 1);
      if (next.length === 0) {
        next.push({
          workDescription: '',
          startTime: '',
          endTime: '',
          executor: '',
          requestingUnit: '',
        });
      }
      return { ...p, workTasks: next };
    });
  };

  const updateItems = (index, field, value) => {
    setForm((p) => {
      const next = [...p.workTasks];
      next[index] = { ...next[index], [field]: value };
      return { ...p, workTasks: next };
    });
  };

  const updateReports = useUpdateElectericalReports();

  const submitHandler = (e) => {
    e.preventDefault();
    updateReports.mutate(
      {
        id: selectedElectrical?.id,
        form,
      },
      {
        onSuccess: () => {
          setOpenEditModal(false);
          setSelectedElectrical(null);
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
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
      <div
        className={`relative flex max-h-[90vh] w-[1000px] max-w-[95vw] transform flex-col rounded-[15px] bg-linear-to-tl from-black to-gray-600 p-6 text-white shadow-2xl transition-all duration-300 max-md:h-160 max-md:overflow-auto ${
          openEditModal
            ? 'translate-y-0 scale-100 opacity-100'
            : '-translate-y-10 scale-0 opacity-0'
        }`}
      >
        <div className="flex shrink-0 items-center justify-between pb-5">
          <h2 className="font-[SamimBold] text-[20px]">
            ویرایش فرم گزارش روزانه واحد برق
          </h2>
          <button
            onClick={() => {
              setOpenEditModal(false);
              setSelectedElectrical(null);
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
          <div className="grid grid-cols-5 gap-2 max-md:flex max-md:flex-col">
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
                value={form.reportDate ? new Date(form.reportDate) : ''}
                inputClass="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
              />
            </label>
            <label htmlFor="dayOfWeek" className="flex flex-col">
              روز هفته
              <select
                name="dayOfWeek"
                value={form.dayOfWeek || ''}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    dayOfWeek: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
              >
                <option
                  value={0}
                  className="bg-black/95 text-[15px] text-white"
                >
                  انتخاب روز هفته
                </option>
                <option
                  value={1}
                  className="bg-black/95 text-[15px] text-white"
                >
                  شنبه
                </option>
                <option
                  value={2}
                  className="bg-black/95 text-[15px] text-white"
                >
                  یکشنبه
                </option>
                <option
                  value={3}
                  className="bg-black/95 text-[15px] text-white"
                >
                  دوشنبه
                </option>
                <option
                  value={4}
                  className="bg-black/95 text-[15px] text-white"
                >
                  سه شنبه
                </option>
                <option
                  value={5}
                  className="bg-black/95 text-[15px] text-white"
                >
                  چهارشنبه
                </option>
                <option
                  value={6}
                  className="bg-black/95 text-[15px] text-white"
                >
                  پنجشنبه
                </option>
                <option
                  value={7}
                  className="bg-black/95 text-[15px] text-white"
                >
                  جمعه
                </option>
              </select>
            </label>
            <label htmlFor="personnelName">
              نام و نام خانوادگی
              <input
                type="text"
                name="personnelName"
                value={form.personnelName ?? ''}
                readOnly
                className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
              />
            </label>

            <label htmlFor="shiftName" className="flex flex-col">
              نام شیفت
              <input
                type="text"
                name="shiftName"
                value={form.shiftName ?? ''}
                readOnly
                className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
              />
            </label>
            <label htmlFor="shiftSupervisorName">
              نام سر شیفت
              <input
                type="text"
                name="shiftSupervisorName"
                value={form.shiftSupervisorName ?? ''}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: e.target.value,
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
              />
            </label>
          </div>
          <p className="mx-10 mb-2 border-b border-white/50 pt-2"></p>
          <div className="pr-1.5 pb-5 font-[SamimBold] text-[20px]">
            وضعیت حضور پرسنل
          </div>
          <div className="grid grid-cols-4 gap-2 max-md:flex max-md:flex-col">
            <label htmlFor="presentPersonnel">
              حاضرین
              <input
                type="text"
                name="presentPersonnel"
                placeholder="تعداد حاضرین"
                value={form.presentPersonnel ?? ''}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: e.target.value,
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none placeholder:font-[Samim]"
              />
            </label>
            <label htmlFor="vacationEntitlementPersonnel">
              مرخصی استحقاقی
              <input
                type="text"
                name="vacationEntitlementPersonnel"
                placeholder="مرخصی استحقاقی"
                value={form.vacationEntitlementPersonnel ?? ''}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: e.target.value,
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] placeholder:text-[15px]"
              />
            </label>
            <label htmlFor="sickLeavePersonnel">
              مرخصی استعلاجی
              <input
                type="text"
                name="sickLeavePersonnel"
                placeholder="مرخصی استعلاجی"
                value={form.sickLeavePersonnel ?? ''}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: e.target.value,
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] placeholder:text-[15px]"
              />
            </label>
            <label htmlFor="absentPersonnel">
              غیبت
              <input
                type="text"
                name="absentPersonnel"
                placeholder="غایبین"
                value={form.absentPersonnel ?? ''}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: e.target.value,
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] placeholder:text-[15px]"
              />
            </label>
          </div>
          <p className="mx-10 mb-2 border-b border-white/50 pt-2"></p>
          <p className="pr-1.5 pb-5 font-[SamimBold] text-[20px]">NET A</p>
          <div className="grid grid-cols-3 gap-5 max-md:flex max-md:flex-col">
            <label htmlFor="netA_Row1_Time">
              زمان بررسی اول NET A
              <TimePickerInput
                value={form.netA_Row1_Time ?? ''}
                onChange={(value) => {
                  setForm((p) => ({
                    ...p,
                    netA_Row1_Time: value,
                  }));
                }}
              />
            </label>
            <label htmlFor="netA_Row1_Ampere20KV" className="flex flex-col">
              آمپر NET A - 20KV
              <input
                type="text"
                name="netA_Row1_Ampere20KV"
                placeholder="مقدار آمپر 20KV"
                value={form.netA_Row1_Ampere20KV ?? ''}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] placeholder:text-[15px]"
              />
            </label>
            <label htmlFor="netA_Row1_Ampere380V">
              آمپر NET A - 380V
              <input
                type="text"
                name="netA_Row1_Ampere380V"
                placeholder="مقدار آمپر 380V"
                value={form.netA_Row1_Ampere380V ?? ''}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] placeholder:text-[15px]"
              />
            </label>
            <label htmlFor="netA_Row2_Time">
              زمان بررسی دوم NET A
              <TimePickerInput
                value={form.netA_Row2_Time ?? ''}
                onChange={(value) => {
                  setForm((p) => ({
                    ...p,
                    netA_Row2_Time: value,
                  }));
                }}
              />
            </label>
            <label htmlFor="netA_Row2_Ampere20KV" className="flex flex-col">
              آمپر NET A - 20KV
              <input
                type="text"
                name="netA_Row2_Ampere20KV"
                placeholder="مقدار آمپر 20KV"
                value={form.netA_Row2_Ampere20KV ?? ''}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] placeholder:text-[15px]"
              />
            </label>
            <label htmlFor="netA_Row2_Ampere380V" className="flex flex-col">
              آمپر NET A - 380V
              <input
                type="text"
                name="netA_Row2_Ampere380V"
                placeholder="مقدار آمپر 380V"
                value={form.netA_Row2_Ampere380V ?? ''}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] placeholder:text-[15px]"
              />
            </label>
            <label htmlFor="netA_Row3_Time">
              زمان بررسی سوم NET A
              <TimePickerInput
                value={form.netA_Row3_Time ?? ''}
                onChange={(value) => {
                  setForm((p) => ({
                    ...p,
                    netA_Row3_Time: value,
                  }));
                }}
              />
            </label>
            <label htmlFor="netA_Row3_Ampere20KV" className="flex flex-col">
              آمپر NET A - 20KV
              <input
                type="text"
                name="netA_Row3_Ampere20KV"
                placeholder="مقدار آمپر 20KV"
                value={form.netA_Row3_Ampere20KV ?? ''}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] placeholder:text-[15px]"
              />
            </label>
            <label htmlFor="netA_Row3_Ampere380V" className="flex flex-col">
              آمپر NET A - 380V
              <input
                type="text"
                name="netA_Row3_Ampere380V"
                placeholder="مقدار آمپر 380V"
                value={form.netA_Row3_Ampere380V ?? ''}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] placeholder:text-[15px]"
              />
            </label>
          </div>
          <p className="mx-10 mb-2 border-b border-white/50 pt-2"></p>
          <p className="pr-1.5 pb-5 font-[SamimBold] text-[20px]">NET B</p>
          <div className="grid grid-cols-3 gap-5 max-md:flex max-md:flex-col">
            <label htmlFor="netB_Row1_Time">
              زمان بررسی اول NET B
              <TimePickerInput
                value={form.netB_Row1_Time ?? ''}
                onChange={(value) => {
                  setForm((p) => ({
                    ...p,
                    netB_Row1_Time: value,
                  }));
                }}
              />
            </label>
            <label htmlFor="netB_Row1_Ampere20KV">
              آمپر NET B - 20KV
              <input
                type="text"
                name="netB_Row1_Ampere20KV"
                placeholder="مقدار آمپر 20KV"
                value={form.netB_Row1_Ampere20KV ?? ''}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] placeholder:text-[15px]"
              />
            </label>
            <label htmlFor="netB_Row1_Ampere380V">
              آمپر NET B - 380V
              <input
                type="text"
                name="netB_Row1_Ampere380V"
                placeholder="مقدار آمپر 380V"
                value={form.netB_Row1_Ampere380V ?? ''}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] placeholder:text-[15px]"
              />
            </label>
            <label htmlFor="netB_Row2_Time">
              زمان بررسی دوم NET B
              <TimePickerInput
                value={form.netB_Row2_Time ?? ''}
                onChange={(value) => {
                  setForm((p) => ({
                    ...p,
                    netB_Row2_Time: value,
                  }));
                }}
              />
            </label>
            <label htmlFor="netB_Row2_Ampere20KV">
              آمپر NET B - 20KV
              <input
                type="text"
                name="netB_Row2_Ampere20KV"
                placeholder="مقدار آمپر 20KV"
                value={form.netB_Row2_Ampere20KV ?? ''}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] placeholder:text-[15px]"
              />
            </label>
            <label htmlFor="netB_Row2_Ampere380V">
              آمپر NET B - 380V
              <input
                type="text"
                name="netB_Row2_Ampere380V"
                value={form.netB_Row2_Ampere380V ?? ''}
                placeholder="مقدار آمپر 380V"
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] placeholder:text-[15px]"
              />
            </label>
            <label htmlFor="netB_Row3_Time">
              زمان بررسی سوم NET B
              <TimePickerInput
                value={form.netB_Row3_Time ?? ''}
                onChange={(value) => {
                  setForm((p) => ({
                    ...p,
                    netB_Row3_Time: value,
                  }));
                }}
              />
            </label>
            <label htmlFor="netB_Row3_Ampere20KV">
              آمپر NET B - 20KV
              <input
                type="text"
                name="netB_Row3_Ampere20KV"
                placeholder="مقدار آمپر 20KV"
                value={form.netB_Row3_Ampere20KV ?? ''}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] placeholder:text-[15px]"
              />
            </label>
            <label htmlFor="netB_Row3_Ampere380V">
              آمپر NET B - 380V
              <input
                type="text"
                name="netB_Row3_Ampere380V"
                value={form.netB_Row3_Ampere380V ?? ''}
                placeholder="مقدار آمپر 380V"
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] placeholder:text-[15px]"
              />
            </label>
          </div>
          <p className="mx-10 mb-2 border-b border-white/50 pt-2"></p>
          <p className="pr-1.5 pb-5 font-[SamimBold] text-[20px]">
            بازدید های روزانه
          </p>
          <div className="grid grid-cols-4 gap-5 max-md:flex max-md:flex-col">
            <label htmlFor="inspection_Generators">
              ژنراتورها
              <input
                type="checkbox"
                checked={form.inspection_Generators ?? ''}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    inspection_Generators: e.target.checked,
                  }))
                }
                className="mr-2 size-[15px]"
              />
            </label>
            <label htmlFor="inspection_Batteries">
              باتری ها
              <input
                type="checkbox"
                checked={form.inspection_Batteries ?? ''}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    inspection_Batteries: e.target.checked,
                  }))
                }
                className="mr-2 size-[15px]"
              />
            </label>
            <label htmlFor="inspection_UPS">
              UPS
              <input
                type="checkbox"
                checked={form.inspection_UPS ?? ''}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    inspection_UPS: e.target.checked,
                  }))
                }
                className="mr-2 size-[15px]"
              />
            </label>
            <label htmlFor="inspection_MainSwitches">
              کلیدهای اصلی
              <input
                type="checkbox"
                checked={form.inspection_MainSwitches ?? ''}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    inspection_MainSwitches: e.target.checked,
                  }))
                }
                className="mr-2 size-[15px]"
              />
            </label>
          </div>
          <p className="mx-10 mb-2 border-b border-white/50 pt-2"></p>
          <p className="pr-1.5 pb-5 font-[SamimBold] text-[20px]">
            دمای اتاق توزیع و پست
          </p>
          <div className="grid grid-cols-3 gap-5 max-md:flex max-md:flex-col">
            <label htmlFor="distributionRoomTemperature">
              دمای اتاق توزیع
              <input
                type="text"
                name="distributionRoomTemperature"
                placeholder="مقدار دمای اتاق توزیع"
                value={form.distributionRoomTemperature ?? ''}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] placeholder:text-[15px]"
              />
            </label>
            <label htmlFor="substationRoomTemperature">
              دمای اتاق پست
              <input
                type="text"
                name="substationRoomTemperature"
                placeholder="مقدار دمای اتاق پست"
                value={form.substationRoomTemperature ?? ''}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] placeholder:text-[15px]"
              />
            </label>
          </div>
          <p className="mx-10 mb-2 border-b border-white/50 pt-2"></p>
          <p className="pr-1.5 pb-5 font-[SamimBold] text-[20px]">
            کمپرسور های در حال کار
          </p>
          <div className="grid grid-cols-4 gap-5 max-md:flex max-md:flex-col">
            <label htmlFor="airCompressor1_Working">
              کمپرسور 1
              <input
                type="checkbox"
                checked={form?.airCompressor1_Working ?? ''}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    airCompressor1_Working: e.target.checked,
                  }));
                }}
                className="mr-2 size-[15px]"
              />
            </label>
            <label htmlFor="airCompressor2_Working">
              کمپرسور 2
              <input
                type="checkbox"
                checked={form?.airCompressor2_Working ?? ''}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    airCompressor2_Working: e.target.checked,
                  }));
                }}
                className="mr-2 size-[15px]"
              />
            </label>
            <label htmlFor="airCompressor3_Working">
              کمپرسور 3
              <input
                type="checkbox"
                checked={form?.airCompressor3_Working ?? ''}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    airCompressor3_Working: e.target.checked,
                  }));
                }}
                className="mr-2 size-[15px]"
              />
            </label>
            <label htmlFor="airCompressor4_Working">
              کمپرسور 4
              <input
                type="checkbox"
                checked={form?.airCompressor4_Working ?? ''}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    airCompressor4_Working: e.target.checked,
                  }));
                }}
                className="mr-2 size-[15px]"
              />
            </label>
          </div>
          <p className="mx-10 mb-2 border-b border-white/50 pt-2"></p>
          <p className="pr-1.5 pb-5 font-[SamimBold] text-[20px]">
            نظافت و بررسی روشنایی
          </p>
          <div className="grid grid-cols-4 gap-5 max-md:flex max-md:flex-col">
            <label htmlFor="cleaning_DistributionRoom">
              نظافت اتاق توزیع
              <input
                type="checkbox"
                checked={form?.cleaning_DistributionRoom ?? ''}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    cleaning_DistributionRoom: e.target.checked,
                  }));
                }}
                className="mr-2 size-[15px] rounded-[1000px]"
              />
            </label>
            <label htmlFor="cleaning_ElectricalRoom">
              نظافت اتاق برق
              <input
                type="checkbox"
                checked={form?.cleaning_ElectricalRoom ?? ''}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    cleaning_ElectricalRoom: e.target.checked,
                  }));
                }}
                className="mr-2 size-[15px]"
              />
            </label>
            <label htmlFor="lighting_Yard">
              روشنایی محوطه
              <input
                type="checkbox"
                checked={form?.lighting_Yard ?? ''}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    lighting_Yard: e.target.checked,
                  }));
                }}
                className="mr-2 size-[15px]"
              />
            </label>
            <label htmlFor="lighting_Hall">
              روشنایی سالن
              <input
                type="checkbox"
                checked={!!form?.lighting_Hall}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    lighting_Hall: e.target.checked,
                  }));
                }}
                className="mr-2 size-[15px]"
              />
            </label>
          </div>
          <p className="mx-10 mb-2 border-b border-white/50 pt-2"></p>
          <p className="pr-1.5 pb-5 font-[SamimBold] text-[20px]">
            جدول کمپرسورها
          </p>
          <div className="grid grid-cols-2 gap-5 max-md:flex max-md:flex-col">
            <label htmlFor="airCompressor1_Ampere">
              آمپر کمپرسور 1
              <input
                type="text"
                name="airCompressor1_Ampere"
                placeholder="مقدار آمپر کمپرسور شماره 1"
                value={form.airCompressor1_Ampere ?? ''}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] placeholder:text-[15px]"
              />
            </label>
            <label htmlFor="airCompressor1_Hertz">
              هرتز کمپرسور 1
              <input
                type="text"
                name="airCompressor1_Hertz"
                placeholder="مقدار هرتز کمپرسور شماره 1"
                value={form.airCompressor1_Hertz ?? ''}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] placeholder:text-[15px]"
              />
            </label>
            <label htmlFor="airCompressor2_Ampere">
              آمپر کمپرسور 2
              <input
                type="text"
                name="airCompressor2_Ampere"
                value={form.airCompressor2_Ampere ?? ''}
                placeholder="مقدار آمپر کمپرسور 2"
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] placeholder:text-[15px]"
              />
            </label>
            <label htmlFor="airCompressor2_Hertz">
              هرتز کمپرسور 2
              <input
                type="text"
                name="airCompressor2_Hertz"
                value={form.airCompressor2_Hertz ?? ''}
                placeholder="مقدار هرتز کمپرسور 2"
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] placeholder:text-[15px]"
              />
            </label>
            <label htmlFor="airCompressor3_Ampere">
              آمپر کمپرسور 3
              <input
                type="text"
                name="airCompressor3_Ampere"
                value={form.airCompressor3_Ampere ?? ''}
                placeholder="مقدار آمپر کمپرسور 3"
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] placeholder:text-[15px]"
              />
            </label>
            <label htmlFor="airCompressor3_Hertz">
              هرتز کمپرسور 3
              <input
                type="text"
                name="airCompressor3_Hertz"
                value={form.airCompressor3_Hertz ?? ''}
                placeholder="مقدار هرتز کمپرسور 3"
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] placeholder:text-[15px]"
              />
            </label>
          </div>
          <p className="mx-10 mb-2 border-b border-white/50 pt-2"></p>
          <p className="pr-1.5 pb-5 font-[SamimBold] text-[20px]">
            بازدید های روزانه
          </p>
          <div className="grid grid-cols-3 gap-5 max-md:flex max-md:flex-col">
            <label htmlFor="combustionFan110KW_EquipmentNumber">
              <span>شماره تجهیز فن احتراق</span>
              <span dir="ltr" className="pr-1 font-[AvenirLTProMedium]">
                110 KW
              </span>
              <input
                type="text"
                name="combustionFan110KW_EquipmentNumber"
                placeholder="شماره تجهیز "
                value={form.combustionFan110KW_EquipmentNumber ?? ''}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: e.target.value,
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] placeholder:text-[15px]"
              />
            </label>
            <label htmlFor="combustionFan110KW_Ampere">
              <span>آمپر فن احتراق </span>
              <span dir="ltr" className="pr-1 font-[AvenirLTProMedium]">
                110KW
              </span>
              <input
                type="text"
                name="combustionFan110KW_Ampere"
                value={form.combustionFan110KW_Ampere ?? ''}
                placeholder="آمپر"
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] placeholder:text-[15px]"
              />
            </label>
            <label htmlFor="combustionFan110KW_Hertz">
              <span>هرتز فن احتراق</span>
              <span dir="ltr" className="pr-1 font-[AvenirLTProMedium]">
                110KW
              </span>
              <input
                type="text"
                name="combustionFan110KW_Hertz"
                value={form.combustionFan110KW_Hertz ?? ''}
                placeholder="هرتز"
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] placeholder:text-[15px]"
              />
            </label>
            <label htmlFor="suctionFan55KW_EquipmentNumber">
              <span>شماره تجهیز فن ساکشن</span>
              <span dir="ltr" className="pr-1 font-[AvenirLTProMedium]">
                55KW
              </span>
              <input
                type="text"
                name="suctionFan55KW_EquipmentNumber"
                value={form.suctionFan55KW_EquipmentNumber ?? ''}
                placeholder="شماره تجهیز"
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: e.target.value,
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] placeholder:text-[15px]"
              />
            </label>
            <label htmlFor="suctionFan55KW_Ampere">
              <span> آمپر فن ساکشن</span>
              <span dir="ltr" className="pr-1 font-[AvenirLTProMedium]">
                55KW
              </span>
              <input
                type="text"
                name="suctionFan55KW_Ampere"
                placeholder="آمپر"
                value={form.suctionFan55KW_Ampere ?? ''}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] placeholder:text-[15px]"
              />
            </label>
            <label htmlFor="suctionFan55KW_Hertz">
              <span>هرتز فن ساکشن</span>
              <span dir="ltr" className="pr-1 font-[AvenirLTProMedium]">
                55KW
              </span>
              <input
                type="text"
                name="suctionFan55KW_Hertz"
                placeholder="هرتز"
                value={form.suctionFan55KW_Hertz ?? ''}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] placeholder:text-[15px]"
              />
            </label>
            <label htmlFor="wallCoolingFan110KW_EquipmentNumber">
              <span>شماره تجهیز فن کولینگ دیواره</span>
              <span dir="ltr" className="pr-1 font-[AvenirLTProMedium]">
                110KW
              </span>
              <input
                type="text"
                name="wallCoolingFan110KW_EquipmentNumber"
                placeholder="شماره تجهیز"
                value={form.wallCoolingFan110KW_EquipmentNumber ?? ''}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: e.target.value,
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] placeholder:text-[15px]"
              />
            </label>
            <label htmlFor="wallCoolingFan110KW_Ampere">
              <span>آمپر فن کولینگ دیواره</span>
              <span dir="ltr" className="pr-1 font-[AvenirLTProMedium]">
                110KW
              </span>
              <input
                type="text"
                name="wallCoolingFan110KW_Ampere"
                placeholder="آمپر"
                value={form.wallCoolingFan110KW_Ampere ?? ''}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] placeholder:text-[15px]"
              />
            </label>
            <label htmlFor="wallCoolingFan110KW_Hertz">
              <span>هرتز فن کولینگ دیواره</span>
              <span dir="ltr" className="pr-1 font-[AvenirLTProMedium]">
                110KW
              </span>
              <input
                type="text"
                name="wallCoolingFan110KW_Hertz"
                placeholder="هرتز"
                value={form.wallCoolingFan110KW_Hertz ?? ''}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] placeholder:text-[15px]"
              />
            </label>
            <label htmlFor="working_EquipmentNumber">
              شماره تجهیز ورکینگ
              <input
                type="text"
                name="working_EquipmentNumber"
                placeholder="شماره تجهیز"
                value={form.working_EquipmentNumber ?? ''}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: e.target.value,
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] placeholder:text-[15px]"
              />
            </label>
            <label htmlFor="working_Ampere">
              آمپر ورکینگ
              <input
                type="text"
                name="working_Ampere"
                placeholder="آمپر"
                value={form.working_Ampere ?? ''}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] placeholder:text-[15px]"
              />
            </label>
            <label htmlFor="working_Hertz">
              هرتز ورکینگ
              <input
                type="text"
                name="working_Hertz"
                placeholder="هرتز"
                value={form.working_Hertz ?? ''}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] placeholder:text-[15px]"
              />
            </label>
            <label htmlFor="gologah_EquipmentNumber">
              شماره تجهیز گلوگاه
              <input
                type="text"
                name="gologah_EquipmentNumber"
                placeholder="شماره تجهیز"
                value={form.gologah_EquipmentNumber ?? ''}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: e.target.value,
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] placeholder:text-[15px]"
              />
            </label>
            <label htmlFor="gologah_Ampere">
              آمپر گلوگاه
              <input
                type="text"
                name="gologah_Ampere"
                placeholder="آمپر"
                value={form.gologah_Ampere ?? ''}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] placeholder:text-[15px]"
              />
            </label>
            <label htmlFor="gologah_Hertz">
              هرتز گلوگاه
              <input
                type="text"
                name="gologah_Hertz"
                placeholder="هرتز "
                value={form.gologah_Hertz ?? ''}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] placeholder:text-[15px]"
              />
            </label>
            <label htmlFor="forehearthFanLine1_Ampere">
              <span>آمپر فن فورهارث خط</span>
              <span dir="ltr" className="pr-1 font-[AvenirLTProMedium]">
                1
              </span>
              <input
                type="text"
                name="forehearthFanLine1_Ampere"
                placeholder="آمپر"
                value={form.forehearthFanLine1_Ampere ?? ''}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] placeholder:text-[15px]"
              />
            </label>
            <label htmlFor="forehearthFanLine2_Ampere">
              <span>آمپر فن فورهارث خط</span>
              <span dir="ltr" className="pr-1 font-[AvenirLTProMedium]">
                2
              </span>
              <input
                type="text"
                name="forehearthFanLine2_Ampere"
                placeholder="آمپر"
                value={form.forehearthFanLine2_Ampere ?? ''}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] placeholder:text-[15px]"
              />
            </label>
            <label htmlFor="forehearthFanLine3_Ampere">
              <span>آمپر فن فورهارث خط</span>
              <span dir="ltr" className="pr-1 font-[AvenirLTProMedium]">
                3
              </span>
              <input
                type="text"
                name="forehearthFanLine3_Ampere"
                placeholder="آمپر"
                value={form.forehearthFanLine3_Ampere ?? ''}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] placeholder:text-[15px]"
              />
            </label>
            <label htmlFor="forehearthFanLine1_Hertz">
              <span>هرتز فن فورهارث</span>
              <span dir="ltr" className="pr-1 font-[AvenirLTProMedium]">
                1
              </span>
              <input
                type="text"
                name="forehearthFanLine1_Hertz"
                placeholder="هرتز"
                value={form.forehearthFanLine1_Hertz ?? ''}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] placeholder:text-[15px]"
              />
            </label>
            <label htmlFor="forehearthFanLine2_Hertz">
              <span>هرتز فن فورهارث</span>
              <span dir="ltr" className="pr-1 font-[AvenirLTProMedium]">
                2
              </span>
              <input
                type="text"
                name="forehearthFanLine2_Hertz"
                placeholder="هرتز"
                value={form.forehearthFanLine2_Hertz ?? ''}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] placeholder:text-[15px]"
              />
            </label>
            <label htmlFor="forehearthFanLine3_Hertz">
              <span>هرتز فن فورهارث</span>
              <span dir="ltr" className="pr-1 font-[AvenirLTProMedium]">
                3
              </span>
              <input
                type="text"
                name="forehearthFanLine3_Hertz"
                placeholder="هرتز"
                value={form.forehearthFanLine3_Hertz ?? ''}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] placeholder:text-[15px]"
              />
            </label>
            <label htmlFor="pataqiFan_EquipmentNumber">
              شماره تجهیز فن پاتاقی
              <input
                type="text"
                name="pataqiFan_EquipmentNumber"
                placeholder="شماره تجهیز"
                value={form.pataqiFan_EquipmentNumber ?? ''}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: e.target.value,
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] placeholder:text-[15px]"
              />
            </label>
            <label htmlFor="pataqiFan_Ampere">
              آمپر فن پاتاقی
              <input
                type="text"
                name="pataqiFan_Ampere"
                placeholder="آمپر"
                value={form.pataqiFan_Ampere ?? ''}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] placeholder:text-[15px]"
              />
            </label>
            <label htmlFor="pataqiFan_Hertz">
              هرتز فن پاتاقی
              <input
                type="text"
                name="pataqiFan_Hertz"
                placeholder="هرتز"
                value={form.pataqiFan_Hertz ?? ''}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] placeholder:text-[15px]"
              />
            </label>
            <label htmlFor="returnWaterPump_EquipmentNumber">
              شماره تجهیز پمپ آب برگشتی
              <input
                type="text"
                name="returnWaterPump_EquipmentNumber"
                placeholder="شماره تجهیز"
                value={form.returnWaterPump_EquipmentNumber ?? ''}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: e.target.value,
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] placeholder:text-[15px]"
              />
            </label>
            <label htmlFor="returnWaterPump_Ampere">
              آمپر پمپ آب برگشتی
              <input
                type="text"
                name="returnWaterPump_Ampere"
                placeholder="آمپر"
                value={form.returnWaterPump_Ampere ?? ''}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] placeholder:text-[15px]"
              />
            </label>
            <label htmlFor="returnWaterPump_Hertz">
              هرتز پمپ آب برگشتی
              <input
                type="text"
                name="returnWaterPump_Hertz"
                value={form.returnWaterPump_Hertz ?? ''}
                placeholder="هرتز"
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] placeholder:text-[15px]"
              />
            </label>
            <label htmlFor="machineCoolingFan1_EquipmentNumber">
              <span>شماره تجهیز فن گولینگ ماشین</span>
              <span dir="ltr" className="pr-1 font-[AvenirLTProMedium]">
                1
              </span>
              <input
                type="text"
                name="machineCoolingFan1_EquipmentNumber"
                placeholder="شماره تجهیز"
                value={form.machineCoolingFan1_EquipmentNumber ?? ''}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: e.target.value,
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] placeholder:text-[15px]"
              />
            </label>
            <label htmlFor="machineCoolingFan1_Ampere">
              <span>آمپر فن کولینگ ماشین </span>
              <span dir="ltr" className="pr-1 font-[AvenirLTProMedium]">
                1
              </span>
              <input
                type="text"
                name="machineCoolingFan1_Ampere"
                placeholder="آمپر"
                value={form.machineCoolingFan1_Ampere ?? ''}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] placeholder:text-[15px]"
              />
            </label>
            <label htmlFor="machineCoolingFan1_Hertz">
              <span>هرتز فن کولینگ ماشین </span>
              <span dir="ltr" className="pr-1 font-[AvenirLTProMedium]">
                1
              </span>
              <input
                type="text"
                name="machineCoolingFan1_Hertz"
                placeholder="هرتز"
                value={form.machineCoolingFan1_Hertz ?? ''}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] placeholder:text-[15px]"
              />
            </label>
            <label htmlFor="conveyorCoolingFan1_EquipmentNumber">
              <span>شماره تجهیز فن کولینگ کانوایر</span>
              <span dir="ltr" className="pr-1 font-[AvenirLTProMedium]">
                1
              </span>
              <input
                type="text"
                name="conveyorCoolingFan1_EquipmentNumber"
                placeholder="شماره تجهیز"
                value={form.conveyorCoolingFan1_EquipmentNumber ?? ''}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: e.target.value,
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] placeholder:text-[15px]"
              />
            </label>
            <label htmlFor="conveyorCoolingFan1_Ampere">
              <span>آمپر فن کولینگ کانوایر </span>
              <span dir="ltr" className="pr-1 font-[AvenirLTProMedium]">
                1
              </span>
              <input
                type="text"
                name="conveyorCoolingFan1_Ampere"
                placeholder="آمپر"
                value={form.conveyorCoolingFan1_Ampere ?? ''}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] placeholder:text-[15px]"
              />
            </label>
            <label htmlFor="conveyorCoolingFan1_Hertz">
              <span>هرتز فن کولینگ کانوایر </span>
              <span dir="ltr" className="pr-1 font-[AvenirLTProMedium]">
                1
              </span>
              <input
                type="text"
                name="conveyorCoolingFan1_Hertz"
                placeholder="هرتز"
                value={form.conveyorCoolingFan1_Hertz ?? ''}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] placeholder:text-[15px]"
              />
            </label>
            <label htmlFor="machineCoolingFan2_EquipmentNumber">
              <span>شماره تجهیز فن گولینگ ماشین</span>
              <span dir="ltr" className="pr-1 font-[AvenirLTProMedium]">
                2
              </span>
              <input
                type="text"
                name="machineCoolingFan2_EquipmentNumber"
                placeholder="شماره تجهیز"
                value={form.machineCoolingFan2_EquipmentNumber ?? ''}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: e.target.value,
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] placeholder:text-[15px]"
              />
            </label>
            <label htmlFor="machineCoolingFan2_Ampere">
              <span>آمپر فن کولینگ ماشین </span>
              <span dir="ltr" className="pr-1 font-[AvenirLTProMedium]">
                2
              </span>
              <input
                type="text"
                name="machineCoolingFan2_Ampere"
                placeholder="آمپر"
                value={form.machineCoolingFan2_Ampere ?? ''}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] placeholder:text-[15px]"
              />
            </label>
            <label htmlFor="machineCoolingFan2_Hertz">
              <span>هرتز فن کولینگ ماشین </span>
              <span dir="ltr" className="pr-1 font-[AvenirLTProMedium]">
                2
              </span>
              <input
                type="text"
                name="machineCoolingFan2_Hertz"
                placeholder="هرتز"
                value={form.machineCoolingFan2_Hertz ?? ''}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] placeholder:text-[15px]"
              />
            </label>
            <label htmlFor="conveyorCoolingFan2_EquipmentNumber">
              <span>شماره تجهیز فن کولینگ کانوایر</span>
              <span dir="ltr" className="pr-1 font-[AvenirLTProMedium]">
                2
              </span>
              <input
                type="text"
                name="conveyorCoolingFan2_EquipmentNumber"
                placeholder="شماره تجهیز"
                value={form.conveyorCoolingFan2_EquipmentNumber ?? ''}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: e.target.value,
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] placeholder:text-[15px]"
              />
            </label>
            <label htmlFor="conveyorCoolingFan2_Ampere">
              <span>آمپر فن کولینگ کانوایر </span>
              <span dir="ltr" className="pr-1 font-[AvenirLTProMedium]">
                2
              </span>
              <input
                type="text"
                name="conveyorCoolingFan2_Ampere"
                placeholder="آمپر"
                value={form.conveyorCoolingFan2_Ampere ?? ''}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] placeholder:text-[15px]"
              />
            </label>
            <label htmlFor="conveyorCoolingFan2_Hertz">
              <span>هرتز فن کولینگ کانوایر </span>
              <span dir="ltr" className="pr-1 font-[AvenirLTProMedium]">
                2
              </span>
              <input
                type="text"
                name="conveyorCoolingFan2_Hertz"
                placeholder="هرتز"
                value={form.conveyorCoolingFan2_Hertz ?? ''}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] placeholder:text-[15px]"
              />
            </label>
            <label htmlFor="machineCoolingFan3_EquipmentNumber">
              <span>شماره تجهیز فن گولینگ ماشین</span>
              <span dir="ltr" className="pr-1 font-[AvenirLTProMedium]">
                3
              </span>
              <input
                type="text"
                name="machineCoolingFan3_EquipmentNumber"
                placeholder="شماره تجهیز"
                value={form.machineCoolingFan3_EquipmentNumber ?? ''}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: e.target.value,
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] placeholder:text-[15px]"
              />
            </label>
            <label htmlFor="machineCoolingFan3_Ampere">
              <span>آمپر فن کولینگ ماشین </span>
              <span dir="ltr" className="pr-1 font-[AvenirLTProMedium]">
                3
              </span>
              <input
                type="text"
                name="machineCoolingFan3_Ampere"
                placeholder="آمپر"
                value={form.machineCoolingFan3_Ampere ?? ''}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] placeholder:text-[15px]"
              />
            </label>
            <label htmlFor="machineCoolingFan3_Hertz">
              <span>هرتز فن کولینگ ماشین </span>
              <span dir="ltr" className="pr-1 font-[AvenirLTProMedium]">
                3
              </span>
              <input
                type="text"
                name="machineCoolingFan3_Hertz"
                placeholder="هرتز"
                value={form.machineCoolingFan3_Hertz ?? ''}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] placeholder:text-[15px]"
              />
            </label>

            <label htmlFor="conveyorCoolingFan3_EquipmentNumber">
              <span>شماره تجهیز فن کولینگ کانوایر</span>
              <span dir="ltr" className="pr-1 font-[AvenirLTProMedium]">
                3
              </span>
              <input
                type="text"
                name="conveyorCoolingFan3_EquipmentNumber"
                placeholder="شماره تجهیز"
                value={form.conveyorCoolingFan3_EquipmentNumber ?? ''}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: e.target.value,
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] placeholder:text-[15px]"
              />
            </label>
            <label htmlFor="conveyorCoolingFan3_Ampere">
              <span>آمپر فن کولینگ کانوایر </span>
              <span dir="ltr" className="pr-1 font-[AvenirLTProMedium]">
                3
              </span>
              <input
                type="text"
                name="conveyorCoolingFan3_Ampere"
                placeholder="آمپر"
                value={form.conveyorCoolingFan3_Ampere ?? ''}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] placeholder:text-[15px]"
              />
            </label>
            <label htmlFor="conveyorCoolingFan3_Hertz">
              <span>هرتز فن کولینگ کانوایر </span>
              <span dir="ltr" className="pr-1 font-[AvenirLTProMedium]">
                3
              </span>
              <input
                type="text"
                name="conveyorCoolingFan3_Hertz"
                placeholder="هرتز"
                value={form.conveyorCoolingFan3_Hertz ?? ''}
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    [e.target.name]: Number(e.target.value),
                  }));
                }}
                className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none placeholder:font-[Samim] placeholder:text-[15px]"
              />
            </label>
          </div>
          <p className="mx-10 mb-2 border-b border-white/50 pt-2"></p>
          <p className="pr-1.5 pb-5 font-[SamimBold] text-[20px]">گزارش P.M </p>
          <div className="grid grid-cols-3 gap-2 max-md:flex max-md:flex-col">
            <textarea
              name="pmReport"
              placeholder="گزارش عملکرد برای P.M"
              value={form.pmReport ?? ''}
              onChange={(e) =>
                setForm((p) => ({
                  ...p,
                  [e.target.name]: e.target.value,
                }))
              }
              className="col-span-3 mt-1 w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
          </div>

          <p className="mx-10 mb-2 border-b border-white/50 pt-2"></p>
          <p className="pr-1.5 pb-5 font-[SamimBold] text-[20px]">
            فعالیت های سرشیفت بعدی
          </p>
          <div className="grid grid-cols-3 gap-2 max-md:flex max-md:flex-col">
            <textarea
              name="followUpActivities"
              placeholder="گزارش امور محوله برای سرشیفت بعدی"
              value={form.followUpActivities ?? ''}
              onChange={(e) =>
                setForm((p) => ({
                  ...p,
                  [e.target.name]: e.target.value,
                }))
              }
              className="col-span-3 mt-1 w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
          </div>
          <p className="mx-10 mb-2 border-b border-white/50 pt-2"></p>
          <p className="pr-1.5 pb-5 font-[SamimBold] text-[20px]">صفحه دوم </p>
          <div className="flex flex-col gap-2 max-md:flex max-md:flex-col">
            {(form?.workTasks || []).map((item, index) => (
              <div
                key={index}
                className="rounded-xl border border-white/30 p-3 text-left max-md:flex max-md:flex-col"
              >
                <p className="col-span-3 text-right font-[AvenirLTProMedium]">
                  {index + 1}
                </p>
                <button
                  type="button"
                  onClick={addItems}
                  className="col-span-3 cursor-pointer rounded-[10px] bg-green-500 p-2 transition-all delay-100 duration-150 hover:bg-green-700"
                >
                  افزودن ردیف
                </button>
                <div className="grid grid-cols-4 gap-2 rounded-[10px] max-md:flex max-md:flex-col">
                  <label
                    htmlFor="workDescription"
                    className="col-span-5 text-right"
                  >
                    شرح کار انجام شده
                    <input
                      type="text"
                      name="workDescription"
                      maxLength={96}
                      value={item.workDescription ?? ''}
                      onChange={(e) =>
                        updateItems(index, 'workDescription', e.target.value)
                      }
                      className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
                    />
                  </label>
                  <label htmlFor="startTime" className="text-right">
                    ساعت شروع
                    <TimePickerInput
                      value={item.startTime ?? ''}
                      minuteStep={1}
                      onChange={(value) =>
                        updateItems(index, 'startTime', value)
                      }
                    />
                  </label>
                  <label htmlFor="endTime" className="text-right">
                    ساعت پایان
                    <TimePickerInput
                      value={item.endTime ?? ''}
                      minuteStep={1}
                      onChange={(value) => updateItems(index, 'endTime', value)}
                    />
                  </label>
                  <label htmlFor="workDescription" className="text-right">
                    مجری عملیات
                    <input
                      type="text"
                      name="executor"
                      value={item.executor ?? ''}
                      onChange={(e) =>
                        updateItems(index, 'executor', e.target.value)
                      }
                      className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
                    />
                  </label>
                  <label htmlFor="requestingUnit" className="text-right">
                    واحد در خواست کننده
                    <input
                      type="text"
                      name="requestingUnit"
                      value={item.requestingUnit ?? ''}
                      onChange={(e) =>
                        updateItems(index, 'requestingUnit', e.target.value)
                      }
                      className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
                    />
                  </label>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    removeItems(index);
                  }}
                  className="mt-1 cursor-pointer rounded-xl bg-linear-to-bl from-red-500 to-red-800 px-4 py-2 font-[Samim] transition-all delay-100 duration-150 ease-in-out hover:scale-105 hover:bg-red-500/60"
                >
                  حذف ردیف
                </button>
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="col-span-4 float-left mt-2 cursor-pointer rounded-xl bg-linear-to-tl from-green-900 to-green-500 px-4 py-2 font-[Samim] transition-all delay-100 duration-150 ease-in-out hover:scale-105"
          >
            ثبت گزارش
          </button>
        </form>
      </div>
    </div>
  );
}

export default ElectricalEditReports;
