import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VehicleComponent } from './vehicle/vehicle.component';

// Component pages

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent
  },
  {
    path: 'vehicle',
    component: VehicleComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
