import { isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Developer } from '@shared/interfaces/developer';
import { DeveloperService } from '@shared/services/developer.service';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { StyleManagerService } from '@shared/services/style-manager.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isBrowser: boolean;
  developer: Developer = this.developerService.getDeveloper();

  scrollPos: number = 0;

  isDark: BehaviorSubject<boolean> = this.styleManagerService.isDark;
  currentTheme = 'auto';

  scrollProgress = 0;
  windowWidth = 0;

  languages = [
    { label: $localize`:@@headerLangEnglish:English`, code: 'en' },
    { label: $localize`:@@headerLangPolish:Polish`, code: 'pl' },
    { label: $localize`:@@headerLangGerman:German`, code: 'de' }
  ];

  items = [
    {
      label: $localize`:@@headerLabelAboutMe:ABOUT ME`,
      url: '/about-me',
      fragment: ''
    },
    {
      label: $localize`:@@headerLabelProjects:PROJECTS`,
      url: '/projects',
      fragment: ''
    }
  ];

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    this.scrollPos = scrollTop;
    this.scrollProgress = Math.round((scrollTop / height) * 100);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.windowWidth = window.innerWidth;
  }

  getNextTheme(): string {
    return this.currentTheme === 'auto' ? 'dark' : this.currentTheme === 'light' ? 'auto' : 'light';
  }

  changeTheme(theme?: string) {
    switch (theme) {
      case 'auto': // change from auto to dark
        this.localStorageService.setItem('current-theme', 'dark');
        if (!this.isDark.getValue()) this.styleManagerService.toggleDarkTheme();
        this.currentTheme = 'dark';
        break;
      case 'dark': // change from dark to light
        this.localStorageService.setItem('current-theme', 'light');
        if (this.isDark.getValue()) this.styleManagerService.toggleDarkTheme();
        this.currentTheme = 'light';
        break;
      case 'light': // change from light to auto
        this.localStorageService.setItem('current-theme', 'auto');
        if (this.isSystemDarkMode() && !this.isDark.getValue()) this.styleManagerService.toggleDarkTheme();
        this.currentTheme = 'auto';
        break;
      default: // change to system theme
        if (this.isSystemDarkMode() && !this.isDark.getValue()) this.styleManagerService.toggleDarkTheme();
        break;
    }
  }

  isSystemDarkMode(): boolean | undefined {
    return window.matchMedia('(prefers-color-scheme: dark)')?.matches;
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      if (this.localStorageService.getItem('current-theme') !== null) {
        this.currentTheme = this.localStorageService.getItem('current-theme');
      } else {
        this.localStorageService.setItem('current-theme', 'auto');
      }

      if (this.currentTheme === 'auto') {
        this.changeTheme();
      } else if (this.currentTheme === 'dark') {
        this.styleManagerService.setDarkTheme();
      }

      window.matchMedia('(prefers-color-scheme: dark)')?.addEventListener('change', (e: any) => {
        if (this.currentTheme === 'auto' && e.matches !== this.isDark.getValue())
          this.styleManagerService.toggleDarkTheme();
      });

      this.windowWidth = window.innerWidth;
    }
  }

  constructor(
    @Inject(PLATFORM_ID) platformId: string,
    private localStorageService: LocalStorageService,
    private styleManagerService: StyleManagerService,
    private developerService: DeveloperService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }
}
