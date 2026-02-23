# 1. Fázis: Építés (Build)
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /app

# Csak a projektfájl másolása és a függőségek letöltése
COPY *.csproj ./
RUN dotnet restore

# A teljes kód másolása és lefordítása
COPY . ./
RUN dotnet publish -c Release -o out

# 2. Fázis: Futtatás (Runtime) - Csak az a réteg, ami a futáshoz kell
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app
COPY --from=build /app/out ./

# Az alkalmazás indítása (8080-as porton fog futni a konténerben alapértelmezetten)
EXPOSE 8080
ENTRYPOINT ["dotnet", "BackendApi.dll"]