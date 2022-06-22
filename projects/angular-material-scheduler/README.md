# AngularMaterialScheduler

Welcome to Angular Material Scheduler.

This library allows you to place a calendar filled with events and interact with them on your Angular project fully responsive.

The project works with 3 types of views.

- **Month view**: Which is a classic view where you can see all the days of a single month.
- **Week view**: Which is a time-line like view where you can see 2 axes. Days of the week (x axe) and the 24h (y axe)
- **Day view**: Still under development.

# Installation

`npm i angular-material-scheduler -s`

# Usage

## Import the module and add it to your imports section in your main AppModule:

```
@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AngularMaterialSchedulerModule
    ]
})
```

## Then use the tag on your components

```
<angular-material-scheduler
        [locale]="'es-es'"
        [view]="'month'"
        [date]="date.asObservable()"
        [startsOnSunday]="true"
        [shifts]="shifts"
        (DayClicked)="alertContent($event)"
        (DayEventClicked)="alertContent($event)"
    >
</angular-material-scheduler>
```

# Available properties.

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.0.
