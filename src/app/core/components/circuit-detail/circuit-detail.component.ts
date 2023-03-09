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
  currentImage = new BehaviorSubject<string>('');
  currentImage$ = this.currentImage.asObservable();
  @Input('circuit') set circuit(circuit: Circuit) {
    if (circuit) {
      this.form.controls.id.setValue(circuit.id);
      this.form.controls.docId.setValue(circuit.docId);
      this.form.controls.localizacion.setValue(circuit.localizacion);
      this.form.controls.picture.setValue(circuit.picture);
      
      if (circuit.picture) this.currentImage.next(circuit.picture);
      this.form.controls.pictureFile.setValue(null);
      this.mode = 'Edit';
    }
  }

  constructor(
    public platform: PlatformService,
    private photoSvc: PhotoService,
    private fb: FormBuilder,
    private modal: ModalController,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      id: [null],
      docId: [''],
      localizacion: ['', [Validators.required]],
      picture: [''],
      pictureFile: [null],
    });
  }

  ngOnInit() {}

  onSubmit() {
    this.modal.dismiss({ driver: this.form.value, mode: this.mode }, 'ok');
  }

  onDismiss(result) {
    this.modal.dismiss(null, 'cancel');
  }

  async changePic(
    fileLoader: HTMLInputElement,
    mode: 'library' | 'camera' | 'file'
  ) {
    var item: PhotoItem = await this.photoSvc.getPicture(mode, fileLoader);
    this.currentImage.next(item.base64);
    this.cdr.detectChanges();
    this.form.controls.pictureFile.setValue(item.blob);
  }
}