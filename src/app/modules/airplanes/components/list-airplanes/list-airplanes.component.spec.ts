import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAirplanesComponent } from './list-airplanes.component';

describe('ListAirplanesComponent', () => {
  let component: ListAirplanesComponent;
  let fixture: ComponentFixture<ListAirplanesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListAirplanesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAirplanesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
