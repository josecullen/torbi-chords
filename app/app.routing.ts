import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeView } from './views/home.view'
import { EditorView } from './views/editor.view'
import { SongVisualizatorView } from './views/song-visualizator.view'
import { AuthGuard } from './modules/auth-guard.service'

const appRouting: Routes = [
	{
		path: 'home',
		component: HomeView,
		// canActivate: [AuthGuard],
	},
	{
		path: 'editor',
		component: EditorView,
		canActivate: [AuthGuard]
	},
	{
		path: 'visualizator',
		component: SongVisualizatorView
	},
	{
		path: '',
		redirectTo: '/home',
		pathMatch: 'full',
		canLoad: [AuthGuard]
	}
];


const appRoutes : Routes = [
	...appRouting

]

export const appRoutingProviders: any[] = [
	// authProviders
]

export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes);
