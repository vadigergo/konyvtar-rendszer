import { Routes } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list'; 
import { BookFormComponent } from './components/book-form/book-form';

export const routes: Routes = [
  { path: '', component: BookListComponent },                 // Főoldal: Könyvlista
  { path: 'add-book', component: BookFormComponent },         // Új könyv felvétele
  { path: 'edit-book/:id', component: BookFormComponent },    // Szerkesztés 
  { path: '**', redirectTo: '' }                              // Ha valami hülyeséget írnak az URL-be, vigye a főoldalra
];