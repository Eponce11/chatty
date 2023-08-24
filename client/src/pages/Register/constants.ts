const months = [
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

const days: Array<number> = [];
for (let i = 1; i <= 31; i++) days.push(i);

const years: Array<number> = [];
const currentYear = new Date().getFullYear();
for (let i = currentYear; i > currentYear - 150; i--) years.push(i);

export { months, days, years };
