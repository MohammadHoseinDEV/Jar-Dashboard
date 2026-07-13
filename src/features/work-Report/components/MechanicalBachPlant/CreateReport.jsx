import { useEffect, useState } from 'react';

import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';

import close from '../../../../assets/images/close.png';
import { useGetProfile } from '../../../../hooks/profile/profile';
import { useCreateReports } from '../../Api/MechanicalBachPlant/mechanicalBachPlant';

function CreateReport({ openCreateModal, setOpenCreateModal }) {
  const [form, setForm] = useState({
    reportDate: '',
    shiftType: '',
    personnelName: '',
    shiftReport: '',
  });

  const { data: profile, isLoading, isError } = useGetProfile();

  useEffect(() => {
    if (profile?.data?.fullName) {
      setForm((p) => ({
        ...p,
        personnelName: profile?.data?.fullName,
      }));
    }

    if (profile?.data?.currentShift?.shiftName) {
      setForm((p) => ({
        ...p,
        shiftType: profile?.data?.currentShift?.shiftName,
      }));
    }
  }, [profile]);

  const createReport = useCreateReports();

  const closeModalHandler = () => {
    setOpenCreateModal(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    createReport.mutate(form, {
      onSuccess: () => {
        setOpenCreateModal(false);
      },
    });
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex h-screen items-center justify-center p-4 transition-opacity duration-300 ${
        openCreateModal
          ? 'pointer-events-auto opacity-100'
          : 'pointer-events-none opacity-0'
      }`}
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        onClick={closeModalHandler}
      />
      <div
        className={`relative flex max-h-[90vh] w-[1000px] max-w-[95vw] flex-col gap-4 overflow-hidden rounded-[15px] bg-linear-to-tl from-black to-gray-600 p-6 text-white shadow-2xl transition-all duration-300 ${
          openCreateModal
            ? 'translate-y-0 scale-100 opacity-100'
            : '-translate-y-10 scale-0 opacity-0'
        }`}
      >
        <div className="flex shrink-0 items-center justify-between">
          <p className="pr-1.5 font-[SamimBold] text-[20px]">
            ایجاد گزارش جدید
          </p>
          <button
            onClick={closeModalHandler}
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
        <form
          onSubmit={submitHandler}
          className="no-scrollbar grid min-h-0 grid-cols-3 gap-4 overflow-x-hidden overflow-y-auto"
        >
          <DatePicker
            calendar={persian}
            locale={persian_fa}
            placeholder="تاریخ ثبت گزارش"
            name="reportDate"
            format="YYYY/MM/DD"
            calendarPosition="bottom-center"
            onChange={(value) => {
              setForm({
                ...form,
                reportDate: value.toDate().toISOString().split('T')[0],
              });
            }}
            inputClass="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
          />

          <input
            type="text"
            readOnly
            name="personnelName"
            value={form.personnelName}
            className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
          />
          <input
            type="text"
            readOnly
            name="shiftType"
            value={profile?.data?.currentShift?.shiftName}
            className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
          />

          <textarea
            name="shiftReport"
            placeholder="توضیحات..."
            onChange={(e) =>
              setForm((p) => ({
                ...p,
                [e.target.name]: e.target.value,
              }))
            }
            className="col-span-3 mt-1 max-h-[500px] min-h-[200px] w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
          />
          <button
            type="submit"
            className="col-span-3 m-auto shrink-0 cursor-pointer rounded-[10px] bg-green-500 p-2"
          >
            ایجاد
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateReport;
