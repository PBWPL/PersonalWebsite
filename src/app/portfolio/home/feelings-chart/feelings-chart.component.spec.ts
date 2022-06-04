import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeelingsChartComponent } from './feelings-chart.component';

describe('FeelingsChartComponent', () => {
  let component: FeelingsChartComponent;
  let fixture: ComponentFixture<FeelingsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeelingsChartComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeelingsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
