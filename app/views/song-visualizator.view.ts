import { Component, OnInit, ApplicationRef, ChangeDetectionStrategy } from '@angular/core';
import { Song, SongBook } from '../models/models'
import { SongService } from '../services/song.service'
import { BookService } from '../services/book.service'
import { ChordSong } from '../chords/chords.converter'
import {DomSanitizer} from '@angular/platform-browser';
import {MdIconRegistry} from '@angular/material';
import { Subject } from 'rxjs/Subject'
declare var fitText: any
// <pre id="fittext">{{song}}</pre>
@Component({
  template: `
    <div class="container fill-height">
      <md-toolbar color="accent">
        <span>Application Title</span>
        <a md-mini-fab (click)="splitSong(1)">1</a>
        <a md-mini-fab (click)="splitSong(2)">2</a>
        <a md-mini-fab (click)="splitSong(3)">3</a>
        <a md-mini-fab (click)="splitSong(-1)">*</a>
        <a md-mini-fab (click)="auto()">
          <md-icon>autorenew</md-icon>
        </a>
        <input md-input [(ngModel)]="min">
        <input md-input [(ngModel)]="max">
        <span class="example-fill-remaining-space"></span>
        <span>Right Aligned Text</span>
      </md-toolbar>
      <md-card class="fill-height">
        <md-card-content fit-text="{{change}}" class="fill-height">
            <lyric-chord-preview
              [lyricChord]="splitedSong">
            </lyric-chord-preview>
        </md-card-content>
      </md-card>
      <md-toolbar color="accent">
        <a md-mini-fab (click)="moveBack()">
          <md-icon>arrow_back</md-icon>
        </a>

        <span class="example-fill-remaining-space"></span>
        <a md-mini-fab (click)="moveForward()">
          <md-icon>arrow_forward</md-icon>
        </a>
      </md-toolbar>  
    </div>
    

  `,
  styles: [`
    
    .fill-height {
      display: flex;
      flex-direction: column;
      flex-grow: 10;
    }
    
    .container {
      height: 100%;
      background-color: #EEE;
    }

    md-card {
      margin-top: 5px;
      margin-bottom: 5px;
      min-height: 100px;
    }

    md-card-content {
      width: 100%;
    }

    p {
      width: 100%;
    }

    .example-fill-remaining-space {
      flex: 1 1 auto;
    }

  `]

})
export class SongVisualizatorView implements OnInit{ 
  song :any = [{"name":"Intro","lines":[[{"text":"chords(G B7 Em C | G D G D7)"}]]},{"name":"A","lines":[[{"text":"Flaca","chord":"G"},{"text":", no me clave","chord":"B7"},{"text":"s tus puñale","chord":"Em"},{"text":"s"}],[{"text":"por la espalda","chord":"C"},{"text":", tan profundo","chord":"G"},{"text":""}],[{"text":"no me duele","chord":"D"},{"text":"n"}],[{"text":"no me hacen ma","chord":"G"},{"text":"l     ","chord":"D7"},{"text":""}]]},{"name":"A'","lines":[[{"text":"Lejo","chord":"G"},{"text":"s, en el centro","chord":"B7"},{"text":" de la tierra","chord":"Em"},{"text":""}],[{"text":"las raíce","chord":"C"},{"text":"s del amo","chord":"G"},{"text":"r"}],[{"text":"donde estaba","chord":"D"},{"text":"n "}],[{"text":"quedará","chord":"G"},{"text":"n    ","chord":"D7"},{"text":""}]]},{"name":"B","lines":[[{"text":"E","chord":"G"},{"text":"ntre 'no me olvides' "}],[{"text":"me dejé","chord":"B7"},{"text":" nuestros abriles olvida","chord":"Em"},{"text":"dos"}],[{"text":"en el fondo del placa","chord":"C"},{"text":"rd"}],[{"text":"Del cuarto de invita","chord":"G"},{"text":"dos."}],[{"text":"Eran tiempos dora","chord":"D"},{"text":"dos"}],[{"text":"un pasado mejo","chord":"G"},{"text":"r     ","chord":"D7"},{"text":""}]]}]

  splitedSong:any = this.song
  sectionPerView:number
  offset:number = 0
  change:number = 0
  min:number = 15
  max:number = 18

  constructor(
    private iconRegistry: MdIconRegistry, 
    private sanitizer: DomSanitizer, 
    private ref:ApplicationRef) {
      iconRegistry.addSvgIcon(
          'numeric-1-box',
          sanitizer.bypassSecurityTrustResourceUrl('assets/images/numeric-1-box.svg'));
  }

  

  ngOnInit(){
    // setTimeout(() => fitText(document.getElementById("fittext"), 2.2), 2000)
  }

  splitSong(sections:number, offset:number = 0){
    this.sectionPerView = sections
    this.offset = offset
    if(sections < 1){
      this.splitedSong = JSON.parse(JSON.stringify(this.song))
    } else {
      this.splitedSong = (<Array<any>>this.song).slice(this.offset, this.offset + sections)
    }
    
    this.change++
  }

  moveBack() {
    this.offset -= this.sectionPerView
    this.splitedSong = (<Array<any>>this.song).slice(this.offset, this.offset + this.sectionPerView)
    this.change++
  }
  
  moveForward() {
    this.offset += this.sectionPerView
    this.splitedSong = (<Array<any>>this.song).slice(this.offset, this.offset + this.sectionPerView)
    this.change++
  }

}

const DIRECTIONS = ['row', 'row-reverse', 'column', 'column-reverse'];
