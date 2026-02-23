using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BackendApi.Models;

public class Book
{
    // Ez jelzi a MongoDB-nek, hogy ez lesz az elsődleges kulcs (ID)
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    [BsonElement("Title")] // Az adatbázisban "Title" néven fog szerepelni
    public string Title { get; set; } = null!;

    public string Author { get; set; } = null!;

    public int Year { get; set; }
}