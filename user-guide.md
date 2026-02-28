# Felhasználói Kézikönyv - Lokális futtatás

Ez az útmutató bemutatja, hogyan lehet a projektet a saját gépeden (lokálisan) elindítani és tesztelni.

### 1. Adatbázis elindítása
Először indítsd el a **Docker Desktop** alkalmazást a gépeden, majd futtass egy MongoDB konténert az alábbi paranccsal:
```bash
docker run -d --name local.mongo -p 27017:27017 mongo
```

### 2. Backend (Szerver) indítása
Nyiss egy terminált a VS Code-ban, navigálj a backend mappájába, és indítsd el az alkalmazást az alábbi paranccsal:
```bash
dotnet run --urls="http://localhost:5000"
```
### 3. Frontend (Kliens) indítása
Nyiss egy másik terminált a VS Code-ban, navigálj a frontend mappájába, és indítsd el a felületet:
```bash
ng serve
```
### 4. Az alkalmazás megnyitása
Ha a terminálokban minden megfelelően, hiba nélkül lefutott, nyisd meg a böngésződet, és navigálj az alábbi címre az alkalmazás használatához:
http://localhost:4200/
