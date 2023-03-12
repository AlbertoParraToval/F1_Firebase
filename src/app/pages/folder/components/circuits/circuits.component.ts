import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { Circuit, CircuitDetailComponent, ManageService } from 'src/app/core';
import { CircuitsService } from 'src/app/core/services/circuits.service';

@Component({
  selector: 'app-circuits',
  templateUrl: './circuits.component.html',
  styleUrls: ['./circuits.component.scss'],
})
export class CircuitsComponent implements OnInit {

  circuitdata:Circuit;
  form:FormGroup;
  constructor(

    private circuitSvc: CircuitsService,
    private modal: ModalController,
    private alert: AlertController
  ) {}

  ngOnInit() {}

  getCircuits(): Circuit[] {
    return this.circuitSvc.getCircuit();
  }
  
  async presentCircuitForm(circuitdata: Circuit) {
    const modal = await this.modal.create({
      component: CircuitDetailComponent,
      componentProps: {
        circuitdata:circuitdata
      },
    });
    modal.present();
    modal.onDidDismiss().then((resultCircuit) => {
      if (resultCircuit && resultCircuit.data) {
        switch (resultCircuit.data.mode) {
          case 'New':
            this.circuitSvc.addCircuit(resultCircuit.data.circuitdata);
            break;
          case 'Edit':
            this.circuitSvc.updateCircuit(resultCircuit.data.circuitdata);
            break;
          default:
        }
      }
    });
  }

  onNewCircuit() {
    this.presentCircuitForm(null!);
  }

  onEditCircuit(circuitdata:Circuit) {
    this.presentCircuitForm(circuitdata);
  }

  async onDeleteAlert(circuitdata: Circuit) {
    const alert = await this.alert.create({
      header: '¿Seguro, no podrás volver atrás?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Operacion cancelada');
          },
        },
        {
          text: 'Borrar',
          role: 'confirm',
          handler: () => {
            this.circuitSvc.deleteCircuitById(circuitdata.id);
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  onDeleteCircuit(circuitdata:Circuit) {
    this.onDeleteAlert(circuitdata);
  }
}