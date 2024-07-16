import * as React from "react";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/state/store";
import { RootState } from "@/state/store";
import { updateDates } from "@/state/Date/dateSlice";

//UI
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { Button } from "./ui/button";

import { format } from "date-fns";

//Icons
import { Calendar as CalendarIcon } from "lucide-react";

const DateFilter = () => {
  const initialRange = useSelector((state: RootState) => state.date.date);
  const [date, setDate] = React.useState<Date | undefined>(initialRange);

  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    if (date !== undefined) {
      dispatch(updateDates(format(date as Date, "LLL dd, y")));
    }
  }, [date]);

  return (
    <div className="container text-center">
      <Popover>
        <PopoverTrigger asChild>
          <Button className="gap-1">
            <CalendarIcon className="w-5 h-5" />
            {date ? (
              format(date as Date, "LLL dd, y")
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto ">
          <Calendar mode="single" selected={date} onSelect={setDate} />
        </PopoverContent>
      </Popover>
    </div>
  );
};
export default DateFilter;
