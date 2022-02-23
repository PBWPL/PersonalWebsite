import { CommonModule, isPlatformServer } from '@angular/common';
import { Inject, NgModule, PLATFORM_ID } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DomSanitizer } from '@angular/platform-browser';
import { FooterComponent } from './components/footer/footer.component';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngular } from '@fortawesome/free-brands-svg-icons';

const MATERIAL_MODULES = [MatMenuModule, MatToolbarModule, MatIconModule, MatButtonModule];

const SHARED_MODULES = [CommonModule, ...MATERIAL_MODULES, FontAwesomeModule];

const SHARED_COMPONENTS = [HeaderComponent, FooterComponent];

@NgModule({
  imports: [...SHARED_MODULES],
  declarations: [...SHARED_COMPONENTS],
  exports: [...SHARED_MODULES, ...SHARED_COMPONENTS]
})
export class SharedModule {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) private platformId: string,
    faIconLibrary: FaIconLibrary
  ) {
    const domain = isPlatformServer(platformId) ? 'http://localhost:4200/' : '';
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

    faIconLibrary.addIcons(faAngular);
  }
}
