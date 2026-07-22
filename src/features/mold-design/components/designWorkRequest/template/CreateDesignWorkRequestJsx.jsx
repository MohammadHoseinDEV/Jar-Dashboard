import React from 'react';

import close from '../../../../../assets/images/close.png';

import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';

import TimePickerInput from '../../../../../Time/TimePickerInput';

function CreateDesignWorkRequestJsx({
  closeHandler,
  submitHandler,
  form,
  setForm,
  profile,
}) {
  return (
    <div>
      <div className="flex shrink-0 items-center justify-between">
        <p className="5xl:text-[30px] pr-1.5 font-[SamimBold] text-[20px] max-2xl:text-[15px]">
          ایجاد درخواست کار جدید
        </p>
        <button
          onClick={closeHandler}
          className="cursor-pointer rounded-[10px] bg-white/80 p-1.5 text-[30px] text-red-500 transition-all delay-100 duration-75 ease-in-out hover:bg-black"
        >
          <img
            src={close}
            alt="close"
            width={20}
            className="5xl:w-7 transition-all delay-100 duration-100 ease-in-out hover:scale-110 max-2xl:w-4"
          />
        </button>
      </div>
      <form
        onSubmit={submitHandler}
        id="workRequest"
        className="no-scrollbar flex min-h-90 flex-col overflow-x-hidden overflow-y-auto max-md:max-h-[70vh]"
      >
        <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
          <label
            htmlFor="requestDate"
            className="5xl:text-[30px] flex flex-col"
          >
            تاریخ
            <DatePicker
              calendar={persian}
              locale={persian_fa}
              placeholder="تاریخ ثبت درخواست"
              name="requestDate"
              format="YYYY/MM/DD"
              calendarPosition="bottom-center"
              onChange={(value) =>
                setForm({
                  ...form,
                  requestDate: value
                    ? value.toDate().toISOString().split('T')[0]
                    : '',
                })
              }
              className="5xl:scale-125"
              inputClass="w-full  rounded-xl 5xl:text-[25px] max-2xl:text-[14px]  bg-white/10 p-3 my-2 font-[Samim] text-[18px] text-white outline-none"
            />
          </label>
          <label
            htmlFor="requestingUnit"
            className="5xl:text-[30px] flex flex-col"
          >
            واحد درخواست کننده
            <input
              type="text"
              name="requestingUnit"
              readOnly
              value={profile?.data?.units?.[0]?.unitName || 'بدون واحد'}
              className="5xl:text-[25px] my-2 w-full rounded-xl bg-white/10 p-3 text-[18px] text-white outline-none max-2xl:text-[14px]"
            />
          </label>
          <label htmlFor="requestTime">
            <p className="pb-2"> ساعت ثبت درخواست</p>
            <TimePickerInput
              value={form.requestTime || ''}
              onChange={(e) => {
                setForm((p) => ({
                  ...p,
                  requestTime: e,
                }));
              }}
            />
          </label>
        </div>
        <div>
          <label htmlFor="requestDescription">
            شرح درخواست
            <input
              type="text"
              name="requestDescription"
              placeholder="شرح درخواست کار"
              onChange={(e) => {
                setForm((p) => ({
                  ...p,
                  [e.target.name]: e.target.value,
                }));
              }}
              className="5xl:text-[25px] my-2 w-full rounded-xl bg-white/10 p-3 text-[18px] text-white outline-none max-2xl:text-[14px]"
            />
          </label>
        </div>
      </form>
    </div>
  );
}

export default CreateDesignWorkRequestJsx;
