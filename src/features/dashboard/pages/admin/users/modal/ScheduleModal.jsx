import React, { lazy, Suspense, useState } from 'react';

import close from '../../../../../../assets/images/close.png';

import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';

import { useGetScheduleShift } from '../../../../../../hooks/user/userApi';

const MyCalendar = lazy(() => import('../../../../../../schedule/MyCalender'));

function ScheduleModal({
  openSchedule,
  setOpenSchedule,
  selectedUser,
  setSelectedUser,
}) {
  const [FromDate, setFromDate] = useState('');
  const [ToDate, setToDate] = useState('');
  const UserId = selectedUser?.id || null;

  const { data: getSchedule } = useGetScheduleShift({
    UserId: UserId || '',
    FromDate: FromDate || '',
    ToDate: ToDate || '',
  });

  const events = getSchedule?.data?.days?.map((s) => ({
    id: s?.id,
    title: s?.shiftName,
    workDayTypeName: s?.workDayTypeName,
    start: new Date(s?.date + 'T00:00:00'),
    end: new Date(s?.date + 'T23:59:59'),
    startTime: s?.startTime,
    endTime: s?.endTime,
    color: s?.color || '#a85117',
  }));

  const closeHandler = () => {
    setOpenSchedule(false);
  };
  return (
    <div
      className={`fixed inset-0 z-50 flex h-screen items-center justify-center overflow-hidden p-4 transition-opacity duration-300 print:hidden! print:border-none ${
        openSchedule
          ? 'pointer-events-auto opacity-100 '
          : 'pointer-events-none opacity-0'
      }`}
    >
      <div
        onClick={closeHandler}
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
      />
      <div
        className={`relative flex max-h-[90vh] w-[80%] max-w-[95vw] flex-col gap-4 overflow-hidden rounded-[15px] bg-linear-to-tl from-black to-gray-600 p-6 text-white shadow-2xl transition-all duration-300 max-2xl:w-[900px] max-lg:w-[800px] ${
          openSchedule
            ? 'translate-y-0 scale-100 opacity-100'
            : '-translate-y-10 scale-95 opacity-0'
        }`}
      >
        <div className="flex items-center justify-between">
          <p className="pr-1.5 font-[SamimBold] text-[20px]"> وضعیت شیفت</p>
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
        <div className="flex">
          <div className="space-x-2">
            <DatePicker
              calendar={persian}
              locale={persian_fa}
              placeholder="تاریخ شروع شیفت"
              name="fromDate"
              format="YYYY/MM/DD"
              calendarPosition="bottom-center"
              onChange={(value) =>
                setFromDate(
                  value ? value.toDate().toISOString().split('T')[0] : ''
                )
              }
              inputClass="w-full rounded-xl   bg-white/10 p-3 mt-2 font-[Samim] text-[18px] text-white outline-none"
            />

            <DatePicker
              calendar={persian}
              locale={persian_fa}
              placeholder="تاریخ پایان شیفت"
              name="toDate"
              format="YYYY/MM/DD"
              calendarPosition="bottom-center"
              onChange={(value) =>
                setToDate(
                  value ? value.toDate().toISOString().split('T')[0] : ''
                )
              }
              inputClass="w-full rounded-xl   bg-white/10 p-3 mt-2 font-[Samim] text-[18px] text-white outline-none"
            />
          </div>
          {/* <button onClick={dateHandler} className="pr-5">
            آیکون ذره بین
          </button> */}
        </div>
        <div className="h-[700px] overflow-auto rounded-lg bg-white p-6 text-black shadow-md">
          {/* استایل‌های Tailwind برای کانتینر */}
          <Suspense
            fallback={
              <div className="flex h-[700px] items-center justify-center">
                در حال بارگذاری تقویم...
              </div>
            }
          >
            <MyCalendar events={events || []} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default ScheduleModal;
