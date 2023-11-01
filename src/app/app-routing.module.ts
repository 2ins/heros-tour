import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivitiesComponent } from './components/activities/activities.component';
import { ActivityDetailComponent } from './components/activity-detail/activity-detail.component';
import { ActivityInsertComponent } from './components/activity-insert/activity-insert.component';
import { ActivityMasterInsertComponent } from './components/activity-master-insert/activity-master-insert.component';
import { AggLocationsViewComponent } from './components/agg-locations-view/agg-locations-view.component';
import { ExperienceDetailComponent } from './components/experience-detail/experience-detail.component';
import { ExperienceInsertOverviewComponent } from './components/experience-insert-overview/experience-insert-overview.component';
import { ExperienceInsertComponent } from './components/experience-insert/experience-insert.component';
import { ExperiencesComponent } from './components/experiences/experiences.component';
import { HomeviewComponent } from './components/homeview/homeview.component';
import { MasterDetailComponent } from './components/master-detail/master-detail.component';
import { MasterInsertComponent } from './components/master-insert/master-insert.component';
import { MastersComponent } from './components/masters/masters.component';
import { ProfilemanagerComponent } from './components/profilemanager/profilemanager.component';
import { QualitiesComponent } from './components/qualities/qualities.component';
import { QualityComponent } from './components/quality/quality.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UsersComponent } from './components/users/users.component';
import { VirtuesComponent } from './components/virtues/virtues.component';
import { ErrorComponent } from './error/error.component';
import { TestOutlineComponent } from './test-outline/test-outline.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'qualities', component: QualitiesComponent },
  { path: 'virtues', component: VirtuesComponent },
  { path: 'masters', component: MastersComponent },
  { path: 'users', component: UsersComponent },
  { path: 'activities', component: ActivitiesComponent },
  { path: 'experiences', component: ExperiencesComponent },
  { path: 'profile', component: ProfilemanagerComponent },
  { path: 'addnew', component: ExperienceInsertComponent },
  { path: 'addMaster', component: MasterInsertComponent },
  { path: 'addActivity', component: ActivityInsertComponent },
  { path: 'home', component: HomeviewComponent },
  { path: 'testout', component: TestOutlineComponent },
  {
    path: 'addExperienceOverview',
    component: ExperienceInsertOverviewComponent,
  },
  {
    path: 'addMasterActivity',
    component: ActivityMasterInsertComponent,
  },

  {
    path: 'locations',
    component: AggLocationsViewComponent,
    //canActivate: [HeroGuardService],
  },
  /*
  {
    path: 'qualities/quality/:id',
    component: QualityComponent,
  },
  */
  {
    path: 'users',
    children: [
      {
        path: 'user/:id',
        component: UserDetailComponent,
        data: { showHeader: false },
      },
    ],
  },
  {
    path: 'experiences',
    children: [
      {
        path: 'experience/:id',
        component: ExperienceDetailComponent,
        data: { showHeader: false },
      },
    ],
  },
  {
    path: 'activities',
    children: [
      {
        path: 'activity/:id',
        component: ActivityDetailComponent,
        data: { showHeader: false },
      },
    ],
  },
  {
    path: 'qualities',
    children: [
      {
        path: 'quality/:id',
        component: QualityComponent,
        data: { showHeader: false },
      },
    ],
  },
  {
    path: 'masters',
    children: [
      {
        path: 'master/:id',
        component: MasterDetailComponent,
        data: { showHeader: false },
      },
    ],
  },
  { path: '**', component: ErrorComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
