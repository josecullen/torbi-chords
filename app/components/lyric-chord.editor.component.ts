import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Song, SongBook } from '../models/models'
import { SongService } from '../services/song.service'
import { BookService } from '../services/book.service'
@Component({
  selector: 'lyric-chord-editor',
  template: `
    <md-input-container style="width:100%">
        <textarea 
            md-input 
            md-autosize
            style="width:100%" 
            (keyup)="onTextChange()"
            [(ngModel)]="raw"></textarea>
    </md-input-container>
  `
})
export class LyricChordEditor{ 
  raw:string = ""
  lyricPreview:Array<any> = []
  @Output() songChange:EventEmitter<any> = new EventEmitter()

  onTextChange(){
      this.convertLyric()
  }

  convertLyric(){
        this.lyricPreview = []

        this
            .raw
            .split('\n')
            .forEach(lineRaw => {
                if(lineRaw.trim() !== ''){
                    if(lineRaw.includes("section(") && lineRaw.includes(")")){
                        let sectionArr = lineRaw.match(/section\((.*?)\)/)
                        let sectionName = ""
                        if(sectionArr.length > 1){
                            sectionName = sectionArr[1]
                        }
                        this.lyricPreview.push({
                            name: sectionName,
                            lines: []
                        })
                    } 
                    else if(this.lyricPreview.length > 0){
                        let line:Array<any> = []
                        while(lineRaw.includes('[') && lineRaw.includes(']')){
                            let beginChord = lineRaw.indexOf('[')
                            let endChord = lineRaw.indexOf(']')
                            let text = lineRaw.substring(0, beginChord)
                            
                            let segment = {
                                text: text,
                                chord: lineRaw.substring(beginChord+1, endChord)
                            }
                            line.push(segment)
                            lineRaw = lineRaw.substring(endChord+1, lineRaw.length)
                        }
                        line.push({text:lineRaw})
                        this.lyricPreview[this.lyricPreview.length -1].lines.push(line)
                    }
                    
                }    
            })
        this.songChange.emit(this.lyricPreview)
    }



}
