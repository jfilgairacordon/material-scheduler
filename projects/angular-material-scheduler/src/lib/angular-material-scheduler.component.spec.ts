import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularMaterialSchedulerComponent } from './angular-material-scheduler.component';

describe('AngularMaterialSchedulerComponent', () => {
  let component: AngularMaterialSchedulerComponent;
  let fixture: ComponentFixture<AngularMaterialSchedulerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularMaterialSchedulerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularMaterialSchedulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
