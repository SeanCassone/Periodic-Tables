/**
 * Format a time string in HH:MM:SS format (which is what is returned from PostgreSQL) as HH:MM.
 * @param inputTime
 *  HH:MM:SS time string from date obj
 * @returns {00:00AM}
 *  the specified time string formatted as HH:MM:AM or PM
 */
export function formatTime(inputTime) {
  let hours = inputTime.getHours(); // gives the value in 24 hours format
  const AmOrPm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  const minutes = inputTime.getMinutes();
  return `${hours}:${minutes}${AmOrPm}`;
}

/**
 * Format a time string in HH:MM:SS format (which is what is returned from PostgreSQL) as HH:MM.
 * @param inputDate
 *  yyyy-mm-dd time string
 * @returns {mm-dd-yyyy}
 *  the specified time string formatted as mm-dd-yyyy.
 */
export function formatDate(inputDate) {
  const date = new Date(inputDate);
  if (!isNaN(date.getTime())) {
    // Months use 0 index.
    return (
      date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear()
    );
  }
}

/**
 * Format a telephone number
 * @param inputPhone
 *  000-000.0000 or other combos
 * @returns {(000) 000-0000}
 *  the specified time string formatted as (555) 555-1212
 */
export function formatMobile(inputPhone) {
  //normalize string and remove all unnecessary characters
  inputPhone = inputPhone.replace(/[^\d]/g, "");

  //check if number length equals to 10
  if (inputPhone.length === 10) {
    //reformat and return phone number
    return inputPhone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
  }

  return null;
}
