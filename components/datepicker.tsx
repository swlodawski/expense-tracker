import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format, startOfMonth, startOfYear, subDays } from "node_modules/date-fns";
import { DateRange } from 'react-day-picker';

import { Button } from 'components/ui/button';
import { Calendar } from 'components/ui/calender';
import { Popover, PopoverContent, PopoverTrigger} from 'components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'components/ui/select';

import { cn } from 'lib/utils';

import { usedData } from './context/datepicker-provider';


