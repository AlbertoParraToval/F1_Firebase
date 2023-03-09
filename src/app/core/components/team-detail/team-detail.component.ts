import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { Team} from 'src/app/core/models/teams.model';
import { PhotoItem, PhotoService } from '../../services/photo.service';
import { PlatformService } from '../../services/platform.service';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss'],
})
export class TeamDetailComponent implements OnInit {

  form:FormGroup;
  mode:"New" | "Edit" = "New";
  currentImage = new BehaviorSubject<string>("");
  currentImage$ = this.currentImage.asObservable();
  @Input('teamdata') set team(team:Team){
    if(team){
      this.form.controls.id.setValue(team.id);
      this.form.controls.docId.setValue(team.docId);
      this.form.controls.name.setValue(team.name);
      this.form.controls.picture.setValue(team.picture);
      this.form.controls.description.setValue(team.description);
      this.form.controls.picture.setValue(team.picture);
      if(team.picture)
        this.currentImage.next(team.picture);
      this.mode = "Edit";
    }
  }
  

  constructor(
    public platform:PlatformService,
    private photoSvc:PhotoService,
    private cdr:ChangeDetectorRef,
    private fb:FormBuilder,
    private modal:ModalController
  ) { 
    this.form = this.fb.group({
      id:[null],
      docId:[''],
      name:['', [Validators.required]],
      picture:[''],
      description:['', [Validators.required]],
      pictureFile:[null]
    });
  }

  ngOnInit() {

  }

  onSubmit(){
    
    this.modal.dismiss({team: this.form.value, mode:this.mode}, 'ok');
  }

  onDismiss(result){
    this.modal.dismiss(null, 'cancel');
  }

  async changePic(fileLoader:HTMLInputElement, mode:'library' | 'camera' | 'file'){
    var item:PhotoItem = await this.photoSvc.getPicture(mode, fileLoader);
    this.currentImage.next(item.base64);
    this.cdr.detectChanges();
    this.form.controls.pictureFile.setValue(item.blob);
  }
}

