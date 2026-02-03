import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SnowComponent } from './snow/snow.component';
import { NgxEchartsModule } from 'ngx-echarts';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,SnowComponent,NgxEchartsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'test02';
}
