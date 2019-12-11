import { NgModule } from '@angular/core';
import { AngularMaterialSchedulerComponent } from './angular-material-scheduler.component';
import { MonthViewComponent } from './components/month-view/month-view.component';
import { MaterialModule } from './material.module';
import { WeekViewComponent } from './components/week-view/week-view.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [AngularMaterialSchedulerComponent, MonthViewComponent, WeekViewComponent],
    imports: [CommonModule, MaterialModule],
    exports: [AngularMaterialSchedulerComponent]
})
export class AngularMaterialSchedulerModule { }
