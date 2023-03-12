import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { Circuit } from '../../models';
import { PhotoItem, PhotoService } from '../../services/photo.service';
import { PlatformService } from '../../services/platform.service';

@Component({
  selector: 'app-circuit-detail',
  templateUrl: './circuit-detail.component.html',
  styleUrls: ['./circuit-detail.component.scss'],
})
export class CircuitDetailComponent implements OnInit {
  form: FormGroup;
  mode: 'New' | 'Edit' = 'New';

  @Input('circuitdata') set circuitdata(circuitdata: Circuit) {
    if (circuitdata) {
      this.form.controls['id'].setValue(circuitdata.id);
      this.form.controls['name'].setValue(circuitdata.name);
      this.form.controls['localizacion'].setValue(circuitdata.localizacion);
      this.form.controls['picture'].setValue(circuitdata.picture);
      this.mode = 'Edit';
    }
  }

  constructor(private fb: FormBuilder, private modal: ModalController) {
    this.form = this.fb.group({
      id: [null],
      name: ['', [Validators.required]],
      localizacion: ['', [Validators.required]],
      picture:["",[]]
    });
  }

  onSubmit() {
    this.modal.dismiss({ circuitdata: this.form.value, mode: this.mode }, 'ok');
  }

  onDismiss(_result: any) {
    this.modal.dismiss(null, 'cancel');
  }

  ngOnInit() {}
}