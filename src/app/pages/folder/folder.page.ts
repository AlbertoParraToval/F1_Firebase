import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { UserService } from 'src/app/core/services/user.service';
import { environment } from 'src/environments/environment';

import { ManageDetailComponent } from '../../core/components/manage-detail/manage-detail.component';
import { DriverDetailComponent } from '../../core/components/driver-detail/driver-detail.component';
import { TeamDetailComponent } from '../../core/components/team-detail/team-detail.component';
import {  ManageService } from '../../core/services/manage.service';
import { DriverService } from '../../core/services/driver.service';
import { TeamsService } from '../../core/services/teams.service';
import { CircuitDetailComponent } from 'src/app/core';
import { CircuitsService } from 'src/app/core/services/circuits.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;

  

  constructor(
    public user:UserService,
    private driversSvc:DriverService,
    private teamsSvc:TeamsService,
    private manageSvc:ManageService,
    private modal:ModalController,
    private activatedRoute: ActivatedRoute,
    private circuitSvc: CircuitsService,
    private router:Router) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }

  async presentForm(_class, onDismiss:(any)=>void){
    const modal = await this.modal.create({
      component:_class,
      cssClass:"modal-full-right-side"
    });
    modal.present();
    modal.onDidDismiss().then(result=>{
      if(result && result.data){
        onDismiss(result.data);
      }
    });
  }

  onNewItem(){
    switch(this.folder){
      
      case 'Home':
        break;
      case 'Drivers':
        this.presentForm(DriverDetailComponent, (data)=>{
          this.driversSvc.addDriver(data.driver);
        });
        break;
      case 'Teams':
        
        this.presentForm(TeamDetailComponent, (data)=>{
          this.teamsSvc.addteam(data.team);
        });
        break;
      case 'Managements':
        
        this.presentForm(ManageDetailComponent, (data)=>{
          this.manageSvc.addManage(data.manage);
        });
        break;
      case 'Circuits':
        this.presentForm(CircuitDetailComponent, (data)=>{
          this.circuitSvc.addCircuit(data.manage);
        });
        break;
      default:
    }
  }
  
}
