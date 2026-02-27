using BackendApi.Services;

var builder = WebApplication.CreateBuilder(args);

// Hozzáadom a CORS szabályt (engedem, hogy a Frontend hívhassa az API-t)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.AllowAnyOrigin() // Ez mindenkit átenged
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Regisztrálom a Controllereket és a BookService-t
builder.Services.AddControllers();
builder.Services.AddSingleton<BookService>(); // A BookService regisztrálása

// Swagger beállítása a teszteléshez
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configurálom a HTTP kérést.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// CORS bekapcsolása 
app.UseCors("AllowFrontend");

app.UseAuthorization();
app.MapControllers();

app.Run();