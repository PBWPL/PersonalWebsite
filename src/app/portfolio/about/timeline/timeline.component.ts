import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TimeLine } from '@shared/interfaces/developer';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'about-timeline',
  template: `
    <div class="flex flex-col md:grid md:grid-cols-9">
      <ng-container *ngFor="let item of items">
        <ng-container *ngIf="checkSide(); else right">
          <div class="flex flex-row-reverse md:contents">
            <mat-card class="w-full p-4 my-4 mr-auto md:col-start-1 md:col-end-5 md:mr-0 md:ml-auto">
              <h3 class="!mb-0">{{ item.name }}</h3>
              <mat-accordion>
                <mat-expansion-panel>
                  <mat-expansion-panel-header class="!px-1">
                    <h4 class="!mb-0">{{ item.role }}</h4>
                  </mat-expansion-panel-header>
                  <span>
                    <time [dateTime]="item.startDate | date: 'yyyy-MM-DD'">
                      {{ item.startDate | date: 'MMMM yyyy' }}
                    </time>
                    –
                    <time [dateTime]="item.endDate !== undefined ? (item.endDate | date: 'yyyy-MM-DD') : ''">
                      {{ item.endDate !== undefined ? (item.endDate | date: 'MMMM yyyy') : 'Present' }}
                    </time>
                  </span>
                  <address>
                    <span>{{ item.city }}</span>
                    ,
                    <span>{{ item.country }}</span>
                  </address>
                  <p class=" pt-4">
                    {{ item.description }}
                  </p>
                </mat-expansion-panel>
              </mat-accordion>
            </mat-card>
            <div class="col-start-5 col-end-6 relative mr-10 md:mx-auto">
              <div class="h-full w-6 flex items-center justify-center">
                <div class="h-full w-1 bg-accent-500 pointer-events-none"></div>
              </div>
              <div class="w-6 h-6 absolute bg-accent-800 top-1/2 -mt-3 rounded-full">
                <span class="w-2 h-2 absolute left-2 top-2 bg-contrast-a200 rounded-full"></span>
              </div>
            </div>
          </div>
        </ng-container>

        <ng-template #right>
          <div class="flex md:contents">
            <div class="relative mr-10 md:col-start-5 md:col-end-6 md:mx-auto">
              <div class="h-full w-6 flex items-center justify-center">
                <div class="h-full w-1 bg-accent-500 pointer-events-none"></div>
              </div>
              <div class="w-6 h-6 absolute bg-accent-800 top-1/2 -mt-3 rounded-full">
                <span class="w-2 h-2 absolute left-2 top-2 bg-contrast-a200 rounded-full"></span>
              </div>
            </div>
            <mat-card class="md:col-start-6 md:col-end-10 p-4 my-4 mr-auto">
              <h3 class="!mb-0">{{ item.name }}</h3>
              <mat-accordion>
                <mat-expansion-panel>
                  <mat-expansion-panel-header class="!px-1">
                    <h4 class="!mb-0">{{ item.role }}</h4>
                  </mat-expansion-panel-header>
                  <span>
                    <time [dateTime]="item.startDate | date: 'yyyy-MM-DD'">
                      {{ item.startDate | date: 'MMMM yyyy' }}
                    </time>
                    –
                    <time [dateTime]="item.endDate !== undefined ? (item.endDate | date: 'yyyy-MM-DD') : ''">
                      {{ item.endDate !== undefined ? (item.endDate | date: 'MMMM yyyy') : 'Present' }}
                    </time>
                  </span>
                  <address>
                    <span>{{ item.city }}</span>
                    ,
                    <span>{{ item.country }}</span>
                  </address>
                  <p class="pt-4">
                    {{ item.description }}
                  </p>
                </mat-expansion-panel>
              </mat-accordion>
            </mat-card>
          </div>
        </ng-template>
      </ng-container>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimelineComponent {
  isLeft: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  @Input() items?: TimeLine[];

  checkSide() {
    let tmp = this.isLeft.getValue();
    this.isLeft.getValue() ? this.isLeft.next(false) : this.isLeft.next(true);

    return tmp;
  }

  constructor() {}
}
