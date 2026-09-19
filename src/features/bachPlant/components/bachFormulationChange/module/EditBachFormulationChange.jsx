import React, { useEffect, useState } from 'react';
import EditBachFormulationChangeJsx from '../template/EditBachFormulationChangeJsx';
import { normalizeTime } from '../../../../../Time/date';
import { useUpdateFourmolation } from '../../../Api/bachFormulationChange';
import { toast } from 'react-toastify';

function EditBachFormulationChange({
  openEditModal,
  setOpenEditModal,
  selectedFormulation,
  setSelectedFormulation,
}) {

  
  const [form, setForm] = useState({
    companyId: '',
    date: '',
    reportNumber: '',
    furnaceTonnage: 0,
    totalBatchWeight: 0,
    totalBatchWeight1: 0,
    glassWastePercentageInBatch: 0,
    glassWastePercentageInBatch1: 0,
    glassWasteWeight: 0,
    glassWasteWeight1: 0,
    batchWeightWithGlassWaste: 0,
    batchWeightWithGlassWaste1: 0,
    changeRealDate: '',
    changeRealTime: '',
    notes: '',
    items: [
      {
        materialName: '',
        currentWeight: 0,
        correctedWeight: 0,
        weightPercentage: 0,
        changeAmount: '',
        changeDate: '',
        changeTime: '',
        changeReason: '',
      },
    ],
  });

  useEffect(() => {
    if (!selectedFormulation) return;

    setForm({
      companyId: selectedFormulation?.companyId,
      date: selectedFormulation?.date,
      reportNumber: selectedFormulation?.reportNumber,
      furnaceTonnage: selectedFormulation?.furnaceTonnage,
      totalBatchWeight: selectedFormulation?.totalBatchWeight,
      totalBatchWeight1: selectedFormulation?.totalBatchWeight1,
      glassWastePercentageInBatch:
        selectedFormulation?.glassWastePercentageInBatch,
      glassWastePercentageInBatch1:
        selectedFormulation?.glassWastePercentageInBatch1,
      glassWasteWeight: selectedFormulation?.glassWasteWeight,
      glassWasteWeight1: selectedFormulation?.glassWasteWeight1,
      batchWeightWithGlassWaste: selectedFormulation?.batchWeightWithGlassWaste,
      batchWeightWithGlassWaste1:
        selectedFormulation?.batchWeightWithGlassWaste1,
      changeRealDate: selectedFormulation?.changeRealDate,
      changeRealTime: normalizeTime(selectedFormulation?.changeRealTime),
      notes: selectedFormulation?.notes,
      items: selectedFormulation?.items?.length
        ? selectedFormulation?.items?.map((f) => ({
            id: f?.id,
            materialName: f?.materialName,
            currentWeight: f?.currentWeight,
            correctedWeight: f?.correctedWeight,
            weightPercentage: f?.weightPercentage,
            changeAmount: f?.changeAmount,
            changeDate: f?.changeDate,
            changeTime: normalizeTime(f?.changeTime),
            changeReason: f?.changeReason,
          }))
        : [
            {
              id: '',
              materialName: '',
              currentWeight: 0,
              correctedWeight: 0,
              weightPercentage: 0,
              changeAmount: '',
              changeDate: '',
              changeTime: '',
              changeReason: '',
            },
          ],
    });
  }, [selectedFormulation, openEditModal]);

  const closeHandler = () => {
    setOpenEditModal(false);
    setSelectedFormulation(null);
  };

  const updateReport = useUpdateFourmolation();

  const submitHandler = (e) => {
    e.preventDefault();
    updateReport.mutate(
      { id: selectedFormulation?.id, form },
      {
        onSuccess: () => {
          closeHandler();
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
        <EditBachFormulationChangeJsx
          openEditModal={openEditModal}
          closeHandler={closeHandler}
          form={form}
          setForm={setForm}
          submitHandler={submitHandler}
          selectedFormulation={selectedFormulation}
        />
      </div>
    </div>
  );
}

export default EditBachFormulationChange;
