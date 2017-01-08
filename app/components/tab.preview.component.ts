import { Component, Input } from '@angular/core';

@Component({
  selector: 'tab-preview',
  template: `
    <div *ngFor="let tab of tabs">
        <h3>{{tab.name}}</h3>
        <canvas vextab="{{tab.vextab}}"></canvas>
    </div>
  `
})
export class TabPreview { 
    @Input() tabs:any

}
