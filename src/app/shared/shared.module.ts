import { CommonModule, isPlatformServer } from '@angular/common';
import { Inject, NgModule, PLATFORM_ID } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DomSanitizer } from '@angular/platform-browser';
import { FooterComponent } from './components/footer/footer.component';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faAndroid,
  faAngular,
  faApple,
  faBootstrap,
  faCss3,
  faDocker,
  faFontAwesomeFlag,
  faGithub,
  faGitlab,
  faJava,
  faJsSquare,
  faLinkedinIn,
  faMicrosoft,
  faNode,
  faNodeJs,
  faPhp,
  faSass,
  faUnity
} from '@fortawesome/free-brands-svg-icons';
import { RouterModule } from '@angular/router';
import {
  faDatabase,
  faMoon,
  faMugHot,
  faSlash,
  faSpinner,
  faSquare,
  faSun,
  faWind
} from '@fortawesome/free-solid-svg-icons';
import { MatTooltipModule } from '@angular/material/tooltip';
import { faEnvelope, faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { LayoutComponent } from './components/layout/layout.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';
import { environment } from '@environments/environment';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatExpansionModule } from '@angular/material/expansion';

const MATERIAL_MODULES = [
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatTooltipModule,
  MatCardModule,
  MatChipsModule,
  MatListModule,
  MatProgressBarModule,
  MatExpansionModule
];

const SHARED_MODULES = [CommonModule, RouterModule, ...MATERIAL_MODULES, OverlayModule, FontAwesomeModule];

const SHARED_COMPONENTS = [HeaderComponent, FooterComponent, LayoutComponent];

@NgModule({
  imports: [...SHARED_MODULES],
  declarations: [...SHARED_COMPONENTS],
  exports: [...SHARED_MODULES, ...SHARED_COMPONENTS]
})
export class SharedModule {
  isServer: boolean;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) private platformId: string,
    faIconLibrary: FaIconLibrary
  ) {
    this.isServer = isPlatformServer(platformId);

    const domain = this.isServer ? environment.url + '/' : '';
    this.matIconRegistry.addSvgIcon(
      'pb-logo',
      this.domSanitizer.bypassSecurityTrustResourceUrl(domain + 'assets/pb-logo.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'web-development',
      this.domSanitizer.bypassSecurityTrustResourceUrl(domain + 'assets/web-development.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'lang_en',
      this.domSanitizer.bypassSecurityTrustResourceUrl(domain + 'assets/langs-svg/en.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'lang_pl',
      this.domSanitizer.bypassSecurityTrustResourceUrl(domain + 'assets/langs-svg/pl.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'lang_de',
      this.domSanitizer.bypassSecurityTrustResourceUrl(domain + 'assets/langs-svg/de.svg')
    );

    faIconLibrary.addIcons(
      faAngular,
      faGithub,
      faGitlab,
      faLinkedinIn,
      faSlash,
      faSun,
      faMoon,
      faThumbsUp,
      faEnvelope,
      faMugHot,
      faDatabase,
      faDocker,
      faSass,
      faPhp,
      faBootstrap,
      faMicrosoft,
      faJava,
      faJsSquare,
      faApple,
      faAndroid,
      faUnity,
      faCss3,
      faSquare,
      faSpinner,
      faFontAwesomeFlag,
      faWind,
      faNodeJs
    );
  }
}
