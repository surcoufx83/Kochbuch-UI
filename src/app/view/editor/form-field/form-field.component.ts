import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-editor-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss']
})
export class FormFieldComponent {

  @Input({ required: true }) id!: string;
  @Input() maxWidth?: string;
  @Input() placholder: string = '';
  @Input() required: boolean = false;
  @Input({ required: true }) value!: any;

  @Output() valueChange: EventEmitter<any> = new EventEmitter();

}
