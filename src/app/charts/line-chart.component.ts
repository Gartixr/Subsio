import { Component, Input } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  template: `
    <div style="width: 100%; height: 300px;">
      <canvas baseChart
        [data]="lineChartData"
        [options]="lineChartOptions"
        [type]="lineChartType">
      </canvas>
    </div>
  `,
  imports: [NgChartsModule]
})
export class LineChartComponent {
  @Input() data: any[] = [];

  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };

  public lineChartType: ChartType = 'line';

  get lineChartData() {
    return {
      labels: this.data.map(d => d.name),
      datasets: [
        {
          label: 'Days to Renewal',
          data: this.data.map(d => d.days),
          borderColor: '#66BB6A',
          backgroundColor: 'rgba(102,187,106,0.3)',
        },
      ],
    };
  }
}
