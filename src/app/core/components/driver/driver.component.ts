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

  private _driver:Driver;
  @Output() onEdit = new EventEmitter;
  @Output() onDelete = new EventEmitter;
  @Input() set driver(d:Driver){
    this._driver = d;
  }
  getDriver(){
    return this.driver;
  }
  isLowResolution:()=>boolean = lowres;
  
  constructor(
    private driverSvc:DriverService
  ){

  }

  ngOnInit(
  ) {

  }

  onEditClick(slide:IonItemSliding){
    slide.close();
    this.onEdit.emit(this.driver);
  }

  onDeleteClick(slide:IonItemSliding){
    slide.close();
    this.onDelete.emit(this.driver);
  }

}
