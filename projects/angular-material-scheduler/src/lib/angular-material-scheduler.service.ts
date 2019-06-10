import { Injectable } from '@angular/core';
import { CalendarShift } from './models/shift.model';

@Injectable({
    providedIn: 'root'
})
export class AngularMaterialSchedulerService
{

    constructor() { }

    public checkIfCanUseIntlFormatter(): boolean
    {
        return (typeof Intl == 'object' && typeof Intl.DateTimeFormat == 'function')
    }
    public formatDate(date: Date, locale: string, format: Intl.DateTimeFormatOptions): string
    {
        const formatter = new Intl.DateTimeFormat(locale, format);

        return formatter.format(date);
    }
    public getDayNameLabelByLocale(locale: string, startOnSunday: boolean = false): Array<string>
    {
        let starter = startOnSunday ? 4 : 5;
        const weekDays = [];
        const date = new Date(0);
        for (var i = 0; i < 7; i++) {
            date.setDate(starter + i);
            const weekday = this.formatDate(date, locale, { weekday: "short" });
            weekDays.push(weekday);
        }

        return weekDays;
    }
    public findShiftsForSpecificDay(dateToFind: Date, shifts: Array<CalendarShift>): Array<CalendarShift>
    {
        if (shifts)
        {
            const dateToFindIni = new Date();
            dateToFindIni.setFullYear(dateToFind.getFullYear(), dateToFind.getMonth(), dateToFind.getDate());
            dateToFindIni.setHours(0, 0, 0);
            const dateToFindEnd = new Date();
            dateToFindEnd.setFullYear(dateToFind.getFullYear(), dateToFind.getMonth(), dateToFind.getDate());
            dateToFindEnd.setHours(23, 59, 59);


            const filteredShifts = shifts.filter(shift =>
            {
                if (dateToFindIni.getTime() <= shift.dateIni.getTime() && dateToFindEnd.getTime() >= shift.dateEnd.getTime())
                    return shift;
            });

            return filteredShifts;
        }
        else
        {
            return [];
        }
    }
}
