import { Component, Input } from '@angular/core';
import { ChordConverter, ChordSong } from '../chords/chords.converter'

@Component({
  selector: 'bars-preview',
  template: `
    <song [name]="bars.title" >
      <section-song *ngFor="let section of bars.sections" [description]="section.title">
        <line-bar *ngFor="let line of section.lines" [style.width]="calculateWidth(line)">
          <instructions>
            <bar-no-border *ngFor="let instruction of line.instructions">
              <chords *ngIf="instruction.hasInstruction">
                <condition [condition]="instruction.condition"></condition>
              </chords>
            </bar-no-border>
          </instructions>
          <bars>
            <bar [type]="bar.type" *ngFor="let bar of line.bars">
              <chords>
                <quarter-note *ngFor="let chord of bar.chords" [note]="chord"></quarter-note>
              </chords>
            </bar>
          </bars>
        </line-bar>
      </section-song>
    </song> 
  `,
  styles: [`
  
:host {
    height: 100%;
    display: flex;
    flex-direction: column;
}

.container {
    height: 100%;
    display: flex;
    flex-direction: column;
}

header {
  min-height: 50px;
  background-color: red;
}

bars {
    width: 100%;
    display: -webkit-flex;
    -webkit-justify-content: space-around; 
    display: flex;
    justify-content: space-between;
    border-right: 1px solid black;
} 

instructions, quarter-note {
    width: 100%;
    display: -webkit-flex; 
    -webkit-justify-content: space-around; 
    display: flex;
    justify-content: space-between;
} 

chords {
  width: 90%;
  display: flex;
  justify-content: space-between;
}

line-bar {
  width: 100%;
}

  `]
})
export class BarsPreview { 
    @Input() bars:ChordSong = new ChordSong()
    
    calculateWidth(line:any):string{
      let barLength = line.bars.length
      let width = barLength >= 4 
        ? "100%"
        : barLength === 3
          ? "75%"
          : barLength === 2
            ? "50%"
            : "25%"
      return width
    }
}
