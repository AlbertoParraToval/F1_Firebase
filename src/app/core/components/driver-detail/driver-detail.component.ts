import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { Driver } from 'src/app/core/models/drivers.model';
import { PhotoItem, PhotoService } from '../../services/photo.service';
import { PlatformService } from '../../services/platform.service';

@Component({
  selector: 'app-driver-detail',
  templateUrl: './driver-detail.component.html',
  styleUrls: ['./driver-detail.component.scss'],
})
export class DriverDetailComponent implements OnInit {
  form: FormGroup;
  mode: 'New' | 'Edit' = 'New';
  currentImage = new BehaviorSubject<string>('');
  currentImage$ = this.currentImage.asObservable();
  @Input('driver') set driver(driver: Driver) {
    if (driver) {
      this.form.controls.id.setValue(driver.id);
      this.form.controls.docId.setValue(driver.docId);
      this.form.controls.first_name.setValue(driver.first_name);
      this.form.controls.last_name.setValue(driver.last_name);
      this.form.controls.nickname.setValue(driver.nickname);
      this.form.controls.picture.setValue(driver.picture);
      
      if (driver.picture) this.currentImage.next(driver.picture);
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
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      nickname: ['', [Validators.required]],
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
