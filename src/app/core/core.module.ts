import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { CircuitComponent, CircuitDetailComponent, DriverComponent,  ManageComponent,  ManageDetailComponent, TeamComponent, TeamDetailComponent } from '.'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, Platform } from '@ionic/angular';
import { DriverDetailComponent, } from '.';
import { DriverSelectableComponent } from './components/driver-selectable/driver-selectable.component';
import {  TeamSelectableComponent } from './components/team-selectable/team-selectable.component';
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
    DriverComponent,
    DriverDetailComponent,
    TeamComponent,
    TeamDetailComponent,
    DriverSelectableComponent,
    TeamSelectableComponent,
    ManageComponent,
    ManageDetailComponent,
    CircuitComponent,
    CircuitDetailComponent,

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
    DriverComponent,
    DriverDetailComponent,
    TeamComponent,
    TeamDetailComponent,
    DriverSelectableComponent,
    TeamSelectableComponent,
    HttpClientModule,
    ManageComponent,
    ManageDetailComponent,
    CircuitComponent,
    CircuitDetailComponent,


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
