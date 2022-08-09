import {
  trigger, animateChild, group,
  transition, animate, style, query
} from '@angular/animations';


// Routable animations
export const slideInAnimation =
  trigger('routeAnimation', [
    transition('* <=> *', [
      style({ position: 'relative', background: 'red' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          background: 'blue'
        })
      ], { optional: true }),
      query(':enter', [
        style({ left: '-100%', background: 'green'})
      ], { optional: true }),
      query(':leave', animateChild(), { optional: true }),
      group([
        query(':leave', [
          animate('300ms ease-out', style({ left: '100%'}))
        ], { optional: true }),
        query(':enter', [
          animate('300ms ease-out', style({ left: '0%'}))
        ], { optional: true })
      ]),
      query(':enter', animateChild(), { optional: true }),
    ])
  ]);