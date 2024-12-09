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
    path: 'lines/lrt1',
    loadComponent: () =>
      import('./lines/lrt1/lrt1.page').then((m) => m.LRT1Page),
  },
];
