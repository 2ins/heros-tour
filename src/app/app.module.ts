import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { TextFieldModule } from '@angular/cdk/text-field';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { ChartjsModule } from '@ctrl/ngx-chartjs';
import { NgxsModule } from '@ngxs/store';
import {
  ArcElement,
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  DoughnutController,
  Legend,
  LineController,
  LineElement,
  LinearScale,
  PieController,
  PointElement,
  PolarAreaController,
  RadarController,
  RadialLinearScale,
  Title,
  Tooltip,
} from 'chart.js';

import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { ImageCropperModule } from 'node_modules/ngx-image-cropper';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { ActivitiesComponent } from './components/activities/activities.component';
import { ActivityDetailComponent } from './components/activity-detail/activity-detail.component';
import { ActivityInsertComponent } from './components/activity-insert/activity-insert.component';
import { ActivityItemComponent } from './components/activity-item/activity-item.component';
import { ActivityMasterInsertComponent } from './components/activity-master-insert/activity-master-insert.component';
import { ActivityMasterSearchComponent } from './components/activity-master-search/activity-master-search.component';
import { ActivitySearchComponent } from './components/activity-search/activity-search.component';
import { AggLocationsViewComponent } from './components/agg-locations-view/agg-locations-view.component';
import { AppContainerComponent } from './components/app-container/app-container.component';
import { ContatInfoComponent } from './components/contat-info/contat-info.component';
import { ExperienceDetailComponent } from './components/experience-detail/experience-detail.component';
import { ExperienceInsertOverviewComponent } from './components/experience-insert-overview/experience-insert-overview.component';
import { ExperienceInsertComponent } from './components/experience-insert/experience-insert.component';
import { ExperienceItemComponent } from './components/experience-item/experience-item.component';
import { ExperienceMasterUserPicComponent } from './components/experience-master-user-pic/experience-master-user-pic.component';
import { ExperiencePicComponent } from './components/experience-pic/experience-pic.component';
import { ExperiencesComponent } from './components/experiences/experiences.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderSimpleComponent } from './components/header-simple/header-simple.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeviewComponent } from './components/homeview/homeview.component';
import { LocationsComponent } from './components/locations/locations.component';
import { MasterDetailComponent } from './components/master-detail/master-detail.component';
import { MasterInsertComponent } from './components/master-insert/master-insert.component';
import { MasterItemComponent } from './components/master-item/master-item.component';
import { MastersComponent } from './components/masters/masters.component';
import { MenuListComponent } from './components/menu-list/menu-list.component';
import { ProfilemanagerComponent } from './components/profilemanager/profilemanager.component';
import { QualitiesListGridComponent } from './components/qualities-list-grid/qualities-list-grid.component';
import { QualitiesListHorizontalComponent } from './components/qualities-list-horizontal/qualities-list-horizontal.component';
import { QualitiesListVerticalComponent } from './components/qualities-list-vertical/qualities-list-vertical.component';
import { QualitiesComponent } from './components/qualities/qualities.component';
import { QualityComponent } from './components/quality/quality.component';
import { SearchCompositeComponent } from './components/search-composite/search-composite.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { TestinoComponent } from './components/testino/testino.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserItemComponent } from './components/user-item/user-item.component';
import { UsersComponent } from './components/users/users.component';
import { VirtuesPieComboComponent } from './components/virtues-pie-combo/virtues-pie-combo.component';
import { VirtuesPieComponent } from './components/virtues-pie/virtues-pie.component';
import { VirtuesComponent } from './components/virtues/virtues.component';
import { HoverDirective } from './customdirectives/hover.directive';
import { SetBackGroundDirective } from './customdirectives/setbackground.directive';
import { ErrorComponent } from './error/error.component';
import { PercentageQualityPipe } from './percentage-quality.pipe';
import { DelimitPipe } from './pipes/delimit.pipe';
import { DescriptionManagerPipe } from './pipes/description-manager.pipe';
import { LocationCompactDetailPipe } from './pipes/location-compact-detail.pipe';
import { LocationCompactPipe } from './pipes/location-compact.pipe';
import { NameStrenghtFinderPipe } from './pipes/name-strenght-finder.pipe';
import { VirtueColorFinderByStrenghtIdPipe } from './pipes/virtue-color-finder-by-strenght-id.pipe';
import { VirtueColorFinderPipe } from './pipes/virtue-color-finder.pipe';
import { VirtueFinderPipe } from './pipes/virtue-finder.pipe';
import { ReplacePipe } from './replace-pipe.pipe';
import { HeroState } from './states/todo.state';
import { TestOutlineComponent } from './test-outline/test-outline.component';

//import ChartDataLabels from 'chartjs-plugin-datalabels';

// TODO: register only in dedicated components
Chart.register(
  ArcElement,
  BarController,
  BarElement,
  CategoryScale,
  DoughnutController,
  LinearScale,
  LineController,
  LineElement,
  PieController,
  PointElement,
  PolarAreaController,
  RadarController,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

Chart.defaults.plugins.tooltip.enabled = false;

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    QualitiesComponent,
    LocationsComponent,
    ErrorComponent,
    QualityComponent,
    ContatInfoComponent,
    SetBackGroundDirective,
    HoverDirective,
    AppContainerComponent,
    MastersComponent,
    MasterDetailComponent,
    PercentageQualityPipe,
    UsersComponent,
    UserDetailComponent,
    ActivitiesComponent,
    ActivityDetailComponent,
    ExperiencesComponent,
    ExperienceDetailComponent,
    ProfilemanagerComponent,
    ExperienceItemComponent,
    UserItemComponent,
    MasterItemComponent,
    ActivityItemComponent,
    QualitiesListHorizontalComponent,
    ExperienceInsertComponent,
    ReplacePipe,
    MasterInsertComponent,
    ActivityInsertComponent,
    SearchCompositeComponent,
    MenuListComponent,
    VirtueFinderPipe,
    QualitiesListGridComponent,
    VirtueColorFinderPipe,
    ExperienceMasterUserPicComponent,
    LocationCompactPipe,
    LocationCompactDetailPipe,
    ExperiencePicComponent,
    QualitiesListVerticalComponent,
    VirtuesPieComponent,
    VirtuesComponent,
    TestinoComponent,
    SpinnerComponent,
    VirtuesPieComboComponent,
    DelimitPipe,
    HomeviewComponent,
    NameStrenghtFinderPipe,
    VirtueColorFinderByStrenghtIdPipe,
    DescriptionManagerPipe,
    HeaderComponent,
    FooterComponent,
    HeaderSimpleComponent,
    ActivityMasterInsertComponent,
    ExperienceInsertOverviewComponent,
    AggLocationsViewComponent,
    ActivitySearchComponent,
    ActivityMasterSearchComponent,
    TestOutlineComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([HeroState]),
    // RouterModule.forRoot(routes),
    AppRoutingModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatSlideToggleModule,
    MatCardModule,
    MatGridListModule,
    MatDividerModule,
    GoogleMapsModule,
    MatListModule,
    MatIconModule,
    FlexLayoutModule,
    MatMenuModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    TextFieldModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatInputModule,
    MatChipsModule,
    MatTabsModule,
    ChartjsModule,
    HttpClientModule,
    ImageCropperModule,
    MatSnackBarModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatTabsModule,
  ],
  providers: [
    //HeroGuardService,
    { provide: LocationStrategy, useClass: PathLocationStrategy },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
