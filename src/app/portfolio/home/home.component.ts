import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  NgZone,
  OnInit,
  PLATFORM_ID,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { Developer } from '@shared/interfaces/developer';
import { ActivityMap, MoodMap } from '@shared/interfaces/feeling';
import { Project } from '@shared/interfaces/project';
import { DeveloperService } from '@shared/services/developer.service';
import { FeelingService } from '@shared/services/feeling.service';
import { ProjectService } from '@shared/services/project.service';
import { PWAService } from '@shared/services/pwa.service';
import { SEOService } from '@shared/services/seo.service';
import { portfolioPaths } from '../portfolio-routing.module';

@Component({
  selector: 'portfolio-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  developer: Developer = this.developerService.getDeveloper();
  isBrowser: boolean;

  isOpen = false;

  eventSubject: Subject<void> = new Subject<void>();

  projects$: Observable<Project[]> = this.projectService.getProjects(true);
  feelingsChartData$: Observable<any[]> = this.feelingService.getFeelingsTwoWeeks().pipe(
    map((feelings) =>
      feelings.map(({ full_date, mood }) => ({
        x: full_date,
        y: Object.values(MoodMap).findIndex((m) => m === (mood as string))
      }))
    )
  );

  feelings: any;
  feel: any;
  feelIndex: number = 0;

  portfolioPaths = portfolioPaths;

  showLinks() {
    this.eventSubject.next();
  }

  changeFeel(index: number) {
    if (index !== this.feelIndex) {
      this.zone.runOutsideAngular(() => {
        this.zone.run(() => {
          this.feelIndex = index;
          this.feel = this.feelings[index];
        });
      });
    }
  }

  ngOnInit(): void {
    this.feelingService
      .getFeelingsTwoWeeks()
      .pipe(
        map((feelings) =>
          feelings.map((feeling) => ({
            full_date: feeling.full_date,
            mood: {
              name: feeling.mood,
              emoji: Object.keys(MoodMap)[Object.values(MoodMap).indexOf(feeling.mood as MoodMap)]
            },
            activities: feeling.activities.map((activity) => ({
              name: activity,
              emoji: Object.keys(ActivityMap)[Object.values(ActivityMap).indexOf(activity as ActivityMap)] || activity
            })),
            note_title: feeling.note_title,
            note: feeling.note
          }))
        )
      )
      .subscribe((feelings) => {
        this.feelings = feelings;
        this.feelIndex = feelings.length - 1;
        this.feel = feelings[this.feelIndex];
      });
  }

  constructor(
    private developerService: DeveloperService,
    private projectService: ProjectService,
    private feelingService: FeelingService,
    @Inject(PLATFORM_ID) platformId: string,
    private changeDetector: ChangeDetectorRef,
    private zone: NgZone,
    private renderer: Renderer2,
    private seoService: SEOService
  ) {
    this.seoService.setTitle();
    if (isPlatformServer(platformId)) {
      this.seoService.setCanonicalUrl(this.renderer);
      this.seoService.setAlternateUrl(this.renderer);
    }

    this.isBrowser = isPlatformBrowser(platformId);
  }
}
