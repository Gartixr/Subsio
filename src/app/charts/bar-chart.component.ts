import { Component, Input } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  template: `
    <div style="width: 100%; height: 300px;">
      <canvas baseChart
        [data]="barChartData"
        [options]="barChartOptions"
        [type]="barChartType">
      </canvas>
    </div>
  `,
  imports: [NgChartsModule]
})
export class BarChartComponent {
  @Input() data: any[] = [];

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };

  public barChartType: ChartType = 'bar';

  get barChartData() {
    return {
      labels: this.data.map(d => d.name),
      datasets: [
        {
          label: 'Price (€)',
          data: this.data.map(d => d.price),
          backgroundColor: '#42A5F5',
        },
      ],
    };
  }
}
