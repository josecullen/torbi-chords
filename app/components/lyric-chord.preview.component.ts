import { Component, Input } from '@angular/core';

@Component({
  selector: 'lyric-chord-preview',
  template: `
    <div *ngFor="let section of lyricChord" >
        <h3>{{section.name}}</h3>
        <div *ngFor="let line of section.lines">
            <div *ngIf="isTab(line)">
                <canvas vextab="{{getTabString(line)}}"></canvas>
            </div>    
            <p *ngIf="isChord(line)" >
                <span
                    class="inline-chord"
                    [ngClass]="'chord-left-'+i"
                    *ngFor="let chord of getChordArray(line)">{{chord}}</span>
            </p>
            <p *ngIf="!isTab(line) && !isChord(line)">  
                <span *ngFor="let segment of line; let i = index">
                    <span 
                        class="text" 
                        [ngClass]="'text-left-'+i">{{segment.text}}</span>
                    <span 
                        class="chord"
                        [ngClass]="'chord-left-'+i"
                        *ngIf="segment.chord !== undefined">{{segment.chord}}</span>
                </span>
            </p>
        </div>  
    </div>
  `,
  styles: [`
.text-left-1 {   left: -0.6em; }
.text-left-2 {   left: -1.2em; }
.text-left-3 {   left: -1.8em; }
.text-left-4 {   left: -2.4em; }

.chord-left-0 {  left: -1em; }
.chord-left-1 {  left: -1.6em; }
.chord-left-2 {  left: -2.2em; }
.chord-left-3 {  left: -2.8em; }
.chord-left-4 {  left: -3.4em; }

.chord {
    position: relative;
    top: -1em;
    display:inline-block; 
    width: 0;
    overflow:visible; 
    color:#00F;
    font-weight:bold;
    font-family: Arial;
    text-decoration: none;
}

.inline-chord {
    color: #00F;
    font-weight: bold;
    font-family: Arial;
    text-decoration: none;
    padding-right: 10px;
}
  
.text {
    position: relative;
    white-space:pre;
}

  
  `]
})
export class LyricChordPreview { 
    @Input() lyricChord:any
    @Input() tabs:any

    isTab(line:Array<any>){
        return line.some(segment => segment.text.includes('tab(') && segment.text.includes(')'))
    }

    isChord(line:Array<any>){
        return line.some(segment => segment.text.includes('chords(') && segment.text.includes(')'))
    }

    getTabString(line:any){
        let tab:any = ""
        if(line !== undefined){
            let matchSegment = line.find((segment:any) => segment.text.includes('tab(') && segment.text.includes(')'))
            let tabArr = matchSegment.text.match(/tab\((.*?)\)/)
            let tabName = ""
            
            if(tabArr.length > 1){
                tabName = tabArr[1]
                if(this.tabs){
                    tab = this.tabs.find((tab:any) => tab.name === tabName) || ""
                    if(tab){
                        tab = tab.vextab
                    }
                } else {
                    return ""
                }
            }
        }
        return tab
    }

    getChordArray(line:any){
        let result:Array<string> = new Array()
        if(line !== undefined){
            let matchSegment = line.find((segment:any) => segment.text.includes('chords(') && segment.text.includes(')'))
            let chordsArr = matchSegment.text.match(/chords\((.*?)\)/)
            if(chordsArr.length > 1){
                result = chordsArr[1].split(' ')
            }
        }
        return result
    }

}
