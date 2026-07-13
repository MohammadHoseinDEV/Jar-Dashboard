import { useEffect, useState } from 'react';

import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';

import close from '../../../../assets/images/close.png';
import { useUpdateProductionReport } from '../../Api/Production/Production';

function EditProductionReport({
  mobile,
  openEditModal,
  selectedProduction,
  setOpenEditModal,
  setSelectedProduction,
}) {
  const [form, setForm] = useState({
    reportDate: null,
    shift: 1,
    personnelName: '',
    shiftReport: '',
  });

  const updateProductionReports = useUpdateProductionReport();

  useEffect(() => {
    if (!openEditModal || !selectedProduction) return;

    setForm({
      reportDate: selectedProduction?.reportDate ?? '',
      shift: selectedProduction?.shift,
      personnelName: selectedProduction?.personnelName,
      shiftReport: selectedProduction?.shiftReport,
    });
  }, [openEditModal, selectedProduction]);

  const closeHandler = () => {
    setOpenEditModal(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const data = {
      ...form,
      reportDate: form.reportDate || null,
    };

    updateProductionReports.mutate(
      {
        id: selectedProduction?.id,
        data: { ...data, id: selectedProduction?.id },
      },
      {
        onSuccess: () => {
          setOpenEditModal(false);
          setSelectedProduction(null);
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
        className={`relative flex max-h-[90vh] w-[1000px] max-w-[95vw] flex-col gap-4 overflow-hidden rounded-[15px] bg-linear-to-tl from-black to-gray-600 p-6 text-white shadow-2xl transition-all duration-300 ${
          openEditModal
            ? 'translate-y-0 scale-100 opacity-100'
            : '-translate-y-10 scale-95 opacity-0'
        }`}
      >
        <div className="flex items-center justify-between">
          <p className="pr-1.5 font-[SamimBold] text-[20px]">ویرایش گزارش</p>
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
          className="no-scrollbar min-h-0 space-y-2 overflow-x-hidden overflow-y-auto max-md:max-h-[70vh]"
        >
          <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
            <DatePicker
              calendar={persian}
              locale={persian_fa}
              format="YYYY/MM/DD"
              calendarPosition="bottom-center"
              onChange={(value) =>
                setForm((p) => ({
                  ...p,
                  reportDate: value
                    ? value.toDate().toISOString().split('T')[0]
                    : '',
                }))
              }
              value={form.reportDate ? new Date(form.reportDate) : null}
              inputClass="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />

            <input
              type="text"
              readOnly
              name="personnelName"
              value={form?.personnelName}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <input
              type="text"
              readOnly
              name="shiftType"
              value={form?.shift}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
          </div>

          <textarea
            name="shiftReport"
            placeholder="توضیحات..."
            value={form.shiftReport}
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
            className="col-span-3 m-auto shrink-0 cursor-pointer rounded-[10px] bg-green-500 px-5 py-2"
          >
            ویرایش
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProductionReport;
