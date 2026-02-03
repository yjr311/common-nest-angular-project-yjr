import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { NGX_ECHARTS_CONFIG } from 'ngx-echarts';
import * as echarts from 'echarts';

bootstrapApplication(AppComponent,{
  ...appConfig,   // 先展开你已有的 appConfig
  providers: [
    ...(appConfig.providers ?? []), // 保留 appConfig 原有的 providers
    {
      provide: NGX_ECHARTS_CONFIG,
      useValue: { echarts },
    }
  ]
})
  .catch((err) => console.error(err));
