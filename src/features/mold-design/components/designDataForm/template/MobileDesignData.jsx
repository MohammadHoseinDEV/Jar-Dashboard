import React from 'react';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';
import { HiHashtag } from 'react-icons/hi';
import { IoTimeOutline } from 'react-icons/io5';
import { toShamsi } from '../../../../../Time/date';

import edit from '../../../../../assets/images/edit.png';
import deleteIcon from '../../../../../assets/images/delete.png';
import form from '../../../../../assets/images/form.png';

function MobileDesignData({
  filteredData,
  canEdit,
  profile,
  isDesignManager,
  isSuperAdmin,
  canDelete,
}) {
  return (
    <div>
      {/* Mobile design */}
      <div className="hidden max-md:block print:hidden">
        {filteredData?.map((e, index) => (
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
                    {e?.productName}
                  </span>
                  <span className="font-[AvenirLTProMedium] text-[13px] text-white/60">
                    {e?.productCode}
                  </span>
                </p>
              </div>
              <div className="flex items-center">
                {(() => {
                  if (e?.isFactoryManagerSigned === true) {
                    return (
                      <p className="rounded-[10px] bg-[#1b4025]/50 py-1 text-[#3cbb30]">
                        تکمیل شده
                      </p>
                    );
                  }
                  if (e?.isFactoryManagerSigned === true) {
                    return (
                      <p className="rounded-[10px] bg-[#1b4025]/50 py-1 text-[#3cbb30]">
                        تکمیل شده
                      </p>
                    );
                  }
                  if (e?.isDesignerSigned === false) {
                    return (
                      <p className="rounded-[10px] border bg-[#262627]/70 px-1 py-1 text-[#f9e2af] max-md:text-[10px]">
                        درانتظار امضاء مسئول طراحی
                      </p>
                    );
                  }
                  if (e?.isFactoryManagerSigned === false) {
                    return (
                      <p className="rounded-[10px] bg-[#262627]/70 py-1 text-[#f9e2af] max-md:text-[10px]">
                        درانتظار امضاء مدیر تولید
                      </p>
                    );
                  }
                  if (e?.isProductionManagerSigned === false) {
                    return (
                      <p className="rounded-[10px] bg-[#262627]/70 py-1 text-[#f9e2af] max-md:text-[10px]">
                        درانتظار امضاء مدیر کارخانه
                      </p>
                    );
                  }
                })()}
              </div>
            </div>
            <div className="mx-1 mb-2 grid grid-cols-2 gap-2">
              <div className="flex items-center space-x-2">
                <p className="text-[22px] text-white/50">
                  <IoTimeOutline />
                </p>
                <p className="flex flex-col">
                  <span className="text-white/50">کد محصول</span>
                  <span className="font-[AvenirLTProMedium]">
                    {e?.productCode}
                  </span>
                </p>
              </div>
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
                  <span className="text-white/50">امضاء سرپرست</span>
                  <span className="font-[AvenirLTProMedium]">
                    {toShamsi(e?.supervisorSignedAt)}
                  </span>
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <p className="text-[22px] text-white/50">
                  <HiHashtag />
                </p>
                <p className="flex flex-col">
                  <span className="text-white/50">شماره گزارش</span>
                  <span className="font-[AvenirLTProMedium]">
                    {e?.formNumber}
                  </span>
                </p>
              </div>
            </div>
            <div className="mx-2 grid grid-cols-7 gap-2">
              <button
                onClick={() => openEdit(e)}
                className={`col-span-3 mb-2 flex cursor-pointer items-center justify-center rounded-[10px] p-1 font-[Samim] ${
                  (canEdit &&
                    profile?.data?.id === e?.createdBy &&
                    e?.isFactoryManagerSigned === false) ||
                  (canEdit && isDesignManager) ||
                  isSuperAdmin
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
                  setSelectedDesign(e);
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

export default MobileDesignData;
