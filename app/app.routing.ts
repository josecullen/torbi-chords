import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeView } from './views/home.view'
import { CreateBookView } from './views/create-book.view'
import { CreateSongView } from './views/create-song.view'
import { LyricSongView } from './views/lyric-song.view'
import { SongEditorView } from './views/song-editor.view'
import { EditorView } from './views/editor.view'

const appRouting: Routes = [
	{
		path: 'home',
		component: HomeView
	},
	{
		path: 'editor',
		component: EditorView
	},
	{
		path: 'book/create',
		component: CreateBookView 
	},
	{
		path: 'book/:id',
		component: CreateBookView 
	},
	{
		path: 'song/create',
		component: CreateSongView 
	},
	{
		path: 'song/editor',
		component: SongEditorView
	},
	{
		path: 'song/:id',
		component: CreateSongView
	},
	{
		path: 'lyric-song/create',
		component: LyricSongView
	},
	{
		path: '',
		redirectTo: '/home',
		pathMatch: 'full'
	}
];


const appRoutes : Routes = [
	...appRouting

]

export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes);
