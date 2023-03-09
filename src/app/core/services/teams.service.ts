import { Injectable } from '@angular/core';
import { DocumentData } from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';
import { Team } from 'src/app/core/models/teams.model';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';
import { FileUploaded, FirebaseService } from './firebase/firebase-service';
import { File } from '@awesome-cordova-plugins/file/ngx'
import { Platform } from '@ionic/angular';
import { blobToBase64, dataURLtoBlob } from '../utils/blobs';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  private _teamsSubject:BehaviorSubject<Team[]> = new BehaviorSubject([]);
  public teams$ = this._teamsSubject.asObservable();

  unsubscr;
  constructor(
    private api:ApiService,
    private platform:Platform,
    private firebase:FirebaseService,
    private file:File
  ) {
    this.unsubscr = this.firebase.subscribeToCollection('teams',this._teamsSubject, this.mapTeam);
  }

  ngOnDestroy(): void {
    this.unsubscr();
  }

  private mapTeam(doc:DocumentData){
    return {
      id:0,
      docId:doc.id,
      name:doc.data().name,
      description:doc.data().description,
      picture:doc.data().picture
    };
  }

  getteams(){
    return this._teamsSubject.value;
  }

  getteamById(id:string):Promise<Team>{
    return new Promise<Team>(async (resolve, reject)=>{
      try {
        var team = (await this.firebase.getDocument('teams', id));
        resolve({
          id:0,
          docId:team.id,
          name:team.data.name,
          description:team.data.description,
          picture:team.data.picture
        });  
      } catch (error) {
        reject(error);
      }
    });
  }

  async deleteTeam(team:Team){
    await this.firebase.deleteDocument('teams', team.docId);
  }

  async addteam(team:Team){
    var _Team = {
      id:0,
      docId:team.docId,
      name:team.name,
      description:team.description,
    };
    if(team['pictureFile']){
      var response = await this.uploadImage(team['pictureFile']);
      _Team['picture'] = response.image;
    }
    try {
      await this.firebase.createDocument('teams', _Team);  
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

  async updateteam(team:Team){
    var _Team = {
      id:0,
      docId:team.docId,
      name:team.name,
      description:team.description,
    };
    if(team['pictureFile']){
      var response:FileUploaded = await this.uploadImage(team['pictureFile']);
      _Team['picture'] = response.file;
    }
    try {
      await this.firebase.updateDocument('teams', _Team.docId, _Team);  
    } catch (error) {
      console.log(error);
    }
  }

  async writeToFile(){
    var dataToText = JSON.stringify(this._teamsSubject.value);
    var data = new Blob([dataToText], {type: 'text/plain'});
    this.firebase.fileUpload(data, 'text/plain', 'teams', '.txt');
  }
}
