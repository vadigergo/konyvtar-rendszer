# 1. Fázis: Angular kód buildelése
FROM node:20 AS build
WORKDIR /app

# npm függőségek telepítése
COPY package*.json ./
RUN npm install

# Kód másolása és lefordítása éles verzióba
COPY . ./
RUN npm run build --configuration=production

# 2. Fázis: Kiszolgálás Nginx webszerverrel
FROM nginx:alpine

# Bemásoljuk a lefordított Angular fájlokat az Nginx publikus mappájába
COPY --from=build /app/dist/FrontendApp/browser /usr/share/nginx/html

# A 80-as porton fog figyelni az Nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]