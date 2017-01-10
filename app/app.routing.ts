import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeView } from './views/home.view'
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
		path: '',
		redirectTo: '/home',
		pathMatch: 'full'
	}
];


const appRoutes : Routes = [
	...appRouting

]

export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes);
