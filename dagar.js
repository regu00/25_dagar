//månad är -1! så 3 är april etc
const skipDates = [
    { month: 3, days: [18, 19, 20, 21] },
    { month: 4, days: [1, 14, 15] },
    { month: 5, days: [6, 18, 19] },
    { month: 9, days: [30] },
    { month: 11, days: [23, 24, 25, 31] }
  ];
  
function isWorkday(date) {
  if (date.getDay() === 0 || date.getDay() === 6) return false;

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
  let current = new Date(startDate);
  let target = typeof endDate === "string" ? new Date(endDate) : new Date(endDate);

  current.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);

  while (current < target) {
    current.setDate(current.getDate() + 1);
    if (isWorkday(current)) {
      count++;
    }
  }

  return count;

}


document.addEventListener("DOMContentLoaded", () => {
    const todayElement = document.getElementById("today");
    const futureDateElement = document.getElementById("future-date");
    const dateInput = document.getElementById("date-input");
    const daysFunctionElement = document.getElementById("days-function");

    const today = new Date();
    Object.freeze(today);
    const futureDate = addWorkdays(today, 25);

    todayElement.textContent = today.toLocaleDateString("en-GB");
    futureDateElement.textContent = futureDate.toLocaleDateString("en-GB");
  
    const calcModeSelect = document.getElementById("calc-mode");

    dateInput.addEventListener("change", calculate);
    calcModeSelect.addEventListener("change", calculate);
    

    function calculate() {
        if (!dateInput.value) return;

        const mode = calcModeSelect.value;
        const inputDate = dateInput.value;

        if (mode === "days") {
            const workdaysBetween = countWorkdays(today, inputDate);
            daysFunctionElement.textContent = workdaysBetween;
        }

        if (mode === "future") {
            const futureDate = addWorkdays(new Date(inputDate), 25);
            daysFunctionElement.textContent = futureDate.toLocaleDateString("en-GB");
        }}
});
