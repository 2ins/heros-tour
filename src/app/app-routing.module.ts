import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivitiesComponent } from './components/entities/activity/activities/activities.component';
import { ActivityDetailComponent } from './components/entities/activity/activity-detail/activity-detail.component';
import { ActivityInsertComponent } from './components/entities/activity/activity-insert/activity-insert.component';
import { ActivityMasterInsertComponent } from './components/entities/activity/activity-master-insert/activity-master-insert.component';
import { ActivitySearchComponent } from './components/entities/activity/activity-search/activity-search.component';
import { ExperienceDetailComponent } from './components/entities/experience/experience-detail/experience-detail.component';
import { ExperienceInsertOverviewComponent } from './components/entities/experience/experience-insert-overview/experience-insert-overview.component';
import { ExperienceInsertComponent } from './components/entities/experience/experience-insert/experience-insert.component';
import { ExperiencesByQualityComponent } from './components/entities/experience/experiences-by-quality/experiences-by-quality.component';
import { ExperiencesComponent } from './components/entities/experience/experiences/experiences.component';
import { AggLocationsViewComponent } from './components/entities/locations/agg-locations-view/agg-locations-view.component';
import { MasterDetailComponent } from './components/entities/master/master-detail/master-detail.component';
import { MasterInsertComponent } from './components/entities/master/master-insert/master-insert.component';
import { MastersComponent } from './components/entities/master/masters/masters.component';
import { FreeQualitiesComponent } from './components/entities/quality/free-qualities/free-qualities.component';
import { QualitiesAccordionDeckComponent } from './components/entities/quality/qualities-accordion-deck/qualities-accordion-deck.component';
import { QualitiesComponent } from './components/entities/quality/qualities/qualities.component';
import { QualityComponent } from './components/entities/quality/quality/quality.component';
import { UserDetailComponent } from './components/entities/user/user-detail/user-detail.component';
import { UsersComponent } from './components/entities/user/users/users.component';
import { VirtuesComponent } from './components/entities/virtue/virtues/virtues.component';
import { HomeSearchComponent } from './components/home-search/home-search.component';
import { HomeviewComponent } from './components/homeview/homeview.component';
import { MongoArticleDetailComponent } from './components/mongo/mongo-article-detail/mongo-article-detail.component';
import { MongoTestComponent } from './components/mongo/mongo-test/mongo-test.component';
import { ChatInterfaceComponent } from './components/openai/chat-interface/chat-interface.component';
import { ProfilemanagerComponent } from './components/profilemanager/profilemanager.component';
import { ErrorComponent } from './error/error.component';
import { TestOutlineComponent } from './test-outline/test-outline.component';

const routes: Routes = [
  { path: '', redirectTo: 'homesearch', pathMatch: 'full' },
  { path: 'freequalities', component: FreeQualitiesComponent },
  { path: 'mongo', component: MongoTestComponent },
  { path: 'mongoArticleDetail', component: MongoArticleDetailComponent },
  { path: 'chatgpt', component: ChatInterfaceComponent },
  { path: 'qualities', component: QualitiesComponent },
  { path: 'virtues', component: VirtuesComponent },
  { path: 'masters', component: MastersComponent },
  { path: 'users', component: UsersComponent },
  { path: 'activities', component: ActivitiesComponent },
  { path: 'experiences', component: ExperiencesComponent },
  { path: 'profile', component: ProfilemanagerComponent },
  { path: 'addnew', component: ExperienceInsertComponent },
  { path: 'addMaster', component: MasterInsertComponent },
  { path: 'addXp', component: ExperienceInsertOverviewComponent },
  { path: 'addActivity', component: ActivityInsertComponent },
  { path: 'home', component: HomeviewComponent },
  { path: 'homesearch', component: HomeSearchComponent },
  { path: 'searchmaster', component: ExperienceInsertOverviewComponent },
  { path: 'searchactivity', component: ActivitySearchComponent },
  { path: 'testout', component: TestOutlineComponent },
  { path: 'deck', component: QualitiesAccordionDeckComponent },

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
    path: 'experiencesByQuality',
    children: [
      {
        path: 'quality/:q',
        component: ExperiencesByQualityComponent,
        data: { byQuality: true },
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
