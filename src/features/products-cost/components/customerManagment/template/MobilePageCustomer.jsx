import React from 'react';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';
import { IoTimeOutline } from 'react-icons/io5';
import { toShamsi } from '../../../../../Time/date';
import { HiHashtag } from 'react-icons/hi';

import edit from '../../../../../assets/images/edit.png';
import form from '../../../../../assets/images/form.png';
import deleteIcon from '../../../../../assets/images/delete.png';
import { SiNamecheap } from 'react-icons/si';
import { FaBarcode } from 'react-icons/fa';

function MobilePageCustomer({
  filterData,
  canEdit,
  canDelete,
  askDelete,
  openEdit,
  setOpenForm,
  setSelectedCustomer,
}) {
  return (
    <div className="hidden w-full max-md:block">
      <div className="hidden max-md:block print:hidden">
        {filterData?.map((e, index) => (
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
                  <span className="text-[10px] font-bold">
                    {e?.customerName}
                  </span>
                  <span className="font-[AvenirLTProMedium] text-[13px] text-white/60">
                    {e?.customerCode}
                  </span>
                </p>
              </div>
              <div className="flex items-center">
                {(() => {
                  if (e?.isActive === true) {
                    return (
                      <p className="rounded-[10px] bg-[#1b4025]/50 px-2 py-1 text-[#3cbb30]">
                        فعال
                      </p>
                    );
                  }
                  if (e?.isActive === false) {
                    return (
                      <p className="5xl:py-2 5xl:text-[20px] rounded-[5px] bg-[#dd1313]/20 p-1 text-[15px] text-[#ec0d0d]">
                        غیرفعال
                      </p>
                    );
                  }
                })()}
              </div>
            </div>
            <div className="mx-1 mb-2 grid grid-cols-2 gap-2">
              <div className="flex items-center space-x-2">
                <p className="text-[22px] text-white/50">
                  <FaBarcode />
                </p>
                <p className="flex flex-col">
                  <span className="text-white/50">کد محصول</span>
                  <span className="font-[AvenirLTProMedium]">
                    {e?.customerCode}
                  </span>
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <p className="text-[22px] text-white/50">
                  <SiNamecheap />
                </p>
                <p className="flex flex-col">
                  <span className="text-white/50">نام محصول</span>
                  <span>{e?.customerName}</span>
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <p className="text-[22px] text-white/50">
                  <FiCalendar />
                </p>
                <p className="flex flex-col">
                  <span className="text-white/50">تاریخ ثبت</span>
                  <span className="font-[AvenirLTProMedium]">
                    {toShamsi(e?.createdDate)}
                  </span>
                </p>
              </div>
            </div>
            <div className="mx-2 grid grid-cols-4 gap-2">
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

export default MobilePageCustomer;
