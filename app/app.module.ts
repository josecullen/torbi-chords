import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { AppComponent }  from './app.component';
import { HttpModule, JsonpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { LyricChordEditor} from './components/lyric-chord.editor.component'
import { BarsEditor } from './components/bars.editor.component'
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
import { LyricChordPreview } from './components/lyric-chord.preview.component'
import { BarsPreview } from './components/bars.preview.component'
import { TabPreview } from './components/tab.preview.component'
import { routing } from './app.routing';
import { FlexLayoutModule } from "@angular/flex-layout";

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
    LyricChordEditor,
    LyricChordPreview,
    BarsEditor,
    BarsPreview,
    TabEditor,
    TabPreview,
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
