import { Injectable } from '@angular/core';

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
        for (var i = 0; i < 7; i++)
        {
            date.setDate(starter + i);
            const weekday = this.formatDate(date, locale, {weekday: "short"});
            weekDays.push(weekday);
        }

        return weekDays;
    }
}
