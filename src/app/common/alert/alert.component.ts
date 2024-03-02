import { Component, Input } from '@angular/core';
import { L10nService } from 'src/app/svc/l10n.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {

  @Input() icon?: string;
  @Input({ required: true }) message!: string;
  @Input({ required: true }) style: string = 'warning';

}
