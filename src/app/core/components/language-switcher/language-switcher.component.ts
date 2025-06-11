import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.css'
})
export class LanguageSwitcherComponent {
  showList : boolean = false;
  lang!: string;

  constructor(private translateService: TranslateService){
    this.getLanguage();
  }
  
  toggleLangsList(): void{
    this.showList = !this.showList;
  }

  switchLanguage(selected_lang : string, event : Event): void{
    event.stopPropagation();
    this.lang = selected_lang;
    this.showList = false;
    this.setLanguage(selected_lang);
  }

  getLanguage(): void{
    let _lang : string | null = localStorage.getItem("language");
    if(_lang === null){
      _lang = this.translateService.getDefaultLang();
    }
    this.translateService.use(_lang);
    this.lang = _lang;
  }

  setLanguage(_lang: string): void{
    this.translateService.use(_lang);
    localStorage.setItem("language",_lang);
  }

}
