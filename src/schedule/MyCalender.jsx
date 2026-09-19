import React from 'react';

import { Calendar, momentLocalizer } from 'react-big-calendar';

import moment from 'moment';
import 'moment/locale/fa';

import 'react-big-calendar/lib/css/react-big-calendar.css';

moment.locale('fa');

const localizer = momentLocalizer(moment);

const Views = {
  month: true,
  week: true,
  day: true,
  agenda: true,
};

function MyCalendar({ events }) {
  const renderEventContent = ({ event }) => {
    return (
      <div
        style={{
          backgroundColor: event.color,
          padding: '5px',
          borderRadius: '3px',
        }}
      >
        <strong>{event.title}</strong>

        {event.workDayTypeName && (
          <div>
            <small>{event.workDayTypeName}</small>
          </div>
        )}

        {event.startTime && (
          <div>
            <small>زمان شروع: {event.startTime}</small>
          </div>
        )}

        {event.endTime && (
          <div>
            <small>زمان پایان: {event.endTime}</small>
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ height: '700px' }}>
      <Calendar
        localizer={localizer}
        events={events || []}
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
