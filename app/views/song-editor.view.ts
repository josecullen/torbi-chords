import { Component, OnInit } from '@angular/core';
import { Song, SongBook } from '../models/models'
import { SongService } from '../services/song.service'
import { BookService } from '../services/book.service'
import {DomSanitizer} from '@angular/platform-browser';
import { ChordConverter, ChordSong } from '../chords/chords.converter'

@Component({
  template: `
  <header></header>
  <section class="section-main">
    <aside class="editor">
        <nav>
            <md-input-container>
                <input md-input placeholder="Title">
            </md-input-container>

            <md-input-container>
                <input md-input placeholder="Author">
            </md-input-container>
        </nav>
        
        <md-tab-group (selectChange)="tabChange($event)">
            <md-tab label="Letra">
                letra
                <section class="section-editor">
                    <textarea 
                        class="textarea" 
                        (ngModelChange)="convertLyric()" 
                        [(ngModel)]="song.lyricRaw" rows="20">
                    </textarea>
                </section>
            </md-tab>
            <md-tab label="Compases">
            compases
                <section class="section-editor">
                    <textarea 
                        class="textarea" 
                        (ngModelChange)="convert()" 
                        [(ngModel)]="song.raw" rows="20">
                    </textarea>
                </section>
            </md-tab>
        </md-tab-group>

<!--
        <md-toolbar>
            <button md-button (click)="type = 'lyric' ">Letra</button>
            <button md-button (click)="type = 'bar'" >Compases</button>
        </md-toolbar>
    
        
        <section class="section-editor">
            <textarea 
                *ngIf="type === 'bar'"
                class="textarea" 
                (ngModelChange)="convert()" 
                [(ngModel)]="song.raw" rows="20">
            </textarea>
            <textarea 
                *ngIf="type === 'lyric'"
                class="textarea" 
                (ngModelChange)="convertLyric()" 
                [(ngModel)]="song.lyricRaw" rows="20">
            </textarea>
        </section>
        -->
    </aside>
    <aside class="preview">
        <section class="section-preview">
            <song [name]="previewSong.title" *ngIf="type === 'bar'">
                <section-song *ngFor="let section of previewSong.sections" [description]="section.title">
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

            

            <div *ngIf="type === 'lyric'" class="container song-preview">
                
                <p *ngFor="let line of lyricPreview">
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

        </section>
    </aside>
  </section>

  <footer>
    <div>
      <button (click)="setPreview(!preview)">Preview</button>
      <a routerLink="/book/create">Crear Libro</a>
      <a routerLink="/song/create">Crear Canción</a>
    </div>
  </footer>
  
`,
  styles: [`

:host {
    height: 100%;
    display: flex;
    flex-direction: column;
}
md-grid-tile {
    background-color: aliceblue;
    border: 1px dotted;
}
header {
  min-height: 50px;
  background-color: red;
}

.section-main {
  min-height: 50px;
  flex-grow: 1;
  display: flex;
}

footer {
  min-height: 50px;
  background-color: aliceblue;
}

.section-editor {
    background-color: #FDF;
    flex-grow: 1;
}

.section-preview {
    background-color: #DFD;
    flex-grow: 1;
    font-family: courier;
}

.editor {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
}

.preview {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    background-color: #DDD;
}

.textarea {
    flex-grow: 1;
    width: 90%;
}


.song-preview {
    line-height:1em; 
    margin-bottom:1.1em;  
    font-family: Arial;
}

.text-left-1 {
    left: -0.6em;
}

.text-left-2 {
    left: -1.2em;
}

.text-left-3 {
    left: -1.8em;
}

.text-left-4 {
    left: -2.4em;
}

.chord-left-0 {
    left: -1em;
}

.chord-left-1 {
    left: -1.6em;
}

.chord-left-2 {
    left: -2.2em;
}

.chord-left-3 {
    left: -2.8em;
}

.chord-left-4 {
    left: -3.4em;
}

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
  
.text {
    position: relative;
    white-space:pre;
}




  `]

})
export class SongEditorView implements OnInit{ 
    preview:boolean = true;
    song:Song = new Song()
    previewSong:ChordSong = new ChordSong()
    lyricPreview:Array<any> = []
    type:string = 'lyric'

    ngOnInit(){}
  
    convert(){
      this.previewSong = ChordConverter.convert(this.song.raw)
      console.log(this.previewSong)
    }

    tabChange(selection:any){
        console.log(selection)
        this.type = selection.index === 0 ? 'lyric' : 'bar'
    }

    convertLyric(){
        this.lyricPreview = []

        this
            .song
            .lyricRaw
            .split('\n')
            .forEach(lineRaw => {
                if(lineRaw.trim() !== ''){
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
                    this.lyricPreview.push(line)
                }    
            })
        console.log('lyricPreview', this.lyricPreview)
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

