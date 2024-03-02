import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { infoIcon, recipeRateIcon } from 'src/app/common/icons';
import { AuthService } from 'src/app/svc/auth.service';
import { L10nService } from 'src/app/svc/l10n.service';
import { Recipe } from 'src/app/svc/recipe';
import { urlenc } from 'src/app/svc/shared-data.service';
import { UserAccount } from 'src/app/svc/user';

@Component({
  selector: 'app-recipe-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.scss'],
})
export class VotingComponent implements OnInit, OnChanges {

  @Input({ required: true }) loading: boolean = false;
  @Input({ required: true }) recipe?: Recipe;

  busy: boolean = false;
  user?: UserAccount;
  isAdmin: boolean = false;
  isOwner: boolean = true;

  recipeRateIcon = recipeRateIcon;
  infoIcon = infoIcon;

  alreadyVoted: boolean = false;

  constructor(
    private l10nService: L10nService,
    private authService: AuthService,
  ) {
    this.authService.user.subscribe((user) => {
      this.user = user.id == 0 ? undefined : user;
      this.isOwner = this.recipe?.owner?.id == this.user?.id;
    });
    this.authService.isAdmin.subscribe((admin) => (this.isAdmin = admin));
  }

  public date(value: string | number | Date, form: string = 'PP'): string {
    return this.l10nService.date(value, form);
  }

  dec(
    value: number,
    minFractionDigits: number = 0,
    maxFractionDigits: number | undefined = undefined
  ): string {
    return this.l10nService.dec(value, minFractionDigits, maxFractionDigits);
  }

  get l10n(): L10nService {
    return this.l10nService;
  }

  ln(content: string, replacements: any[]): string {
    return this.l10nService.ln(content, replacements);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.onChanged();
  }

  ngOnInit(): void {
    this.onChanged();
  }

  onChanged(): void {
    this.isOwner = this.recipe?.owner?.id == this.user?.id;
    if (this.recipe && this.recipe.socials.myvotes) {
      if (this.recipe.socials.myvotes.rating.voted) {
        this.alreadyVoted = true;
      }
      if (this.recipe.socials.myvotes.voting.voted) {
        this.alreadyVoted = true;
      }
    }
  }

  urlenc(value: string): string {
    return urlenc(value);
  }

}
