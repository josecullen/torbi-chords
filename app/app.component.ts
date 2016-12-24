import { Component } from '@angular/core';

import { Bar, LineBar } from './bars/bars.component'
import { CommonModule, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';



// <div class="no-print">
//   <textarea rows="10" cols="70" [(ngModel)]="value"></textarea>
//   <button (click)="convertSongs()">Convert</button>
// </div>






@Component({
  selector: 'my-app',
  template: `
<router-outlet></router-outlet>
`,
  styles: [`
    :host {
      height: 100%;
    }

  `]
})
export class AppComponent  { 
  value:string = ``;
  songs:Array<any> = new Array()

  convertSongs(){
    this.songs = new Array()
    let songsLines:Array<Array<string>> = this.divideSongs(this.value)
    
    songsLines.forEach(songLines => {
      let song = {
        title: "",
        sections : new Array<any>()
      }

      for(let i = 0; i < songLines.length; i++){
        let line = songLines[i]
        
        if (line.includes('song')) {
          song.title = this.extractTitle(line)
        }

        else if (line.includes("section")){
          let section = {
            title : this.extractTitle(line),
            lines : new Array()
          }
          song.sections.push(section)
        }

        else if (line.includes("|")) {
          let songLine:any = {
            instructions : new Array(),
            bars         : new Array()
          }

          line.split('|')
              .filter(bar => bar.trim() !== "")
              .forEach(barRaw => {
                songLine.bars.push(this.createBar(barRaw))
                songLine.instructions.push(this.obtainInstruction(barRaw))
              })
              
          song.sections[song.sections.length-1]
              .lines
              .push(songLine)
          
        }
      }
      this.songs.push(song)
      
    })
    console.log('songs', this.songs)
  }

  divideSongs(lines:string):Array<Array<string>>{
    let songLines:Array<string> = new Array()
    let songsLines:Array<Array<string>> = new Array()
    lines
        .split('\n')
        .forEach( line => {
          if (line.includes('song')) {
            if (songLines.length > 0) {
              songsLines.push(songLines)
            } 
            songLines = new Array()
          }
          songLines.push(line)
        })
    songsLines.push(songLines)
    return songsLines
  }

  createBar(barRaw:string):any{
    let bar = {
      chords: new Array(),
      type  : this.obtainBarType(barRaw)
    }

    let chords = barRaw
      .split(' ')
      .map(chord => chord.replace(":", "").trim())
      .filter(chord => chord !== "" )
      .filter(chord => !chord.includes('('))

    bar.chords = chords

    return bar
  }

  obtainBarType(barRaw:string):string{
    let type = 'common'
    if(barRaw.includes(':')){
      barRaw.trim().split(' ')[0] === ":"
        ? type = "repeat-start"
        : type = "repeat-end"
    }
    return type
  }

  obtainInstruction(barRaw:string):any{
    let instruction:any = false
    if(barRaw.includes('(') && barRaw.includes(')')){
      let instructionsRaw = this.extractInstructions(barRaw)      
      if(instructionsRaw.includes('condition=')){
        var condition = /condition=(\d)/
        instruction = {
          condition : instructionsRaw.match(condition)[1]+"."
        }
      }
    } 
    return instruction
  }

  extractTitle( str:string ):string{
    var ret = "";

    if ( /"/.test( str ) ){
      ret = str.match( /"(.*?)"/ )[1];
      console.log('str',str,'ret', ret)
    } else {
      ret = str;
    }
    return ret;
  }

  extractInstructions(str:string):string{
    var regExp = /\(([^)]+)\)/;
    var matches = regExp.exec(str);
    return matches[1]
  }

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

/*

song "flaca"
  section "intro"
    |: G | B7 | Em | C :|
    | G | D  | G  | D |

    

*/
