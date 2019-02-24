import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompaniesComponent } from './Components/companies/companies.component';

const routes: Routes = [
  { path: 'companies', component: CompaniesComponent },
  { path: '**', redirectTo: '/companies', pathMatch: 'full'},
  { path: '', redirectTo: '/companies', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
