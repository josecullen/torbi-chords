import { Component, OnInit } from '@angular/core';
import { Song, SongBook } from '../models/models'
import { SongService } from '../services/song.service'
import { BookService } from '../services/book.service'
import { ChordSong } from '../chords/chords.converter'

@Component({
  template: `
    <div class="container fill-height">
      <md-toolbar color="accent">
        <span>Application Title</span>
        <span class="example-fill-remaining-space"></span>
        <span>Right Aligned Text</span>
      </md-toolbar>
      <md-toolbar>
        <md-input placeholder="Title" [(ngModel)]="song.title" ></md-input>
        <md-input placeholder="Author" [(ngModel)]="song.author"></md-input>
      </md-toolbar>
      <div [fxLayout]="'column'" class="section fill-height fill-children">
          <div fxFlex class="grow fill-height">
            <div [fxLayout]="'row'" class="my-creations grow">
              <md-card fxFlex="50" class="card-left" style="overflow:auto">
                <md-card-content>
                    <md-tab-group [(selectedIndex)]="tabIndex">
                        <md-tab label="Letra y Acordes">
                            <div style="height:100%; overflow:auto">
                              <lyric-chord-editor
                                (songChange)="onLyricChordChange($event)">
                              </lyric-chord-editor>
                            </div>
                        </md-tab>
                        <md-tab label="Compases">
                            <bars-editor
                              (songChange)="onBarsChange($event)">
                            ></bars-editor>
                        </md-tab>
                        <md-tab label="Tabs y Partituras">
                            <tab-editor
                              (tabChange)="onTabChange($event)">
                            </tab-editor>
                        </md-tab>
                    </md-tab-group>
                </md-card-content>
              </md-card>
              <md-card fxFlex="50" class="card-left card-right">
                
                <md-card-header>
                  <md-card-title>
                    <h2>{{song.title}}</h2>
                  </md-card-title>
                  <md-card-subtitle>{{song.author}}</md-card-subtitle>
                </md-card-header>
                
                <md-card-content style="height:80%; margin-left:8px;">
                  
                  
                  <div style="height:100%; overflow:auto">
                    <div *ngIf="tabIndex === 0">
                      <lyric-chord-preview 
                        [lyricChord]="lyricChordConverted"
                        [tabs]="tabConverted">
                      </lyric-chord-preview>
                    </div>
                  
                    <div *ngIf="tabIndex === 1"> 
                      <bars-preview [bars]="barsConverted"></bars-preview>
                    </div>

                    <div *ngIf="tabIndex === 2"> 
                      <tab-preview [tabs]="tabConverted"></tab-preview>
                    </div>
                  </div>
                  
                </md-card-content>
              </md-card>
            </div>
          </div>
      </div>
    </div>

  `,
  styles: [`
    
    .fill-height {
      display: flex;
      flex-direction: column;
      flex-grow: 10;
    }

   .fill-children > div {
      display: flex;
      flex-direction: column;
      flex-grow: 10;
    }

    md-card {
      margin-top: 5px;
      margin-bottom: 5px;
      min-height: 100px;
    }

    md-card-title {
      margin-bottom: 8px;
    }

    md-card-title > h2 {
      margin-bottom: 0px;
    }

    .grow {
      flex: 1 1 auto !important;
    }
    
    .section {
      display: flex;
      box-sizing: border-box;
      flex-direction: column;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      flex-grow: 10;
      margin-left: 5px;
      margin-right: 5px;
    }
    
    .container {
      height: 100%;
      background-color: #EEE;
    }

    .my-creations {
      min-height: 350px;
    }

    .row-card {
      flex-grow: 1;
    }

    .card-left {
      margin-right: 5px;
    }

    .card-right {
      margin-left: 5px;
    }

    .example-fill-remaining-space {
      flex: 1 1 auto;
    }

  `]

})
export class EditorView implements OnInit{ 
  song:Song = new Song()
  direction = "row";
  lyricChordConverted:any
  barsConverted:ChordSong = new ChordSong()
  tabIndex:number = 0
  tabConverted:any

  constructor(
    private songService:SongService,
    private bookService:BookService){

  }

  ngOnInit(){
   
  }

  onLyricChordChange(newVersion:any){
    this.lyricChordConverted = newVersion
  }

  onBarsChange(newVersion:ChordSong){
    this.barsConverted = newVersion || new ChordSong()
  }

  onTabChange(newVersion:any){
    this.tabConverted = newVersion
  }

  


}

const DIRECTIONS = ['row', 'row-reverse', 'column', 'column-reverse'];