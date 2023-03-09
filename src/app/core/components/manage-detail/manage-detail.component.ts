import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ManageService } from 'src/app/core/services/manage.service';
import {  TeamsService } from 'src/app/core/services/teams.service';
import { DriverService } from 'src/app/core/services/driver.service';
import { Driver, Manage} from '../../models';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-manage-detail',
  templateUrl: './manage-detail.component.html',
  styleUrls: ['./manage-detail.component.scss'],
})
export class ManageDetailComponent implements OnInit {

  form:FormGroup;
  mode:"New" | "Edit" = "New";

  @Input('manage') set manage(manage:Manage){
    if(manage){
      this.form.controls.id.setValue(manage.id);
      this.form.controls.driverId.setValue(manage.teamId);
      this.form.controls.driverId.setValue(manage.driverId);
      this.mode = "Edit";
    }
  }
  

  
  constructor(
    private teamSvc:TeamsService,
    private driverSvc:DriverService,
    private managesSvc:ManageService,
    private fb:FormBuilder,
    private modal:ModalController,
    private translate:TranslateService
  ) { 
    this.form = this.fb.group({
      id:[0],
      teamId:[-1, [Validators.min(1)]],
      driverId:[-1, [Validators.min(1)]],
    });
  }

  async ngOnInit() {

  }

  onSubmit(){
    
    this.modal.dismiss({manage: this.form.value, mode:this.mode}, 'ok');
  }

  onDismiss(result){
    this.modal.dismiss(null, 'cancel');
  }


}
