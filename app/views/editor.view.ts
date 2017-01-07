import { Component, OnInit } from '@angular/core';
import { Song, SongBook } from '../models/models'
import { SongService } from '../services/song.service'
import { BookService } from '../services/book.service'
@Component({
  template: `
    <div class="container fill-height">
      <md-toolbar color="accent">
        <span>Application Title</span>
        <span class="example-fill-remaining-space"></span>
        <span>Right Aligned Text</span>
      </md-toolbar>
      <md-toolbar>
        <md-input md-input placeholder="Title" [(ngModel)]="song.title" ></md-input>
        <md-input md-input placeholder="Author" [(ngModel)]="song.author"></md-input>
      </md-toolbar>
        
      <div [fxLayout]="'column'" class="section fill-height fill-children">
          <div fxFlex class="grow fill-height">
            <div [fxLayout]="'row'" class="my-creations grow">
              <md-card fxFlex="50" class="card-left">
                <md-card-content>
                    <md-tab-group [(selectedIndex)]="tabIndex">
                        <md-tab label="Letra y Acordes">
                            <lyric-chord-editor
                              (songChange)="onLyricChordChange($event)">
                            </lyric-chord-editor>
                        </md-tab>
                        <md-tab label="Compases"></md-tab>
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
                  <md-card-title>{{song.title}}</md-card-title>
                  <md-card-subtitle>{{song.author}}</md-card-subtitle>
                </md-card-header>
                
                <md-card-content style="height:80%">
                  
                  
                  <div style="height:100%; overflow:auto">
                    <div *ngIf="tabIndex === 0">
                      <div *ngFor="let section of lyricChordConverted" >
                        <h3>{{section.name}}</h3>
                        <div *ngFor="let line of section.lines">
                          <div *ngIf="isTab(line)">
                            <canvas vextab="{{getTabString(line)}}"></canvas>
                          </div>    
                          <p *ngIf="!isTab(line)">  
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
                    </div>
                  
                    <div *ngIf="tabIndex === 2"> 
                      <div *ngFor="let tab of tabConverted">
                        <h3>{{tab.name}}</h3>
                        <canvas vextab="{{tab.vextab}}"></canvas>
                      </div>
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
export class EditorView implements OnInit{ 
  song:Song = new Song()
  direction = "row";
  lyricChordConverted:any
  tabIndex:number = 0
  tabConverted:any
  constructor(
    private songService:SongService,
    private bookService:BookService){

  }

  ngOnInit(){
   
  }

  getTabString(line:any){
    console.log('getTabString')
    let matchSegment = line.find((segment:any) => segment.text.includes('tab(') && segment.text.includes(')'))
    let tabArr = matchSegment.text.match(/tab\((.*?)\)/)
    let tabName = ""
    let tab:any = ""
    if(tabArr.length > 1){
        tabName = tabArr[1]
        tab = this.tabConverted.find((tab:any) => tab.name === tabName).vextab || ""
    }
    return tab
  }

  onLyricChordChange(newVersion:any){
    this.lyricChordConverted = newVersion
  }

  onTabChange(newVersion:any){
    this.tabConverted = newVersion
  }

  isTab(line:Array<any>){
    console.log('isTab')
    return line.some(segment => segment.text.includes('tab(') && segment.text.includes(')'))
  }


}

const DIRECTIONS = ['row', 'row-reverse', 'column', 'column-reverse'];