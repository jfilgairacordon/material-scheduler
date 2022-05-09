import { Pipe, PipeTransform } from '@angular/core';
import { AngularMaterialSchedulerService } from '../angular-material-scheduler.service';
import { CalendarShift } from '../models/shift.model';

@Pipe({
    name: 'shiftsForSpecificDay'
})
export class ShiftsForSpecificDayPipe implements PipeTransform
{
    constructor(private ams: AngularMaterialSchedulerService) { }

    transform(day: Date, shifts: CalendarShift[]): CalendarShift[]
    {
        return this.ams.findShiftsForSpecificDay(day, shifts);
    }

}
