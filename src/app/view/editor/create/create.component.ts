import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { L10nService } from 'src/app/svc/l10n.service';
import { SharedDataService } from 'src/app/svc/shared-data.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  constructor(
    private dataService: SharedDataService,
    private router: Router,
    private l10nService: L10nService,
  ) { }

  get l10n(): L10nService {
    return this.l10nService;
  }

  ln(content: string, replacements: any[]): string {
    return this.l10nService.ln(content, replacements);
  }

  ngOnInit(): void {
    this.dataService.createRecipe().subscribe((reply) => {
      if (reply !== false && reply !== true) {
        this.router.navigate(['/recipe', 'edit', reply.id], { replaceUrl: true });
      }
    });
  }

}
