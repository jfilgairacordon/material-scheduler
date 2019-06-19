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
    date = new Date(2019, 3, 1);
    shifts = [
        {
            title: "Evento 1",
            dateIni: new Date(2019, 5, 15, 9, 10),
            dateEnd: new Date(2019, 5, 15, 22, 0),
            id: 1
        },
        {
            title: "Evento 2",
            dateIni: new Date(2019, 5, 15, 10, 10),
            dateEnd: new Date(2019, 5, 15, 22, 0),
            id: 2
        },
        {
            title: "Andale Rigoberto",
            dateIni: new Date(2019, 5, 20, 9, 0),
            dateEnd: new Date(2019, 5, 20, 15, 0),
            id: 3
        },
        {
            title: "Lectura",
            dateIni: new Date(2019, 5, 11, 10, 10),
            dateEnd: new Date(2019, 5, 11, 11, 0),
            cssClass: 'red',
            id: 4
        }
    ] as Array<CalendarShift>;

    public alertContent(content: any): void
    {
        alert(JSON.stringify(content));
    }

    public addNew(): void
    {
        const shift = {
            title: "Evento1",
            dateIni: new Date(2019, 5, 21, 9, 0),
            dateEnd: new Date(2019, 5, 21, 15, 0),
            id: this.shifts.length
        } as CalendarShift;

        this.shifts.push(shift)
    }
    public toAugust(): void
    {
        this.date = new Date(2019, 7, 1);
    }
}
