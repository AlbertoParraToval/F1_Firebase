import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonAccordionGroup } from '@ionic/angular';
import { Driver, Team } from '../../models';
import { TeamsService } from '../../services';


export const TASK_PROFILE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TeamSelectableComponent),
  multi: true
};


@Component({
  selector: 'app-team-selectable',
  templateUrl: './team-selectable.component.html',
  styleUrls: ['./team-selectable.component.scss'],
  providers:[TASK_PROFILE_VALUE_ACCESSOR]
})
export class TeamSelectableComponent implements OnInit, ControlValueAccessor {

  selectedTeam:Team=null;
  propagateChange = (_: any) => { }
  isDisabled:boolean = false;

  constructor(
    private tasksSvc:TeamsService
  ) { }


  async writeValue(obj: any) {
    try {
      this.selectedTeam = await this.tasksSvc.getteamById(obj);
    } catch (error) {
      console.log("No se ha podido recupera los datos: "+ error);
    }
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  ngOnInit() {}

  getTeams(){
    return this.tasksSvc.getteams();
  } 

  onTaskClicked(teamdata:Team, accordion:IonAccordionGroup){
    this.selectedTeam = teamdata;
    accordion.value='';
    this.propagateChange(this.selectedTeam.docId);
  }

}
