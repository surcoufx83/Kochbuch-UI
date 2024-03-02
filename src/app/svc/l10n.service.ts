import { Injectable, OnInit } from '@angular/core';
import { L10nDe } from './l10n/de';
import { L10nEn } from './l10n/en';
import { L10nLocaleInterface } from './l10n/l10n.interface';
import { format, formatDuration, intervalToDuration, parseISO } from 'date-fns'
import { de, enUS } from 'date-fns/locale';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class L10nService {

  private fallbackLocale = 'de';

  private userLocaleSub$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public userLocaleSub = this.userLocaleSub$.asObservable();

  private browserLocale: string = '';
  private userLocale: string = '';
  private datefnsLocale = enUS;
  private locales: { [key: string]: L10nLocaleInterface } = {
    'en': L10nEn,
    'en-GB': L10nEn,
    'en-US': L10nEn,
    'de': L10nDe,
    'de-DE': L10nDe,
  }

  constructor() {
    let olddata: string | null | L10nStorage = localStorage.getItem('kbL10n');
    if (olddata != null) {
      olddata = <L10nStorage>JSON.parse(olddata);
      this.userLocale = olddata.activeLocale;
    }
    for (let i = 0; i < navigator.languages.length; i++) {
      if (i == 0)
        this.browserLocale = navigator.languages[i];
      if (this.userLocale == '' && this.locales[navigator.languages[i]]) {
        this.userLocale = navigator.languages[i];
        break;
      }
    }
    if (this.userLocale == '')
      this.userLocale = this.fallbackLocale;
    this.userLocaleSub$.next(this.userLocale);
    this.userLocaleSub.subscribe((l) => {
      this.userLocale = l;
      switch (l) {
        case 'de':
        case 'de-DE':
        case '':
          this.datefnsLocale = de;
          break;
        default:
          this.datefnsLocale = enUS;
          break;
      }
      if (this.userLocale != '')
        localStorage.setItem('kbL10n', JSON.stringify(<L10nStorage>{
          activeLocale: this.userLocale,
          browserLocale: this.browserLocale,
        }));
    });
  }

  public get lang(): string {
    return this.userLocale;
  }

  public get locale(): L10nLocaleInterface {
    return this.locales[this.userLocale];
  }

  public cur(value: number, sign: string): string {
    return new Intl.NumberFormat(this.userLocale, { style: 'currency', currency: sign }).format(value);
  }

  public date(value: string | number | Date, form: string): string {
    if (typeof value === 'string')
      return format(parseISO(value), form, { locale: this.datefnsLocale });
    return format(value, form, { locale: this.datefnsLocale });
  }

  public getDateFnsLocale() {
    return this.datefnsLocale;
  }

  public dec(value: number, minFractionDigits: number = 0, maxFractionDigits: number | undefined = undefined): string {
    return value.toLocaleString(this.userLocale, { minimumFractionDigits: minFractionDigits, maximumFractionDigits: maxFractionDigits });
  }

  public ln(content: string, replacements: any[]): string {
    for (let i = 0; i < replacements.length; i++) {
      content = content.replace(`[${i}]`, replacements[i]);
    }
    return content;
  }

  public get supportedLocales(): string[] {
    return Object.keys(this.locales).filter((value) => value.length == 2);
  }

  public switchTo(locale: string) {
    if (locale != '' && this.locales[locale] && this.userLocaleSub$.value != locale) {
      this.userLocaleSub$.next(locale);
      location.reload();
    }
  }

  public time(value: number, unit: string, short: boolean = true, exact: boolean = false): string {
    if (!exact)
      return this.timeMinutes(value, short);
    let dur: Duration = intervalToDuration({
      start: 0,
      end: 1000 *
        ((unit == 'days' ? value * 86400 : 0) +
          (unit == 'hours' ? value * 3600 : 0) +
          (unit == 'minutes' ? value * 60 : 0) +
          (unit == 'seconds' ? value : 0))
    });
    return formatDuration(dur, { locale: this.datefnsLocale });
  }

  private timeStr(one: boolean, period: 'day' | 'hour' | 'min', short: boolean): string {
    switch (period) {
      case 'day':
        if (one)
          return short ? this.locale.common.timeperiod.short.day : this.locale.common.timeperiod.long.day;
        else
          return short ? this.locale.common.timeperiod.short.days : this.locale.common.timeperiod.long.days;

      case 'hour':
        if (one)
          return short ? this.locale.common.timeperiod.short.hour : this.locale.common.timeperiod.long.hour;
        else
          return short ? this.locale.common.timeperiod.short.hours : this.locale.common.timeperiod.long.hours;

      case 'min':
        if (one)
          return short ? this.locale.common.timeperiod.short.min : this.locale.common.timeperiod.long.day;
        else
          return short ? this.locale.common.timeperiod.short.mins : this.locale.common.timeperiod.long.mins;

    }
  }

  private timeDays(value: number, short: boolean): string {
    const valueflat = Math.floor(value);
    return `${valueflat !== value ? '> ' : ''}${valueflat} ${this.timeStr(valueflat === 1, 'day', short)}`;
  }

  private timeHours(value: number, short: boolean): string {
    const valueflat = Math.floor(value);
    return `${valueflat !== value ? '> ' : ''}${valueflat} ${this.timeStr(valueflat === 1, 'hour', short)}`;
  }

  private timeMinutes(value: number, short: boolean): string {
    if (value > 1440)
      return this.timeDays(value / 1440, short)
    if (value > 60)
      return this.timeHours(value / 60, short)
    const valueflat = Math.floor(value);
    return `${valueflat !== value ? '> ' : ''}${valueflat} ${this.timeStr(valueflat === 1, 'min', short)}`;
  }

}

export type L10nStorage = {
  activeLocale: string,
  browserLocale: string,
}
