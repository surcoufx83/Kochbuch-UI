import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-customizable-alert',
  templateUrl: './customizable-alert.component.html',
  styleUrls: ['./customizable-alert.component.scss']
})
export class CustomizableAlertComponent {
  @Input({ required: true }) style: string = 'warning';
}
