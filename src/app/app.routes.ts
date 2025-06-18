import { Routes } from '@angular/router';
import {ProductOverviewComponent} from './views/product-overview/product-overview.component';
import {AdminPageComponent} from './views/admin-page/admin-page.component';

export const routes: Routes = [
  {
    path: '',
    component: ProductOverviewComponent
  },
  {
    path: 'admin',
    component: AdminPageComponent
  }
];
