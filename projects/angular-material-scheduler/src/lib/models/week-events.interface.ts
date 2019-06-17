import { CalendarShift } from './shift.model';

export interface IAMSWeekViewEventClicked
{
    date: Date;
    shift: CalendarShift;
}

export interface IAMSWeekViewEventRemove
{
    shift: CalendarShift;
}