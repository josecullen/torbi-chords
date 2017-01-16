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
            <md-card fxFlex="65">1</md-card>
          <div fxFlex class="grow fill-height">
            <div [fxLayout]="'row'" class="my-creations grow">
              <md-card fxFlex="15" class="card-left">pubasdasdak</md-card>
              <md-card fxFlex="30" class="card-left card-right">2</md-card>
              <md-card fxFlex="30" class="card-left card-right">3</md-card>
              <md-card fxFlex="25" class="card-right">4</md-card>
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
export class HomeView implements OnInit{ 
  songs:Array<Song> = []
  books:Array<SongBook> = []
  direction = "row";
  

   toggleDirection() {
     let next = (DIRECTIONS.indexOf(this.direction) +1 ) % DIRECTIONS.length;
     this.direction = DIRECTIONS[next];
   }

  constructor(
    private songService:SongService,
    private bookService:BookService){

  }

  ngOnInit(){
   
  }


}

const DIRECTIONS = ['row', 'row-reverse', 'column', 'column-reverse'];