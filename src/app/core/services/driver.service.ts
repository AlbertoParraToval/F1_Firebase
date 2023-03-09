import { Injectable, OnDestroy } from '@angular/core';
import { DocumentData } from 'firebase/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { Driver } from '../models/drivers.model';
import { FileUploaded, FirebaseService } from './firebase/firebase-service';

@Injectable({
  providedIn: 'root'
})
export class DriverService{

  private _driverSubject:BehaviorSubject<Driver[]> = new BehaviorSubject([]);
  public driver$ = this._driverSubject.asObservable();
  
  unsubscr;
  constructor(
    private firebase:FirebaseService
  ) {
    this.unsubscr = this.firebase.subscribeToCollection('drivers',this._driverSubject, this.mapDriver);
  }

  ngOnDestroy(): void {
    this.unsubscr();
  }

  private mapDriver(doc:DocumentData){
    return {
      id:0,
      docId:doc.id,
      first_name:doc.data().first_name,
      last_name:doc.data().last_name,
      nickname:doc.data().nickname,
      picture:doc.data().picture,
    };
  }

  getDrivers(){
    return this._driverSubject.value;

  }

  getDriverById(id:string):Promise<Driver>{
    return new Promise<Driver>(async (resolve, reject)=>{
      try {
        var driver = (await this.firebase.getDocument('drivers', id));
        resolve({
          id:0,
          docId:driver.id,
          first_name:driver.data.first_name,
          last_name:driver.data.last_name,
          nickname:driver.data.nickname,
          picture:driver.data.picture, 
        });  
      } catch (error) {
        reject(error);
      }
    });
  }

  async deleteDriver(driver:Driver){
    try {
      await this.firebase.deleteDocument('drivers', driver.docId);  
    } catch (error) {
      console.log(error);
    }
  }

  async addDriver(driver:Driver){
    var _driver = {
      docId:driver.docId,
      first_name:driver.first_name,
      last_name:driver.last_name,
      nickname:driver.nickname,
    };
    if(driver['pictureFile']){
      var response = await this.uploadImage(driver['pictureFile']);
      _driver['picture'] = response.image;
    }
    try {
      await this.firebase.createDocument('drivers', _driver);  
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

  async updateDriver(driver:Driver){
    var _driver = {
      docId:driver.docId,
      first_name:driver.first_name,
      last_name:driver.last_name,
      nickname:driver.nickname,
    };
    if(driver['pictureFile']){
      var response:FileUploaded = await this.uploadImage(driver['pictureFile']);
      _driver['picture'] = response.file;
    }
    try {
      await this.firebase.updateDocument('drivers', driver.docId, _driver);  
    } catch (error) {
      console.log(error);
    }
      
  }
}
