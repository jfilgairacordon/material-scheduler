import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { CalendarShift } from '../../models/shift.model';
import { AngularMaterialSchedulerService } from '../../angular-material-scheduler.service';
import { WeekViewShift } from '../../models/week-view-shift.interface';
import { IAMSWeekViewEventClicked, IAMSWeekViewEventRemove } from '../../models/week-events.interface';

@Component({
    selector: 'angular-material-scheduler-week-view',
    templateUrl: './week-view.component.html',
    styleUrls: ['./week-view.component.scss']
})
export class WeekViewComponent implements OnInit, OnChanges
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
    @Input() locale: string = 'en-us';

    /**
     * Defines the array of events.
     */
    @Input() shifts: Array<CalendarShift>

    /**
     * Defines if the view has to hide the day labels (numbers below the week days).
     * By default false.
     */
    @Input() hideWeekViewDayLabel: boolean = false;

    /**
     * Defines the event called on a specific shift.
     */
    @Output() WeekEventClicked = new EventEmitter<IAMSWeekViewEventClicked>();

    /**
     * Defines the event called on a specific shift's remove button.
     */
    @Output() WeekEventRemove = new EventEmitter<IAMSWeekViewEventRemove>();

    /**
     * Defines the array of labels we wanna iterate.
     */
    public weekDaysLabel: Array<string>;

    /**
     * Defines the structure to print on the view.
     */
    public weekStruct: Array<Date> = [];

    /**
     * Defines the default offset for the scrollbar in order to align the items on the view.
     */
    public scrollBarOffset: number = 17;

    /**
     * Defines the timeline.
     */
    public timeline: Array<{date: Date, hourStr: string, idx: number}>;

    constructor(public ams: AngularMaterialSchedulerService)
    {
        this.timeline = Array<{date: Date, hourStr: string, idx: number}>(48).fill(null).map((x, i) =>
        {
            let currentDate = new Date();
            currentDate.setHours(0,0,0);
            currentDate = this.ams.increaseHoursToSpecificDate(currentDate, i/2); // Divided by 2 because we wanna step every half hour.
            const hourParts = currentDate.toTimeString().split(":");

            return {date: currentDate, hourStr: `${hourParts[0]}:${hourParts[1]}`, idx: i};
        });
    }

    ngOnInit()
    {
        this.weekDaysLabel   = this.ams.getDayNameLabelByLocale(this.locale, this.startOnSunday);
        this.weekStruct      = this.calculateWeekStructure(this.date);
        this.scrollBarOffset = this.ams.getScrollbarWidth();
    }

    ngOnChanges(changes: any): void
    {
        // If the date changes then recalculate the structure.
        if (changes.date && changes.date.firstChange == false)
        {
            this.weekStruct = this.calculateWeekStructure(changes.date.currentValue);
        }
    }

    /**
     * Build and returns the week structured. It will be used on the view.
     */
    private calculateWeekStructure(date: Date): Array<Date>
    {
        // Given an specific date, let's take the current week.
        // then, calculate which is its first day.
        const weekStruct: Array<Date> = [];
        const offset = date.getDate() - date.getDay() + (this.startOnSunday ? -1 : 0) + (date.getDay() == 0 ? -6 : 1);
        const firstOfWeek = new Date(date.setDate(offset));
        weekStruct.push(firstOfWeek);

        // Now iterate over the week's days and mount the structure.
        for (let i = 1; i < 7; i++)
        {
            const nextDay = new Date(firstOfWeek.toDateString());
            nextDay.setDate(firstOfWeek.getDate() + i);
            weekStruct.push(nextDay);
        }

        return weekStruct;
    }

    /**
     * Finds the shifts for specific range of hours and prepare them for rendering into the view
     */
    public calculateShiftForSpecificDay(day: Date, timelineIdx: number, cell: Element): Array<WeekViewShift>
    {
        day.setHours(0, 0, 0);
        let dateIni = new Date(day.toDateString()); // Remove ref
        let dateEnd = new Date(day.toDateString()); // Remove ref
        dateEnd = new Date(dateEnd.getTime() - (1 * 60000)); // Substract a minute.
        dateIni = this.ams.increaseHoursToSpecificDate(dateIni, (timelineIdx/2));
        dateEnd = this.ams.increaseHoursToSpecificDate(dateEnd, (timelineIdx/2) + TIME_OFFSET_BETWEEN_HOURS_IN_TIMELINE);
        const shifts = this.ams.findShiftsForSpecificRangeOfHours(dateIni, dateEnd, this.shifts);
        const preparedShifts: Array<WeekViewShift> = [];

        shifts.forEach(x =>
        {
            // For the height:
            // Calculate the difference (in hours) between the 2 dates, ini and end.
            // After that, multiply that value by the height of 30 min (there is a constant defined at the end)
            // We have to ensure the value isn't less than the value of the constant.
            // if not equals or greater than that we have to obviate the value
            // and use the constant as height
            const heightFactor = this.ams.calculateHoursBetweenTwoDates(x.dateIni, x.dateEnd);
            let height = (heightFactor * TIMELINE_OFFSET_TOP_SPACE_BETWEEN_HOURS);
            height = height < TIMELINE_OFFSET_TOP_SPACE_BETWEEN_HOURS ? TIMELINE_OFFSET_TOP_SPACE_BETWEEN_HOURS : height;
            const preparedShift = {
                dateIni: x.dateIni,
                dateEnd: x.dateEnd,
                title: x.title,
                width: 80,
                height: height // TODO: Calculate using the comment
            } as WeekViewShift;

            preparedShifts.push(preparedShift);
        });

        return preparedShifts;
    }
    public identy(index: number, item: CalendarShift): number
    {
        return index;
    }
    public ShiftClicked(date: Date, shift: CalendarShift): void
    {
        this.WeekEventClicked.emit({
            date: date,
            shift: shift
        } as IAMSWeekViewEventClicked);
    }
    public ShiftRemove(shift: CalendarShift): void
    {
        this.WeekEventRemove.emit({
            shift: shift
        } as IAMSWeekViewEventRemove);
    }
}

export const TIME_OFFSET_BETWEEN_HOURS_IN_TIMELINE = 0.5; // that value is equal 30min.
export const TIMELINE_OFFSET_TOP_SPACE_BETWEEN_HOURS = 100; // Value in px. This because a half hour is equivalent to 50 px