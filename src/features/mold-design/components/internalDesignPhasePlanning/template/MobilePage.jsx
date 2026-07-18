import React from 'react';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';
import { IoTimeOutline } from 'react-icons/io5';
import { toShamsi } from '../../../../../Time/date';
import { HiHashtag } from 'react-icons/hi';

import edit from '../../../../../assets/images/edit.png';
import deleteIcon from '../../../../../assets/images/delete.png';
import form from '../../../../../assets/images/form.png';

function MobilePage({
  internal,
  openEdit,
  canEdit,
  canDelete,
  askDelete,
  setOpenForm,
  setSelectedReport,
}) {
  return (
    <div>
      {/* Mobile design */}
      <div className="hidden max-md:block print:hidden">
        {internal?.data?.items?.map((e, index) => (
          <div
            key={e.id}
            className="mx-2 my-2 rounded-[10px] border border-white/30"
          >
            <div className="mx-1 my-2 flex items-center justify-between border-b border-white/50 px-2 pb-2">
              <div className="flex items-center space-x-3">
                <p className="rounded-full bg-[#252d5a] p-4 text-white/50">
                  <FiUser />
                </p>
                <p className="flex flex-col space-y-0.5">
                  <span className="font-[AvenirLTProMedium] text-[11px] font-bold">
                    {e?.productNameOrSampleCode}
                  </span>
                </p>
              </div>
            </div>
            <div className="mx-1 mb-2 grid grid-cols-2 gap-2">
              <div className="flex items-center space-x-2">
                <p className="text-[22px] text-white/50">
                  <FiCalendar />
                </p>
                <p className="flex flex-col">
                  <span className="text-white/50">تاریخ ثبت</span>
                  <span className="font-[AvenirLTProMedium]">
                    {toShamsi(e?.createdAt)}
                  </span>
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <p className="text-[22px] text-white/50">
                  <FiClock />
                </p>
                <p className="flex flex-col">
                  <span className="text-white/50">زمان شروع</span>
                  <span className="font-[AvenirLTProMedium]">
                    {toShamsi(e?.startTime)}
                  </span>
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <p className="text-[22px] text-white/50">
                  <FiClock />
                </p>
                <p className="flex flex-col">
                  <span className="text-white/50">زمان پایان</span>
                  <span className="font-[AvenirLTProMedium]">
                    {toShamsi(e?.endTime)}
                  </span>
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <p className="text-[22px] text-white/50">
                  <FiClock />
                </p>
                <p className="flex flex-col">
                  <span className="text-white/50"> کل زمان پیش بینی</span>
                  <span className="font-[AvenirLTProMedium]">
                    {e?.estimatedTotalHours}
                  </span>
                </p>
              </div>
            </div>
            <div className="mx-2 grid grid-cols-7 gap-2">
              <button
                onClick={() => openEdit(e)}
                className={`col-span-3 mb-2 flex cursor-pointer items-center justify-center rounded-[10px] p-1 font-[Samim] ${
                  canEdit
                    ? 'cursor-pointer bg-linear-to-bl from-green-500/10 to-green-800/50 transition-all delay-100 duration-150 ease-in-out hover:scale-106'
                    : 'hidden bg-white/5 opacity-50'
                }`}
              >
                <img src={edit} alt="edit" width={20} className="mx-3 py-1" />
                <span className="pl-4">ویرایش</span>
              </button>
              <button
                onClick={() => {
                  setOpenForm(true);
                  setSelectedReport(e);
                }}
                className="col-span-3 mb-2 flex cursor-pointer items-center justify-center rounded-[10px] bg-linear-to-bl from-white/30 to-white/70 p-1 px-7 font-[Samim] transition-all delay-100 duration-150 ease-in-out hover:scale-106"
              >
                <img src={form} alt="form" width={20} className="mx-3 py-1" />
                مشاهده
              </button>
              <button
                onClick={() => askDelete(e)}
                className={`mb-2 flex cursor-pointer items-center justify-center rounded-[10px] p-2 font-[Samim] ${
                  canDelete
                    ? 'cursor-pointer bg-linear-to-bl from-red-500/10 to-red-800/50 transition-all delay-100 duration-150 ease-in-out hover:scale-106'
                    : 'hidden bg-white/5 opacity-50'
                }`}
              >
                <img src={deleteIcon} alt="deleteIcon" width={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MobilePage;
