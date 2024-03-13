const months: any = {
  "01": "Jan",
  "02": "Feb",
  "03": "Mar",
  "04": "Apr",
  "05": "May",
  "06": "Jun",
  "07": "Jul",
  "08": "Aug",
  "09": "Sep",
  "10": "Oct",
  "11": "Nov",
  "12": "Dec",
};

const dateParser = (unparsedDate: string): string => {
  const [year, month, day] = unparsedDate.slice(0, 10).split("-");
  return `${months[month]} ${day}, ${year}`;
};

export { dateParser };
