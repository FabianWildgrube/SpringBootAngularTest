import { Component } from '@angular/core';
import { EChartOption } from 'echarts';
import { _XAxis } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  data = [[0, 1400], [1, 342], [2, 1120]];
  nextDataIndex = 3;

  randomValuesSeriesName = "randomValues";

  clickedValue = {
    x: null,
    y: null
  };

  chartOption : EChartOption = {
    title: {
      text: "A fancy title",
      subtext: "And a subtitle",
      itemGap: 5,
      left: 'center'
    },
    legend: {
      data: [{
        name: this.randomValuesSeriesName,
        icon: 'point',
        // set up the text in red
        textStyle: {
            color: '#304523'
        }
      }],
      bottom: 10
    },
    xAxis: {
      type: 'category'
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: this.randomValuesSeriesName,
        type: 'line',
        smooth: true,
        itemStyle: { normal: { areaStyle: { type: 'default' } } },
        data: this.data
      }
    ]
  }

  mergeOption : any;

  onChartClick(event: any): void {
    console.log(event);
    this.clickedValue.x = event.data[0];
    this.clickedValue.y = event.data[1];
  }

  addDataPoint() : void {
    let newData = this.data;

    newData.push([this.nextDataIndex++, Math.random() * 1500]);

    this.mergeOption = {
      series: [
        {
          name: this.randomValuesSeriesName,
          type: 'line',
          smooth: true,
          itemStyle: { normal: { areaStyle: { type: 'default' } } },
          data: newData
        }
      ]
    }
  }
}
