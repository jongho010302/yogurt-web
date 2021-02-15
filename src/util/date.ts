export const parseDate = (paramDate: Date, paramFormat: string): string => {
  let year = paramDate.getFullYear().toString();
  let month = (paramDate.getMonth() + 1).toString();
  let date = paramDate.getDate().toString();
  let hours = paramDate.getHours().toString();
  let minutes = paramDate.getMinutes().toString();
  let seconds = paramDate.getSeconds().toString();

  if (Number.parseInt(month, 10) < 10) {
    month = `0${month}`;
  }

  if (Number.parseInt(date, 10) < 10) {
    date = `0${date}`;
  }

  let format = paramFormat;

  format = format.replace('yyyy', year);
  format = format.replace('mm', month);
  format = format.replace('dd', date);
  format = format.replace('hh', hours);
  format = format.replace('mm', minutes);
  format = format.replace('ss', seconds);

  return format;
};

export const getWeek = (data: Date) => {
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = week[data.getDay()];
  return dayOfWeek;
};

export const getCurrentDate = () => {
  return new Date();
};

export const getDateByCalculateDay = (date: Date, day: number) => {
  date.setDate(date.getDate() + day);
  return date;
};
