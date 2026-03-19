import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // <-- 1. Hozzáadtuk a ChangeDetectorRef-et
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { BookService } from '../../services/book';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './book-form.html',
  styleUrl: './book-form.css'
})
export class BookFormComponent implements OnInit {
  book: Book = {
    title: '',
    author: '',
    year: new Date().getFullYear()
  };

  isEditMode: boolean = false;
  currentId: string = '';

  constructor(
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef // <-- 2. Injektáltuk az "ébresztőórát"
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.currentId = id;
      
      this.bookService.getBook(id).subscribe({
        next: (data) => {
          this.book = data;
          this.cdr.detectChanges(); // <-- 3. Itt szólunk az Angularnak, hogy azonnal frissítse a képernyőt!
        },
        error: (err) => console.error('Hiba a könyv betöltésekor', err)
      });
    }
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.bookService.updateBook(this.currentId, this.book).subscribe({
        next: () => this.router.navigate(['/']),
        error: (err) => console.error('Hiba a szerkesztésnél', err)
      });
    } else {
      this.bookService.createBook(this.book).subscribe({
        next: () => this.router.navigate(['/']),
        error: (err) => console.error('Hiba a mentésnél', err)
      });
    }
  }
}