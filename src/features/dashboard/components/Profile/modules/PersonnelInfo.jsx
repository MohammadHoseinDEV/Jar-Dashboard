import React from 'react';
import { IoSchool } from 'react-icons/io5';

import { LuUser } from 'react-icons/lu';
import { MdOutlineFileUpload, MdOutlineNumbers } from 'react-icons/md';
import { CiCalendarDate } from 'react-icons/ci';
import { PiBagSimpleFill } from 'react-icons/pi';
import { FiPhone } from 'react-icons/fi';
import { LiaSignatureSolid } from 'react-icons/lia';
import { FaFileSignature } from 'react-icons/fa6';
import { RiDeleteBin6Line } from 'react-icons/ri';

function PersonnelInfo({
  profile,
  signatureSrc,
  setOpenSignature,
  setUserId,
  setOpenDelete,
}) {
  const companyName = profile?.data?.companyRoles?.find(
    (d) => d.companyName
  )?.companyName;

  const roleName = profile?.data?.companyRoles?.find(
    (d) => d.roleName
  )?.roleName;

  const unitName = profile?.data?.units?.find((d) => d.unitName)?.unitName;
  const unitRole = profile?.data?.units?.find((d) => d.roleName)?.roleName;

  return (
    <div>
      {/* Logo */}
      <div className="relative m-auto flex w-fit items-center justify-center rounded-full border-4 border-[#555585] bg-linear-to-l from-[#705fbe] to-[#6a73da] text-center">
        <p className="p-6 text-[50px]">
          <LuUser />
        </p>
        <p className="absolute right-1 bottom-1 size-5 rounded-full border-2 bg-[#00d492]"></p>
      </div>
      {/* Name-PersonnelCode */}
      <div className="flex flex-col items-center justify-center space-y-2">
        <p className="font-[SamimBold] text-[20px]">
          {profile?.data?.fullName}
        </p>
        <div className="flex items-center justify-center space-x-1 rounded-[10px] border-2 border-[#5b5e88] bg-[#4a4b7d] p-1 text-[#edecdf]">
          <p className="text-[18px]">
            <MdOutlineNumbers />
          </p>
          <p className="font-[AvenirLTProMedium]">
            {profile?.data?.personnelCode}
          </p>
        </div>
      </div>
      {/* gender-educationDegreeName-hireDate*/}
      <div className="my-3 grid grid-cols-3 gap-4">
        <div className="space-y-1 rounded-[10px] bg-[#364064] py-1 font-[SamimBold]">
          <p className="flex items-center justify-center space-x-1 text-[#a0a4b6]">
            <span className="text-[20px]">
              <LuUser />
            </span>
            <span>جنسیت</span>
          </p>
          <p className="flex items-center justify-center text-[18px]">
            {profile?.data?.gender === 0 ? 'آقا' : 'خانم'}
          </p>
        </div>
        <div className="space-y-1 rounded-[10px] bg-[#364064] py-1 font-[SamimBold]">
          <p className="flex items-center justify-center space-x-1 text-[#a0a4b6]">
            <span className="text-[20px]">
              <IoSchool />
            </span>
            <span>مدرک تحصیلی</span>
          </p>
          <p className="flex items-center justify-center text-[18px]">
            {profile?.data?.educationDegreeName}
          </p>
        </div>
        <div className="space-y-1 rounded-[10px] bg-[#364064] py-1 font-[SamimBold]">
          <p className="flex items-center justify-center space-x-1 text-[#a0a4b6]">
            <span className="text-[20px]">
              <CiCalendarDate />
            </span>
            <span>تاریخ استخدام</span>
          </p>
          <p className="flex items-center justify-center text-[18px]">
            {profile?.data?.hireDatePersian}
          </p>
        </div>
      </div>
      <div className="no-scrollbar max-h-[40vh] space-y-5 overflow-auto">
        <div className="no-scrollbar min-h-0 space-y-5 overflow-auto">
          {/* اطلاعات شخصی */}
          <div>
            <div className="flex items-center space-x-2 rounded-tl-[10px] rounded-tr-[10px] bg-linear-to-l from-[#754da6] to-[#677ae5] py-4 pr-2 font-[SamimBold] text-[18px] text-[#f1edf6]">
              <p>
                <LuUser />
              </p>
              <p>اطلاعات شخصی</p>
            </div>
            <div className="grid grid-cols-2 rounded-br-[10px] rounded-bl-[10px] bg-white">
              <p className="flex flex-col space-y-1 p-2">
                <span className="text-gray-400">کد ملی</span>
                <span className="font-[AvenirLTProHeavy] text-black">
                  {profile?.data?.insuranceCode}
                </span>
              </p>
              <p className="flex flex-col space-y-1 p-2">
                <span className="text-gray-400">تاریخ تولد</span>
                <span className="font-[AvenirLTProHeavy] text-black">
                  {profile?.data?.birthDatePersian}
                </span>
              </p>
            </div>
          </div>
          {/* اطلاعات شغلی */}
          <div>
            <div className="flex items-center space-x-2 rounded-tl-[10px] rounded-tr-[10px] bg-linear-to-l from-[#36ea7e] to-[#149f8d] py-4 pr-2 font-[SamimBold] text-[18px] text-[#f1edf6]">
              <p>
                <PiBagSimpleFill />
              </p>
              <p>اطلاعات شغلی</p>
            </div>
            <div className="grid grid-cols-2 rounded-br-[10px] rounded-bl-[10px] bg-white">
              <p className="flex flex-col space-y-1 p-2">
                <span className="text-gray-400">کد پرسنلی</span>
                <span className="font-[AvenirLTProHeavy] text-black">
                  {profile?.data?.personnelCode}
                </span>
              </p>
              <p className="flex flex-col space-y-1 p-2">
                <span className="text-gray-400">کد بیمه</span>
                <span className="font-[AvenirLTProHeavy] text-black">
                  {profile?.data?.nationalCode}
                </span>
              </p>
              <p className="flex flex-col space-y-1 p-2">
                <span className="text-gray-400">کد Face</span>
                <span className="font-[AvenirLTProHeavy] text-black">
                  {profile?.data?.faceCode}
                </span>
              </p>
              <p className="flex flex-col space-y-1 p-2">
                <span className="text-gray-400"> تاریخ استخدام</span>
                <span className="font-[AvenirLTProHeavy] text-black">
                  {profile?.data?.hireDatePersian}
                </span>
              </p>
              <p className="flex flex-col space-y-1 p-2">
                <span className="text-gray-400">جایگاه شغلی</span>
                <span className="font-[SamimBold] text-black">
                  {profile?.data?.jobPositionTitle || '__'}
                </span>
              </p>
              <p className="flex flex-col space-y-1 p-2">
                <span className="text-gray-400">مدیر مستقیم</span>
                <span className="font-[SamimBold] text-black">
                  {profile?.data?.managerName || '__'}
                </span>
              </p>
              <p className="flex flex-col space-y-1 p-2">
                <span className="text-gray-400">شرکت</span>
                <span className="font-[SamimBold] text-black">
                  {companyName ?? '__'}
                </span>
              </p>
              <p className="flex flex-col space-y-1 p-2">
                <span className="text-gray-400">نقش در شرکت</span>
                <span className="font-[SamimBold] text-black">
                  {roleName ?? '__'}
                </span>
              </p>
              <p className="flex flex-col space-y-1 p-2">
                <span className="text-gray-400">واحد</span>
                <span className="font-[SamimBold] text-black">
                  {unitName ?? '__'}
                </span>
              </p>
              <p className="flex flex-col space-y-1 p-2">
                <span className="text-gray-400">واحد</span>
                <span className="font-[SamimBold] text-black">
                  {unitRole ?? '__'}
                </span>
              </p>
            </div>
          </div>
          {/* اطلاعات تماس */}
          <div>
            <div className="flex items-center space-x-2 rounded-tl-[10px] rounded-tr-[10px] bg-linear-to-l from-[#f55a73] to-[#f08ff2] py-4 pr-2 font-[SamimBold] text-[18px] text-[#f1edf6]">
              <p>
                <FiPhone />
              </p>
              <p>اطلاعات تماس</p>
            </div>
            <div className="grid grid-cols-2 rounded-br-[10px] rounded-bl-[10px] bg-white">
              <p className="flex flex-col space-y-1 p-2">
                <span className="text-gray-400">شماره همراه</span>
                <span className="font-[AvenirLTProHeavy] text-black">
                  {profile?.data?.mobileNumber}
                </span>
              </p>
            </div>
          </div>
          {/* امضاء */}
          <div className="mb-5">
            <div className="flex items-center space-x-2 rounded-tl-[10px] rounded-tr-[10px] bg-linear-to-r from-[#fecf01] to-[#f89b1c] py-4 pr-2 font-[SamimBold] text-[18px] text-[#f1edf6]">
              <p>
                <LiaSignatureSolid />
              </p>
              <p>امضاء</p>
            </div>
            <div className="rounded-br-[10px] rounded-bl-[10px] bg-white">
              <div className="flex flex-col items-center justify-center p-5">
                <div className="w-full">
                  {signatureSrc ? (
                    <div className="flex items-center justify-center rounded-[15px] border-4 border-dashed border-gray-300 bg-[#f8f8fc]">
                      <img
                        src={signatureSrc}
                        alt="signatureSrc"
                        className="h-50 w-80"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2 rounded-[15px] border-4 border-dashed border-gray-300 bg-[#f8f8fc] py-10">
                      <p className="text-[25px] text-gray-400">
                        <FaFileSignature />
                      </p>
                      <p className="font-[SamimBold] text-gray-400">
                        امضایی ثبت نشده است
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-3 grid w-full grid-cols-2 gap-5 text-black">
                  <p
                    onClick={() => {
                      setOpenSignature(true);
                    }}
                    className="flex cursor-pointer items-center justify-center space-x-2 rounded-[15px] border-3 border-[#cfcfcf] bg-linear-to-l from-[#764fa7] to-[#677ce6] py-2 text-[#ffffff] transition-all delay-100 duration-150 hover:text-black"
                  >
                    <span className="cursor-pointer text-[25px]">
                      <MdOutlineFileUpload />
                    </span>
                    <button className="cursor-pointer text-[20px]">
                      آپلود امضاء
                    </button>
                  </p>
                  <p
                    onClick={() => {
                      setOpenDelete(true);
                      setUserId(profile);
                    }}
                    className="flex cursor-pointer items-center justify-center space-x-2 rounded-[15px] border border-[#fb2c36] py-2 text-[#fb2c36] transition-all delay-100 duration-150 hover:border-white hover:bg-[#fb2c36] hover:text-white"
                  >
                    <span className="cursor-pointer text-[20px]">
                      <RiDeleteBin6Line />
                    </span>
                    <button className="cursor-pointer text-[20px]">حذف</button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonnelInfo;
