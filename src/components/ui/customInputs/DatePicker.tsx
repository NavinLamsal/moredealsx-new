"use client";

import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { Input } from "../input";

interface CustomDatePickerProps {
  value?: string; // Initial date value (YYYY-MM-DD format)
  name: string; // Name attribute for form handling
  onChange: (name: string, value: string) => void; // Function to handle change
  placeHolder:string
  disabled?:boolean
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ value, name, onChange, placeHolder ,disabled }) => {
  const years = Array.from({ length: moment().year() - 1899 }, (_, i) => 1900 + i);
  const months = moment.months();

  return (
    <DatePicker
      selected={value ? moment(value, "YYYY-MM-DD").toDate() : null}
      onChange={(date) => onChange(name, moment(date).format("YYYY-MM-DD"))}
      dateFormat="YYYY-MM-DD"
      maxDate={moment().toDate()} // Prevent future dates
      showYearDropdown
      showMonthDropdown
      dropdownMode="select"
      disabled={disabled}
      placeholderText={placeHolder ?? "Pick a date"}
      wrapperClassName="w-full"
      renderCustomHeader={({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div className="flex items-center justify-center gap-2 p-2 bg-gray-100 rounded-md">
          <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled} className="px-2 py-1 bg-gray-200 rounded">
            {"<"}
          </button>
          <select
            value={moment(date).year()}
            onChange={({ target: { value } }) => changeYear(Number(value))}
            className="px-2 py-1 border rounded"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <select
            value={months[moment(date).month()]}
            onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
            className="px-2 py-1 border rounded"
          >
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
          <button onClick={increaseMonth} disabled={nextMonthButtonDisabled} className="px-2 py-1 bg-gray-200 rounded">
            {">"}
          </button>
        </div>
      )}
      customInput={
        <Input
          type="text"
          className="w-full"
          placeholder={placeHolder?? "Pick a Date"}
        />
      }
      className="w-full p-2 border rounded-md"
    />
  );
};

export default CustomDatePicker;
