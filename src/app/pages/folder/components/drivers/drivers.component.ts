import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ManageService } from 'src/app/core/services/manage.service';
import { DriverDetailComponent} from 'src/app/core/components/driver-detail/driver-detail.component';
import { DriverService} from 'src/app/core/services/driver.service';
import { Driver } from 'src/app/core/models/drivers.model';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss'],
})
export class DriversComponent implements OnInit {
  constructor(
    private driversSvc:DriverService,
    private ManagesSvc:ManageService,
    private modal:ModalController,
    private alert:AlertController,
  ) { }

  ngOnInit() {

  }

  getDrivers(){
    return this.driversSvc.driver$;
  }

  async presentDriverForm(driverData:Driver){
    const modal = await this.modal.create({
      component:DriverDetailComponent,
      componentProps:{
        driver:driverData
      },
      cssClass:"modal-full-right-side"
    });
    modal.present();
    modal.onDidDismiss().then(result=>{
      if(result && result.data){
        switch(result.data.mode){
          case 'New':
            this.driversSvc.addDriver(result.data.driver);
            break;
          case 'Edit':
            this.driversSvc.updateDriver(result.data.driver);
            break;
          default:
        }
      }
    });
  }

  onEditDriver(driverData){
    this.presentDriverForm(driverData);
  }

  async onDeleteAlert(driverData){
    const alert = await this.alert.create({
      header:'Atención',
      message: '¿Está seguro de que desear borrar a la persona?',
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
            this.driversSvc.deleteDriver(driverData);
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  async onDriverExistsAlert(driverData){
    const alert = await this.alert.create({
      header: 'Error',
      message: 'No es posible borrar la persona porque está asignada a una tarea',
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

  async onDeleteDriver(driverData){
      if((await this.ManagesSvc.getManagesByDriverId(driverData.id)).length==0)
      this.onDeleteAlert(driverData);
    else
      this.onDriverExistsAlert(driverData);
  }
}
