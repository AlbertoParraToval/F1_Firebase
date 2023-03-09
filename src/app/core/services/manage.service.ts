import * as moment from 'moment-timezone';

import { Injectable } from '@angular/core';
import { Manage } from '../models/Manage.model';
import { BehaviorSubject, from, lastValueFrom, map, of, tap } from 'rxjs';

import { FirebaseService } from './firebase/firebase-service';
import { DocumentData } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ManageService {

  

  private _ManagesSubject:BehaviorSubject<Manage[]> = new BehaviorSubject([]);
  public Manages$ = this._ManagesSubject.asObservable();


  unsubscr;
  constructor(
    private firebase:FirebaseService
  ) {
    this.unsubscr = this.firebase.subscribeToCollection('driverManage',this._ManagesSubject, this.mapManage);
  }

  ngOnDestroy(): void {
    this.unsubscr();
  }

  private mapManage(doc:DocumentData){
    return {
      id:0,
      docId:doc.id,
      driverId:doc.data().driverId,
      teamId:doc.data().teamId,
    };
  }


  getManages(){
    
    return this._ManagesSubject.value;
  }

  getManageById(id:string){
    return new Promise<Manage>(async (resolve, reject)=>{
      try {
        var response = (await this.firebase.getDocument('driverManage', id));
        resolve({
          id:0,
          docId:response.id,
          driverId:response.data.personId,
          teamId:response.data.taskId,
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  getManagesBy(field, value){
    return new Promise<Manage[]>(async (resolve, reject)=>{
      try {
        var _Manage = (await this.firebase.getDocumentsBy('driverManage', field, value)).map<Manage>(doc=>{
          return {
            id:0,
            docId:doc.id,
            driverId:doc.data.driverId,
            teamId:doc.data.teamId,
          }
        });
        resolve(_Manage);  
      } catch (error) {
        reject(error);
      }
    });
  }

  getManagesByTeamId(teamId:string):Promise<Manage[]>{
    return this.getManagesBy('teamId', teamId);
  }

  
  getManagesByDriverId(driverId:string):Promise<Manage[]>{   
    return this.getManagesBy('driverId', driverId);
  }

  async deleteManageById(id:string){
    try {
      await this.firebase.deleteDocument('driverManage', id);
    } catch (error) {
      console.log(error);
    }
  }

  async addManage(Manage:Manage){
    try {
      await this.firebase.createDocument('driverManage', Manage);  
    } catch (error) {
      console.log(error);
    }
  }

  async updateManage(Manage:Manage){
    try {
      await this.firebase.updateDocument('driverManage', Manage.docId, Manage);
    } catch (error) {
      console.log(error);
    }
  }
}
