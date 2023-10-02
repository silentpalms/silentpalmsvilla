import { useState } from "react";

import { DateRangePicker } from "react-date-range";

import { addDays } from "date-fns";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

const CalendarPicker = () => {
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 0),
      key: "selection",
    },
  ]);
  return (
    <div className="mt-4 w-full">
      <DateRangePicker
        onChange={(item) => setRange(item.selection)}
        editableDateInputs={true}
        moveRangeOnFirstSelection={false}
        ranges={range}
        months={2}
        direction="horizonatal"
        className="calendarElement"
      />
    </div>
  );
};

export default CalendarPicker;
