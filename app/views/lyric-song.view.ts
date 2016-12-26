import { Component, OnInit } from '@angular/core';
import { Song, SongBook } from '../models/models'
import { SongService } from '../services/song.service'
import { BookService } from '../services/book.service'
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  template: `

  <header></header>
  <section>
    <div *ngIf="!preview" class="container">
        <textarea [(ngModel)]="raw" style="width:300px; height:100px;"></textarea>   
    </div>
    <div *ngIf="preview" class="container song-preview">
        <p *ngFor="let line of songPreview">
            <span *ngFor="let segment of line; let i = index">
                <span 
                    class="text" [ngClass]="'text-left-'+i" >{{segment.text}}</span>
                <span class="chord" *ngIf="segment.chord !== undefined">{{segment.chord}}</span>
            </span>
        </p>
    </div> 
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

header {
  min-height: 50px;
  background-color: red;
}

section {
  min-height: 50px;
  background-color: green;
  flex-grow: 1;
}

footer {
  min-height: 50px;
  background-color: aliceblue;
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

.chord {
    position: relative;
    top: -1em;
    left: -1em;
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
export class LyricSongView implements OnInit{ 
    preview:boolean = false;
    raw:string = `
    Flaca[G] no me cla[B7]ves, 
    tus puñales[Em] por la espalda[C]
    tan profundo[G] no me duelen [D7]
    no me hacen mal[G]    [D7]
    `
    songPreview:Array<any> = []
    s:any;    

  constructor(
    private songService:SongService,
    private bookService:BookService,
    private sanitizer:DomSanitizer){
        // this.s = this.sanitizer.bypassSecurityTrustStyle("calc(-i * 6em)")
        this.s = this.sanitizer.bypassSecurityTrustStyle("-2em")
        console.log(this.s)
  }

  calculateLeft(i:number){
      console.log(i, (i * 0.6) + "em;")
      this.s = this.sanitizer.bypassSecurityTrustStyle((i * 0.6) + "em;")
      return this.sanitizer.bypassSecurityTrustStyle("2em") 
  }


  ngOnInit(){}
  
  setPreview(show:boolean){
      this.preview = show;
      if(show){
          this.songPreview = []

          this
            .raw
            .split('\n')
            .forEach(lineRaw => {
                if(lineRaw.trim() !== ''){
                    let line:Array<any> = []
                    while(lineRaw.includes('[')){
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
                    this.songPreview.push(line)
                }
                
            })
          console.log('preview', this.songPreview)
      }
      
  }
}

