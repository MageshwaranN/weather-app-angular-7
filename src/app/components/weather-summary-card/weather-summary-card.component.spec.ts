import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherSummaryCardComponent } from './weather-summary-card.component';

describe('WeatherSummaryCardComponent', () => {
  let component: WeatherSummaryCardComponent;
  let fixture: ComponentFixture<WeatherSummaryCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherSummaryCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherSummaryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
