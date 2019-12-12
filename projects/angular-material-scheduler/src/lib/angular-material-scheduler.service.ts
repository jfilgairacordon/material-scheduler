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
    public calculateHoursBetweenTwoDates(dateIni: Date, dateEnd: Date): number
    {
        return (((dateEnd.getTime() - dateIni.getTime())/60)/60) / 1000;
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

            return this.findShiftsForSpecificRange(dateToFindIni, dateToFindEnd, shifts);
        }
        else
        {
            return [];
        }
    }
    public findShiftsForSpecificRange(dateIni: Date, dateEnd: Date, shifts: Array<CalendarShift>): Array<CalendarShift>
    {
        if (shifts)
        {
            const filteredShifts = shifts.filter(shift =>
            {
                if (dateIni.getTime() <= shift.dateIni.getTime() && dateEnd.getTime() >= shift.dateEnd.getTime())
                    return shift;
            });

            return filteredShifts;
        }
        else
            return [];
    }
    public findShiftsForSpecificRangeOfHours(dateIni: Date, dateEnd: Date, shifts: Array<CalendarShift>): Array<CalendarShift>
    {
        if (shifts)
        {
            const filteredShifts = shifts.filter(shift =>
            {
                if (dateIni.getTime() <= shift.dateIni.getTime() && dateEnd.getTime() >= shift.dateIni.getTime())
                    return shift;
            });

            return filteredShifts;
        }
        else
            return [];
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
    public getFirstOfWeek(date: Date, startOnSunday: boolean): Date
    {
        // Delete reference
        const currentDate = new Date(date.getTime());
        const offset = currentDate.getDate() - currentDate.getDay() + (startOnSunday ? -1 : 0) + (currentDate.getDay() == 0 ? -6 : 1);
        const firstOfWeek = new Date(currentDate.setDate(offset));

        return firstOfWeek;
    }
    public getScrollbarWidth(): number
    {
        const outer = document.createElement("div");
        outer.style.visibility = "hidden";
        outer.style.width = "100px";
        outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps

        document.body.appendChild(outer);

        var widthNoScroll = outer.offsetWidth;
        // force scrollbars
        outer.style.overflow = "scroll";

        // add innerdiv
        var inner = document.createElement("div");
        inner.style.width = "100%";
        outer.appendChild(inner);

        var widthWithScroll = inner.offsetWidth;

        // remove divs
        outer.parentNode.removeChild(outer);

        return widthNoScroll - widthWithScroll;
    }
    public getShortDayNameForSpecificDay(date: Date, locale: string): String
    {
        return this.formatDate(date, locale, { weekday: "short" });
    }
    public increaseHoursToSpecificDate(date: Date, hourAmount: number): Date
    {
        date.setTime(date.getTime() + (hourAmount * 60 * 60 * 1000));

        return date;
    }
    public scrollContentTo(element: Element, x: number, y: number): void
    {
        // TODO: Check if we can anim it.
        setTimeout(() => {
            element.scrollTo(x, y);
        }, 500);
    }
}
