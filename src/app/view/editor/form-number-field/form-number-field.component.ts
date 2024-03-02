import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-editor-form-number-field',
  templateUrl: './form-number-field.component.html',
  styleUrls: ['./form-number-field.component.scss']
})
export class FormNumberFieldComponent {

  @Input({ required: true }) id!: string;
  @Input() max: number | null = null;
  @Input() maxWidth?: string;
  @Input() min: number | null = null;
  @Input() placholder: string = '';
  @Input() required: boolean = false;
  @Input({ required: true }) value!: any;
  @Input() step: number | null = null;

  @Output() valueChange: EventEmitter<any> = new EventEmitter();

}
