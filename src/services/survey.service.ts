import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable, throwError} from 'rxjs';
import {Survey} from "../models/survey.model";
import {QuestionSwapper} from "../models/question-swapper";
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ModeState } from 'src/models/enum/modeState.enum';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  generatedJSON: string ='';

  _modeState: ModeState = ModeState.MODE_NORMAL;

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {

    const savedModeState = localStorage.getItem('modeState');
    if (savedModeState) {
      this._modeState = parseInt(savedModeState);
    }
  }

  getQuestions(quesPath: string): Observable<Survey> {
    return this.http.get<Survey>(quesPath).pipe(map((response: Survey) => {
        //console.log(JSON.stringify(response))
        return response; // Retourne les données JSON
      }),
      catchError((error: any) => {
        console.error('Erreur lors de la récupération des questions :', error);
        return throwError(`Erreur lors de la récupération des questions.`);
      }));
  }

  swapQuestions(survey: Survey, index1: number, index2: number) {

    const questionSwapper = new QuestionSwapper(survey, this);
    questionSwapper.swapQuestions(index1, index2);

  }

  
  get modeState(): ModeState {
    return this._modeState;
  }

  set modeState(value: ModeState) {
    this._modeState = value;
    localStorage.setItem('modeState', value.toString());
  }

  saveGeneratedJSON(data: string){
    this.generatedJSON = data;
  }

  getGeneratedJSON(): string{
    return this.generatedJSON;
  }


  saveSurveyData(survey: Survey) {
    localStorage.setItem('surveyData', JSON.stringify(survey));
  }

  getSurveyData(): Survey | null {
    const surveyData = localStorage.getItem('surveyData');
    let dataReturn = null;
    console.log(surveyData)
    surveyData ? dataReturn = JSON.parse(surveyData) : dataReturn;
    return dataReturn;
  }

  // méthode pour compter le nombre de questions dans un Survey
  countQuestions(survey: Survey): number {
    let count = 0;
    if (survey && survey.questionUnique) {
      count += survey.questionUnique.length;
    }
    if (survey && survey.questionDependante) {
      count += survey.questionDependante.length;
    }
    if (survey && survey.questionLibre) {
      count += survey.questionLibre.length;
    }
    if (survey && survey.questionValeurParDefaut) {
      count += survey.questionValeurParDefaut.length;
    }
    if (survey && survey.questionBinaire) {
      count += survey.questionBinaire.length;
    }
    if (survey && survey.questionChoixMultiple) {
      count += survey.questionChoixMultiple.length;
    }
    if (survey && survey.questionCorp) {
      count += survey.questionCorp.length;
    }

    if (survey && survey.questionRange) {
      count += survey.questionRange.length;
    }
    return count;
  }


  findQuestionTypeByIndex(survey: Survey, index: number): string {
    // Check if the questionUnique array contains the question with the given index
    const questionUnique = survey.questionUnique?.find(q => q.index === index);
    if (questionUnique) {
      return 'questionUnique';
    }

    // Check if the questionDependante array contains the question with the given index
    const questionDependante = survey.questionDependante?.find(q => q.index === index);
    if (questionDependante) {
      return 'questionDependante';
    }

    // Check if the questionBinaire array contains the question with the given index
    const questionBinaire = survey.questionBinaire?.find(q => q.index === index);
    if (questionBinaire) {
      return 'questionBinaire';
    }

    // Check if the questionLibre array contains the question with the given index
    const questionLibre = survey.questionLibre?.find(q => q.index === index);
    if (questionLibre) {
      return 'questionLibre';
    }

    // Check if the questionValeurParDefaut array contains the question with the given index
    const questionValeurParDefaut = survey.questionValeurParDefaut?.find(q => q.index === index);
    if (questionValeurParDefaut) {
      return 'questionValeurParDefaut';
    }

    // Check if the questionChoixMultiple array contains the question with the given index
    const questionChoixMultiple = survey.questionChoixMultiple?.find(q => q.index === index);
    if (questionChoixMultiple) {
      return 'questionChoixMultiple';
    }

    // Check if the questionCorp array contains the question with the given index
    const questionCorp = survey.questionCorp?.find(q => q.index === index);
    if (questionCorp) {
      return 'questionCorp';
    }

    // Check if the questionRange array contains the question with the given index
    const questionRange = survey.questionRange?.find(q => q.index === index);
    if (questionRange) {
      return 'questionRange';
    }

    return ""; // Return null is no match found
  }


  findQuestionTypeIndex(survey: Survey, index: number, questionType: string): number {
    switch (questionType) {
      case 'questionUnique':
        return survey.questionUnique.findIndex(q => q.index === index);
      case 'questionDependante':
        return survey.questionDependante.findIndex(q => q.index === index);
      case 'questionBinaire':
        return survey.questionBinaire.findIndex(q => q.index === index);
      case 'questionLibre':
        return survey.questionLibre.findIndex(q => q.index === index);
      case 'questionValeurParDefaut':
        return survey.questionValeurParDefaut.findIndex(q => q.index === index);
      case 'questionChoixMultiple':
        return survey.questionChoixMultiple.findIndex(q => q.index === index);
      case 'questionCorp':
        return survey.questionCorp.findIndex(q => q.index === index);
      case 'questionRange':
        return survey.questionRange?.findIndex(q => q.index === index);
      default:
        return -1; // Si le type de question n'est pas reconnu
    }
  }


  getTitle(typeQuestion: string) {

    switch (typeQuestion) {
      case 'questionUnique':
        return "Question unique";
      case 'questionDependante':
        return "Question dépendante";
      case 'questionLibre':
        return "Question libre";
      case 'questionValeurParDefaut':
        return "Question valeur par défaut";
      case 'questionBinaire':
        return "Question binaire";
      case 'questionChoixMultiple':
        return "Question choix multiple";
      case 'questionCorp':
        return "Question corp";
      case 'questionRange':
        return "Question curseur";
      case 'result':
        return "Resultant";
      default:
        return "";
    }

  }

  showAlert(message: string) {
    const config = new MatSnackBarConfig();
    config.horizontalPosition = 'center';
    config.verticalPosition = 'top';
    config.duration = 3000;
    this._snackBar.open(message, "D'accord", config);
  }

  getRegionNameFromCode(regionCode: string | undefined): string | undefined {
    const regionData = [
      {"code": "01", "nom": "AURA"},
      {"code": "02", "nom": "BOURGOGNE FRANCHE-COMTE"},
      {"code": "03", "nom": "BRETAGNE"},
      {"code": "04", "nom": "CENTRE VAL DE LOIRE"},
      {"code": "05", "nom": "Corse"},
      {"code": "06", "nom": "Grand Est"},
      {"code": "07", "nom": "Hauts-de-France"},
      {"code": "08", "nom": "Ile de France"},
      {"code": "09", "nom": "Normandie"},
      {"code": "10", "nom": "NOUVELLE AQUITAINE"},
      {"code": "11", "nom": "Occitanie"},
      {"code": "12", "nom": "Pays de la Loire"},
      {"code": "13", "nom": "Provence-Alpes-Côte d'Azur"}
    ];

    const matchingRegion = regionData.find(region => region.code === regionCode);

    return this.removeAccentsAndCapitalize(matchingRegion?.nom!);
  }

  removeAccentsAndCapitalize(text: string): string {
    // Use Unicode normalization for robust accent removal
    const normalizedText = text.normalize('NFD');
  
    // Remove combining diacritical marks (accents) and hypens
    const sanitizedText = normalizedText.replace(/[\u0300-\u036f]/g, '').replace(/-/g, ' ');
  
    // Capitalize the first letter
    return sanitizedText.toUpperCase();
  }
  
}
