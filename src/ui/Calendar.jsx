import { useState } from "react";
const years = [2020, 2021, 2022, 2023, 2024, 2025];
const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthsInAYear = [
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

export default function DatePicker() {
  const [date, setDate] = useState(new Date());
  const [selectedRange, setSelectedRange] = useState({
    fromDate: null,
    toDate: null,
    fromMonth: null,
    toMonth: null,
  });
  const month = date.getMonth();
  const year = date.getFullYear();

  return (
    <div>
      {/* <SelectedDateBox /> */}
      <Calendar
        date={new Date(year, month)}
        setDate={setDate}
        selectedRange={selectedRange}
        setSelectedRange={setSelectedRange}
      />
      <Calendar
        date={new Date(year, month + 1)}
        setDate={setDate}
        selectedRange={selectedRange}
        setSelectedRange={setSelectedRange}
      />
    </div>
  );
}

function SelectedDateBox() {
  return (
    <div className="selected-date-box">
      <div className="selected-date-box__input-group">
        <label htmlFor="">Date Selection</label>
        <input type="text" name="" id="" className="selected-date-box__input" />
      </div>
      <div className="selected-date-box__icon-button">
        <button>🔳</button>
      </div>
    </div>
  );
}

function Calendar({ date, setDate, selectedRange, setSelectedRange }) {
  console.log(selectedRange);

  const month = date.getMonth();
  const year = date.getFullYear();
  const monthName = monthsInAYear[month];

  const firstDayOfMonth = new Date(date.setDate(1)).getDay();
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const numDaysOfMonth = lastDayOfMonth.getDate();

  return (
    <div>
      <div>
        <select
          name=""
          id=""
          value={`${monthName}`}
          onChange={(e) => {
            setDate(new Date(year, monthsInAYear.indexOf(e.target.value)));
          }}
        >
          {monthsInAYear.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>

        <select
          name=""
          id=""
          value={`${year}`}
          onChange={(e) => {
            setDate(new Date(Number(e.target.value), month));
          }}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div>
        <button
          onClick={() => {
            setDate(new Date(year, month - 1));
          }}
        >
          prev
        </button>
        <span>
          {monthName}, {year}
          {selectedRange.fromMonth === selectedRange.toMonth &&
            selectedRange.fromDate &&
            `selected range: ${selectedRange.fromDate} - ${selectedRange.toDate}`}
        </span>
        <button
          onClick={() => {
            setDate(new Date(year, month + 1));
          }}
        >
          next
        </button>
      </div>

      <div className="calendar-view">
        {weekDays.map((day) => (
          <span key={day}>{day}</span>
        ))}
        {range(firstDayOfMonth).map((num) => (
          <button key={num}></button>
        ))}
        {range(numDaysOfMonth).map((num) => {
          let styles = {};

          if (
            selectedRange.fromMonth &&
            !selectedRange.toMonth &&
            Number(num) === selectedRange.fromDate &&
            selectedRange.fromMonth === month
          ) {
            console.log(num);

            styles = {
              backgroundColor: "orange",
            };
          } else if (
            selectedRange.fromMonth !== null &&
            selectedRange.toMonth !== null &&
            selectedRange.fromMonth === selectedRange.toMonth
          ) {
            console.log(num);

            if (
              num >= selectedRange.fromDate &&
              num <= selectedRange.toDate &&
              selectedRange.fromMonth === month
            ) {
              styles = { backgroundColor: "orange" };
            }
          } else if (
            selectedRange.fromMonth !== null &&
            selectedRange.toMonth !== null &&
            selectedRange.fromMonth !== selectedRange.toMonth
          ) {
            // console.log(num);

            if (
              selectedRange.fromMonth === month &&
              num >= selectedRange.fromDate &&
              num <= selectedRange.toDate + numDaysOfMonth
            ) {
              console.log(num);
              styles = { "background-color": "orange", color: "#121212" };
            } else if (
              selectedRange.toMonth === month &&
              num + numDaysOfMonth >= selectedRange.fromDate &&
              num <= selectedRange.toDate
            ) {
              console.log(num);
              styles = { "background-color": "orange", color: "#121212" };
            } else if (
              selectedRange.fromMonth < month &&
              selectedRange.toMonth > month
            ) {
              styles = { "background-color": "orange", color: "#121212" };
            }
          }
          return (
            <button
              key={num}
              style={styles}
              onClick={(e) =>
                setSelectedRange((value) => {
                  if (
                    value.fromDate &&
                    value.toDate &&
                    value.fromMonth &&
                    value.toMonth
                  ) {
                    if (month > value.fromMonth) {
                      return {
                        ...value,
                        toDate: Number(num),
                        toMonth: month,
                      };
                    }
                  }

                  if (value.fromDate && value.toDate) {
                    if (selectedRange.fromMonth !== selectedRange.toMonth) {
                      if (selectedRange.fromMonth === month) {
                        return {
                          ...value,
                          fromDate:
                            Number(num) > value.fromDate
                              ? value.fromDate
                              : Number(num),
                          toDate:
                            Number(num) < value.toDate + numDaysOfMonth
                              ? value.toDate
                              : Number(num),
                        };
                      } else {
                        return {
                          ...value,
                          fromDate:
                            Number(num) + numDaysOfMonth > value.fromDate
                              ? value.fromDate
                              : Number(num),
                          toDate:
                            Number(num) < value.toDate
                              ? value.toDate
                              : Number(num),
                        };
                      }
                    }
                    return {
                      ...value,
                      fromDate:
                        Number(num) > value.fromDate
                          ? value.fromDate
                          : Number(num),
                      toDate:
                        Number(num) < value.toDate ? value.toDate : Number(num),
                      // fromMonth: month,
                      // month,
                    };
                  }

                  if (!value.fromDate && !value.toDate) {
                    return {
                      ...value,
                      fromDate: Number(num),
                      fromMonth: month,
                    };
                  }

                  if (value.fromDate) {
                    return { ...value, toDate: Number(num), toMonth: month };
                  }

                  if (value.toDate) {
                    return {
                      ...value,
                      fromDate: Number(num),
                      fromMonth: month,
                    };
                  }
                })
              }
            >
              {num}
            </button>
          );
        })}
      </div>
    </div>
  );
}

const range = function (numbers) {
  return Array.from({ length: numbers }, (_, i) => i + 1);
};

// (selectedRange.fromMonth === month ||
//     selectedRange.toMonth === month) &&
//   selectedRange.fromMonth === selectedRange.toMonth
//     ? num >= selectedRange.fromDate && num <= selectedRange.toDate
//       ? { "background-color": "orange", color: "#121212" }
//       : {}
//     : selectedRange.fromMonth === month
//     ? num >= selectedRange.fromDate &&
//       num <= selectedRange.toDate + numDaysOfMonth
//       ? { "background-color": "orange", color: "#121212" }
//       : {}
//     : num + numDaysOfMonth >= selectedRange.fromDate &&
//       num <= selectedRange.toDate
//     ? { "background-color": "orange", color: "#121212" }
//     : {}
