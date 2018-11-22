import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherDetailedCardComponent } from './weather-detailed-card.component';

describe('WeatherDetailedCardComponent', () => {
  let component: WeatherDetailedCardComponent;
  let fixture: ComponentFixture<WeatherDetailedCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherDetailedCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherDetailedCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
