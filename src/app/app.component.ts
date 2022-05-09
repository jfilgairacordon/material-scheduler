import { Component } from '@angular/core';
import { CalendarShift } from 'angular-material-scheduler/public-api';
import { BehaviorSubject, of, Subject } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent
{
    title = 'material-scheduler';
    date = new BehaviorSubject<Date>(new Date());

    constructor()
    { }

    shifts = [
        {
            title: "Evento 1",
            dateIni: new Date(2022, 4, 15, 9, 10),
            dateEnd: new Date(2022, 4, 15, 22, 0),
            id: 1
        },
        {
            title: "Evento 2",
            dateIni: new Date(2022, 4, 15, 10, 10),
            dateEnd: new Date(2022, 4, 15, 22, 0),
            id: 2
        },
        {
            title: "Andale Rigoberto",
            dateIni: new Date(2022, 4, 20, 9, 0),
            dateEnd: new Date(2022, 4, 20, 15, 0),
            id: 3
        },
        {
            title: "Lectura",
            dateIni: new Date(2022, 4, 4, 10, 10),
            dateEnd: new Date(2022, 4, 4, 4, 0),
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
            dateIni: new Date(2022, 5, 21, 9, 0),
            dateEnd: new Date(2022, 5, 21, 15, 0),
            id: this.shifts.length
        } as CalendarShift;

        this.shifts.push(shift)
    }
    public increase(): void
    {
        const current = this.date.value;
        current.setMonth(current.getMonth() + 1);
        this.date.next(current);
    }
    public decrease(): void
    {
        const current = this.date.value;
        current.setMonth(current.getMonth() - 1);
        this.date.next(current);
    }
}
