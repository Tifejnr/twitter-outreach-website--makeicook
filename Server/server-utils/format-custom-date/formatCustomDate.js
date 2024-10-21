export default function formatCustomDate(isoDateString) {
  const date = new Date(isoDateString);

  // Get day names, month names, and format numbers
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const paymentDayName = dayNames[date.getUTCDay()]; // Get day name
  const paymentMonth = monthNames[date.getUTCMonth()]; // Get month name
  const paymentDayNo = date.getUTCDate(); // Get day number
  const paymentYear = date.getUTCFullYear(); // Get year

  // Format time as HH:MM (24-hour format)
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  const paymentTime = `${hours}:${minutes}`;

  // Combine all to create the desired output format
  const paymentDate = `${paymentDayName} ${paymentMonth} ${paymentDayNo} ${paymentYear} ${paymentTime}`;

  return paymentDate;
}
