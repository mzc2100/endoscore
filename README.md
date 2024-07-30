# Guide d'utilisation des Modèles pour le Fichier JSON de Questions

Ce guide explique comment utiliser les modèles TypeScript pour manipuler le fichier JSON contenant les questions du formulaire. Les modèles sont conçus pour correspondre à la structure spécifique du fichier JSON fourni.

## Structure du Fichier JSON

Le fichier JSON contient plusieurs catégories de questions, chacune ayant des attributs spécifiques. Voici la structure générale du fichier JSON :

### Attributs du Fichier JSON

- **dataForm**: Contient des données générales pour le formulaire.
- **questionUnique**: Questions avec une seule réponse parmi plusieurs propositions.
- **questionDependante**: Questions dont la réponse influence d'autres questions.
- **questionLibre**: Questions permettant des réponses libres ou conditionnelles.
- **questionValeurParDefaut**: Questions avec des réponses prédéfinies.
- **questionBinaire**: Questions nécessitant une réponse binaire.
- **questionChoixMultiple**: Questions permettant la sélection de plusieurs options.

## Modèles TypeScript Correspondants

Les modèles TypeScript ont été créés pour représenter chaque catégorie de questions du fichier JSON. Chaque modèle a ses propres attributs correspondant aux données présentes dans le fichier JSON.

### Modèles de Questions

1. **QuestionUniqueModel**
  - `libelle`: La question posée.
  - `propositions`: Les options de réponse possibles (utilise le modèle `Propostion`).

2. **QuestionDependanteModel**
  - `libelle`: La question principale.
  - `propositionDependante`: Les réponses possibles avec des questions liées (utilise le modèle `PropositionDependanteModel`).

3. **QuestionLibreModel**
  - `libelle`: La question posée.
  - `propositionLibre`: Les choix possibles avec des réponses libres liées (utilise le modèle `PropositionLibreModel`).

4. **QuestionValeurParDefautModel**
  - `libelle`: La question posée.
  - `propositionParDefaut`: Les réponses prédéfinies possibles (utilise le modèle `PropositionParDefautModel`).

5. **QuestionBinaireModel**
  - `libelle`: La question posée.
  - `propositionBinaire`: Les deux options possibles (utilise le modèle `PropositionBinaireModel`).

6. **QuestionChoixMultipleModel**
  - `libelle`: La question posée.
  - `propositions`: Les options possibles (utilise le modèle `ReponseChoixMultiple`).
  - `reponses`: Les réponses sélectionnées ou null (utilise le modèle `ReponseChoixMultiple`).

### Sous-Modèles

#### Propositions pour Question Unique
- **Propostion**
  - `lettre`: La lettre correspondante à l'option.
  - `label`: La description de l'option.

#### Propositions Dépendantes
- **PropositionDependanteModel**
  - `proposition`: La réponse à la question principale.
  - `questionsLies`: Les questions liées à cette réponse.

#### Propositions Libres
- **PropositionLibreModel**
  - `proposition`: La réponse possible.
  - `questionLibreLiee`: La question libre liée à cette réponse ou null.

#### Propositions par Défaut
- **PropositionParDefautModel**
  - `proposition`: La valeur par défaut.
  - `propositionLibelle`: La description de la valeur par défaut.

#### Réponses pour Choix Multiple
- **ReponseChoixMultiple**
  - `name`: Le libellé de l'option.
  - `id`: L'identifiant de l'option.

---

Ce guide spécifique explique chaque modèle ainsi que ses sous-modèles associés pour une compréhension complète de la structure du fichier JSON. Utilisez ces modèles pour ajouter ou modifier des questions dans le fichier JSON en respectant la structure définie.



# Endoscore
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.6.

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
