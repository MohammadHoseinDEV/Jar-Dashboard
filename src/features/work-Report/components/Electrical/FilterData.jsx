import React, { useState } from 'react';
import { IoCloseSharp } from 'react-icons/io5';

function FilterData({ openFilter, setOpenFilter }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [shiftName, setShiftName] = useState('');
  const [shiftSupervisorName, setShiftSupervisorName] = useState('');
  const [personnelName, setPersonnelName] = useState('');
  const [dayOfWeek, setDayOfWeek] = useState(1);

  const closeFilterModal = () => {
    setOpenFilter(false);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
        openFilter
          ? 'pointer-events-auto opacity-100 '
          : 'pointer-events-none opacity-0'
      }`}
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        onClick={closeFilterModal}
      />
      <div
        className={`relative transform rounded-[15px] bg-linear-to-tl from-black to-gray-600 p-6 text-white shadow-2xl transition-all duration-300 ${
          openFilter
            ? 'translate-y-0 scale-100 opacity-100'
            : '-translate-y-10 scale-0 opacity-0'
        }`}
      >
        {/* title */}
        <div className="flex items-center justify-between">
          <p className="font-[Samimbold] text-[18px]">فیلتر پیشرفته</p>
          <p
            onClick={closeFilterModal}
            className="flex size-8 cursor-pointer items-center justify-center rounded-full bg-[#404063] text-[20px] transition-all delay-75 duration-100 hover:scale-110"
          >
            <span>
              <IoCloseSharp />
            </span>
          </p>
        </div>
        {/* inputs filter */}
        <div>
          <div className="grid grid-cols-2 gap-5">
            <input
              type="text"
              placeholder="تاریخ شروع"
              className="w-[30vh] rounded-[10px] border border-white/20 bg-[#07090f] p-2 py-2 text-white placeholder:pr-2 placeholder:text-white/50"
            />
            <input
              type="text"
              placeholder="تاریخ پایان"
              className="w-[30vh] rounded-[10px] border border-white/20 bg-[#07090f] p-2 py-2 text-white placeholder:pr-2 placeholder:text-white/50"
            />
            <input
              type="text"
              value={shiftName}
              placeholder="نام شیفت"
              onChange={(e) => {
                setShiftName(e.target.value);
              }}
              className="w-[30vh] rounded-[10px] border border-white/20 bg-[#07090f] p-2 py-2 text-white placeholder:pr-2 placeholder:text-white/50"
            />
            <input
              type="text"
              value={shiftSupervisorName}
              placeholder="نام سر شیفت"
              onChange={(e) => setShiftSupervisorName(e.target.value)}
              className="w-[30vh] rounded-[10px] border border-white/20 bg-[#07090f] p-2 py-2 text-white placeholder:pr-2 placeholder:text-white/50"
            />
            <input
              type="text"
              value={personnelName}
              placeholder="نام و نام خانوادگی"
              onChange={(e) => setPersonnelName(e.target.value)}
              className="w-[30vh] rounded-[10px] border border-white/20 bg-[#07090f] p-2 py-2 text-white placeholder:pr-2 placeholder:text-white/50"
            />
            <select
              value={dayOfWeek}
              onChange={(e) => setDayOfWeek(Number(e.target.value))}
              className="w-[30vh] rounded-[10px] border border-white/20 bg-[#07090f] p-2 py-2 text-white placeholder:pr-2 placeholder:text-white/50"
            >
              <option value="">انتخاب روز هفته</option>

              <option value={1}>شنبه</option>
              <option value={2}>یکشنبه</option>
              <option value={3}>دوشنبه</option>
              <option value={4}>سه شنبه</option>
              <option value={5}>چهارشنبه</option>
              <option value={6}>پنجشنبه</option>
              <option value={7}>جمعه</option>
            </select>
          </div>
          <button>تایید</button>
        </div>
      </div>
    </div>
  );
}

export default FilterData;
