import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { UserService } from 'src/app/core/services/user.service';
import { environment } from 'src/environments/environment';
import { ApiService } from '../../core';
import { AssignmentDetailComponent } from '../../core/components/assignment-detail/assignment-detail.component';
import { PersonDetailComponent } from '../../core/components/person-detail/person-detail.component';
import { TeamDetailComponent } from '../../core/components/team-detail/team-detail.component';
import { AssignmentsService } from '../../core/services/assignments.service';
import { PeopleService } from '../../core/services/people.service';
import { TeamsService } from '../../core/services/teams.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;

  

  constructor(
    public user:UserService,
    private api:ApiService,
    private peopleSvc:PeopleService,
    private teamsSvc:TeamsService,
    private assignmentsSvc:AssignmentsService,
    private modal:ModalController,
    private activatedRoute: ActivatedRoute,
    private router:Router) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }

  async presentForm(_class, onDismiss:(any)=>void){
    const modal = await this.modal.create({
      component:_class,
      cssClass:"modal-full-right-side"
    });
    modal.present();
    modal.onDidDismiss().then(result=>{
      if(result && result.data){
        onDismiss(result.data);
      }
    });
  }

  onNewItem(){
    switch(this.folder){
      
      case 'Home':
        break;
      case 'People':
        this.presentForm(PersonDetailComponent, (data)=>{
          this.peopleSvc.addPerson(data.person);
        });
        break;
      case 'Teams':
        
        this.presentForm(TeamDetailComponent, (data)=>{
          this.teamsSvc.addteam(data.team);
        });
        break;
      case 'Assignments':
        
        this.presentForm(AssignmentDetailComponent, (data)=>{
          this.assignmentsSvc.addAssignment(data.assignment);
        });
        break;
      case 'Task Panel':
        break;
      default:
    }
  }
  
}
