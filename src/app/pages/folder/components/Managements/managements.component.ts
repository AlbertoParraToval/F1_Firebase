import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ManageDetailComponent, ManageService } from 'src/app/core';
import { Manage } from 'src/app/core/models/Manage.model';


@Component({
  selector: 'app-managements',
  templateUrl: './managements.component.html',
  styleUrls: ['./managements.component.scss'],
})
export class ManagementsComponent implements OnInit {

  constructor(
    private manageSvc:ManageService,
    private modal:ModalController,
    private alert:AlertController
  ) { }

  ngOnInit() {}

  getManages(){
    return this.manageSvc.Manages$;
  }

  async presentManageForm(manage:Manage){
    const modal = await this.modal.create({
      component:ManageDetailComponent,
      componentProps:{
        Manage:manage
      },
      cssClass:"modal-full-right-side"
    });
    modal.present();
    modal.onDidDismiss().then(result=>{
      if(result && result.data){
        switch(result.data.mode){
          case 'New':
            this.manageSvc.addManage(result.data.manage);
            break;
          case 'Edit':
            this.manageSvc.updateManage(result.data.manage);
            break;
          default:
        }
      }
    });
  }

  onEditManage(manage){
    this.presentManageForm(manage);
  }

  async onDeleteAlert(manage){
    const alert = await this.alert.create({
      header: '¿Está seguro de que desear borrar la asignación de tarea?',
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
            console.log(manage)
            this.manageSvc.deleteManageById(manage);
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  onDeleteManage(manage){
    this.onDeleteAlert(manage);
  }

}
