import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ManageService } from 'src/app/core/services/manage.service';
import {  TeamDetailComponent } from '../../../../core/components/team-detail/team-detail.component';
import {  TeamsService } from 'src/app/core/services/teams.service';
import { Team} from 'src/app/core/models/teams.model';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
})
export class TeamsComponent implements OnInit {

  constructor(
    private alert:AlertController,
    private modal:ModalController,
    private TeamsSvc:TeamsService,
    private manageSvc:ManageService
  ) { }

  ngOnInit() {}
  getTeams(){
    return this.TeamsSvc.teams$;
  }

  async presentTeamForm(teamdata:Team){
    const modal = await this.modal.create({
      component:TeamDetailComponent,
      componentProps:{
        team:teamdata
      },
      cssClass:"modal-full-right-side"
    });
    modal.present();
    modal.onDidDismiss().then(result=>{
      if(result && result.data){
        switch(result.data.mode){
          case 'New':
            this.TeamsSvc.addteam(result.data.team);
            break;
          case 'Edit':
            this.TeamsSvc.updateteam(result.data.team);
            break;
          default:
        }
      }
    });
  }

  onEditTeam(team){
    this.presentTeamForm(team);
  }

  async onDeleteAlert(Team){

    const alert = await this.alert.create({
      header: 'Atención',
      message: '¿Está seguro de que desear borrar la tarea?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log("Operacion cancelada");
          },
        },
        {
          text: 'Borrar',
          role: 'confirm',
          handler: () => {
            this.TeamsSvc.deleteTeam(Team);
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  async onTeamExistsAlert(Team){
    const alert = await this.alert.create({
      header: 'Error',
      message: 'No es posible borrar la tarea porque está asignada a una persona',
      buttons: [
        {
          text: 'Cerrar',
          role: 'close',
          handler: () => {
          
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }
  
  async onDeleteTeam(Team){
    
    if((await this.manageSvc.getManagesByTeamId(Team.docId)).length==0)
      this.onDeleteAlert(Team);
    else
      this.onTeamExistsAlert(Team);
  }

  async onExport(){
    this.TeamsSvc.writeToFile();
  }

}
