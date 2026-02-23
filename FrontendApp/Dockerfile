# 1. Fázis: Angular kód buildelése (Node.js környezet)
FROM node:20 AS build
WORKDIR /app

# npm függőségek telepítése
COPY package*.json ./
RUN npm install

# Kód másolása és lefordítása éles (production) verzióba
COPY . ./
RUN npm run build --configuration=production

# 2. Fázis: Kiszolgálás Nginx webszerverrel
FROM nginx:alpine

# Bemásoljuk a lefordított Angular fájlokat az Nginx publikus mappájába
# FONTOS: Az Angular 17+ a 'browser' mappába generál!
COPY --from=build /app/dist/FrontendApp/browser /usr/share/nginx/html

# A 80-as porton fog figyelni az Nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]