import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format, startOfMonth, startOfYear, subDays } from "node_modules/date-fns";
import { DateRange } from 'react-day-picker';

import { Button } from 'components/ui/button';
import { Calendar } from 'components/ui/calender';
import { Popover, PopoverContent, PopoverTrigger} from 'components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'components/ui/select';

import { cn } from 'lib/utils';

import { usedData } from './context/datepicker-provider';

export default function DatePicker() {
    const { date, onChange} = useDate();

    return (
        <div className="">
            <DatePickerWithRange date={date} onChange={onChange}/>
            <DatePickerSelect onChange={onChange} selectedValue={date?.selectedValue}/>
        </div>
    );
}

function DatePickerWithRange({ className, date, onChange} : {className?: string, date: DateRange; onChange: any}) {
    return (
        <div className={cn('grid gap-2', className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                    id="date"
                    variant={'outline'}
                    className={cn(
                        'mr-[1px] h-[32px] w-[200px] justify-start rounded-br-none rounded-tr-none border-r !border-border border-gray-100 p-2 text-left font-normal hover:bg-accent focus:bg-accent focus-visible:!ring-1 focus-visible:!ring-gray-400 dark:bg-muted dark:hover:opacity-[0.8] sm:min-w-[235px]',
							!date && 'text-muted-foreground'
                    )}>
                        <CalendarIcon className={`mr-2 hidden h-4 w-4 sm:inline-block`}/>
                        {date?.from ? (
                            date.to ? (
                                <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                                    {format(date.from, 'LLL dd, y')}
                                </span>
                            ) : (
                                <span>{format(date.from, 'LLL dd, y')}</span>
                            )
                        ): (
                            <span>Pick a date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                    <Calendar 
                    initialFocus
                    mode='range'
                    selected={date.from}
                    onSelect={date}
                    numberOfMonths={2}/>
                </PopoverContent>
            </Popover>
        </div>
    );
}

