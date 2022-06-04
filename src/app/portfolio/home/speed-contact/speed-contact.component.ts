import { animate, keyframes, query, stagger, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Link } from '@shared/interfaces/developer';

@Component({
  selector: 'home-speed-contact',
  templateUrl: './speed-contact.component.html',
  styleUrls: ['./speed-contact.component.scss'],
  animations: [
    trigger('toggler', [
      state(
        'false',
        style({
          transform: 'rotate(0deg)'
        })
      ),
      state(
        'true',
        style({
          transform: 'rotate(-135deg)'
        })
      ),
      transition('* <=> *', animate('400ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ]),
    trigger('stagger', [
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),
        query(
          ':enter',
          stagger('40ms', [
            animate('200ms cubic-bezier(0.4, 0.0, 0.2, 1)', keyframes([style({ opacity: 0 }), style({ opacity: 1 })]))
          ]),
          { optional: true }
        ),

        query(
          ':leave',
          animate('200ms cubic-bezier(0.4, 0.0, 0.2, 1)', keyframes([style({ opacity: 1 }), style({ opacity: 0 })])),
          { optional: true }
        )
      ])
    ])
  ]
})
export class SpeedContactComponent implements OnInit, OnDestroy {
  @Input() links?: Link[];
  @Input() event!: Observable<void>;

  eventSubscription?: Subscription;

  state = false;
  buttons: any = [];

  toggle() {
    this.state ? this.hideItems() : this.showItems();
  }

  showItems() {
    this.state = true;
    this.buttons = this.links;
  }

  hideItems() {
    this.state = false;
    this.buttons = [];
  }

  ngOnInit(): void {
    this.eventSubscription = this.event.subscribe(() => {
      this.showItems();
    });
  }

  ngOnDestroy(): void {
    if (this.eventSubscription) this.eventSubscription.unsubscribe();
  }

  constructor() {}
}
