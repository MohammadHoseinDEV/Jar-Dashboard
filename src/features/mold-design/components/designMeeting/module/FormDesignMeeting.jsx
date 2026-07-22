import React from 'react';
import FormDesignMeetingJsx from '../template/FormDesignmeetingJsx';

function FormDesignMeeting({ openForm, setOpenForm, selectedDesignMeeting }) {
  const closeHandler = () => {
    setOpenForm(false);
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
        className={`relative transform rounded-[15px] bg-white p-2 text-white shadow-2xl transition-all duration-300 max-2xl:pb-2 print:scale-86! ${
          openForm
            ? '5xl:scale-145 translate-y-0 scale-112 opacity-100 max-2xl:scale-78 max-xl:scale-75 max-md:scale-60 print:shadow-none '
            : '-translate-y-10 scale-0 opacity-0'
        }`}
      >
        <FormDesignMeetingJsx selectedDesignMeeting={selectedDesignMeeting} />
      </div>
    </div>
  );
}


export default FormDesignMeeting;
