import React from "react";
import { parse, format, eachDayOfInterval } from "date-fns";

const BookingDates = ({ fromDate, toDate }) => {
  const formattedDates = React.useMemo(() => {
    const parsedFromDate = parse(fromDate, "dd-MM-yyyy", new Date());
    const parsedToDate = parse(toDate, "dd-MM-yyyy", new Date());
    const datesBetween = eachDayOfInterval({
      start: parsedFromDate,
      end: parsedToDate,
    });
    return datesBetween.map((date) => format(date, "dd-MM-yyyy"));
  }, [fromDate, toDate]);

  return (
    <div>
      <h2>Booking Dates:</h2>
      <ul>
        {formattedDates.map((date) => (
          <li key={date}>{date}</li>
        ))}
      </ul>
    </div>
  );
};

export default BookingDates;
