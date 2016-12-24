import { Component, Directive, Input } from '@angular/core';

@Component({
  selector: 'section-song',
  template: `
    
    <div class="description-container">
        <div class="description">
            <h3 class="description-text">{{description}}</h3>
        </div>
    </div>
    <div class="lines-container">
        <ng-content></ng-content>
    </div>
  `,
  styles: [`
    :host {
        display: -webkit-flex; /* Safari */
        -webkit-justify-content: space-around; /* Safari 6.1+ */
        display: flex;
        justify-content: space-around;
        width: 100%
        padding-top: 10px
    } 

    .description-container{
        width: 20%;
        text-align: center;
        padding-top: 7px;
    }

    .descrition{
        width: 100%;
    }

    .description-text {
        display: -webkit-inline-box;
        padding: 5px;
        border: 1px solid;
        border-radius: 25px;
        margin: 0px;
    }

    .lines-container {
        display: block;
        width: 100%;
    }

  `]
})
export class Section  { 
    @Input() description:string = ''
}

@Component({
    selector: 'song',
    template: `
    <div class="page" size="A4">
        <h1>{{name}}</h1>
        <ng-content></ng-content>
        <div style="page-break-after:always;"></div>
    </div>
    `

})
export class Song{
    @Input() name:string = '';
}
