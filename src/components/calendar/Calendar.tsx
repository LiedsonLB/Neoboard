import React, { useEffect, useState } from 'react';
import '../calendar/Calendar.css';

interface Event {
  date: Date;
  description: string;
}

interface CalendarProps {
  events?: Event[];
}

const getMonthName = (month: number): string => {
  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  return monthNames[month];
};

const Calendar: React.FC<CalendarProps> = ({ events }: CalendarProps) => {
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());
  const [calendarEvents, setCalendarEvents] = useState<Event[]>([]);

  useEffect(() => {
    if (events) {
      const parsedEvents = events.map(event => ({
        date: new Date(event.date),
        description: event.description,
      }));
  
      setCalendarEvents(parsedEvents);
      renderCalendar(currentMonth, currentYear);
    }
  }, [events, currentMonth, currentYear]);
  
  
  const renderCalendar = (month: number, year: number): void => {
    const daysContainer = document.getElementById('days') as HTMLElement;
  
    if (!daysContainer) {
      console.error("Element with ID 'days' not found in the DOM.");
      return;
    }
  
    daysContainer.innerHTML = '';
    
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const totalDaysInCalendar = 6 * 7;
  
    for (let i = 0; i < firstDayOfMonth; i++) {
      const emptyDay = document.createElement('li');
      daysContainer.appendChild(emptyDay);
    }
  
    for (let day = 1; day <= totalDaysInCalendar; day++) {
      const dayElement = document.createElement('li');
      if (day <= daysInMonth) {
        dayElement.innerText = day.toString();
        const date = new Date(year, month, day);
  
        const eventsForDate = getEventsForDate(date);
        if (eventsForDate.length > 0) {
          dayElement.classList.add('has-events');
          dayElement.setAttribute('data-toggle', 'tooltip');
          dayElement.setAttribute('title', eventsForDate.map(event => event.description).join(', '));
        }
      }
      daysContainer.appendChild(dayElement);
    }
  };
  
  useEffect(() => {
    renderCalendar(currentMonth, currentYear);
  }, [currentMonth, currentYear]);

  const isSameDay = (date1: Date, date2: Date): boolean => {
    if (!(date1 instanceof Date) || !(date2 instanceof Date)) {
      return false;
    }
    
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const getEventsForDate = (date: Date): Event[] => {
    if (calendarEvents) {
      return calendarEvents.filter(event => isSameDay(event.date, date));
    }
    return [];
  };    

  const handlePrevMonthClick = () => {
    setCurrentMonth(prevMonth => {
      let newMonth = prevMonth - 1;
      let newYear = currentYear;

      if (newMonth < 0) {
        newMonth = 11;
        newYear--;
      }

      setCurrentYear(newYear);
      return newMonth;
    });
  };

  const handleNextMonthClick = () => {
    setCurrentMonth(prevMonth => {
      let newMonth = prevMonth + 1;
      let newYear = currentYear;

      if (newMonth > 11) {
        newMonth = 0;
        newYear++;
      }

      setCurrentYear(newYear);
      return newMonth;
    });
  };

  return (
    <div className="calendar">
      <div className="month">
        <span id="prevMonth" onClick={handlePrevMonthClick}>&#10094;</span>
        <h2 id="month">{getMonthName(currentMonth)} {currentYear}</h2>
        <span id="nextMonth" onClick={handleNextMonthClick}>&#10095;</span>
      </div>
      <ul className="weekdays">
        <li>Dom</li>
        <li>Seg</li>
        <li>Ter</li>
        <li>Qua</li>
        <li>Qui</li>
        <li>Sex</li>
        <li>Sáb</li>
      </ul>
      <ul className="days" id="days"></ul>
    </div>
  );
};

export default Calendar;