using BackendApi.Services;

var builder = WebApplication.CreateBuilder(args);

// Hozzáadjuk a CORS szabályt (Megengedjük, hogy a Frontend hívhassa az API-t)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.AllowAnyOrigin() // Ez mindenkit átenged
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Regisztráljuk a Controllereket és a BookService-t
builder.Services.AddControllers();
builder.Services.AddSingleton<BookService>(); // A BookService regisztrálása

// Swagger beállítása a teszteléshez (opcionális, de hasznos)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// CORS bekapcsolása (Fontos: a UseAuthorization előtt kell lennie!)
app.UseCors("AllowFrontend");

app.UseAuthorization();
app.MapControllers();

app.Run();