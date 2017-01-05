import { Component, OnInit } from '@angular/core';
import { Song, SongBook } from '../models/models'
import { SongService } from '../services/song.service'
import { BookService } from '../services/book.service'
@Component({
  template: `
    <div class="container fill-height">
      <md-toolbar color="primary">
        <span>Application Title</span>
        <span class="example-fill-remaining-space"></span>
        <span>Right Aligned Text</span>
      </md-toolbar>
      <div [fxLayout]="'column'" class="section fill-height fill-children">
          <div fxFlex class="grow fill-height">
            <div [fxLayout]="'row'" class="my-creations grow">
              <md-card fxFlex="50" class="card-left">
                <md-card-content>
                    <md-tab-group>
                        <md-tab label="Letra y Acordes">
                            <md-input-container style="width:100%">
                                <textarea 
                                    md-input 
                                    md-autosize
                                    style="width:100%" 
                                    [(ngModel)]="exampleText"></textarea>
                            </md-input-container>
                        </md-tab>
                        <md-tab label="Compases"></md-tab>
                        <md-tab label="Tabs y Partituras"></md-tab>
                    </md-tab-group>
                </md-card-content>
              </md-card>
              <md-card fxFlex="50" class="card-left card-right">preview</md-card>
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
    
    

  `]

})
export class EditorView implements OnInit{ 
  songs:Array<Song> = []
  books:Array<SongBook> = []
  direction = "row";
  
  constructor(
    private songService:SongService,
    private bookService:BookService){

  }

  ngOnInit(){
   
  }


}

const DIRECTIONS = ['row', 'row-reverse', 'column', 'column-reverse'];