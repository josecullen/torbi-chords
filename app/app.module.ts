import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { AppComponent }  from './app.component';
import { HttpModule, JsonpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { SongEditorView } from './views/song-editor.view'

import { LyricChordEditor} from './components/lyric-chord.editor.component'
import { TabEditor } from './components/tab.editor.component'
import { VexTabDirective} from './directives/vextab.directive'
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
import { EditorView } from './views/editor.view'
import { CreateBookView } from './views/create-book.view'
import { CreateSongView } from './views/create-song.view'
import { LyricSongView } from './views/lyric-song.view'
import { routing } from './app.routing';
import {FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
  imports:      [
    MaterialModule.forRoot(), 
    FlexLayoutModule.forRoot(),
    BrowserModule, 
    FormsModule,
    HttpModule,
    CommonModule,
    routing
  ],
  declarations: [
    HomeView, 
    EditorView,
    CreateBookView,
    CreateSongView,
    LyricChordEditor,
    TabEditor,
    LyricSongView,
    SongEditorView,
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
    Song,
    VexTabDirective
  ],
  providers: [
    SongService,
    BookService
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
