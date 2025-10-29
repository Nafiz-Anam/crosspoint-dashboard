/**
 * Timezone utility functions for Italian timezone (Europe/Rome)
 */

const ITALY_TIMEZONE = "Europe/Rome";

/**
 * Get current date - returns current Date object
 * The timezone conversion happens during formatting
 * @returns Date object representing current date/time
 */
export const getItalianDate = () => {
  return new Date();
};

/**
 * Get today's date (midnight) in Italian timezone
 * @returns Date object at midnight (00:00:00) in Italian timezone
 */
export const getItalianToday = () => {
  const date = getItalianDate();
  date.setHours(0, 0, 0, 0);
  return date;
};

/**
 * Format a date in Italian timezone
 * @param {Date} date - Date to format
 * @param {Object} options - Intl.DateTimeFormatOptions
 * @param {string} locale - Locale for formatting (default: 'it-IT')
 * @returns {string} Formatted date string
 */
export const formatItalianDate = (date, options = {}, locale = 'it-IT') => {
  // Map locale codes to Intl locale format
  const localeMap = {
    'it': 'it-IT',
    'en': 'en-US'
  };
  const formattedLocale = localeMap[locale] || locale || 'it-IT';
  
  return date.toLocaleString(formattedLocale, {
    timeZone: ITALY_TIMEZONE,
    ...options,
  });
};

/**
 * Format time in Italian timezone
 * @param {Date} date - Date to format
 * @param {Object} options - Intl.DateTimeFormatOptions
 * @param {string} locale - Locale for formatting (default: 'it-IT')
 * @returns {string} Formatted time string
 */
export const formatItalianTime = (date, options = {}, locale = 'it-IT') => {
  // Map locale codes to Intl locale format
  const localeMap = {
    'it': 'it-IT',
    'en': 'en-US'
  };
  const formattedLocale = localeMap[locale] || locale || 'it-IT';
  
  return date.toLocaleTimeString(formattedLocale, {
    timeZone: ITALY_TIMEZONE,
    ...options,
  });
};

/**
 * Get a date at a specific hour in Italian timezone
 * @param {number} hour - Hour in 24-hour format (0-23)
 * @param {number} minute - Minutes (0-59, default 0)
 * @param {number} second - Seconds (0-59, default 0)
 * @returns {Date} Date object at specified time in Italian timezone
 */
export const getItalianTime = (hour, minute = 0, second = 0) => {
  const date = getItalianToday();
  date.setHours(hour, minute, second);
  return date;
};

/**
 * Check if current time in Italian timezone is after a specific time
 * @param {number} hour - Hour in 24-hour format (0-23)
 * @param {number} minute - Minutes (0-59, default 0)
 * @returns {boolean} True if current Italian time is after the specified time
 */
export const isAfterItalianTime = (hour, minute = 0) => {
  const now = getItalianDate();
  const targetTime = getItalianTime(hour, minute);
  return now > targetTime;
};

/**
 * Convert a date to Italian timezone
 * @param {Date} date - Date to convert
 * @returns {Date} Date converted to Italian timezone
 */
export const toItalianTime = (date) => {
  return new Date(
    date.toLocaleString("en-US", { timeZone: ITALY_TIMEZONE })
  );
};

export { ITALY_TIMEZONE };
