import { CalendarShift } from './shift.model';

export class WeekViewShift implements CalendarShift
{
    public dateIni: Date;
    public dateEnd: Date;
    public title: String;
    public cssClass?: String;
    public width: number;
    public height: number;
}