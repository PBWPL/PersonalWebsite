import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '@shared/components/layout/layout.component';

export const portfolioPaths = {
  projects: 'projects',
  aboutme: 'about-me'
};

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule)
  },
  {
    path: portfolioPaths.projects,
    component: LayoutComponent,
    loadChildren: () => import('./projects/projects.module').then((m) => m.ProjectsModule)
  },
  {
    path: portfolioPaths.aboutme,
    loadChildren: () => import('./about/about.module').then((m) => m.AboutModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortfolioRoutingModule {}
