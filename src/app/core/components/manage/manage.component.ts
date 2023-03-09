import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Manage } from 'src/app/core/models/manage.model';
import { ManageService } from 'src/app/core/services/manage.service';
import { isLowResolution as lowres} from 'src/app/utils/screen.utils';
import { IonItemSliding } from '@ionic/angular';
import { DriverService, } from 'src/app/core/services/driver.service';
import { TeamsService } from 'src/app/core/services/teams.service';
import { Driver, } from 'src/app/core/models/drivers.model';
import { Team } from 'src/app/core/models/teams.model';
import { LocaleService } from '../../services/locale.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
})
export class ManageComponent implements OnInit {

  @Output() onEdit = new EventEmitter;
  @Output() onDelete = new EventEmitter;
  @Input('Manage') set Manage(a:Manage){
    this._manage = a;
    this.loadTaskAndPerson(a);
  
  }
  private async loadTaskAndPerson(a:Manage){
    this._task.next(await this.teamsSvc.getteamById(a.teamId));
    this._person.next(await this.driverSvc.getDriverById(a.driverId));
  }
  getManage():Manage{
    return this._manage;
  }

  isLowResolution = lowres;
  private _manage:Manage;

  private _task:BehaviorSubject<Team> = new BehaviorSubject<Team>(null);
  private _person:BehaviorSubject<Driver> = new BehaviorSubject<Driver>(null);
  team$:Observable<Team> = this._task.asObservable();
  driver$:Observable<Driver> = this._person.asObservable();
  constructor(
    private driverSvc:DriverService,
    private teamsSvc:TeamsService,
    public locale:LocaleService
  ){
    
  }

  ngOnInit(
  ) {

  }

  onEditClick(slide:IonItemSliding){
    slide.close();
    this.onEdit.emit(this.Manage);
  }

  onDeleteClick(slide:IonItemSliding){
    slide.close();
    this.onDelete.emit(this.Manage);
  }

  

}
