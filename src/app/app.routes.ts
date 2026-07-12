import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then(m => m.LoginPage)
  },

  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.page').then(m => m.RegisterPage)
  },

  {
    path: 'home',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/home/home.page').then(m => m.HomePage)
  },

  {
  path: 'calendar',
  loadComponent: () =>
    import('./pages/calendar/calendar.page').then(m => m.CalendarPage)
},

  {
    path: 'events',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/events/events.page').then(m => m.EventsPage)
  },

  {
    path: 'add-event',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/add-event/add-event.page').then(m => m.AddEventPage)
  },

  {
    path: 'edit-event/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/edit-event/edit-event.page').then(m => m.EditEventPage)
  },

  {
  path: 'edit-event',
  loadComponent: () =>
    import('./pages/edit-event/edit-event.page').then(m => m.EditEventPage)
},

  

  {
  path: 'departments',
  loadComponent: () => import('./pages/departments/departments.page').then(m => m.DepartmentsPage)
}
];