// Google Calendar Configuration
export const calendarConfig = {
  // Italian holidays calendar ID - try multiple options
  italianHolidaysCalendarId: 'en.italian#holiday@group.v.calendar.google.com',

  // Google Calendar API configuration
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY,
  apiBaseUrl: 'https://www.googleapis.com/calendar/v3',

  // Calendar display settings
  defaultView: 'dayGridMonth',
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
  },

  // Italian holidays styling
  holidayEventStyle: {
    backgroundColor: '#ff6b6b',
    borderColor: '#ff5252',
    textColor: '#ffffff',
    classNames: ['holiday-event']
  },

  // Business hours (Italian timezone)
  businessHours: {
    daysOfWeek: [1, 2, 3, 4, 5], // Monday to Friday
    startTime: '09:00',
    endTime: '18:00'
  },

  // Timezone
  timeZone: 'Europe/Rome',

  // Language configurations
  languages: {
    en: {
      locale: 'en',
      buttonText: {
        today: 'Today',
        month: 'Month',
        week: 'Week',
        day: 'Day',
        list: 'List'
      },
      dayHeaderFormat: { weekday: 'long' },
      titleFormat: { year: 'numeric', month: 'long' }
    },
    fr: {
      locale: 'fr',
      buttonText: {
        today: "Aujourd'hui",
        month: 'Mois',
        week: 'Semaine',
        day: 'Jour',
        list: 'Liste'
      },
      dayHeaderFormat: { weekday: 'long' },
      titleFormat: { year: 'numeric', month: 'long' }
    },
    ar: {
      locale: 'ar',
      buttonText: {
        today: 'اليوم',
        month: 'الشهر',
        week: 'الأسبوع',
        day: 'اليوم',
        list: 'القائمة'
      },
      dayHeaderFormat: { weekday: 'long' },
      titleFormat: { year: 'numeric', month: 'long' }
    },
    it: {
      locale: 'it',
      buttonText: {
        today: 'Oggi',
        month: 'Mese',
        week: 'Settimana',
        day: 'Giorno',
        list: 'Lista'
      },
      dayHeaderFormat: { weekday: 'long' },
      titleFormat: { year: 'numeric', month: 'long' },
      monthNames: [
        'GENNAIO',
        'FEBBRAIO',
        'MARZO',
        'APRILE',
        'MAGGIO',
        'GIUGNO',
        'LUGLIO',
        'AGOSTO',
        'SETTEMBRE',
        'OTTOBRE',
        'NOVEMBRE',
        'DICEMBRE'
      ]
    }
  }
}

export default calendarConfig
