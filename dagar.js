
document.addEventListener("DOMContentLoaded", () => {
  const todayElement = document.getElementById("today");
  const futureDateElement = document.getElementById("future-date");
  const dateInput = document.getElementById("dateInput");
  const daysBetweenElement = document.getElementById("days-between"); // optional

  const today = new Date();
  const futureDate = addWorkdays(today, 25);

  todayElement.textContent = today.toLocaleDateString("en-GB");
  futureDateElement.textContent = futureDate.toLocaleDateString("en-GB");

  dateInput.addEventListener("change", () => {
    if (!dateInput.value) return;

    const selectedDate = dateInput.value;
    // OPTIONAL: workdays between today and selected date
    if (daysBetweenElement) {
      const workdaysBetween = countWorkdays(today, selectedDate);
      daysBetweenElement.textContent = workdaysBetween;
    }
  });
});


//månad är -1! så 3 är april etc
const skipDates = [
        { month: 3, days: [18, 19, 20, 21] },
        { month: 4, days: [1, 14, 15] },
        { month: 5, days: [6, 18, 19] },
        { month: 9, days: [30] },
        { month: 11, days: [23, 24, 25, 31] }
  ];

  
function isWorkday(date) {
  // Weekend
  if (date.getDay() === 0 || date.getDay() === 6) return false;

  // Holiday
  const isHoliday = skipDates.some(skipDate =>
    skipDate.month === date.getMonth() &&
    skipDate.days.includes(date.getDate())
  );

  return !isHoliday;
}

function addWorkdays(startDate, workdays) {
  let date = new Date(startDate);
  let addedDays = 0;

  while (addedDays < workdays) {
    date.setDate(date.getDate() + 1);
    if (isWorkday(date)) {
      addedDays++;
    }
  }

  return date;
}


function countWorkdays(startDate, endDate) {
  let count = 0;
  if (typeof endDate === "string") {
    endDate = new Date(endDate);
  }


  // Normalize times
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);

  while (startDate < endDate) {
    startDate.setDate(startDate.getDate() + 1);
    if (isWorkday(startDate)) {
      count++;
    }
  }

  return count;
}
