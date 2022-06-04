import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from '@shared/shared.module';
import { FeelingsChartComponent } from './feelings-chart/feelings-chart.component';
import { SpeedContactComponent } from './speed-contact/speed-contact.component';
import { NgChartsModule } from 'ng2-charts';
import { ProjectCardComponent } from './project-card/project-card.component';

@NgModule({
  imports: [CommonModule, HomeRoutingModule, SharedModule, NgChartsModule],
  declarations: [HomeComponent, SpeedContactComponent, ProjectCardComponent, FeelingsChartComponent],
  exports: [NgChartsModule]
})
export class HomeModule {}
