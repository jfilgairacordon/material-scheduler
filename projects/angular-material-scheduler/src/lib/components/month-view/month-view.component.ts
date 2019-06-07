import { Component, OnInit, Input } from '@angular/core';
import { AngularMaterialSchedulerService } from '../../angular-material-scheduler.service';

@Component({
    selector: 'angular-material-scheduler-month-view',
    templateUrl: './month-view.component.html',
    styleUrls: ['./month-view.component.scss']
})
export class MonthViewComponent implements OnInit
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
     * Defines the array of labels we wanna iterate.
     */
    public weekDaysLabel: Array<string>;

    constructor(private ams: AngularMaterialSchedulerService)
    {}

    ngOnInit()
    {
        this.weekDaysLabel = this.ams.getDayNameLabelByLocale(this.locale, this.startOnSunday);

        // First of all we have to know on which day starts the month because we need to
        // left some space blank at the begining or at the end.
        // var d=new Date();
        // console.log(d.getDay());

        // NOTE!!! Think aabout we have a parameter that indicates if the week starts on mondey or not.
        // this will cause the next step harder to do.

        // Then, calculate how many spaces the view have to left blank.

        // After that, mount an structure the view will be able to print.
        // Maybe something like 5 arrays of 7 positions.
        // I have to check if the system calendar always prints 5 rows.

        // After check note: Always 5 rows. Windows calendar does at least XD.

    }

}
