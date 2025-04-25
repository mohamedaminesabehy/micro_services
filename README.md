Foodie - Application Web de Gestion de Restaurants
Foodie est une application web moderne conçue pour la gestion complète des restaurants, basée sur une architecture microservices. Elle permet aux utilisateurs de gérer les menus, les recettes, les événements, les avis, les restaurants et les paniers d'achat de manière efficace et intuitive.

📋 Description du Projet
Développé entre février 2024 et avril 2024, Foodie est une solution complète pour la gestion des restaurants. L'application repose sur une architecture microservices pour assurer modularité, évolutivité et résilience. Les principales fonctionnalités incluent :

#Gestion des menus et recettes (création, modification, suppression).
#Organisation et suivi des événements (réservations, promotions, etc.).
#Gestion des avis des clients pour évaluer les restaurants.
#Administration des restaurants (informations, horaires, etc.).
#Gestion du panier pour les commandes en ligne.
#Communication inter-services via Feign Client et RabbitMQ pour une intégration asynchrone.
L'application utilise Docker pour le déploiement des services, Eureka pour la découverte des services, une Gateway pour le routage, et un Config Server pour la gestion centralisée des configurations.

🛠 Technologies Utilisées
Frontend : Angular
Backend : Spring Boot, Express.js
Bases de données :
MySQL (données relationnelles)
H2 (base de données en mémoire pour tests)
MongoDB (données non relationnelles)
Outils et services :
Docker (conteneurisation)
Eureka (découverte de services)
Spring Cloud Gateway (routage)
Spring Cloud Config Server (gestion des configurations)
Feign Client (communication synchrone entre microservices)
RabbitMQ (communication asynchrone)

🏗 Architecture du Projet

Foodie est construit autour d'une architecture microservices avec les composants suivants :
API Gateway : Gère les requêtes entrantes et les redirige vers les microservices appropriés.
Service Discovery (Eureka) : Enregistre et localise dynamiquement les microservices.
Config Server : Centralise les configurations des microservices.
Microservices :
Menu Service : Gestion des menus et recettes.
Event Service : Gestion des événements.
Review Service : Gestion des avis clients.
Restaurant Service : Gestion des informations des restaurants.
Cart Service : Gestion des paniers et commandes.
Communication :
Feign Client pour les appels synchrones entre services.
RabbitMQ pour la gestion des messages asynchrones.
Bases de données :
MySQL pour les données structurées.
MongoDB pour les données non structurées.
H2 pour les tests locaux.


🚀 Installation et Configuration
Prérequis
Java 17+
Node.js (pour Angular)
Docker et Docker Compose
MySQL et MongoDB (installés localement ou via Docker)
Maven (pour Spring Boot)

Étapes d'installation
Cloner le dépôt
git clone https://github.com/mohamedaminesabehy/micro_services.git
cd micro_services
Configurer les bases de données
Assurez-vous que MySQL et MongoDB sont en cours d'exécution.
Configurez les informations de connexion dans les fichiers de configuration (application.yml ou via Config Server).

Lancer les services avec Docker
docker-compose up --build

Accéder à l'application
Frontend (Angular) : http://localhost:4200
API Gateway : http://localhost:9094
Eureka Dashboard : http://localhost:8761
Configurer RabbitMQ
Assurez-vous que RabbitMQ est en cours d'exécution (via Docker ou installation locale).
Vérifiez les files de messages dans l'interface d'administration de RabbitMQ (http://localhost:15672).

📖 Utilisation
Frontend (Angular) :
Accédez à l'interface utilisateur via http://localhost:4200.
Connectez-vous pour gérer les menus, événements, avis, restaurants et paniers.
API :
Les endpoints sont accessibles via la Gateway (http://localhost:9094).
Consultez la documentation Swagger (si intégrée) ou les fichiers de configuration pour les détails des endpoints.

🐳 Déploiement avec Docker
Le projet est entièrement conteneurisé avec Docker et Docker Compose. Pour déployer :

Assurez-vous que Docker est installé.
Exécutez :
docker-compose up -d
Les services (Gateway, Eureka, Config Server, microservices, bases de données) seront lancés automatiquement.

########################################Structure du Projet#####################################
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