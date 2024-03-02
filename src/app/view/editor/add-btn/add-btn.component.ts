import { Component, EventEmitter, Input, Output } from '@angular/core';
import { addIcon } from 'src/app/common/icons';

@Component({
  selector: 'app-editor-add-btn',
  templateUrl: './add-btn.component.html',
  styleUrls: ['./add-btn.component.scss']
})
export class AddBtnComponent {

  @Input() title: string = '';
  @Output() btnClicked: EventEmitter<void> = new EventEmitter();

  addIcon = addIcon;

}
