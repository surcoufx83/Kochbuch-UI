import { Component, ElementRef, EventEmitter, OnDestroy, Output, ViewChild } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/svc/auth.service';
import { L10nService } from 'src/app/svc/l10n.service';

@Component({
  selector: 'app-discard-changes-modal',
  templateUrl: './discard-changes-modal.component.html',
  styleUrls: ['./discard-changes-modal.component.scss']
})
export class DiscardChangesModalComponent implements OnDestroy {

  @ViewChild('closeModalBtn1') closeDeletionBtn?: ElementRef;
  @Output() discardAccepted: EventEmitter<any> = new EventEmitter();

  routerSubscription?: Subscription;

  constructor(
    private l10nService: L10nService,
    private router: Router,
  ) {
    this.routerSubscription = this.router.events.subscribe((e) => {
      if (e instanceof NavigationStart) {
        this.closeDeletionBtn?.nativeElement.click();
      }
    });
  }

  get l10n(): L10nService {
    return this.l10nService;
  }

  ln(content: string, replacements: any[]): string {
    return this.l10nService.ln(content, replacements);
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) this.routerSubscription.unsubscribe();
  }

}
