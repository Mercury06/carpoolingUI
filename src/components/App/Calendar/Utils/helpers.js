export const checkDateIsEqual = (date1, date2) =>
  date1.getDate() === date2.getDate() &&
  date1.getMonth() === date2.getMonth() &&
  date1.getFullYear() === date2.getFullYear();

export const checkIsToday = (date) => {
  const today = new Date();

  return checkDateIsEqual(today, date);
};

export const createDate = (params) => {
  const locale = params?.locale ?? "default";
  const date = params?.date ?? new Date();
  const dayNumber = date.getDate();
  const day = date.toLocaleDateString(locale, { weekday: "long" });
  const dayNumberInWeek = date.getDay() + 1;
  const dayShort = date.toLocaleDateString(locale, { weekday: "short" });
  const year = date.getFullYear();
  const yearShort = date.toLocaleDateString(locale, { year: "2-digit" });
  const month = date.toLocaleDateString(locale, { month: "long" });
  const monthShort = date.toLocaleDateString(locale, { month: "short" });
  const monthNumber = date.getMonth() + 1;
  const monthIndex = date.getMonth();
  const timestamp = date.getTime();
  const week = getWeekNumber(date);

  return {
    date,
    dayNumber,
    day,
    dayNumberInWeek,
    dayShort,
    year,
    yearShort,
    month,
    monthShort,
    monthNumber,
    monthIndex,
    timestamp,
    week,
  };
};

export const createMonth = (params) => {
  const date = params?.date ?? new Date();
  const locale = params?.locale ?? "default";

  const d = createDate({ date, locale });
  const { month: monthName, year, monthNumber, monthIndex } = d;

  const getDay = (dayNumber) =>
    createDate({ date: new Date(year, monthIndex, dayNumber), locale });

  const createMonthDays = () => {
    const days = [];

    for (let i = 0; i <= getMonthNumberOfDays(monthIndex, year) - 1; i += 1) {
      days[i] = getDay(i + 1);
    }

    return days;
  };

  return {
    getDay,
    monthName,
    monthIndex,
    monthNumber,
    year,
    createMonthDays,
  };
};

export const createYear = (params) => {
  const locale = params?.locale ?? "default";

  const monthCount = 12;
  const today = createDate();

  const year = params?.year ?? today.year;
  const monthNumber = params?.monthNumber ?? today.monthNumber;

  const month = createMonth({ date: new Date(year, monthNumber - 1), locale });

  const getMonthDays = (monthIndex) =>
    createMonth({ date: new Date(year, monthIndex), locale }).createMonthDays();

  const createYearMonthes = () => {
    const monthes = [];

    for (let i = 0; i <= monthCount - 1; i += 1) {
      monthes[i] = getMonthDays(i);
    }

    return monthes;
  };

  return {
    createYearMonthes,
    month,
    year,
  };
};

export const formatDate = (date, format) => {
  const d = createDate({ date });

  return format
    .replace(/\bYYYY\b/, d.year.toString())
    .replace(/\bYYY\b/, d.yearShort)
    .replace(/\bWW\b/, d.week.toString().padStart(2, "0"))
    .replace(/\bW\b/, d.week.toString())
    .replace(/\bDDDD\b/, d.day)
    .replace(/\bDDD\b/, d.dayShort)
    .replace(/\bDD\b/, d.dayNumber.toString().padStart(2, "0"))
    .replace(/\bD\b/, d.dayNumber.toString())
    .replace(/\bMMMM\b/, d.month)
    .replace(/\bMMM\b/, d.monthShort)
    .replace(/\bMM\b/, d.monthNumber.toString().padStart(2, "0"))
    .replace(/\bM\b/, d.monthNumber.toString());
};

export const getMonthNumberOfDays = (
  monthIndex,
  yearNumber = new Date().getFullYear()
) => new Date(yearNumber, monthIndex + 1, 0).getDate();

export const getMonthesNames = (locale) => {
  // const monthesNames: {
  //     month: ReturnType<typeof createDate>['month'];
  //     monthShort: ReturnType<typeof createDate>['monthShort'];
  //     monthIndex: ReturnType<typeof createDate>['monthIndex'];
  //     date: ReturnType<typeof createDate>['date'];
  //   }[] = Array.from({ length: 12 });
  const monthesNames = [];
  const d = new Date();

  monthesNames.forEach((_, i) => {
    const { month, monthIndex, monthShort, date } = createDate({
      locale,
      date: new Date(d.getFullYear(), d.getMonth() + i, 1),
    });

    monthesNames[monthIndex] = { month, monthIndex, monthShort, date };
  });

  return monthesNames;
};

export const getWeekDaysNames = (firstWeekDay = 4, locale = "default") => {
  //   const weekDaysNames: {
  //     day: ReturnType<typeof createDate>['day'];
  //     dayShort: ReturnType<typeof createDate>['dayShort'];
  //   }[] = Array.from({ length: 7 });
  const weekDaysNames = [];
  const date = new Date();

  weekDaysNames.forEach((_, i) => {
    const { day, dayNumberInWeek, dayShort } = createDate({
      locale,
      date: new Date(date.getFullYear(), date.getMonth(), date.getDate() + i),
    });

    weekDaysNames[dayNumberInWeek - 1] = { day, dayShort };
  });

  return [
    ...weekDaysNames.slice(firstWeekDay - 1),
    ...weekDaysNames.slice(0, firstWeekDay - 1),
  ];
};

export const getWeekNumber = (date) => {
  const firstDayOfTheYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear =
    (date.getTime() - firstDayOfTheYear.getTime()) / 86400000;

  return Math.ceil((pastDaysOfYear + firstDayOfTheYear.getDay() + 1) / 7);
};
