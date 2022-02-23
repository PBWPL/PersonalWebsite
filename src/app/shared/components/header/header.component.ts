import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  languages: any[];

  constructor() {
    this.languages = [
      { code: 'en', label: $localize`:@@en:English` },
      { code: 'pl', label: $localize`:@@pl:Polish` },
      { code: 'de', label: $localize`:@@de:German` }
    ];
  }

  ngOnInit(): void {}
}
