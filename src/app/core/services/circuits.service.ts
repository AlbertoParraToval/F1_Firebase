import { Injectable } from '@angular/core';
import { DocumentData } from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';
import { Team } from 'src/app/core/models/teams.model';
import { environment } from 'src/environments/environment';
import { HttpClientProvider } from './http-client.provider';

import { FileUploaded, FirebaseService } from './firebase/firebase-service';
import { File } from '@awesome-cordova-plugins/file/ngx'
import { Platform } from '@ionic/angular';
import { blobToBase64, dataURLtoBlob } from '../utils/blobs';
import { Circuit } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CircuitsService {

  private _circuitSubject:BehaviorSubject<Circuit[]> = new BehaviorSubject([]);
  public circuit$ = this._circuitSubject.asObservable();

  unsubscr;
  constructor(
    private platform:Platform,
    private firebase:FirebaseService,
    private file:File
  ) {
    this.unsubscr = this.firebase.subscribeToCollection('circuits',this._circuitSubject, this.mapCircuit);
  }

  ngOnDestroy(): void {
    this.unsubscr();
  }

  private mapCircuit(doc:DocumentData){
    return {
      id:0,
      docId:doc.id,
      name:doc.data().name,
      description:doc.data().description,
      picture:doc.data().picture,
    };
  }

  getCircuits(){
    return this._circuitSubject.value;
  }

  getCircuitById(id:string):Promise<Circuit>{
    return new Promise<Circuit>(async (resolve, reject)=>{
      try {
        var circuit = (await this.firebase.getDocument('circuits', id));
        resolve({
          id:0,
          docId:circuit.id,
          name:circuit.data.name,
          localizacion:circuit.data.localizacion,
          picture:circuit.data.picture,
        });  
      } catch (error) {
        reject(error);
      }
    });
  }

  async deleteCircuit(circuit:Circuit){
    await this.firebase.deleteDocument('circuits', circuit.docId);
  } catch (error) {
    console.log(error);
  }

  async addCircuit(circuit:Circuit){
    var _circuit= {
      id:0,
      docId:circuit.docId,
      name:circuit.name,
      localizacion:circuit.localizacion,
    };
    if(circuit['pictureFile']){
      var response = await this.uploadImage(circuit['pictureFile']);
      _circuit['picture'] = response.image;
    }
    try {
      await this.firebase.createDocument('circuits', _circuit);  
    } catch (error) {
      console.log(error);
    }
  }

  uploadImage(file):Promise<any>{  
    return new Promise(async (resolve, reject)=>{
      try {
        const data = await this.firebase.imageUpload(file);  
        resolve(data);
      } catch (error) {
        resolve(error);
      }
    });
  }

  async updateCircuit(circuit:Circuit){
    var _circuit = {
      id:0,
      docId:circuit.docId,
      name:circuit.name,
      localizacion:circuit.localizacion,
    };
    if(circuit['pictureFile']){
      var response:FileUploaded = await this.uploadImage(circuit['pictureFile']);
      _circuit['picture'] = response.file;
    }
    try {
      await this.firebase.updateDocument('circuits', circuit.docId, _circuit);  
    } catch (error) {
      console.log(error);
    }
  }

  async writeToFile(){
    var dataToText = JSON.stringify(this._circuitSubject.value);
    var data = new Blob([dataToText], {type: 'text/plain'});
    this.firebase.fileUpload(data, 'text/plain', 'circuits', '.txt');
  }
}