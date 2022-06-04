import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { SharedModule } from '@shared/shared.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CardComponent } from './card/card.component';

@NgModule({
  imports: [CommonModule, ProjectsRoutingModule, SharedModule, MatSnackBarModule],
  declarations: [ProjectsComponent, CardComponent]
})
export class ProjectsModule {}
