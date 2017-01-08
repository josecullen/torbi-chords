import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Song, SongBook } from '../models/models'
import { SongService } from '../services/song.service'
import { BookService } from '../services/book.service'
import { ChordConverter, ChordSong } from '../chords/chords.converter'

@Component({
  selector: 'bars-editor',
  template: `
    <md-input-container style="width:100%">
        <textarea 
            md-input 
            md-autosize
            style="width:100%" 
            (keyup)="onTextChange()"
            [(ngModel)]="raw"></textarea>
    </md-input-container>
  `
})
export class BarsEditor{ 
    raw:string
    barsPreview:ChordSong = new ChordSong()
    @Output() songChange:EventEmitter<ChordSong> = new EventEmitter()

    onTextChange(){
        this.convert()
    }

    convert(){
        this.barsPreview = ChordConverter.convert(this.raw)
        this.songChange.emit(this.barsPreview)
    }



}
