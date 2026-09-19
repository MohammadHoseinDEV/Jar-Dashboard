import React, { useState, useEffect } from 'react';
import { IoCloseSharp } from 'react-icons/io5';

function Quarantine({
  openQuarantine,
  setOpenQuarantine,
  selectedLine,
  quarantineHandler,
}) {
  const [reason, setReason] = useState('');

  useEffect(() => {
    if (openQuarantine) {
      setReason('');
    }
  }, [openQuarantine]);

  const closeHandler = () => {
    setOpenQuarantine(false);
  };

  const submitHandler = () => {
    quarantineHandler(selectedLine, reason);
    setOpenQuarantine(false);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex h-screen items-center justify-center overflow-auto p-4 transition-opacity duration-300 ${
        openQuarantine
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
          openQuarantine
            ? 'translate-y-0 scale-100 opacity-100'
            : '-translate-y-10 scale-0 opacity-0'
        }`}
      >
        <div className="flex items-center justify-between">
          <h1 className="pr-1.5 font-[SamimBold] text-[22px]">
            علت قرنطینه کردن محصول
          </h1>
          <p
            onClick={closeHandler}
            className="flex size-8 cursor-pointer items-center justify-center rounded-full bg-[#343457] text-[20px] transition-all delay-75 duration-100 hover:scale-110"
          >
            <span>
              <IoCloseSharp />
            </span>
          </p>
        </div>

        <div className="mt-5 flex w-[400px] max-w-full flex-col space-y-3 max-md:w-full">
          <label className="text-[16px] text-white/80">علت قرنطینه :</label>
          <textarea
            value={reason}
            onChange={(e) => {
              setReason(e.target.value);
            }}
            rows={5}
            placeholder="علت قرنطینه محصول را بنویسید..."
            className={`w-full resize-none rounded-[10px] border bg-black/30 p-3 text-white transition-colors outline-none`}
          />
        </div>

        <div className="mt-6 flex items-center justify-end space-x-3 space-x-reverse">
          <button
            onClick={submitHandler}
            className="cursor-pointer rounded-[10px] bg-[#EF4444] px-6 py-2 transition-all hover:bg-[#EF4444]/80"
          >
            تایید و چاپ
          </button>
        </div>
      </div>
    </div>
  );
}

export default Quarantine;
