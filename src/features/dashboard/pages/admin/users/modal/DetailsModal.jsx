import close from '../../../../../../assets/images/close.png';
import { toShamsi } from '../../../../../../Time/date';

function DetailsModal({ openDetails, setOpenDetails, selectedUser, mobile }) {
  return (
    <>
      {mobile ? (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
            openDetails ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
          <div
            className={`relative w-fit transform rounded-[15px] bg-linear-to-tl from-black to-gray-600 p-6 text-white shadow-2xl transition-all duration-300 ${
              openDetails
                ? 'translate-y-0 scale-100 opacity-100'
                : '-translate-y-10 scale-95 opacity-0'
            }`}
          >
            <div className="flex items-center justify-between space-x-10 pb-5">
              <h2 className="pr-1.5 font-[SamimBold] text-[16px]">
                {`اطلاعات کاربری ${selectedUser?.fullName}`}
              </h2>
              <button
                onClick={() => setOpenDetails(false)}
                className="cursor-pointer rounded-[10px] bg-white/80 p-1.5 text-red-500 transition-all delay-100 duration-75 ease-in-out hover:bg-black"
              >
                <img
                  src={close}
                  alt="close"
                  width={15}
                  className="transition-all delay-100 duration-100 ease-in-out hover:scale-110"
                />
              </button>
            </div>
            <div className="space-y-3 rounded-2xl border p-2">
              <p>
                <span className="font-[SamimBold]">عنوان شیفت : </span>
                <span className="text-[#c7f44c]">
                  {selectedUser?.currentShiftName ?? '--'}
                </span>
              </p>
              <p>
                <span className="font-[SamimBold]">شروع شیفت : </span>
                <span className="text-[#c7f44c]">
                  {toShamsi(selectedUser?.currentShiftStartDate)}
                </span>
              </p>
              <p>
                <span className="font-[SamimBold]">پایان شیفت : </span>
                <span className="text-[#c7f44c]">
                  {toShamsi(selectedUser?.currentShiftEndDate)}
                </span>
              </p>
              <p>
                <span className="font-[SamimBold]">عنوان مدرک تحصیلی : </span>
                <span className="text-[#c7f44c]">
                  {selectedUser?.educationDegreeName ?? '--'}
                </span>
              </p>
              <p>
                <span className="font-[SamimBold]">تاریخ استخدام :</span>
                <span className="text-[#c7f44c]">
                  {toShamsi(selectedUser?.hireDate)}
                </span>
              </p>
              <p>
                <span className="font-[SamimBold]">تاریخ تولد : </span>
                <span className="text-[#c7f44c]">
                  {toShamsi(selectedUser?.birthDate)}
                </span>
              </p>
              <p>
                <span className="font-[SamimBold]">کدملی : </span>
                <span className="text-[#c7f44c]">
                  {selectedUser?.nationalCode ?? '--'}
                </span>
              </p>
              <p>
                <span className="font-[SamimBold]">شماره همراه : </span>
                <span className="text-[#c7f44c]">
                  {selectedUser?.mobileNumber ?? '--'}
                </span>
              </p>
              <p>
                <span className="font-[SamimBold]"> جایگاه شغلی : </span>
                <span className="text-[#c7f44c]">
                  {selectedUser?.jobPositionTitle ?? '--'}
                </span>
              </p>
              <p>
                <span className="font-[SamimBold]">Face code : </span>
                <span className="text-[#c7f44c]">
                  {selectedUser?.faceCode ?? '--'}
                </span>
              </p>
              <p>
                <span className="font-[SamimBold]">جنسیت : </span>
                <span className="text-[#c7f44c]">
                  {selectedUser?.genderName ?? '--'}
                </span>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
            openDetails ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

          <div
            className={`relative w-fit transform rounded-[15px] bg-linear-to-tl from-black to-gray-600 p-6 text-white shadow-2xl transition-all duration-300 ${
              openDetails
                ? 'translate-y-0 scale-100 opacity-100'
                : '-translate-y-10 scale-95 opacity-0'
            }`}
          >
            <div className="m-auto flex items-center justify-between pb-5">
              <h2 className="pr-1.5 pb-5 font-[SamimBold] text-[20px]">
                {`اطلاعات کاربری ${selectedUser?.fullName}`}
              </h2>

              <button
                onClick={() => setOpenDetails(false)}
                className="cursor-pointer rounded-[10px] bg-white/80 p-1.5 text-[30px] text-red-500 transition-all delay-100 duration-75 ease-in-out hover:bg-black"
              >
                <img
                  src={close}
                  alt="close"
                  width={20}
                  className="transition-all delay-100 duration-100 ease-in-out hover:scale-110"
                />
              </button>
            </div>

            <div className="mt-6 overflow-x-auto rounded-2xl border border-white/70 p-3">
              <table className="px-3 font-[SamimBold] text-[20px]">
                <thead>
                  <tr className="text-center text-white/70">
                    <th className="px-3 py-5">عنوان شیفت</th>
                    <th className="px-3 py-5">شروع شیفت</th>
                    <th className="px-3 py-5">پایان شیفت</th>
                    <th className="px-3 py-5">عنوان مدرک تحصیلی</th>
                    <th className="px-3 py-5">تاریخ استخدام</th>
                    <th className="px-3 py-5">تاریخ تولد</th>
                    <th className="px-3 py-5">Face code</th>
                    <th className="px-3 py-5">جنسیت</th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="bg-white/5 text-center">
                    <td className="px-3 py-6 font-[Samim]">
                      {selectedUser?.currentShiftName ?? '--'}
                    </td>

                    <td className="px-3 py-6 font-[AvenirLTProBook]">
                      {toShamsi(selectedUser?.currentShiftStartDate)}
                    </td>

                    <td className="px-3 py-6 font-[AvenirLTProBook]">
                      {toShamsi(selectedUser?.currentShiftEndDate)}
                    </td>

                    <td className="px-3 py-6 font-[Samim]">
                      {selectedUser?.educationDegreeName ?? '--'}
                    </td>

                    <td className="px-3 py-6 font-[AvenirLTProBook]">
                      {toShamsi(selectedUser?.hireDate)}
                    </td>

                    <td className="px-3 py-6 font-[AvenirLTProBook]">
                      {toShamsi(selectedUser?.birthDate)}
                    </td>

                    <td className="px-3 py-6 font-[AvenirLTProBook]">
                      {selectedUser?.faceCode ?? '--'}
                    </td>

                    <td className="px-3 py-6 font-[Samim]">
                      {selectedUser?.genderName ?? '--'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DetailsModal;
