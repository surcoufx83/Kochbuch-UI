import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-h4',
  templateUrl: './h4.component.html',
  styleUrls: ['./h4.component.scss']
})
export class H4Component {
  @Input() busy!: boolean;
  @Input() icon?: string;
  @Input() title!: string;
}
