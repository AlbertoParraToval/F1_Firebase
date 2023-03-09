import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { PersonComponent, TeamComponent, TeamDetailComponent } from '.'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, Platform } from '@ionic/angular';
import { PersonDetailComponent,  AssignmentComponent, AssignmentDetailComponent } from '.';
import { PersonSelectableComponent } from './components/person-selectable/person-selectable.component';
import {  TeamSelectableComponent } from './components/team-selectable/team-selectable.component';
import { DateTimeSelectableComponent } from './components/date-time-selectable/date-time-selectable.component';
import { AssignmentScheduleComponent } from './components/assignment-schedule/assignment-schedule.component';
import es from '@angular/common/locales/es';
import en from '@angular/common/locales/en';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from './utils/translate';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';

registerLocaleData(en);
registerLocaleData(es);

@NgModule({
  declarations: [
    PersonComponent,
    PersonDetailComponent,
    TeamComponent,
    TeamDetailComponent,
    AssignmentComponent,
    AssignmentDetailComponent,
    PersonSelectableComponent,
    TeamSelectableComponent,
    DateTimeSelectableComponent,
    AssignmentScheduleComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot(),
    HttpClientModule,
    TranslateModule.forChild({
      loader: {
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [HttpClient]
      }
      }),
    IonicStorageModule.forRoot({
      name: '__f1Firebase',
          driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
    }),
    ReactiveFormsModule
  ],
  exports:[
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PersonComponent,
    PersonDetailComponent,
    TeamComponent,
    TeamDetailComponent,
    AssignmentComponent,
    AssignmentDetailComponent,
    PersonSelectableComponent,
    TeamSelectableComponent,
    DateTimeSelectableComponent,
    AssignmentScheduleComponent,
    HttpClientModule,

  ],
  providers:[
    {
      provide: LOCALE_ID,
      useValue: 'es'
    },
    Camera,
    File
  ]
})
export class CoreModule { }
