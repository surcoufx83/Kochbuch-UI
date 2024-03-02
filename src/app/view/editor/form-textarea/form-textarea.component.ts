import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-editor-form-textarea',
  templateUrl: './form-textarea.component.html',
  styleUrls: ['./form-textarea.component.scss']
})
export class FormTextareaComponent implements OnInit {

  @Input({ required: true }) id!: string;
  @Input() height: string = '86px';
  @Input() placholder: string = '';
  @Input() required: boolean = false;
  @Input({ required: true }) value!: string;

  @Output() valueChange: EventEmitter<string> = new EventEmitter();

  ngOnInit(): void {
    this.height = `${Math.floor(this.value.length / 50 * 30)}px`;
  }

}
