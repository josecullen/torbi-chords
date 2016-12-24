import { Component, Directive, Input } from '@angular/core';

@Component({
  selector: 'half-note',
  template: `<quarter-note [note]="note">
    <quarter-note [note]="'&nbsp; &nbsp;'">
  `,
  styles: [`
    :host {
        display: table-cell;
    }
  `]

})
export class HalfNote  { 
    @Input() note:string = '';
}

@Component({
    selector: 'quarter-note',
    template: `{{note}}`,
    styles: [`
    :host {
        display: table-cell;
    }
  `]
})
export class QuarterNote{
    @Input() note:string = '';
}

@Directive({
    selector: 'chords'
})
export class Chords{

}