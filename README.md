# MADEV Pass

MADEV Pass est une plateforme complète agissant comme une carte étudiante numérique et un réseau de commerçants. Le système inclut 3 espaces distincts : Administrateur, Commerçant et Étudiant, construits avec Next.js, Prisma, PostgreSQL et Docker.

## Pré-requis

Avant de lancer le projet, assurez-vous d'avoir installé sur votre machine Windows :
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (bien vérifier qu'il est en cours d'exécution)
- [Node.js](https://nodejs.org/en/) (Version 18 ou supérieure, incluant `npm` et `npx`)

---

## 🚀 Lancer l'environnement de "Production" en Local avec Docker

Le projet utilise **Docker Compose** pour orchestrer l'application web (Next.js en mode `standalone`) et la base de données (PostgreSQL).

Suivez ces 3 étapes dans l'ordre depuis la racine de votre dossier de projet :

### 1. Démarrer la base de données
Ouvrez un terminal (PowerShell ou Invite de commandes) et exécutez la commande suivante pour démarrer le conteneur PostgreSQL en arrière-plan :
```bash
docker-compose up -d db
```
*(Attendez environ 10 à 15 secondes pour que la base de données s'initialise correctement).*

### 2. Appliquer la modélisation (Schéma Prisma)
Une fois la base de données prête, il faut créer les tables (Users, Offers, Scans, etc.). 
Toujours depuis la racine du projet, lancez :
```bash
npx prisma db push
```
*Si vous souhaitez ajouter des données de test rapidement, vous pouvez également utiliser Prisma Studio en tapant `npx prisma studio`.*

### 3. Démarrer l'application Web
Lancez la construction et le démarrage du serveur Next.js de production :
```bash
docker-compose up -d --build web
```

🎉 L'application complète est maintenant prête et accessible sur votre navigateur à l'adresse **[http://localhost:3000](http://localhost:3000)** !

---

## 🛑 Comment arrêter le projet

Pour éteindre proprement les conteneurs sans perdre vos données (la base de données utilise un volume persistant), exécutez :
```bash
docker-compose down
```

---

## 🛠️ Développement Actif (Mode Dev)

Si vous souhaitez modifier le code et voir vos modifications en temps réel sur votre écran, **n'utilisez pas le conteneur `web`**, mais plutôt le mode développement classique :

1. Assurez-vous que la base de données tourne toujours via Docker :
```bash
docker-compose up -d db
```
2. Lancez le serveur de développement Next.js :
```bash
npm run dev
```
3. Rendez-vous sur `http://localhost:3000`. Chaque modification de votre code sera rechargée instantanément.
