import React from 'react';
import FormDesignPhasePlanningJsx from '../template/FormDesignPhasePlanningJsx';

function FormdesignPhasePlanning({
  openForm,
  setOpenForm,
  selectedDesign,
  setSelectedDesign,
}) {
  const closeHandler = () => {
    setOpenForm(false);
    setSelectedDesign(null);
  };
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
        openForm
          ? 'pointer-events-auto opacity-100 '
          : 'pointer-events-none opacity-0'
      }`}
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        onClick={closeHandler}
      />
      <div
        className={`relative transform rounded-[15px] bg-white p-2 text-white shadow-2xl transition-all duration-300 max-2xl:pb-0 max-md:p-2 print:scale-86! ${
          openForm
            ? '5xl:scale-138 translate-y-0 scale-108 opacity-100 max-2xl:scale-78 max-xl:scale-75 max-md:scale-60 print:shadow-none '
            : '-translate-y-10 scale-0 opacity-0'
        }`}
      >
        <FormDesignPhasePlanningJsx selectedDesign={selectedDesign} />
      </div>
    </div>
  );
}

export default FormdesignPhasePlanning;
