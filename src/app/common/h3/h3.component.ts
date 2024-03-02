import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-h3',
  templateUrl: './h3.component.html',
  styleUrls: ['./h3.component.scss']
})
export class H3Component {
  @Input() busy!: boolean;
  @Input() icon?: string;
  @Input() title!: string;
}
