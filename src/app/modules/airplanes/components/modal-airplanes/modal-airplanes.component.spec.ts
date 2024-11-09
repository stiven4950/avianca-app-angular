import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAirplanesComponent } from './modal-airplanes.component';

describe('ModalAirplanesComponent', () => {
  let component: ModalAirplanesComponent;
  let fixture: ComponentFixture<ModalAirplanesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAirplanesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAirplanesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
