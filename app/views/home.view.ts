import { Component, OnInit } from '@angular/core';
import { Song, SongBook } from '../models/models'
import { SongService } from '../services/song.service'
import { BookService } from '../services/book.service'
@Component({
  template: `

  <header></header>
  <section>
    <h3>Canciones</h3>
    <div *ngFor="let song of songs">
      <a routerLink="../song/{{song._id}}">{{song.title}}</a>
      <br>
    </div>
    <h3>Libros de canciones</h3>
    <div *ngFor="let book of books">
      <a routerLink="../book/{{book._id}}">{{book.title}}</a>
      <br>
    </div>
  </section>
  <footer>
    <div>
      <a routerLink="/book/create">Crear Libro</a>
      <a routerLink="/song/create">Crear Canción</a>
      <a routerLink="/lyric-song/create">Crear Letra y Acordes</a>
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
export class HomeView implements OnInit{ 
  songs:Array<Song> = []
  books:Array<SongBook> = []

  constructor(
    private songService:SongService,
    private bookService:BookService){

  }

  ngOnInit(){
    this.songService
        .retrieveAll()
        .subscribe(
          songs => this.songs = songs,
          err   => console.error(err))
    
    this.bookService
        .retrieveAll()
        .subscribe(
          books => this.books = books,
          err   => console.error(err)
        )

  }

  print(song:Song){
    return JSON.stringify(song)
  }

}

