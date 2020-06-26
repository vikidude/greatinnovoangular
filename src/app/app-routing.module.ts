import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateorderComponent } from './screens/createorder/createorder.component';
import { OrderlistComponent } from './screens/orderlist/orderlist.component';
import { AnalyticsComponent } from './screens/analytics/analytics.component';


const routes: Routes = [
  {
    component: CreateorderComponent, path: ''
  },
  {
    component: OrderlistComponent, path: 'listorder',
  },
  {
    component: AnalyticsComponent, path: 'analytics',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
