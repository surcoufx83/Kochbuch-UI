import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { aiIcon } from 'src/app/common/icons';
import { AuthService } from 'src/app/svc/auth.service';
import { L10nService } from 'src/app/svc/l10n.service';
import { Recipe } from 'src/app/svc/recipe';
import { UserAccount } from 'src/app/svc/user';

@Component({
  selector: 'app-recipe-editor-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class EditorHeaderComponent implements OnDestroy {

  @Input() editRecipe!: Recipe;
  @Input() originalRecipe!: Recipe;
  @Output() entityChanged: EventEmitter<boolean> = new EventEmitter();

  sub?: Subscription;
  user?: UserAccount;
  aiIcon = aiIcon;

  constructor(
    private authService: AuthService,
    private l10nService: L10nService,
  ) {
    this.sub = authService.user.subscribe((user) => this.user = user);
  }

  change(flag: boolean): void {
    this.entityChanged.emit(flag);
  }

  get l10n(): L10nService {
    return this.l10nService;
  }

  ln(content: string, replacements: any[]): string {
    return this.l10nService.ln(content, replacements);
  }

  ngOnDestroy(): void {
    if (this.sub)
      this.sub.unsubscribe();
  }

}
