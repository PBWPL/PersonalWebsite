import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@portfolio/portfolio.module').then((m) => m.PortfolioModule)
  },
  { path: '**', redirectTo: '' }
];

const routerOptions: ExtraOptions = {
  initialNavigation: 'enabledBlocking',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 60],
  onSameUrlNavigation: 'reload',
  scrollPositionRestoration: 'enabled',
  useHash: false
  // relativeLinkResolution: 'legacy'
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
