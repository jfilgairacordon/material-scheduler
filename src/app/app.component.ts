import { Component } from '@angular/core';
import { CalendarShift } from 'angular-material-scheduler/public-api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent
{
    title = 'material-scheduler';
    shifts = [
        {
            title: "Evento 1",
            dateIni: new Date(2019, 5, 15, 9, 10),
            dateEnd: new Date(2019, 5, 15, 22, 0)
        },
        {
            title: "Evento 2",
            dateIni: new Date(2019, 5, 15, 10, 10),
            dateEnd: new Date(2019, 5, 15, 22, 0)
        },
        {
            title: "Andale Rigoberto",
            dateIni: new Date(2019, 5, 20, 9, 10),
            dateEnd: new Date(2019, 5, 20, 22, 0)
        },
        {
            title: "Lectura",
            dateIni: new Date(2019, 5, 11, 10, 10),
            dateEnd: new Date(2019, 5, 11, 11, 0),
            cssClass: 'red'
        }
    ] as Array<CalendarShift>;

    public alertContent(content: any): void
    {
        alert(JSON.stringify(content));
    }
}
