using BackendApi.Models;
using MongoDB.Driver;

namespace BackendApi.Services;

public class BookService
{
    private readonly IMongoCollection<Book> _booksCollection;

    // A konstruktorban olvassuk ki az appsettings.json-ből a beállításokat
    public BookService(IConfiguration configuration)
    {
        var mongoClient = new MongoClient(configuration["MongoDbSettings:ConnectionString"]);
        var mongoDatabase = mongoClient.GetDatabase(configuration["MongoDbSettings:DatabaseName"]);
        _booksCollection = mongoDatabase.GetCollection<Book>(configuration["MongoDbSettings:BooksCollectionName"]);
    }

    // Összes könyv lekérdezése (READ)
    public async Task<List<Book>> GetAsync() =>
        await _booksCollection.Find(_ => true).ToListAsync();

    // Egyetlen könyv lekérdezése ID alapján (READ)
    public async Task<Book?> GetAsync(string id) =>
        await _booksCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

    // Új könyv létrehozása (CREATE)
    public async Task CreateAsync(Book newBook) =>
        await _booksCollection.InsertOneAsync(newBook);

    // Meglévő könyv frissítése (UPDATE)
    public async Task UpdateAsync(string id, Book updatedBook) =>
        await _booksCollection.ReplaceOneAsync(x => x.Id == id, updatedBook);

    // Könyv törlése (DELETE)
    public async Task RemoveAsync(string id) =>
        await _booksCollection.DeleteOneAsync(x => x.Id == id);
}