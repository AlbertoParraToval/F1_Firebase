import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { isLowResolution as lowres} from 'src/app/utils/screen.utils';
import { IonItemSliding } from '@ionic/angular';
import {  Team } from 'src/app/core/models/teams.model';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent implements OnInit {

  @Output() onEdit = new EventEmitter;
  @Output() onDelete = new EventEmitter;
  @Input() _team:Team;
  isLowResolution = lowres;
  constructor() { }

  ngOnInit() {}

  onEditClick(slide:IonItemSliding){
    slide.close();
    this.onEdit.emit(this._team);
  }

  onDeleteClick(slide:IonItemSliding){
    slide.close();
    this.onDelete.emit(this._team);
  }
}
