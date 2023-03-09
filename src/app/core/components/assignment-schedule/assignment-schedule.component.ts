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

@Component({
  selector: 'app-assignment-schedule',
  templateUrl: './assignment-schedule.component.html',
  styleUrls: ['./assignment-schedule.component.scss'],
})
export class AssignmentScheduleComponent implements OnInit {

  @Input() assignment:Assignment;
  isLowResolution = lowres;
  constructor(
    private peopleSvc:PeopleService,
    private tasksSvc:TeamsService,
    private assignmentsSvc:AssignmentsService,
    public locale:LocaleService
  ){

  }

  ngOnInit(
  ) {

  }

  getTask():Promise<Team>{
      return this.tasksSvc.getteamById(this.assignment.taskId);
  }

  getPerson():Promise<Person>{
      return this.peopleSvc.getPersonById(this.assignment.personId);
  }
}
