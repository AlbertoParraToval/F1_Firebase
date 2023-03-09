import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Circuit, CircuitDetailComponent, ManageService } from 'src/app/core';
import { CircuitsService } from 'src/app/core/services/circuits.service';

@Component({
  selector: 'app-circuits',
  templateUrl: './circuits.component.html',
  styleUrls: ['./circuits.component.scss'],
})
export class CircuitsComponent implements OnInit {

  constructor(
    private CircuitsSvc:CircuitsService,
    private ManagesSvc:ManageService,
    private modal:ModalController,
    private alert:AlertController,
  ) { }

  ngOnInit() {

  }

  getCircuits(){
    return this.CircuitsSvc.Circuit$;
  }

  async presentCircuitForm(CircuitData:Circuit){
    const modal = await this.modal.create({
      component:CircuitDetailComponent,
      componentProps:{
        Circuit:CircuitData
      },
    });
    modal.present();
    modal.onDidDismiss().then(result=>{
      if(result && result.data){
        switch(result.data.mode){
          case 'New':
            this.CircuitsSvc.addCircuit(result.data.Circuit);
            break;
          case 'Edit':
            this.CircuitsSvc.updateCircuit(result.data.Circuit);
            break;
          default:
        }
      }
    });
  }

  onEditCircuit(CircuitData){
    this.presentCircuitForm(CircuitData);
  }

  async onDeleteAlert(CircuitData){
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
            this.CircuitsSvc.deleteCircuit(CircuitData);
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  async onCircuitExistsAlert(CircuitData){
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

  async onDeleteCircuit(CircuitData){
      this.onCircuitExistsAlert(CircuitData);
  }

}
