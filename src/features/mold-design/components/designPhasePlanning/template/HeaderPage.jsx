import React from 'react';
import { FaClipboardList, FaDownload, FaFilter, FaPlus } from 'react-icons/fa';
import { FiBell, FiCalendar, FiSearch } from 'react-icons/fi';
import { MdNoteAdd } from 'react-icons/md';
import { SiAltiumdesigner } from 'react-icons/si';

function HeaderPage({ openCreate, canCreate, search, setSearch, countReport }) {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="rounded-[10px] p-[5px] max-md:w-full">
        {/* Title & Deatails */}
        <div className="mx-2 mt-1 flex items-center justify-between border-b border-white/30 pb-3 max-2xl:pb-1">
          {/* Title */}
          <div className="flex items-center space-x-5 text-white max-md:w-full max-md:justify-between">
            <p className="5xl:size-12 flex size-10 items-center justify-center rounded-[10px] bg-[#e54c00] max-2xl:size-8 max-md:hidden">
              <span className="5xl:text-[30px] text-[22px] max-2xl:text-[19px]">
                <FaClipboardList />
              </span>
            </p>
            <p className="hidden w-3 opacity-0 max-md:block"></p>
            <p className="5xl:text-[25px] font-[SamimBold] text-[20px] max-2xl:text-[13px] max-md:flex max-md:items-center max-md:justify-center max-md:text-center max-md:text-[15px]">
              طرح ریزی فازهای طراحی واحدهای خارج سازمانی ( تهیه قالب و متعلقات
              خارجی )
            </p>
            <p className="hidden max-md:block max-md:pt-1 max-md:text-[20px]">
              <FiBell />
            </p>
          </div>
          {/* Details */}
          <div className="flex items-center space-x-5 pl-5 text-white max-md:hidden">
            <p className="flex items-center space-x-1">
              <span className="5xl:text-[25px] text-[17px] text-[#d84f15] max-2xl:text-[15px]">
                <FiCalendar />
              </span>
              <span className="5xl:text-[20px] font-[SamimBold] text-[12px] max-2xl:text-[10px]">
                تاریخ ویرایش :
              </span>
              <span className="5xl:text-[20px] font-[AvenirLTProMedium] text-[12px] max-2xl:text-[10px]">
                1401/10/10
              </span>
            </p>
            <p className="5xl:text-[20px] space-x-1 text-[12px] max-2xl:text-[10px]">
              <span className="font-[SamimBold]">شماره ویرایش :</span>
              <span className="font-[AvenirLTProMedium]">00</span>
            </p>
            <p className="5xl:text-[20px] space-x-1 text-[12px] max-2xl:text-[10px]">
              <span className="font-[SamimBold]">کد سند :</span>
              <span className="font-[AvenirLTProMedium]">M1002</span>
            </p>
          </div>
        </div>
        {/* Add Reports & Excel */}
        <div className="mx-2 mt-1 flex items-center justify-between max-md:hidden">
          <div className="flex items-center pt-2 text-white max-2xl:pt-0">
            <button
              onClick={openCreate}
              className={`group flex items-center justify-center gap-2 rounded-xl px-4 py-2 font-[Samim] max-2xl:px-3 ${
                canCreate
                  ? 'cursor-pointer bg-white/10 hover:bg-white/15'
                  : 'cursor-not-allowed bg-white/5 opacity-50'
              }`}
            >
              <p className="5xl:text-[25px] relative cursor-pointer transition-all delay-150 duration-200 ease-in-out after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:bg-white/50 after:transition-all after:duration-700 after:ease-out hover:scale-105 hover:after:w-full max-2xl:text-[12px]">
                افزودن فرم
              </p>
              <p className="5xl:text-[30px] text-[25px] text-[#d84f15] transition-all delay-150 duration-700 ease-in-out group-hover:rotate-360 max-2xl:text-[20px]">
                <MdNoteAdd />
              </p>
            </button>
          </div>
          <div className="5xl:mx-2">
            <input
              type="text"
              value={search}
              placeholder="جستجو..."
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              className="5xl:py-3.5 5xl:placeholder:text-[20px] 5xl:w-100 w-80 rounded-[10px] border border-white/20 bg-[#07090f] py-2 placeholder:pr-2 placeholder:text-white/50 max-2xl:text-[12px]"
            />
          </div>
          <div className="hidden items-center justify-end space-x-2 pt-2 pl-5 opacity-0">
            <button className="flex items-center justify-center rounded-[10px] bg-[#0e1117] px-4 py-2 text-[13px] text-white/70">
              <FaDownload />
              <span className="pr-2">خروجی اکسل</span>
            </button>
            <button className="flex items-center justify-center rounded-[10px] bg-[#f35714] px-4 py-2 text-[13px] text-white">
              <FaFilter />
              <span className="pr-2">فیلتر پیشرفته</span>
            </button>
          </div>
        </div>
      </div>
      <div className="mx-2 hidden max-md:block">
        <div className="my-3 rounded-[10px] border border-[#3a35a0] bg-linear-to-l from-[#201c66] to-[#1d1952] p-2">
          {/* Logo & Title Mobile */}
          <div className="flex items-center space-x-2">
            <p className="rounded-[10px] bg-[#4f46e5] p-2">
              <SiAltiumdesigner />
            </p>
            <p className="text-[14px] font-bold">
              طرح ریزی فازهای طراحی واحدهای خارج سازمانی ( تهیه قالب و متعلقات
              خارجی )
            </p>
          </div>
          {/* Details Report */}
          <div className="mt-2 grid grid-cols-3 gap-3">
            <p className="flex flex-col items-center justify-center rounded-[10px] bg-[#343181] py-2">
              <span className="text-[11px] font-bold text-[#5e7ef8]">
                کد سند
              </span>
              <span className="text-[] font-[AvenirLTProMedium]">M1002</span>
            </p>
            <p className="flex flex-col items-center justify-center rounded-[10px] bg-[#343181] py-2">
              <span className="text-[11px] font-bold text-[#5e7ef8]">
                شماره ویرایش
              </span>
              <span className="font-[AvenirLTProMedium]">00</span>
            </p>
            <p className="flex flex-col items-center justify-center rounded-[10px] bg-[#343181] py-2">
              <span className="text-[11px] font-bold text-[#5e7ef8]">
                تاریخ ویرایش
              </span>
              <span className="font-[AvenirLTProMedium]">1401/10/10</span>
            </p>
          </div>
        </div>
        {/* Search input */}
        <div className="relative flex w-full justify-between gap-1">
          <div>
            <input
              type="text"
              value={search}
              placeholder="جستجو در گزارش ها ..."
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              className="mb-3 h-11 rounded-[10px] border border-[#2c3050] bg-[#22263a] pr-8 font-bold"
            />
            <p className="absolute top-3 right-2 text-white/50">
              <FiSearch />
            </p>
          </div>
          <div
            onClick={openCreate}
            className={`flex h-11 items-center gap-1 rounded-xl px-3 whitespace-nowrap ${
              canCreate
                ? 'cursor-pointer bg-white/10 hover:bg-white/15'
                : 'cursor-not-allowed bg-white/5 opacity-50'
            }`}
          >
            <p className="font-[SamimBold] text-[13px]">افزودن فرم</p>
            <p className="text-[10px]">
              <FaPlus />
            </p>
          </div>
        </div>
        {/* Filters */}
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center space-x-1 text-[#6b75a0]">
            <p className="font-[AvenirLTProMedium]">{countReport}</p>
            <p className="font-semibold">گزارش یافت شد</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderPage;
