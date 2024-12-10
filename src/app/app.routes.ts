import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/inbox',
    pathMatch: 'full',
  },
  {
    path: 'folder/:id',
    loadComponent: () =>
      import('./folder/folder.page').then((m) => m.FolderPage),
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'credits',
    loadComponent: () =>
      import('./credits/credits.page').then((m) => m.CreditsPage),
  },
  {
    path: 'lines/line-viewer/:line_code',
    loadComponent: () =>
      import('./lines/line-viewer/line-viewer.page').then(
        (m) => m.LineViewerPage
      ),
  },
  {
    path: 'pathfinder',
    loadComponent: () =>
      import('./pathfinder/pathfinder.page').then((m) => m.PathFinderPage),
  },
];
