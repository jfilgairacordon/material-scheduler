import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { AngularMaterialSchedulerService } from '../../angular-material-scheduler.service';
import { CalendarShift } from '../../models/shift.model';
import { IAMSDayClicked, IAMSDayEventClicked } from '../../models/month-events.interface';


@Component({
    selector: 'angular-material-scheduler-month-view',
    templateUrl: './month-view.component.html',
    styleUrls: ['./month-view.component.scss']
})
export class MonthViewComponent implements OnInit, OnChanges
{
    /**
     * Defines the date that the view is going to use. If no argument is passed it will uses new Date()
     */
    @Input() date: Date = new Date();

    /**
     * Defines if the view will start on Sunday or on Monday. By default true.
     */
    @Input() startOnSunday: boolean = true;

    /**
     * Defines the locale for the view. By default en-us.
     * For more detailed information about the locales, please visit: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_identification_and_negotiation
     */
    @Input() locale: string = 'es-us';

    /**
     * Defines the array of events.
     */
    @Input() shifts: Array<CalendarShift>

    /**
     * Defines the event called on day click.
     */
    @Output() DayClicked = new EventEmitter<IAMSDayClicked>();

    /**
     * Defines the event called on a specific shift.
     */
    @Output() DayEventClicked = new EventEmitter<IAMSDayEventClicked>();

    /**
     * Defines the array of labels we wanna iterate.
     */
    public weekDaysLabel: Array<string>;

    /**
     * Defines the structure to print on the view.
     */
    public monthStruct: Array<Array<Date>> = [];

    constructor(public ams: AngularMaterialSchedulerService)
    {}

    ngOnInit()
    {
        this.weekDaysLabel = this.ams.getDayNameLabelByLocale(this.locale, this.startOnSunday);
        this.monthStruct = this.calculateMonthStruct(this.date);
    }

    ngOnChanges(changes: any): void
    {
        // If the date changes then recalculate the structure.
        if (changes.date && changes.date.firstChange == false)
        {
            this.monthStruct = this.calculateMonthStruct(changes.date.currentValue);
        }
    }

    /**
     * Dispatches the dayclick event from the month view.
     * @param date 
     * @param shifts 
     */
    public DayClickedOnView(date: Date, shifts: Array<CalendarShift>): void
    {
        this.DayClicked.emit({date: date, shifts: shifts});
    }
    /**
     * Dispatches the DayEventClick event from the month view.
     * @param date 
     * @param shift 
     */
    public DayEventClickedOnView(event: MouseEvent,date: Date, shift: CalendarShift): void
    {
        // This line is because we have a (click) hierarchy on the dom
        // and if we don't stop the propagation of the mouse event,
        // both DayEventClicked and DayClicked events will fire.
        // we wanna avoid that behavior.
        event.stopPropagation();
        this.DayEventClicked.emit({date: date, shift: shift});
    }

    /**
     * Build and returns the month structure. It will be used on the view.
     */
    private calculateMonthStruct(date: Date): Array<Array<Date>>
    {
        const monthStruct: Array<Array<Date>> = [];
        // First of all we have to know on which day starts the month because we need to
        // left some space blank at the begining or at the end.
        const firstOfMonth = new Date();
        firstOfMonth.setFullYear(this.date.getFullYear(), this.date.getMonth(), 1);
        const lastOfMonth = new Date();
        lastOfMonth.setFullYear(this.date.getFullYear(), this.date.getMonth() + 1, 0);

        // date.getDay() gives us the number of whitespaces from the start to the day.
        // if we keep in mind that the week can start on sunday it will be -1.
        let startPos = firstOfMonth.getDay() - (this.startOnSunday ? -1 : 0);

        // Fill the spaces on the week
        let week = Array(startPos - 1);
        week.fill(0, 0, startPos -1);

        // Let's build the structure.
        startPos-=1; // That makes easier calculate the real offset for the bucle.
        for (let i = 1; i <= lastOfMonth.getDate(); i++)
        {
            const dateOfI = new Date();
            dateOfI.setFullYear(this.date.getFullYear(), this.date.getMonth(), i);

            const offset = startPos + i; // This is because we have to mantain a reference on which position the month begins.
            if((offset % 7) == 0 || i == lastOfMonth.getDate()) // The % indicates when we havee to end the current week and start another one.
            {
                week.push(dateOfI);
                monthStruct.push(week);
                week = [];
            }
            else
            {
                week.push(dateOfI);
            }
        }

        return monthStruct;
    }
}
