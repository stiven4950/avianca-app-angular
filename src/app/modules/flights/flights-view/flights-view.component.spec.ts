import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightsViewComponent } from './flights-view.component';

describe('FlightsViewComponent', () => {
  let component: FlightsViewComponent;
  let fixture: ComponentFixture<FlightsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightsViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
