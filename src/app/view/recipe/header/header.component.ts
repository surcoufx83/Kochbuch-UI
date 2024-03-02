import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { collectionIcon, userIcon } from 'src/app/common/icons';
import { AuthService } from 'src/app/svc/auth.service';
import { L10nService } from 'src/app/svc/l10n.service';
import { Recipe } from 'src/app/svc/recipe';
import { urlenc } from 'src/app/svc/shared-data.service';
import { UserAccount } from 'src/app/svc/user';

@Component({
  selector: 'app-recipe-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnChanges, OnInit {

  @Input() loading: boolean = false;
  @Input() recipe?: Recipe;
  user?: UserAccount;
  isAdmin: boolean = false;
  isOwner: boolean = true;

  userIcon = userIcon;
  collectionIcon = collectionIcon;

  constructor(
    private l10nService: L10nService,
    private authService: AuthService,
  ) {
    this.authService.user.subscribe((user) => {
      this.user = user.id == 0 ? undefined : user;
      this.isOwner = this.recipe?.owner?.id == this.user?.id;
    });
    this.authService.isAdmin.subscribe((admin) => this.isAdmin = admin);
  }

  public date(value: string | number | Date, form: string = 'PP'): string {
    return this.l10nService.date(value, form);
  }

  dec(value: number, minFractionDigits: number = 0, maxFractionDigits: number | undefined = undefined): string {
    return this.l10nService.dec(value, minFractionDigits, maxFractionDigits);
  }

  get l10n(): L10nService {
    return this.l10nService;
  }

  ln(content: string, replacements: any[]): string {
    return this.l10nService.ln(content, replacements);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.isOwner = this.recipe?.owner?.id == this.user?.id;
  }

  urlenc(value: string): string {
    return urlenc(value);
  }

}
