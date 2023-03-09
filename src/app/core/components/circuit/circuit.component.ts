import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
import { Circuit } from '../../models';

@Component({
  selector: 'app-circuit',
  templateUrl: './circuit.component.html',
  styleUrls: ['./circuit.component.scss'],
})
export class CircuitComponent implements OnInit {

  @Output() onEdit = new EventEmitter;
  @Output() onDelete = new EventEmitter;
  @Input() _circuit:Circuit;

  
  constructor(
  ){}

  ngOnInit(
  ) {

  }

  onEditClick(){
    this.onEdit.emit(this._circuit);
  }

  onDeleteClick(){
    this.onDelete.emit(this._circuit);
  }
}


