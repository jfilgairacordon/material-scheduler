import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { AngularMaterialSchedulerService } from './angular-material-scheduler.service';
import { CalendarShift } from './models/shift.model';
import { IAMSDayClicked, IAMSDayEventClicked } from './models/month-events.interface';
import { IAMSWeekViewEventClicked, IAMSWeekViewEventRemove } from './models/week-events.interface';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
    selector: 'angular-material-scheduler',
    templateUrl: "./angular-material-scheduler.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./angular-material-scheduler.component.scss']
})
export class AngularMaterialSchedulerComponent implements OnInit, AfterViewInit
{
    /**
     * Defines the kind of view the library is going to show. By default month view.
     */
    @Input() view: 'year' | 'month' | 'week' | 'day' = "month";

    /**
     * Defines the locales the currentDate will use. By default the library uses en-us.
     * For additional information about the posible locales, please visit: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_identification_and_negotiation
     */
    @Input() locale: string = "en-us";

    /**
     * Defines if the views have to start at sunday or monday. By default, true
     */
    @Input() startsOnSunday = true;

    /**
     * Defines the array of "Events" the calendar will show.
     */
    @Input() set shifts(shifts: Array<CalendarShift>)
    {
        this._shiftsStore.next(shifts);
    }

    /**
     * Defines the date that the calendar will use. If no argument is passed through the input. It will uses Date();
     */
    @Input() date: Observable<Date> = of(new Date());

    /**
     * Defines if the view has to hide the day labels (numbers below the week days).
     * By default false.
     */
    @Input() hideWeekViewDayLabel: boolean = false;

    /**
     * Defines if the view has to scroll to specific hour when it fires onInit event.
     * The input receives the specific hour as an argument.
     */
    @Input() scrollWeekViewToSpecificHourOnInit: number = null;

    /**
     * Defines if the view has to scroll to the first event when it fires onInit event.
     */
    @Input() scrollWeekViewToFirstEventOnInit: boolean = false;

    /**
     * Defines if the view has to scroll to the changed event
     */
    @Input() scrollWeekViewToEventOnChange: boolean = false;

    /**
     * Dispatches the dayclick event from the different views across the library.
     */
    @Output() DayClicked = new EventEmitter<IAMSDayClicked>();

    /**
     * Defines the event called on a specific shift.
     */
    @Output() DayEventClicked = new EventEmitter<IAMSDayEventClicked>();

    /**
     * Defines the event called on a specific shift.
     */
    @Output() WeekEventClicked = new EventEmitter<IAMSWeekViewEventClicked>();

    /**
     * Defines the event called on a specific shift's remove button.
     */
    @Output() WeekEventRemove = new EventEmitter<IAMSWeekViewEventRemove>();

    /**
     * Defines where the shifts will live.
     */
    public _shiftsStore = new BehaviorSubject<Array<CalendarShift>>([]);
    //TODO: Here I have to add support for momentjs dates.

    public _currentDate: Date;

    constructor(private ams: AngularMaterialSchedulerService)
    { }

    ngOnInit()
    {
    }

    ngOnChanges(c: any): void
    {
        console.log(c);
    }

    ngAfterViewInit()
    {
        // Check if the input value is ok.
        if (this.date)
            // Configure the current date
            this.date
                .pipe(take(1))
                .subscribe(date => this._currentDate = date);
        else
        {
            const date = new Date();
            this.date = of(date);
            this._currentDate = date;
        }
    }

    public getCurrentMontName(): string
    {
        if (this.ams.checkIfCanUseIntlFormatter())
            return this.ams.formatDate(this._currentDate, this.locale, { month: "long" })
    }

}
