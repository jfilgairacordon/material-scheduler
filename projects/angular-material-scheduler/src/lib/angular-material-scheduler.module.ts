import { NgModule } from '@angular/core';
import { AngularMaterialSchedulerComponent } from './angular-material-scheduler.component';
import { MonthViewComponent } from './components/month-view/month-view.component';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material.module';
import { WeekViewComponent } from './components/week-view/week-view.component';

@NgModule({
    declarations: [AngularMaterialSchedulerComponent, MonthViewComponent, WeekViewComponent],
    imports: [BrowserModule, MaterialModule],
    exports: [AngularMaterialSchedulerComponent]
})
export class AngularMaterialSchedulerModule { }
