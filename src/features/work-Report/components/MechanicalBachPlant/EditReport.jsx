import { useEffect, useState } from 'react';

import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';

import close from '../../../../assets/images/close.png';
import { useUpdateBachReport } from '../../Api/MechanicalBachPlant/mechanicalBachPlant';

function EditReport({
  openEditModal,
  setOpenEditModal,
  selectedBach,
  setSelectedBach,
}) {
  const [form, setForm] = useState({
    id: '',
    reportDate: '',
    shiftType: '',
    personnelName: '',
    shiftReport: '',
  });

  useEffect(() => {
    if (!selectedBach) return;

    setForm({
      id: selectedBach?.id,
      reportDate: selectedBach?.reportDate,
      shiftType: selectedBach?.shiftType,
      personnelName: selectedBach?.personnelName,
      shiftReport: selectedBach?.shiftReport,
    });
  }, [selectedBach, openEditModal]);

  const closeHandler = () => {
    setOpenEditModal(false);
    setSelectedBach(null);
  };

  const updateReport = useUpdateBachReport();

  const submitHandler = (e) => {
    e.preventDefault();

    updateReport.mutate(
      {
        id: selectedBach?.id,
        form,
      },
      {
        onSuccess: () => {
          setOpenEditModal(false);
          setSelectedBach(null);
        },
      }
    );
  };
  return (
    <div
      className={`fixed inset-0 z-50 flex h-screen items-center justify-center overflow-hidden p-4 transition-opacity duration-300 ${
        openEditModal
          ? 'pointer-events-auto opacity-100 '
          : 'pointer-events-none opacity-0'
      }`}
    >
      <div
        onClick={closeHandler}
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
      />
      <div
        className={`relative flex max-h-[90vh] w-[1000px] max-w-[95vw] flex-col gap-4 overflow-hidden rounded-[15px] bg-linear-to-tl from-black to-gray-600 p-6 text-white shadow-2xl transition-all duration-300 max-md:h-160 max-md:overflow-auto ${
          openEditModal
            ? 'translate-y-0 scale-100 opacity-100'
            : '-translate-y-10 scale-0 opacity-0'
        }`}
      >
        <div className="flex shrink-0 items-center justify-between pb-5">
          <h2 className="font-[SamimBold] text-[20px]">
            ویرایش فرم گزارش روزانه واحد مکانیک بچ پلانت
          </h2>
          <button
            onClick={closeHandler}
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
            value={form.reportDate ? new Date(form.reportDate) : null}
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
            value={form.shiftType}
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
            value={form.shiftReport}
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

export default EditReport;
