document.addEventListener('DOMContentLoaded', () => {
  const todayElement = document.getElementById('today');
  const futureDateElement = document.getElementById('future-date');

  const today = new Date();
  const futureDate = addWorkdays(today, 25);

  todayElement.textContent = today.toLocaleDateString();
  futureDateElement.textContent = futureDate.toLocaleDateString();
});

function addWorkdays(startDate, workdays) {
  let date = new Date(startDate);
  let addedDays = 0;
  //månad är -1! så 3 är april etc
  const skipDates = [
      { month: 3, days: [18, 19, 20, 21] },
      { month: 4, days: [1, 14, 15] },
      { month: 5, days: [6, 18, 19] },
      { month: 9, days: [30] },
      { month: 11, days: [23, 24, 25, 31] }
  ];

  while (addedDays < workdays) {
      date.setDate(date.getDate() + 1);
      if (date.getDay() !== 0 && date.getDay() !== 6) {
          let skip = skipDates.some(skipDate => 
              skipDate.month === date.getMonth() && skipDate.days.includes(date.getDate())
          );
          if (!skip) {
              addedDays++;
          }
      }
  }

  return date;
}
