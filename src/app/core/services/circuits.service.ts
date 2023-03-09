import { Injectable } from '@angular/core';
import { DocumentData } from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';
import { Circuit } from '../models';
import { FileUploaded, FirebaseService } from './firebase/firebase-service';

@Injectable({
  providedIn: 'root'
})
export class CircuitsService {

  private _CircuitSubject:BehaviorSubject<Circuit[]> = new BehaviorSubject([]);
  public Circuit$ = this._CircuitSubject.asObservable();
  
  unsubscr;
  constructor(
    private firebase:FirebaseService
  ) {
    this.unsubscr = this.firebase.subscribeToCollection('Circuits',this._CircuitSubject, this.mapCircuit);
  }

  ngOnDestroy(): void {
    this.unsubscr();
  }

  private mapCircuit(doc:DocumentData){
    return {
      id:0,
      docId:doc.id,
      localizacion:doc.data().localizacion,
      picture:doc.data().picture,
    };
  }

  getCircuits(){
    return this._CircuitSubject.value;

  }

  getCircuitById(id:string):Promise<Circuit>{
    return new Promise<Circuit>(async (resolve, reject)=>{
      try {
        var Circuit = (await this.firebase.getDocument('Circuits', id));
        resolve({
          id:0,
          docId:Circuit.id,
          localizacion:Circuit.data.localizacion,
          picture:Circuit.data.picture, 
        });  
      } catch (error) {
        reject(error);
      }
    });
  }

  async deleteCircuit(Circuit:Circuit){
    try {
      await this.firebase.deleteDocument('Circuits', Circuit.docId);  
    } catch (error) {
      console.log(error);
    }
  }

  async addCircuit(Circuit:Circuit){
    var _Circuit = {
      docId:Circuit.docId,
      nickname:Circuit.localizacion,
    };
    if(Circuit['pictureFile']){
      var response = await this.uploadImage(Circuit['pictureFile']);
      _Circuit['picture'] = response.image;
    }
    try {
      await this.firebase.createDocument('Circuits', _Circuit);  
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

  async updateCircuit(Circuit:Circuit){
    var _Circuit = {
      docId:Circuit.docId,
      first_name:Circuit.localizacion,
    };
    if(Circuit['pictureFile']){
      var response:FileUploaded = await this.uploadImage(Circuit['pictureFile']);
      _Circuit['picture'] = response.file;
    }
    try {
      await this.firebase.updateDocument('Circuits', Circuit.docId, _Circuit);  
    } catch (error) {
      console.log(error);
    }
      
  }
}
