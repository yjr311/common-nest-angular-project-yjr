import { Routes } from '@angular/router';
import { LoginComponent } from './admin/login/login.component';
import { LayoutComponent } from './admin/layout/layout.component';
import { ProductComponent } from './admin/product/product.component';
import { AuthGuard } from './auth.guard';
import { CategoriesComponent } from './admin/Categories/Categories.component';
import { LandingComponent } from './website/landing/landing.component';
import { WebLayoutComponent } from './website/web-layout/web-layout.component';
import { WebCategoriesComponent } from './website/web-categories/web-categories.component';
import { CartoonComponent } from './admin/cartoon/cartoon.component';
import { NotFoundComponent } from './NotFound/NotFound.component';
import { CartoonDetailComponent } from './admin/cartoon/cartoonDetail/cartoonDetail.component';
import { CartoonReadComponent } from './admin/cartoon/cartoonRead/cartoonRead.component';
import { AiChatComponent } from './website/ai-chat/ai-chat.component';


// https://v3pz.itndedu.com/v3pz
export const routes: Routes = [
    {
        path:'',
        redirectTo:'landing',
        pathMatch:'full'
    },
    {
        path:'login',
        component:LoginComponent
    },
    
    {
        path:'',
        component:LayoutComponent,
        children:[
            {
                path:'product',
                component:ProductComponent,
                canActivate: [AuthGuard]  // 使用守卫保护路由
            },
            {
                path:'Categories/:id',
                component:CategoriesComponent,
                canActivate: [AuthGuard]  // 使用守卫保护路由
            },
            {
                path:'cartoon',
                component:CartoonComponent,
                canActivate: [AuthGuard]  // 使用守卫保护路由
            },
            {
                path:'carttonDeail/:id',
                component:CartoonDetailComponent,
                canActivate: [AuthGuard]
            },
            {
                path:'cartoonRead/:bookId/:chapterId',
                component:CartoonReadComponent,
                canActivate: [AuthGuard]
            }
        ]
    },
    {
        path:'',
        component:WebLayoutComponent,
        children:[
            {
                path:'landing',
                component:LandingComponent
            },
            {
                path:'WebCategories',
                component:WebCategoriesComponent
            },
              {
                path:'ai-chat',
                component:AiChatComponent
            }
        ]
    },
    {
        path:'**',
        component:NotFoundComponent
    }

];
