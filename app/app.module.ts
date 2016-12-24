import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { AppComponent }  from './app.component';
import { HttpModule, JsonpModule } from '@angular/http';
import {
  Bar, 
  LineBar, 
  Bars, 
  BarRepeatStart, 
  BarRepeatEnd, 
  Instructions,
  Condition,
  BarNoBorder } from './bars/bars.component'
import {
  Section,
  Song } from './sections/sections.component'  

import { HalfNote, QuarterNote, Chords } from './notes/notes.component'

import { SongService } from './services/song.service'
import { BookService } from './services/book.service'

import { HomeView } from './views/home.view'
import { CreateBookView } from './views/create-book.view'
import { CreateSongView } from './views/create-song.view'
import { LyricSongView } from './views/lyric-song.view'
import { routing } from './app.routing';

@NgModule({
  imports:      [ 
    BrowserModule, 
    FormsModule,
    HttpModule,
    CommonModule,
    routing
  ],
  declarations: [
    HomeView, 
    CreateBookView,
    CreateSongView,
    LyricSongView,
    AppComponent, 
    Bar, 
    LineBar, 
    Bars,
    HalfNote,
    QuarterNote,
    Chords,
    BarRepeatStart,
    BarRepeatEnd,
    Instructions,
    Condition,
    BarNoBorder,
    Section,
    Song
  ],
  providers: [
    SongService,
    BookService
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
