import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BookService } from '../../services/book';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css'
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  paginatedBooks: Book[] = []; // Külön változó a megjelenített könyveknek
  
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 0; // Külön változó az oldalszámnak

  constructor(
    private bookService: BookService, 
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getBooks().subscribe({
      next: (data) => {
        this.books = [...data];
        console.log("Összes könyv a memóriában:", this.books.length); 
        
        // Új adatnál visszaugrunk az első oldalra és újraszámolunk mindent
        this.currentPage = 1;
        this.updatePagination();
      },
      error: (err) => console.error("Hiba a betöltéskor:", err)
    });
  }

  deleteBook(id: string | undefined): void {
    if (!id) return;
    if (confirm('Biztosan törölni szeretnéd ezt a könyvet?')) {
      this.bookService.deleteBook(id).subscribe({
        next: () => this.loadBooks(),
        error: (err) => console.error('Hiba a törlésnél', err)
      });
    }
  }

  // Ez a függvény számolja ki mindig a pontos aktuális nézetet
  updatePagination(): void {
    this.totalPages = this.books.length > 0 ? Math.ceil(this.books.length / this.itemsPerPage) : 0;
    
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    
    this.paginatedBooks = this.books.slice(startIndex, endIndex);
    
    // Szólunk az Angularnak, hogy rajzolja újra a képernyőt!
    this.cdr.detectChanges();
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination(); // Lapozáskor is újraszámolunk
    }
  }
  
  getPagesArray(): number[] {
    return Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }
}