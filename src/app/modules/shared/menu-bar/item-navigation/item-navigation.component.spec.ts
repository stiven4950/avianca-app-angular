import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemNavigationComponent } from './item-navigation.component';

describe('ItemNavigationComponent', () => {
  let component: ItemNavigationComponent;
  let fixture: ComponentFixture<ItemNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemNavigationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
