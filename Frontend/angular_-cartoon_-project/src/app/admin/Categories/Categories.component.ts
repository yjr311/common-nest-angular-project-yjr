import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxEchartsModule } from 'ngx-echarts';

@Component({
  selector: 'app-Categories',
  standalone: true,
  imports: [NgxEchartsModule],
  templateUrl: './Categories.component.html',
  styleUrls: ['./Categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(private router:ActivatedRoute) { }

  ngOnInit() {
    this.router.params.subscribe((params) => {
      console.log(params); // 输出路由参数 id 的值
      // 根据 id 执行相应的逻辑
    })
  }


  chartOptions = {
    title: {
      text: 'ECharts Example',
      subtext: 'ECharts Example Subtitle',
      left: 'center'
    },
    tooltip: {},
    legend: {
      data: ['Sales']
    },
    xAxis: {
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
    },
    yAxis: {},
    series: [
      {
        name: 'Sales',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20, 30]
      }
    ]
  };

  barOptions = {
  title: { text: '销量统计' },
  tooltip: {},
  xAxis: { data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'] },
  yAxis: {},
  series: [
    {
      name: '销量',
      type: 'pie',   // ← 图表类型
      data: [5, 20, 36, 10, 10, 20]
    }
  ]
};
}
