import { DatePipe } from '@angular/common';
import { Component, Inject, Input, LOCALE_ID, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { MoodMap } from '@shared/interfaces/feeling';

@Component({
  selector: 'home-feelings-chart',
  template: `
    <div class="chart-container" class="relative m-auto h-full w-full">
      <canvas
        baseChart
        width="400"
        height="200"
        [data]="lineChartData"
        [options]="lineChartOptions"
        [type]="lineChartType"></canvas>
    </div>
  `,
  styles: []
})
export class FeelingsChartComponent implements OnInit {
  @Input() data!: any[];

  @Output() feelIndex = new EventEmitter<number>();

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  lineChartType: ChartType = 'line';

  lineChartData: ChartConfiguration['data'] = {
    labels: [0],
    datasets: []
  };

  lineChartOptions: ChartConfiguration['options'] = {
    maintainAspectRatio: false,
    responsive: true,
    onClick: (evt, item) => {
      if (evt.type === 'click' && item.length !== 0) this.feelIndex.emit(item[0].index);
    },
    scales: {
      x: {
        min: 0,
        ticks: {
          callback: () => null
        }
      },
      y: {
        min: 0,
        ticks: {
          callback: (value) => Object.keys(MoodMap)[value as number],
          font: {
            size: 20
          }
        }
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        displayColors: false,
        callbacks: {
          title: (item) => `🗓️ ${new DatePipe(this.locale).transform(item[0].label, 'EEEE, dd/MM/yy\n\b🕰️ h:mm aa')}`,
          label: (item) =>
            `${Object.keys(MoodMap)[item.parsed.y]} ${$localize`:@@feelingsChartFelt:I felt`} ${
              Object.values(MoodMap)[item.parsed.y]
            }`
        }
      }
    }
  };

  ngOnInit(): void {
    this.lineChartData.datasets = [
      {
        data: this.data,
        backgroundColor: 'transparent',
        borderColor: '#a9a9a9',
        pointStyle: 'rect',
        pointRadius: 6,
        pointHoverRadius: 6,
        pointHitRadius: 10,
        pointBorderColor: '#fafafa',
        pointBackgroundColor: '#a9a9a9',
        pointHoverBorderColor: '#a9a9a9',
        pointHoverBackgroundColor: '#fafafa'
      }
    ];
  }

  constructor(@Inject(LOCALE_ID) private locale: string) {}
}
