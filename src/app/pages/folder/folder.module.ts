import { NgModule } from '@angular/core';
import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';
import { HomeComponent } from './components/home/home.component';
import { TeamsComponent } from './components/teams/teams.component';
import { DriversComponent } from './components/drivers/drivers.component';
import { ManagementsComponent } from './components/Managements/managements.component';
import { CoreModule } from '../../core/core.module';

import { FullCalendarModule } from '@fullcalendar/angular';

import scrollgridPlugin from '@fullcalendar/scrollgrid';
import daygridPlugin from '@fullcalendar/daygrid';
import timegridPlugin from '@fullcalendar/timegrid';

import interactionPlugin from '@fullcalendar/interaction';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from '../../core/utils/translate';
import { AboutmeComponent } from './components/aboutme/aboutme.component';
FullCalendarModule.registerPlugins([
  scrollgridPlugin,
  daygridPlugin,
  timegridPlugin,
  interactionPlugin
]);

@NgModule({
  imports: [
    CoreModule,
    TranslateModule.forChild({
      loader: {
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [HttpClient]
      }
      }),
    FolderPageRoutingModule,
    FullCalendarModule
  ],
  declarations: [
    FolderPage, 
    HomeComponent, 
    ManagementsComponent,
    TeamsComponent, 
    DriversComponent,
    AboutmeComponent
    ]
})
export class FolderPageModule {}
