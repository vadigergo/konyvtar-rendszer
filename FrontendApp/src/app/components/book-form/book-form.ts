import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Ez kell az űrlapok kezeléséhez
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { BookService } from '../../services/book';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './book-form.html', // Hivatkozás a te HTML fájlodra
  styleUrl: './book-form.css'      // Hivatkozás a te CSS fájlodra
})
export class BookFormComponent implements OnInit {
  // Egy üres könyv objektum alapértelmezett adatokkal
  book: Book = {
    title: '',
    author: '',
    year: new Date().getFullYear() // Az aktuális év
  };

  isEditMode: boolean = false;
  currentId: string = '';

  constructor(
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute // Ezzel tudjuk kiolvasni az URL-ből az ID-t
  ) {}

  ngOnInit(): void {
    // Megnézzük, van-e 'id' a böngésző URL-jében (tehát szerkesztés mód-e)
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.currentId = id;
      // Lekérjük a könyvet az adatbázisból, és beletöltjük az űrlapba
      this.bookService.getBook(id).subscribe({
        next: (data) => this.book = data,
        error: (err) => console.error('Hiba a könyv betöltésekor', err)
      });
    }
  }

  // Amikor a felhasználó rányom a Mentés gombra
  onSubmit(): void {
    if (this.isEditMode) {
      // Szerkesztés (PUT kérés)
      this.bookService.updateBook(this.currentId, this.book).subscribe({
        next: () => this.router.navigate(['/']), // Siker esetén visszadob a főoldalra (listára)
        error: (err) => console.error('Hiba a szerkesztésnél', err)
      });
    } else {
      // Új létrehozása (POST kérés)
      this.bookService.createBook(this.book).subscribe({
        next: () => this.router.navigate(['/']),
        error: (err) => console.error('Hiba a mentésnél', err)
      });
    }
  }
}