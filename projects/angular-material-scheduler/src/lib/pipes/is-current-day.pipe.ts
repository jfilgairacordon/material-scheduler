import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'isCurrentDay'
})
export class IsCurrentDayPipe implements PipeTransform
{
    transform(day: Date): boolean
    {
        const today = new Date();
        const matchDay = day.getDate() === today.getDate();
        const matchMonth = day.getMonth() === today.getMonth();
        const matchYear = day.getFullYear() === today.getFullYear();

        return matchDay && matchMonth && matchYear;
    }

}
