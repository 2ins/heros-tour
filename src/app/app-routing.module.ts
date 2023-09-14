import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivitiesComponent } from './components/activities/activities.component';
import { ActivityDetailComponent } from './components/activity-detail/activity-detail.component';
import { ActivityInsertComponent } from './components/activity-insert/activity-insert.component';
import { ExperienceDetailComponent } from './components/experience-detail/experience-detail.component';
import { ExperienceInsertComponent } from './components/experience-insert/experience-insert.component';
import { ExperiencesComponent } from './components/experiences/experiences.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { LocationsComponent } from './components/locations/locations.component';
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
import { HeroGuardService } from './hero-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'qualities', pathMatch: 'full' },
  {
    path: 'heroes',
    component: HeroesComponent,
  },
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

  {
    path: 'locations',
    component: LocationsComponent,
    canActivate: [HeroGuardService],
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
      },
    ],
  },
  {
    path: 'experiences',
    children: [
      {
        path: 'experience/:id',
        component: ExperienceDetailComponent,
      },
    ],
  },
  {
    path: 'activities',
    children: [
      {
        path: 'activity/:id',
        component: ActivityDetailComponent,
      },
    ],
  },
  {
    path: 'qualities',
    children: [
      {
        path: 'quality/:id',
        component: QualityComponent,
      },
    ],
  },
  {
    path: 'masters',
    children: [
      {
        path: 'master/:id',
        component: MasterDetailComponent,
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
