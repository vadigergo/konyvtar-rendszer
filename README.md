# Könyvtár Kezelő App - Beadandó

A projektet nulláról építettem fel, az alábbi lépésekben:

1. **Környezet és Adatbázis:** Első körben felraktam a VS Code-ot, a .NET 10 SDK-t és a Node.js-t. Az adatbázishoz nem szórakoztam telepítéssel, inkább behúztam egy MongoDB-t Docker konténerben a 27017-es porton.
2. **Backend (ASP.NET 10):** Összedobtam egy C# Web API-t a BackendApi mappában, ami tudja a CRUD műveleteket. A MongoDB-vel a hivatalos driveren keresztül beszélget.
3. **Frontend (Angular 21):** Standalone komponenseket használtam a FrontendApp-ban. Van benne rendes lista nézet lapozással, űrlap az új könyveknek, és az egészet feldobtam Bootstrap-pel.
4. **Konténerizálás:** Mind a backendhez, mind a frontendhez írtam egy-egy Dockerfile-t (multi-stage build), hogy bárki gépén ugyanúgy fusson.
5. **GitHub Actions (CI):** Beállítottam egy .yml workflow-t, ami minden feltöltésnél automatikusan buildeli az image-eket és feltolja őket a GitHub Container Registry-be.

## Telepítési útmutató (Helyi K8s klaszteren)

Ha szeretnéd kipróbálni helyben (pl. Docker Desktop Kubernetes-el), így tudod elindítani:

### 1. Adatbázis (MongoDB) telepítése Helm-mel:
Ehhez a Bitnami chartját használtam. A terminálba ezt kell beírni:

```bash
helm repo add bitnami https://charts.bitnami.com/bitnami
helm install mongodb bitnami/mongodb --set auth.enabled=false
```

### 2. Alkalmazás indítása:
A k8s mappában lévő leírókkal (manifestekkel) rántjuk be a konténereket. A terminálba:

```bash
kubectl apply -f k8s/mongodb.yaml
kubectl apply -f k8s/backend.yaml
kubectl apply -f k8s/frontend.yaml
```

## Használati útmutató:
* **Böngészés:** A kezdőlapon látod a könyvek listáját. Ha több elem van, a táblázat alatt tudsz lapozni (pagination).
* **Hozzáadás:** Kattints az "Új könyv" gombra, töltsd ki az űrlapot és mentsd el.
* **Műveletek:** A táblázatban minden sor végén található gombokkal tudod az adott könyvet módosítani vagy törölni.
