import { Injectable } from '@angular/core';
import { Circuit } from '../models';

@Injectable({
  providedIn: 'root'
})

export class CircuitsService {
  public circuits: Circuit[] = [
    {
      id:2,
      name:"	Hockenheimring",
      localizacion:"Alemania",
      picture:"https://drive.google.com/uc?export=view&id=1K6a3Kc2oAfA490FkldUkNeoj6c8wKbVI"
    },
    {
      id:3,
      name:"Hungaroring",
      localizacion:"Hungría",
      picture:"https://drive.google.com/uc?export=view&id=1RplKz0lGDIMkdElkC4DEaT3aaABLrnKv"
      
    },
    {
      id:4,
      name:"Silverstone",
      localizacion:"Gran Bretaña",
      picture:"https://drive.google.com/uc?export=view&id=17oT0sSF35ZdbtQPveQ3yNc0rJhV_IvK2"
    },
    {
      id:5,
      name:"Circuit de Catalunya",
      localizacion:"España",
      picture:"https://drive.google.com/uc?export=view&id=1ttPfLG7WlEkDs3hh0pL0EEw_kY4fR7fD"
    },
    {
      id:6,
      name:"Redbull Ring",
      localizacion:"Austria",
      picture:"https://drive.google.com/uc?export=view&id=1vZ98wTMKd0q9zrG2bjGqzO5qacp3_0ey"
    },
    {
      id:7,
      name:"Interlagos",
      localizacion:"Brasil",
      picture:"https://drive.google.com/uc?export=view&id=1owKYalfxfDUXfzPs0euvH--fxsZCpJi0"
    },
    {
      id:8,
      name:"Hermanos Rodríguez",
      localizacion:"Mexico",
      picture:"https://drive.google.com/uc?export=view&id=1PLsLnL8ZI6frtHgyeemeeDWDEEtieuGI"
    },
    {
      id:9,
      name:"	Monza",
      localizacion:"Italia",
      picture:"https://drive.google.com/uc?export=view&id=1WyRK8VAjnQfK5XprZ9Q9_C8AbH796RhC"
    },
    {
      id:10,
      name:"Zandvoort",
      localizacion:"Holanda",
      picture:"https://drive.google.com/uc?export=view&id=12UNisViiKhvtB6KwhXyenR56aomybdLM"
    },
    {
      id:11,
      name:"	Bakú",
      localizacion:"Azerbaián",
      picture:"https://drive.google.com/uc?export=view&id=1Nen11E-KfbRMVLyB5W2Ny8s0qxThj2Zp"
    },
    {
      id:12,
      name:"Spa-Francorchamps",
      localizacion:"Belgica",
      picture:"https://drive.google.com/uc?export=view&id=1YrgSyvavgPlN-4we7WO1YFJRTHI4A6rn"
    },

  ]
  constructor() { }
  id:number = this.circuits.length + 1 ;

  public getCircuit(): Circuit[] {
    return this.circuits;
  }

  public getCircuitById(id: number): Circuit{
    return this.circuits[id];
  }

  public getCircuitImg(id: number): Circuit{
    return this.circuits[id];
  }

  deleteCircuitById(id: number){
    this.circuits = this.circuits.filter(p=>p.id != id); 
  }

    addCircuit(circuitdata:Circuit){
    circuitdata.id = this.id++
    this.circuits.push(circuitdata);
  }

  updateCircuit(circuitUpdate:Circuit){
    var circuitdata = this.circuits.find(p=>p.id==circuitUpdate.id);
    if(circuitdata){
      circuitdata.name = circuitUpdate.name;
      circuitdata.localizacion = circuitUpdate.localizacion;
      circuitdata.picture = circuitUpdate.picture;
    }
  }
}
