# Foodie - Application Web de Gestion de Restaurants



Foodie est une application web moderne conçue pour la gestion complète des restaurants. Elle repose sur une architecture microservices, offrant modularité, évolutivité et résilience. Grâce à ses fonctionnalités intuitives, elle permet aux utilisateurs de gérer les menus, les recettes, les événements, les avis clients, les informations des restaurants et les paniers d'achat.

---

## 📋 Description du Projet

Développé entre février 2024 et avril 2024, Foodie est une solution complète pour la gestion des restaurants. L'application utilise une architecture microservices avec des technologies modernes pour assurer une communication fluide entre les différents services.

### Fonctionnalités principales :
- **Gestion des menus et recettes** : Création, modification et suppression.
- **Organisation et suivi des événements** : Réservations, promotions, etc.
- **Gestion des avis clients** : Évaluation et feedback des restaurants.
- **Administration des restaurants** : Informations, horaires, etc.
- **Gestion du panier** : Commandes en ligne.
- **Communication inter-services** : Via Feign Client (synchrone) et RabbitMQ (asynchrone).

---

## 🛠 Technologies Utilisées

### Frontend
- **Angular** : Framework frontend pour une interface utilisateur moderne et réactive.

### Backend
- **Spring Boot** : Framework backend pour les microservices Java.
- **Express.js** : Framework backend pour les microservices Node.js.

### Bases de données
- **MySQL** : Base de données relationnelle pour les données structurées.
- **MongoDB** : Base de données NoSQL pour les données non structurées.
- **H2** : Base de données en mémoire pour les tests locaux.

### Outils et Services
- **Docker** : Conteneurisation des services pour un déploiement simplifié.
- **Eureka** : Service de découverte dynamique des microservices.
- **Spring Cloud Gateway** : API Gateway pour le routage des requêtes.
- **Spring Cloud Config Server** : Centralisation des configurations des microservices.
- **Feign Client** : Communication synchrone entre microservices.
- **RabbitMQ** : Communication asynchrone via des files de messages.

---

## 🏗 Architecture du Projet

Foodie est construit autour d'une architecture microservices modulaire. Voici les principaux composants :

### Composants principaux :
1. **API Gateway** : Gère les requêtes entrantes et les redirige vers les microservices appropriés.
2. **Service Discovery (Eureka)** : Enregistre et localise dynamiquement les microservices.
3. **Config Server** : Centralise les configurations des microservices.

### Microservices :
- **Menu Service** : Gestion des menus et recettes.
- **Event Service** : Gestion des événements (réservations, promotions, etc.).
- **Review Service** : Gestion des avis clients.
- **Restaurant Service** : Gestion des informations des restaurants.
- **Cart Service** : Gestion des paniers et commandes.

### Communication :
- **Feign Client** : Pour les appels synchrones entre services.
- **RabbitMQ** : Pour la gestion des messages asynchrones.

---

## 🚀 Installation et Configuration

### Prérequis
- **Java 17+**
- **Node.js** (pour Angular)
- **Docker** et **Docker Compose**
- **MySQL** et **MongoDB** (installés localement ou via Docker)
- **Maven** (pour Spring Boot)

### Étapes d'installation

1. **Cloner le dépôt**
   ```bash
   git clone https://github.com/mohamedaminesabehy/micro_services.git
   cd micro_services
2. **Lancer les services avec Docker**
docker-compose up --build
Accéder à l'application
Frontend (Angular) : http://localhost:4200
API Gateway : http://localhost:9094
Eureka Dashboard : http://localhost:8761
RabbitMQ Management : http://localhost:15672

**Structure du Projet**
foodie/
├── front/                  # Code source Angular
├── MicroS/                 # Microservices Spring Boot et Express.js
│   ├── api-gateway/        # Gateway pour router les requêtes
│   ├── eureka-server/      # Service de découverte
│   ├── ConfigServer/       # Gestion des configurations
│   ├── Menu/               # Gestion des menus
│   ├── GestionRecette/     # Gestion des recettes
│   ├── Event/              # Gestion des événements
│   ├── Avis/               # Gestion des avis
│   ├── Restaurant/         # Gestion des restaurants
│   ├── BackendAvancé/      # Gestion des paniers
├── docker-compose.yml      # Configuration Docker 
├── README.md               # Documentation