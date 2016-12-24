import { Component, OnInit } from '@angular/core';
import { Song, SongBook } from '../models/models'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SongService } from '../services/song.service'
import { BookService } from '../services/book.service'

@Component({
  template: `
  <header>
    <a routerLink="/home">Home</a>
  </header>
  <section>
        <label>Título</label>
        <input [(ngModel)]="book.title">
        <label>Autor</label>
        <input [(ngModel)]="book.author">
        <label>Descripción</label>
        <input [(ngModel)]="book.description">
        <h3>Canciones Elegidas</h3>
        <ul>
          <li *ngFor="let song of book.songs; let i = index">
            <div>
              <span>{{song.title}}</span>
              <button (click)="songs.push(book.songs.splice(i,1)[0])">Remove</button>
            </div>
          </li>
        </ul>
        <h3>Todas las canciones</h3>
        <ul>
          <li *ngFor="let song of songs; let i = index">
            <div>
              <span>{{song.title}}</span>
              <button (click)="book.songs.push(songs.splice(i, 1)[0])">Add</button>
            </div>
          </li>
        </ul>

        <button type="submit" (click)="save()">Guardar</button>
  </section>
  <footer>
    <div>
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
  
  `]

})
export class CreateBookView implements OnInit { 
    book:SongBook = new SongBook();
    songs:Array<Song> = []

    constructor(
      private songService:SongService,
      private bookService:BookService,
      private route: ActivatedRoute,
      private router: Router){
    }

    ngOnInit(){

      this.route.params.subscribe((params: Params) => {
       let id = params['id'];
       console.log('id', id)
       if(id !== undefined){
         this.bookService
             .retrieve(id)
             .subscribe(
               book => {
                 book._id = book._id.toString()
                 this.book = book
                 this.filterSongs()
               },
               err  => console.error('err',err)
             )
       }
      });

      this.songService
          .retrieveAll()
          .subscribe(
            songs => {
              this.songs = songs
              this.filterSongs()
            },
            err  => console.error(err)
          );
    }

    save(){
      this.bookService
          .save(this.book)
          .subscribe(
            book => this.book._id = book._id,
            err  => console.error(err)
          )
    }

    filterSongs(){
      if(this.songs){
        this.songs = this.songs.filter(song => 
          !this.book.songs.some(songInBook => songInBook._id.toString() === song._id.toString())
        )
      }
    }

    print(el:any){
      return JSON.stringify(el)
    }
  }

