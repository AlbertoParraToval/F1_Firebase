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
    return this.CircuitsSvc.circuit$;
  }

  async presentCircuitForm(circuitdata:Circuit){
    const modal = await this.modal.create({
      component:CircuitDetailComponent,
      componentProps:{
        circuit:circuitdata
      },
    });
    modal.present();
    modal.onDidDismiss().then(result=>{
      if(result && result.data){
        switch(result.data.mode){
          case 'New':
            this.CircuitsSvc.addCircuit(result.data.circuit);
            break;
          case 'Edit':
            this.CircuitsSvc.updateCircuit(result.data.circuit);
            break;
          default:
        }
      }
    });
  }

  onEditCircuit(circuitdata){
    this.presentCircuitForm(circuitdata);
  }

  async onDeleteAlert(circuitdata){
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
            this.CircuitsSvc.deleteCircuit(circuitdata);
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }



  async onDeleteCircuit(circuitdata){
      this.onDeleteAlert(circuitdata);
  }

}
