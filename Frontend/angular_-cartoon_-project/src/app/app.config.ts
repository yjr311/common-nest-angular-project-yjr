import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { zh_CN, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { BarChartOutline, CommentOutline, UsergroupDeleteOutline,UserOutline, TeamOutline,MenuFoldOutline,MenuUnfoldOutline } from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';

const icons: IconDefinition[] = [BarChartOutline,CommentOutline,UsergroupDeleteOutline,UserOutline, TeamOutline,MenuFoldOutline,MenuUnfoldOutline];

registerLocaleData(zh);

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideNzI18n(zh_CN), importProvidersFrom(FormsModule), provideAnimationsAsync(), provideHttpClient(),provideNzIcons(icons)]
};
