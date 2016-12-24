import { Component, Directive, Input } from '@angular/core';
//  <ng-content select="chords" *ngIf="type === 'repeat-end'"></ng-content>
@Component({
  selector: 'bar',
  template: `
    <span *ngIf="type === 'repeat-start'"><strong>:</strong></span>
    <span>&nbsp;</span>
    <ng-content select="chords"></ng-content>
    <span *ngIf="type === 'repeat-end'"><strong>:</strong></span>
`,
  styles: [`
    :host {
      width: 100%;
      display: -webkit-flex; /* Safari */
      -webkit-justify-content: space-around; /* Safari 6.1+ */
      display: flex;
      justify-content: space-around;
      border-left: 1px solid black;
    }
    span {
        padding-right: 2px;
    }
  `]
})
export class Bar  {
  @Input() type:string = "common"
}

@Component({
  selector: 'bar-no-border',
  template: `
    <ng-content select="chords"></ng-content>
`,
  styles: [`
    :host {
      width: 100%;
      display: -webkit-flex; /* Safari */
      -webkit-justify-content: space-around; /* Safari 6.1+ */
      display: flex;
      justify-content: space-around;
    }
  `]
})
export class BarNoBorder  {}


@Component({
  selector: 'bar-repeat-start',
  template: `
    <span><strong>:</strong></span>
    <ng-content select="chords"></ng-content>
    `,
  styles: [`
    :host {
      width: 100%;
      display: -webkit-flex; /* Safari */
        -webkit-justify-content: space-around; /* Safari 6.1+ */
        display: flex;
        justify-content: space-around;
        border-left: 1px solid black;
    }
    span {
        padding-right: 2px;
    }
  `]
})
export class BarRepeatStart {}


@Component({
  selector: 'bar-repeat-end',
  template: `
    <span>&nbsp;</span>
    <ng-content select="chords"></ng-content>
    <span><strong>:</strong></span>

    `,
  styles: [`
    :host {
      width: 100%;
      display: -webkit-flex; /* Safari */
      -webkit-justify-content: space-between; /* Safari 6.1+ */
      display: flex;
      justify-content: space-between;
      border-left: 1px solid black;
    }
    span {
        padding-right: 2px;
    }
  `]
})
export class BarRepeatEnd {}


@Component({
  selector: 'condition',
  template: `
  {{condition}}
  `,
  styles: [`
    :host {
      width: 100%;
      border-top-left-radius: 4px;
      border-left: 1px solid black;
      border-top: 1px solid black;
      font-family: monospace;
      display: flex;
    }
  
  `]
})
export class Condition{
  @Input() condition:string = '';
}

@Component({
  selector: 'line-bar',
  template: `
    <ng-content select="instructions"></ng-content>
    <ng-content select="bars"></ng-content>
  `,
  styles: [`
    :host {
        display: -webkit-flex; /* Safari */
        -webkit-justify-content: space-around; /* Safari 6.1+ */
        display: block;
        justify-content: space-around;
        padding-top: 10px
    } 
  `]
})
export class LineBar  {}


@Directive({
    selector: 'bars'
})
export class Bars{}

@Directive({
    selector: 'instructions'
})
export class Instructions{}