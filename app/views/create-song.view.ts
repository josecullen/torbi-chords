import { Component, OnInit } from '@angular/core';
import { ChordConverter, ChordSong } from '../chords/chords.converter'
import { SongService } from '../services/song.service'
import { Song } from '../models/models'
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  template: `

<div *ngIf="!preview" class="container">
  <header>
    <a routerLink="/home">Home</a>
  </header>  
  <section>
        <label>Título</label>
        <input [(ngModel)]="song.title">
        <label>Autor</label>
        <input [(ngModel)]="song.author">
        <textarea [(ngModel)]="song.raw" rows="20"></textarea>
        <button type="submit" (click)="save() ">Guardar</button>
        <button *ngIf="song._id !== ''" (click)="delete() ">Eliminar</button>
  </section>
  <footer>
    <div>
      <a (click)="setPreview(true)">Preview</a>
      <a routerLink="book/create">Crear Libro</a>
      <a routerLink="song/create">Crear Canción</a>
    </div>
  </footer>
</div>

<div *ngIf="preview" class="container">
<header>
    <a (click)="setPreview(false)">Preview</a>
</header>


<section>
  <song [name]="previewSong.title">
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
</section>



</div>


`,
  styles: [`

:host {
    height: 100%;
    display: flex;
    flex-direction: column;
}

.container {
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
  background-color: blue;
}

textarea {
  width: 80%;
  height: 50%;
}

  
  `]

})
export class CreateSongView implements OnInit{ 
    song:Song = new Song()
    preview:boolean = false;
    previewSong:ChordSong

    constructor(
      private songService:SongService,
      private route: ActivatedRoute,
      private router: Router){
      


    }

    ngOnInit(){
      this.route.params.subscribe((params: Params) => {
       let id = params['id'];
       if(id !== undefined){
         this.songService
             .retrieve(id)
             .subscribe(
               song => {
                 this.song = new Song(song.title, song.author, song.raw, song['_id'].toString())
               },
               err  => console.error(err)
             )
       }
      });
    }

    delete(){
      this.songService
          .delete(this.song._id)
          .subscribe(
            result => {
              console.log("ok!")
              this.router.navigateByUrl('/home')
            },
            err => console.error(err)
          )
    }
    
    convert(){
      this.previewSong = ChordConverter.convert(this.song.raw)
      console.log(this.previewSong)
    }

    setPreview(wantPreview:boolean){
      this.preview = wantPreview
      this.convert()
    }

    save(){
      this.songService
          .save(this.song)
          .subscribe(
            song => console.log(song),
            err  => console.error(err)
          )
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
