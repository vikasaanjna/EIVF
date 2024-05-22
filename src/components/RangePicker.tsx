import React, { useEffect, useMemo, useState } from "react";
import { DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import "../assets/RangePicker.css";

interface Props {
  startDate: Date;
  endDate: Date;
  onChange: (range: [Date, Date]) => void;
}

export const RangePicker: React.FC<Props> = ({
  startDate,
  endDate,
  onChange,
}) => {
  const [selectedDates, setSelectedDates] = useState<
    [Dayjs | null, Dayjs | null]
  >([null, null]);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const totalDays = useMemo(() => {
    if (selectedDates[0] && selectedDates[1]) {
      const start = dayjs(selectedDates[0]);
      const end = dayjs(selectedDates[1]);
      return end.diff(start, "days");
    }
    return null;
  }, [selectedDates]);

  const handleDateChange = (
    dates: [Dayjs | null, Dayjs | null],
    dateStrings: [string, string]
  ) => {
    setSelectedDates(dates);
    onChange([new Date(dateStrings[0]), new Date(dateStrings[1])]);
  };

  useEffect(() => {
    setSelectedDates([dayjs(startDate), dayjs(endDate)]);
  }, [startDate, endDate]);

  const handleOpenChange = (open: boolean) => {
    setIsCalendarOpen(open);
  };

  const renderExtraFooter = () => {
    return (
      <>
        {isCalendarOpen && totalDays !== null && (
          <div className="calendar-top-total-days">{totalDays} Days</div>
        )}
      </>
    );
  };

  return (
    <DatePicker.RangePicker
      value={selectedDates}
      onChange={handleDateChange as any}
      onOpenChange={handleOpenChange}
      open={isCalendarOpen}
      renderExtraFooter={renderExtraFooter}
    />
  );
};
