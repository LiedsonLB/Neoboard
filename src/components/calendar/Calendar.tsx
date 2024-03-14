import React, { useEffect, useState } from 'react';
import '../calendar/calendar.css';

interface Event {
  date: Date;
  description: string;
}

interface CalendarProps {}

const Calendar: React.FC<CalendarProps> = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());

  const getMonthName = (month: number): string => {
    const monthNames = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    return monthNames[month];
  };

  useEffect(() => {
    const daysContainer = document.getElementById('days') as HTMLElement;

    if (!daysContainer) {
      console.error("Element with ID 'days' not found in the DOM.");
      return;
    }

    const monthElement = document.getElementById('month') as HTMLElement;
    const prevMonthBtn = document.getElementById('prevMonth') as HTMLSpanElement;
    const nextMonthBtn = document.getElementById('nextMonth') as HTMLSpanElement;
    const eventForm = document.querySelector('.event-form') as HTMLDivElement;
    const calendar = document.querySelector('.calendar') as HTMLDivElement;
    const eventDateInput = document.getElementById('eventDate') as HTMLInputElement;
    const eventDescriptionInput = document.getElementById('eventDescription') as HTMLInputElement;

    const getEventsForDate = (date: Date): Event[] => {
      return events.filter(event => isSameDay(event.date, date));
    };

    const renderCalendar = (month: number, year: number): void => {
      daysContainer.innerHTML = '';
      monthElement.innerText = ${getMonthName(month)} ${year};

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

          if (getEventsForDate(date).length > 0) {
            dayElement.classList.add('has-events');
          }

          dayElement.addEventListener('click', () => {
            const selectedDate = new Date(year, month, day);
            renderEvents(selectedDate);
          });
        }
        daysContainer.appendChild(dayElement);
      }
    };

    renderCalendar(currentMonth, currentYear);

    const updateMonth = (monthOffset: number): void => {
      setCurrentMonth(prevMonth => {
        let newMonth = prevMonth + monthOffset;
        let newYear = currentYear;

        if (newMonth < 0) {
          newMonth = 11;
          newYear--;
        } else if (newMonth > 11) {
          newMonth = 0;
          newYear++;
        }

        setCurrentYear(newYear);
        return newMonth;
      });
    };

    const formatDateTime = (date: Date): string => {
      const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      };
      const formattedDateTime = new Intl.DateTimeFormat('pt-BR', options).format(date);
      return formattedDateTime;
    };

    const renderEvents = (date?: Date): void => {
      events.sort((a, b) => a.date.getTime() - b.date.getTime());

      let html = '<ul>';

      events.forEach(event => {
        const formattedDateTime = formatDateTime(event.date);
        html += <li><strong>${formattedDateTime}:</strong> ${event.description}</li>;
      });

      html += '</ul>';
      const eventsContainer = document.getElementById('eventsContainer');
      if (eventsContainer) {
        eventsContainer.innerHTML = html;
      }
    };

    const isSameDay = (date1: Date, date2: Date): boolean => {
      return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
      );
    };

    const addEvent = (date: Date, description: string): void => {
      const formattedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);

      const existingEventIndex = events.findIndex(event => isSameDay(event.date, formattedDate));

      if (existingEventIndex !== -1) {
        events[existingEventIndex].description = description;
      } else {
        const newEvents = [...events, { date: formattedDate, description }];
        setEvents(newEvents);
      }
    };

    const formatDate = (date: Date): string => {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return ${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')};
    };

    const handlePrevMonthClick = () => {
      updateMonth(-1);
    };

    const handleNextMonthClick = () => {
      updateMonth(1);
    };

    const handleAddEventClick = () => {
      const selectedDate = new Date(eventDateInput.value);
      const eventDescription = eventDescriptionInput.value;
      if (eventDescription.trim() !== '') {
        addEvent(selectedDate, eventDescription);
        renderEvents(selectedDate);
        renderCalendar(currentMonth, currentYear);
      } else {
        alert('Por favor, insira uma descrição para o lembrete.');
      }
    };

    const handleCloseEventFormClick = () => {
      eventForm.style.display = 'none';
      calendar.style.filter = 'brightness(1)';
    };

    prevMonthBtn.addEventListener('click', handlePrevMonthClick);
    nextMonthBtn.addEventListener('click', handleNextMonthClick);
    document.getElementById('addEventBtn')?.addEventListener('click', handleAddEventClick);
    document.getElementById('closeEventFormBtn')?.addEventListener('click', handleCloseEventFormClick);

    return () => {
      prevMonthBtn.removeEventListener('click', handlePrevMonthClick);
      nextMonthBtn.removeEventListener('click', handleNextMonthClick);
      document.getElementById('addEventBtn')?.removeEventListener('click', handleAddEventClick);
      document.getElementById('closeEventFormBtn')?.removeEventListener('click', handleCloseEventFormClick);
    };
  }, [events, currentMonth, currentYear]);

  return (
    <div className="calendar">
      <div className="month">
        <span id="prevMonth">&#10094;</span>
        <h2 id="month">Mês Atual</h2>
        <span id="nextMonth">&#10095;</span>
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
