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
        className="no-scrollbar flex max-h-[65vh] min-h-0 flex-1 flex-col overflow-x-hidden overflow-y-auto max-md:max-h-[70vh]"
      >
        <p className="5xl:text-[30px] my-2 border-t-2 border-white/30 py-1 text-[20px] font-bold">
          درخواست :
        </p>
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
        <div className="grid grid-cols-3 gap-4 space-y-1">
          <p className="5xl:text-[25px]">پیوست :</p>
          <label
            className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
              form.hasAttachment === true
                ? 'border-green-600 text-white'
                : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
            } font-[SamimBold] text-[18px]`}
          >
            <input
              type="radio"
              name="hasAttachment"
              checked={form.hasAttachment === true}
              onChange={() =>
                setForm((prev) => ({
                  ...prev,
                  hasAttachment: true,
                }))
              }
              className="hidden"
            />
            دارد
          </label>
          <label
            className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
              form.hasAttachment === false
                ? 'border-red-600 '
                : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
            } font-[SamimBold] text-[18px]`}
          >
            <input
              type="radio"
              name="hasAttachment"
              checked={form.hasAttachment === false}
              onChange={() =>
                setForm((prev) => ({
                  ...prev,
                  hasAttachment: false,
                }))
              }
              className="hidden"
            />
            ندارد
          </label>
        </div>
        <div>
          <input
            type="text"
            name=""
            placeholder="توضیحات پیوست"
            onChange={(e) => {
              setForm((p) => ({
                ...p,
                [e.target.name]: e.target.value,
              }));
            }}
            className="5xl:text-[25px] my-2 w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none max-2xl:text-[14px] max-md:text-[13px]"
          />
        </div>
        <p className="5xl:text-[30px] my-2 border-t-2 border-white/30 py-1 text-[20px] font-bold">
          نظریه واحد طراحی :
        </p>
        <div>
          <p className="5xl:text-[25px]">درصورت موافقت اولویت انجام کار :</p>
          <div className="my-2 grid grid-cols-3 gap-4">
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.priority === 1
                  ? 'border-green-600 text-white'
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="priority"
                checked={form.priority === 1}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    priority: 1,
                  }))
                }
                className="hidden"
              />
              کم
            </label>
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.priority === 2
                  ? 'border-yellow-400 text-white'
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="priority"
                checked={form.priority === 2}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    priority: 2,
                  }))
                }
                className="hidden"
              />
              متوسط
            </label>
            <label
              className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 transition-all select-none max-2xl:px-3 max-2xl:text-[14px] max-md:w-full ${
                form.priority === 3
                  ? 'border-red-600 text-white'
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[18px]`}
            >
              <input
                type="radio"
                name="priority"
                checked={form.priority === 3}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    priority: 3,
                  }))
                }
                className="hidden"
              />
              زیاد
            </label>
          </div>
          <label htmlFor="managerNotes">
            توضیحات :
            <input
              type="text"
              name="managerNotes"
              placeholder="توضیحات ..."
              onChange={(e) => {
                setForm((p) => ({
                  ...p,
                  [e.target.name]: e.target.value,
                }));
              }}
              className="5xl:text-[25px] my-2 w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none max-2xl:text-[14px] max-md:text-[13px]"
            />
          </label>
        </div>
        <p className="5xl:text-[30px] my-2 border-t-2 border-white/30 py-1 text-[20px] font-bold">
          رسید واحد طراحی :
        </p>
        <div className="grid grid-cols-2 gap-4">
          <label
            htmlFor="deliveryDate"
            className="5xl:text-[30px] flex flex-col"
          >
            تاریخ تحویل کار :
            <DatePicker
              calendar={persian}
              locale={persian_fa}
              placeholder="تاریخ ثبت درخواست"
              name="deliveryDate"
              format="YYYY/MM/DD"
              calendarPosition="bottom-center"
              onChange={(value) =>
                setForm({
                  ...form,
                  deliveryDate: value
                    ? value.toDate().toISOString().split('T')[0]
                    : '',
                })
              }
              className="5xl:scale-125"
              inputClass="w-full  rounded-xl 5xl:text-[25px] max-2xl:text-[14px]  bg-white/10 p-3 my-2 font-[Samim] text-[18px] text-white outline-none"
            />
          </label>
          <label htmlFor="deliveryTime">
            <p className="pb-2"> ساعت ثبت درخواست</p>
            <TimePickerInput
              value={form.deliveryTime || ''}
              onChange={(e) => {
                setForm((p) => ({
                  ...p,
                  deliveryTime: e,
                }));
              }}
            />
          </label>
          <label htmlFor="deliveryNotes" className="col-span-2">
            توضیحات :
            <input
              type="text"
              name="deliveryNotes"
              placeholder="توضیحات ..."
              onChange={(e) => {
                setForm((p) => ({
                  ...p,
                  [e.target.name]: e.target.value,
                }));
              }}
              className="5xl:text-[25px] my-2 w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none max-2xl:text-[14px] max-md:text-[13px]"
            />
          </label>
        </div>
      </form>
    </div>
  );
}

export default CreateDesignWorkRequestJsx;
