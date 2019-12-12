import { CalendarShift } from './shift.model';

export interface IAMSDayClicked
{
    date: Date;
    shifts?: Array<CalendarShift>;
}

export interface IAMSDayEventClicked
{
    date: Date;
    shift: CalendarShift;
}