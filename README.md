# SUIVI DE MON PROJET DE SOUTENANCE LE HACKATHON DU PRESSING

## Introduction

(Partie Utilisateur)
Le projet est un site web qui permet de se connecter et de créer un compte utilisateur. Il permettra de passer des commandes pour des prestations. Il permet également de se connecter avec un compte utilisateur existant. Le site est développé avec Angular, utilise le framework Tailwind CSS et fait appel à une API backend développée en Symfony.

(Partie Employé & Administrateur)
Les employés pourront changer le statut des commandes utilisateurs et avoir un accès utilisateur classique. Les administrateurs pourront assigner des employés aux commandes et auront un accès utilisateur administrateur.

## Suivi du projet

03/07/2024
J'ai ajouté le login et l'inscription pour les utilisateurs, ainsi que les fonctions de récupération du token, de vérification de connexion de l'utilisateur et de déconnexion. Début de l'implémentation du CRUD des utilisateurs pour l'administrateur.

04/07/2024
J'ai ajouté la fonctionnalité de supprimer un user depuis l'admin, afficher les users ( pour la suite la suppresion va concerner les role user qui ont le role employee), j'ai ajouté un peu de visuel sur le coté admin, la possibilité de se déconnecter.

06/07/2024
J'ai ajouté le CRUD des prestations pour l'admin, le guard sur les pages admin ainsi que la page 404 pour les routes non trouvées. Et pour finir j'affiche des prestations sur le site.

07/07/2024
J'ai ajouté les articles ainsi que les catgerories de chaque article

# BCFRONT

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
