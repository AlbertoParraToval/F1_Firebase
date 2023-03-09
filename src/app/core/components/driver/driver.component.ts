import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { isLowResolution as lowres} from 'src/app/utils/screen.utils';
import { IonItemSliding } from '@ionic/angular';
import { Driver, DriverService} from 'src/app/core';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss'],
})
export class DriverComponent implements OnInit {


  @Output() onEdit = new EventEmitter;
  @Output() onDelete = new EventEmitter;
  @Input() _driver:Driver;
  isLowResolution:()=>boolean = lowres;
  
  constructor(
  ){}

  ngOnInit(
  ) {

  }

  onEditClick(slide:IonItemSliding){
    slide.close();
    this.onEdit.emit(this._driver);
  }

  onDeleteClick(slide:IonItemSliding){
    slide.close();
    this.onDelete.emit(this._driver);
  }

}
