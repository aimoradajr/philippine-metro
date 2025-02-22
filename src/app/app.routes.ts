import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'pathfinder',
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
  {
    path: 'version-history',
    loadComponent: () =>
      import('./version-history/version-history.page').then(
        (m) => m.VersionHistoryPage
      ),
  },
  {
    path: 'map',
    loadComponent: () => import('./map/map.page').then((m) => m.MapPage),
  },
  {
    path: 'fare',
    loadComponent: () => import('./fare/fare.page').then((m) => m.FarePage),
  },
];
