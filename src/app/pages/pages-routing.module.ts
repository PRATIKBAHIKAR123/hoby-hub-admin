import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Component pages
import { DashboardComponent } from "./dashboards/dashboard/dashboard.component";
import { AuthGuard } from '../core/guards/auth.guard';
import { AccountHolderComponent } from './account-holder/account-holder.component';
import { StudentRegisteredComponent } from './student-registered/student-registered/student-registered.component';

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent
  },
    {
    path: "activities",
    loadChildren: () => import('./activities/activities.module').then(m => m.ActivitiesModule), canActivate: [AuthGuard]
  },
    {
    path: "masters",
    loadChildren: () => import('./master/master.module').then(m => m.MasterModule), canActivate: [AuthGuard]
  },
      {
    path: "users",
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule), canActivate: [AuthGuard]
  },
  {
    path: "terms-and-policies",
    loadChildren: () => import('./terms-and-policy/terms-and-policy.module').then(m => m.TermsAndPolicyModule), canActivate: [AuthGuard]
  },
  {
    path: "programs-registered",
    loadChildren: () => import('./programs/programs.module').then(m => m.ProgramsModule), canActivate: [AuthGuard]
  },
  {
    path: "student-registered",
    component: StudentRegisteredComponent
  },
  {
    path: "my-profile",
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule), canActivate: [AuthGuard]
  },
  {
    path: "progress-summary",
    loadChildren: () => import('./progress-summary/progress-summary.module').then(m => m.ProgressSummaryModule), canActivate: [AuthGuard]
  },
  {
    path: "account-holder-form",
    component: AccountHolderComponent
  },
  {
    path: "vendors",
    loadChildren: () => import('./vendors/vendors.module').then(m => m.VendorsModule), canActivate: [AuthGuard]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
