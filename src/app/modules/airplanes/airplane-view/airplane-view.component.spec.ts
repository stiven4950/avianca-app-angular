import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirplaneViewComponent } from './airplane-view.component';

describe('AirplaneViewComponent', () => {
  let component: AirplaneViewComponent;
  let fixture: ComponentFixture<AirplaneViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AirplaneViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AirplaneViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
