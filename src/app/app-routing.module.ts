import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {NewEmployeeComponent} from './components/new-employee/new-employee.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'new-employee', component: NewEmployeeComponent },
  { path: '', redirectTo: '/new-employee', pathMatch: 'full' }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
