import React from 'react';
import { FaCheck, FaClipboardList, FaDownload, FaFilter } from 'react-icons/fa';
import { FiBell, FiCalendar } from 'react-icons/fi';
import { MdNoteAdd, MdNumbers } from 'react-icons/md';
import { getToday, toShamsi } from '../../../../../Time/date';
import { RiCustomerService2Fill } from 'react-icons/ri';
import { GrDocumentTransfer } from 'react-icons/gr';
import { FaXmark } from 'react-icons/fa6';
import { TbReport } from 'react-icons/tb';

function HeaderPageTransfer({
  openCreate,
  canCreate,
  allReport,
  allTransferExport,
  allTransferDomestic,
  withoutTransfer,
  filterStatus,
  setFilterStatus,
  search,
  setSearch,
  countReport,
  openFilterMobile,
  setOpenFilterMobile,
}) {
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
                <RiCustomerService2Fill />
              </span>
            </p>
            <p className="hidden w-3 opacity-0 max-md:block"></p>
            <p className="5xl:text-[30px] font-[SamimBold] text-[25px] max-2xl:text-[13px] max-md:flex max-md:items-center max-md:justify-center max-md:text-center max-md:text-[14px]">
              ثبت حواله
            </p>
            <p className="hidden max-md:block max-md:pt-1 max-md:text-[20px]">
              <GrDocumentTransfer />
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
                {toShamsi(getToday)}
              </span>
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
                ثبت حواله جدید
              </p>
              <p className="5xl:text-[30px] text-[25px] text-[#d84f15] transition-all delay-150 duration-700 ease-in-out group-hover:rotate-360 max-2xl:text-[20px]">
                <MdNoteAdd />
              </p>
            </button>
          </div>
          <div className="flex items-center justify-end space-x-2 pt-2 pl-5 opacity-0">
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
      {/* data reports */}
      <div className="mx-10 mt-1 grid grid-cols-4 gap-2 space-x-2 max-2xl:mx-5 max-2xl:gap-0 max-md:hidden">
        <div
          onClick={() => setFilterStatus('all')}
          className="col-span-1 flex cursor-pointer rounded-[10px] border border-[#be4615]/50 py-2 transition-all delay-100 duration-200 ease-in-out hover:scale-105 max-2xl:py-1"
        >
          <div className="5xl:p-3 5xl:text-[30px] my-auto p-2 text-[18px] max-2xl:text-[16px] max-lg:p-2 max-lg:text-[15px]">
            <p className="5xl:size-15 flex size-11 items-center justify-center rounded-[10px] bg-[#be4615]/25 text-[#be4615] max-2xl:size-8 max-lg:size-8">
              <MdNumbers />
            </p>
          </div>
          <p className="my-auto h-13 border-l-2 border-[#f35714]/70 max-2xl:h-10"></p>
          <div className="my-auto px-2">
            <p className="font-[AvenirLTProHeavy] text-[25px] font-extrabold text-white max-2xl:text-[20px]">
              {allReport}
            </p>
            <p className="5xl:text-[20px] text-[15px] text-white/60 max-2xl:text-[12px] max-lg:pb-2 max-lg:text-[10px]">
              کل حواله ها
            </p>
          </div>
        </div>
        <div
          onClick={() => setFilterStatus('export')}
          className="flex cursor-pointer rounded-[10px] border border-[#a6e3a1]/50 py-2 transition-all delay-100 duration-200 ease-in-out hover:scale-105 max-2xl:py-1"
        >
          <div className="5xl:p-3 5xl:text-[30px] my-auto p-2 text-[20px] max-lg:p-2 max-lg:text-[15px]">
            <p className="5xl:size-15 flex size-11 items-center justify-center rounded-[10px] bg-[#1e2625]/25 text-[#a6e3a1] max-2xl:size-8 max-lg:size-8">
              <FaCheck />
            </p>
          </div>
          <p className="my-auto h-13 border-l-2 border-[#a6e3a1] max-2xl:h-10"></p>
          <div className="my-auto px-2">
            <p className="font-[AvenirLTProHeavy] text-[25px] font-extrabold text-white">
              {allTransferExport}
            </p>
            <p className="5xl:text-[20px] text-[15px] text-white/60 max-2xl:text-[12px] max-lg:pb-2 max-lg:text-[10px]">
              حواله های صادراتی
            </p>
          </div>
        </div>
        <div
          onClick={() => setFilterStatus('domestic')}
          className="flex cursor-pointer rounded-[10px] border border-white py-2 transition-all delay-100 duration-200 ease-in-out hover:scale-105 max-2xl:py-1"
        >
          <div className="5xl:p-3 5xl:text-[30px] my-auto p-2 text-[20px] max-lg:p-2 max-lg:text-[15px]">
            <p className="flex size-11 items-center justify-center rounded-[10px] bg-[#251d26]/25 text-white max-2xl:size-8 max-lg:size-8">
              <FaXmark />
            </p>
          </div>
          <p className="my-auto h-13 border-l-2 border-white max-2xl:h-10"></p>
          <div className="my-auto px-2">
            <p className="font-[AvenirLTProHeavy] text-[25px] font-extrabold text-white">
              {allTransferDomestic}
            </p>
            <p className="5xl:text-[20px] text-[15px] text-white/60 max-2xl:text-center max-2xl:text-[10px] max-lg:pb-2 max-lg:text-[10px]">
              حواله های داخلی
            </p>
          </div>
        </div>
        <div
          onClick={() => setFilterStatus(!filterStatus)}
          className="flex cursor-pointer rounded-[10px] border border-white py-2 transition-all delay-100 duration-200 ease-in-out hover:scale-105 max-2xl:py-1"
        >
          <div className="5xl:p-3 5xl:text-[30px] my-auto p-2 text-[20px] max-lg:p-2 max-lg:text-[15px]">
            <p className="flex size-11 items-center justify-center rounded-[10px] bg-[#251d26]/25 text-white max-2xl:size-8 max-lg:size-8">
              <FaXmark />
            </p>
          </div>
          <p className="my-auto h-13 border-l-2 border-white max-2xl:h-10"></p>
          <div className="my-auto px-2">
            <p className="font-[AvenirLTProHeavy] text-[25px] font-extrabold text-white">
              {withoutTransfer}
            </p>
            <p className="5xl:text-[20px] text-[15px] text-white/60 max-2xl:text-center max-2xl:text-[10px] max-lg:pb-2 max-lg:text-[10px]">
              بدون حواله
            </p>
          </div>
        </div>
      </div>
      {/* Search & Filter */}
      <div className="mx-2 mt-1 flex items-center justify-between max-md:hidden">
        <div className="col-span-4 flex items-center space-x-1 pr-5">
          <p className="5xl:text-[40px] text-[30px] text-[#e54c00] max-2xl:text-[20px]">
            <TbReport />
          </p>
          <p className="5xl:text-[25px] font-[SamimBold] text-[20px] text-white max-2xl:text-[15px]">
            لیست گزارشات
          </p>
        </div>
        <div className="col-span-2 flex items-center justify-center space-x-2 py-2 max-2xl:py-1">
          <div className="flex items-center space-x-1 rounded-[10px] border border-white/20 bg-[#07090f] px-2 py-1 text-white/50">
            <p
              onClick={() => setFilterStatus('all')}
              className={`5xl:text-[20px] my-1.5 cursor-pointer rounded-[10px] px-4 py-1 transition-all duration-200 ease-out max-2xl:my-1 max-2xl:text-[12px] ${
                filterStatus === 'all'
                  ? 'scale-108 bg-[#f35714] text-white'
                  : 'scale-100 hover:text-white'
              } `}
            >
              همه
            </p>
            <p
              onClick={() => {
                setFilterStatus('export');
              }}
              className={`5xl:text-[20px] my-1.5 cursor-pointer rounded-[10px] px-4 py-1 transition-all duration-200 ease-out max-2xl:my-1 max-2xl:text-[12px] ${
                filterStatus === 'export'
                  ? 'scale-108 bg-[#f35714] text-white'
                  : 'scale-100 hover:text-white'
              } `}
            >
              صادرات
            </p>
            <p
              onClick={() => {
                setFilterStatus('domestic');
              }}
              className={`5xl:text-[20px] my-1.5 cursor-pointer rounded-[10px] px-4 py-1 transition-all duration-200 ease-out max-2xl:my-1 max-2xl:text-[12px] ${
                filterStatus === 'domestic'
                  ? 'scale-108 bg-[#f35714] text-white'
                  : 'scale-100 hover:text-white'
              } `}
            >
              داخلی
            </p>
            <p
              onClick={() => {
                setFilterStatus(!filterStatus);
              }}
              className={`5xl:text-[20px] my-1.5 cursor-pointer rounded-[10px] px-4 py-1 transition-all duration-200 ease-out max-2xl:my-1 max-2xl:text-[12px] ${
                !filterStatus
                  ? 'scale-108 bg-[#f35714] text-white'
                  : 'scale-100 hover:text-white'
              } `}
            >
              بدون حواله
            </p>
          </div>
          <div className="5xl:mx-2">
            <input
              type="text"
              value={search}
              placeholder="جستجو..."
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              className="5xl:py-3.5 5xl:placeholder:text-[20px] 5xl:w-[40vh] w-[30vh] rounded-[10px] border border-white/20 bg-[#07090f] py-3 placeholder:pr-2 placeholder:text-white/50 max-2xl:text-[12px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderPageTransfer;
