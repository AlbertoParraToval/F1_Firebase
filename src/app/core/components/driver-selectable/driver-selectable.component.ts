import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonAccordionGroup } from '@ionic/angular';
import { Driver } from '../../models';
import { DriverService} from '../../services';


export const USER_PROFILE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DriverSelectableComponent),
  multi: true
};


@Component({
  selector: 'app-driver-selectable',
  templateUrl: './driver-selectable.component.html',
  styleUrls: ['./driver-selectable.component.scss'],
  providers:[USER_PROFILE_VALUE_ACCESSOR]
})
export class DriverSelectableComponent implements OnInit, ControlValueAccessor {

  selectedDriver:Driver=null;
  propagateChange = (_: any) => { }
  isDisabled:boolean = false;

  constructor(
    private driverSvc:DriverService
  ) { }


  async writeValue(obj: any) {
    try {
      this.selectedDriver = await this.driverSvc.getDriverById(obj);  
    } catch (error) {
      console.log("No se ha podido recupera los datos: "+error);
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

  getDrivers(){
    return this.driverSvc.getDrivers();
  } 

  onDriverClicked(d:Driver, accordion:IonAccordionGroup){
    this.selectedDriver = d;
    accordion.value='';
    this.propagateChange(this.selectedDriver.docId);
  }

}
