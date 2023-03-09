import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Assignment } from 'src/app/core/models/assignment.model';
import { AssignmentsService } from 'src/app/core/services/assignments.service';
import { isLowResolution as lowres} from 'src/app/utils/screen.utils';
import { IonItemSliding } from '@ionic/angular';
import { PeopleService } from 'src/app/core/services/people.service';
import { TeamsService } from 'src/app/core/services/teams.service';
import { Person } from 'src/app/core/models/person.model';
import { Team } from 'src/app/core/models/teams.model';
import { LocaleService } from '../../services/locale.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.scss'],
})
export class AssignmentComponent implements OnInit {

  @Output() onEdit = new EventEmitter;
  @Output() onDelete = new EventEmitter;
  @Input('assignment') set assignment(a:Assignment){
    this._assignment = a;
    this.loadTaskAndPerson(a);
  
  }
  private async loadTaskAndPerson(a:Assignment){
    this._task.next(await this.teamsSvc.getteamById(a.taskId));
    this._person.next(await this.peopleSvc.getPersonById(a.personId));
  }
  get assignment():Assignment{
    return this._assignment;
  }

  isLowResolution = lowres;
  private _assignment:Assignment;

  private _task:BehaviorSubject<Team> = new BehaviorSubject<Team>(null);
  private _person:BehaviorSubject<Person> = new BehaviorSubject<Person>(null);
  task$:Observable<Team> = this._task.asObservable();
  person$:Observable<Person> = this._person.asObservable();
  constructor(
    private peopleSvc:PeopleService,
    private teamsSvc:TeamsService,
    public locale:LocaleService
  ){
    
  }

  ngOnInit(
  ) {

  }

  onEditClick(slide:IonItemSliding){
    slide.close();
    this.onEdit.emit(this.assignment);
  }

  onDeleteClick(slide:IonItemSliding){
    slide.close();
    this.onDelete.emit(this.assignment);
  }

  

}
