import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/fa';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';

moment.locale('fa');

const localizer = momentLocalizer(moment);

function MyCalendar({ events }) {
  const renderEventContent = (eventInfo) => {
    const { title, startTime, endTime, color } = events;

    return (
      <div
        style={{ backgroundColor: color, padding: '5px', borderRadius: '3px' }}
      >
        <strong>{title}</strong>
        <div>
          <small>زمان شروع: {startTime}</small>
        </div>
        <div>
          <small>زمان پایان: {endTime}</small>
        </div>
      </div>
    );
  };

  const Views = {
    month: true,
    week: true,
    day: true,
    agenda: true,
  };

  return (
    <div style={{ height: '700px' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={Views}
        messages={{
          today: 'امروز',
          previous: 'قبلی',
          next: 'بعدی',
          month: 'ماه',
          week: 'هفته',
          day: 'روز',
          agenda: 'دستور جلسه',
          date: 'تاریخ',
          time: 'زمان',
          event: 'رویداد',
          noEventsInRange: 'رویدادی در این بازه وجود ندارد',
        }}
        culture="fa"
        popup
        components={{
          event: renderEventContent,
        }}
      />
    </div>
  );
}

export default MyCalendar;
