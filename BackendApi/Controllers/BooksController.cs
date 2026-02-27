using BackendApi.Models;
using BackendApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace BackendApi.Controllers;

[ApiController]
[Route("api/[controller]")] // Ez azt jelenti, hogy az URL-je api/books lesz
public class BooksController : ControllerBase
{
    private readonly BookService _bookService;

    public BooksController(BookService bookService)
    {
        _bookService = bookService;
    }

    // GET: api/books (Összes könyv lekérése)
    [HttpGet]
    public async Task<List<Book>> Get() =>
        await _bookService.GetAsync();

    // GET: api/books/{id} (Egy konkrét könyv lekérése)
    [HttpGet("{id:length(24)}")] // A 24 az a MongoDB ObjectId szabványos hossza
    public async Task<ActionResult<Book>> Get(string id)
    {
        var book = await _bookService.GetAsync(id);

        if (book is null)
        {
            return NotFound(); // 404-es hiba, ha nincs ilyen könyv
        }

        return book;
    }

    // POST: api/books (Új könyv beküldése)
    [HttpPost]
    public async Task<IActionResult> Post(Book newBook)
    {
        await _bookService.CreateAsync(newBook);

        // Visszaadjuk a sikeresen létrehozott könyvet és a 201-es státuszkódot
        return CreatedAtAction(nameof(Get), new { id = newBook.Id }, newBook);
    }

    // PUT: api/books/{id} (Meglévő könyv frissítése)
    [HttpPut("{id:length(24)}")]
    public async Task<IActionResult> Update(string id, Book updatedBook)
    {
        var book = await _bookService.GetAsync(id);

        if (book is null)
        {
            return NotFound();
        }

        updatedBook.Id = book.Id;
        await _bookService.UpdateAsync(id, updatedBook);

        return NoContent(); // 204-es kód: Sikeres frissítés, nincs visszatérő adat
    }

    // DELETE: api/books/{id} (Könyv törlése)
    [HttpDelete("{id:length(24)}")]
    public async Task<IActionResult> Delete(string id)
    {
        var book = await _bookService.GetAsync(id);

        if (book is null)
        {
            return NotFound();
        }

        await _bookService.RemoveAsync(id);

        return NoContent();
    }
}