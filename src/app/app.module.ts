import { TextFieldModule } from '@angular/cdk/text-field';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <-- NgModel lives here
import { GoogleMapsModule } from '@angular/google-maps';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';
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
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { ImageCropperModule } from 'node_modules/ngx-image-cropper';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { AppContainerComponent } from './components/app-container/app-container.component';
import { ActivitiesAccordionListComponent } from './components/entities/activity/activities-accordion-list/activities-accordion-list.component';
import { ActivitiesComponent } from './components/entities/activity/activities/activities.component';
import { ActivityDetailComponent } from './components/entities/activity/activity-detail/activity-detail.component';
import { ActivityInsertComponent } from './components/entities/activity/activity-insert/activity-insert.component';
import { ActivityItemComponent } from './components/entities/activity/activity-item/activity-item.component';
import { ActivityMasterInsertComponent } from './components/entities/activity/activity-master-insert/activity-master-insert.component';
import { ActivityMasterSearchComponent } from './components/entities/activity/activity-master-search/activity-master-search.component';
import { ActivitySearchComponent } from './components/entities/activity/activity-search/activity-search.component';
import { ExperienceArticleComponent } from './components/entities/experience/experience-article/experience-article.component';
import { ExperienceDetailComponent } from './components/entities/experience/experience-detail/experience-detail.component';
import { ExperienceInsertOverviewComponent } from './components/entities/experience/experience-insert-overview/experience-insert-overview.component';
import { ExperienceInsertComponent } from './components/entities/experience/experience-insert/experience-insert.component';
import { ExperienceItemComponent } from './components/entities/experience/experience-item/experience-item.component';
import { ExperienceMasterUserPicComponent } from './components/entities/experience/experience-master-user-pic/experience-master-user-pic.component';
import { ExperiencePicComponent } from './components/entities/experience/experience-pic/experience-pic.component';
import { ExperiencesByQualityComponent } from './components/entities/experience/experiences-by-quality/experiences-by-quality.component';
import { ExperiencesComponent } from './components/entities/experience/experiences/experiences.component';
import { AggLocationsViewComponent } from './components/entities/locations/agg-locations-view/agg-locations-view.component';
import { LocationMasterItemComponent } from './components/entities/locations/location-master-item/location-master-item.component';
import { MultipleLocationsMapComponent } from './components/entities/maps/multiple-locations-map/multiple-locations-map.component';
import { HorizontalViewerComponent } from './components/entities/master/horizontal-viewer/horizontal-viewer.component';
import { MasterDetailComponent } from './components/entities/master/master-detail/master-detail.component';
import { MasterInsertComponent } from './components/entities/master/master-insert/master-insert.component';
import { MasterItemComponent } from './components/entities/master/master-item/master-item.component';
import { MastersComponent } from './components/entities/master/masters/masters.component';
import { QualitiesAccordionDeckComponent } from './components/entities/quality/qualities-accordion-deck/qualities-accordion-deck.component';
import { QualitiesAccordionListComponent } from './components/entities/quality/qualities-accordion-list/qualities-accordion-list.component';
import { QualitiesListGridComponent } from './components/entities/quality/qualities-list-grid/qualities-list-grid.component';
import { QualitiesListHorizontalComponent } from './components/entities/quality/qualities-list-horizontal/qualities-list-horizontal.component';
import { QualitiesListVerticalBigComponent } from './components/entities/quality/qualities-list-vertical-big/qualities-list-vertical-big.component';
import { QualitiesListVerticalComponent } from './components/entities/quality/qualities-list-vertical/qualities-list-vertical.component';
import { QualitiesListXpComponent } from './components/entities/quality/qualities-list-xp/qualities-list-xp.component';
import { QualitiesComponent } from './components/entities/quality/qualities/qualities.component';
import { QualityComponent } from './components/entities/quality/quality/quality.component';
import { UserDetailComponent } from './components/entities/user/user-detail/user-detail.component';
import { UserItemComponent } from './components/entities/user/user-item/user-item.component';
import { UsersComponent } from './components/entities/user/users/users.component';
import { VirtuesPieComboComponent } from './components/entities/virtue/virtues-pie-combo/virtues-pie-combo.component';
import { VirtuesPieComponent } from './components/entities/virtue/virtues-pie/virtues-pie.component';
import { VirtuesComponent } from './components/entities/virtue/virtues/virtues.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderSimpleComponent } from './components/header-simple/header-simple.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeSearchComponent } from './components/home-search/home-search.component';
import { HomeviewComponent } from './components/homeview/homeview.component';
import { ImageCropperUtilComponent } from './components/image-cropper-util/image-cropper-util.component';
import { LocationsComponent } from './components/locations/locations.component';
import { LoginComponentComponent } from './components/login-component/login-component.component';
import { MenuListComponent } from './components/menu-list/menu-list.component';
import { MongoArticleDetailComponent } from './components/mongo/mongo-article-detail/mongo-article-detail.component';
import { MongoTestComponent } from './components/mongo/mongo-test/mongo-test.component';
import { ChatInterfaceComponent } from './components/openai/chat-interface/chat-interface.component';
import { TableGenComponent } from './components/openai/table-gen/table-gen.component';
import { ProfilemanagerComponent } from './components/profilemanager/profilemanager.component';
import { SearchCompositeComponent } from './components/search-composite/search-composite.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { TestinoComponent } from './components/testino/testino.component';
import { HoverDirective } from './customdirectives/hover.directive';
import { SetBackGroundDirective } from './customdirectives/setbackground.directive';
import { ErrorComponent } from './error/error.component';
import { PercentageQualityPipe } from './percentage-quality.pipe';
import { DelimitPipe } from './pipes/delimit.pipe';
import { DescriptionManagerPipe } from './pipes/description-manager.pipe';
import { FilterByVirtuePipe } from './pipes/filter-by-virtue-pipe.pipe';
import { FindQualityFromSearchPipe } from './pipes/find-quality-from-search.pipe';
import { LocationCompactDetailPipe } from './pipes/location-compact-detail.pipe';
import { LocationCompactPipe } from './pipes/location-compact.pipe';
import { NameStrenghtFinderPipe } from './pipes/name-strenght-finder.pipe';
import { ParseLocationPipe } from './pipes/parse-location.pipe';
import { StrenghtCardByXpsPipe } from './pipes/strenght-card-by-xps.pipe';
import { VirtueColorFinderByStrenghtIdPipe } from './pipes/virtue-color-finder-by-strenght-id.pipe';
import { VirtueColorFinderPipe } from './pipes/virtue-color-finder.pipe';
import { VirtueFinderPipe } from './pipes/virtue-finder.pipe';
import { ReplacePipe } from './replace-pipe.pipe';
import { HeroState } from './states/todo.state';
import { TestOutlineComponent } from './test-outline/test-outline.component';
import { QualitiesHorizontalCompactComponent } from './components/entities/quality/qualities-horizontal-compact/qualities-horizontal-compact.component';
import { FreeQualitiesComponent } from './components/entities/quality/free-qualities/free-qualities.component';
import { FreeQualitiesProspectComponent } from './components/entities/quality/free-qualities-prospect/free-qualities-prospect.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';

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
    QualitiesListVerticalBigComponent,
    LocationMasterItemComponent,
    ImageCropperUtilComponent,
    ParseLocationPipe,
    ExperienceArticleComponent,
    MongoTestComponent,
    MongoArticleDetailComponent,
    ChatInterfaceComponent,
    TableGenComponent,
    ExperiencesByQualityComponent,
    HomeSearchComponent,
    HorizontalViewerComponent,
    FilterByVirtuePipe,
    QualitiesAccordionListComponent,
    MultipleLocationsMapComponent,
    StrenghtCardByXpsPipe,
    QualitiesListXpComponent,
    FindQualityFromSearchPipe,
    ActivitiesAccordionListComponent,
    LoginComponentComponent,
    QualitiesAccordionDeckComponent,
    QualitiesHorizontalCompactComponent,
    FreeQualitiesComponent,
    FreeQualitiesProspectComponent,
    StarRatingComponent,
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
    MatSidenavModule,
    MatExpansionModule,
    MatTableModule,
    MatProgressBarModule,
  ],
  providers: [
    //HeroGuardService,
    { provide: LocationStrategy, useClass: PathLocationStrategy },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
