import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-h5',
  templateUrl: './h5.component.html',
  styleUrls: ['./h5.component.scss']
})
export class H5Component {
  @Input() busy!: boolean;
  @Input() title!: string;
}
