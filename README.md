Fonctionnalités
Créer une tâche : Ajoutez une nouvelle tâche avec un titre
Supprimer une tâche : Supprimez une tâche de la liste.
Liste des tâches : Affichez toutes les tâches

Structure du projet
Backend
TaskController.ts : Gère les routes pour les tâches (CRUD).
TaskRepository.ts : Interagit avec la base de données via Prisma.
schema.prisma : Définit le modèle de données.

Frontend
TaskList.jsx : Composant principal pour afficher et gérer les tâches.
taskService.js : Gère les appels API pour les tâches.
TaskList.css : Styles pour le composant TaskList.

Routes API
GET /tasks : Récupère toutes les tâches.
POST /tasks : Crée une nouvelle tâche.
PATCH /tasks/:id : Met à jour une tâche.
DELETE /tasks/:id : Supprime une tâche.


Technologies utilisées
Frontend : React, CSS
Backend : Node.js, NestJS, Prisma
Base de données : MySQL
