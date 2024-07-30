import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Survey} from "../../../models/survey.model";
import {QuestionUniqueModel} from "../../../models/questionUnique/questionUnique.model";
import {QuestionDependanteModel} from "../../../models/questionDependante/questionDependante.model";
import {QuestionLibreModel} from "../../../models/questionLibre/questionLibre.model";
import {QuestionValeurParDefautModel} from "../../../models/questionValeurParDefaut/questionValeurParDefaut.model";
import {QuestionBinaireModel} from "../../../models/questionBinaire/questionBinaire.model";
import {QuestionChoixMultipleModel} from "../../../models/questionChoixMultiple/questionChoixMultiple.model";
import {QuestionCorp} from "../../../models/questionCorp/questionCorp.model";
import {QuestionRange} from "../../../models/questionRange/questionRange";
import {SurveyService} from "../../../services/survey.service";

@Component({
  selector: 'app-valeur-par-defaut-form',
  templateUrl: './valeur-par-defaut-form.component.html',
  styleUrls: ['./valeur-par-defaut-form.component.css']
})
export class ValeurParDefautFormComponent implements OnInit{
  @Input() question!: (QuestionUniqueModel | QuestionDependanteModel | QuestionLibreModel | QuestionValeurParDefautModel | QuestionBinaireModel | QuestionChoixMultipleModel | QuestionCorp | QuestionRange);
  @Input() survey!: Survey;
  @Input() currentQuestionIndex: number = 0;
  @Output() precedentSection = new EventEmitter<boolean>();
  @Output() nextSection = new EventEmitter<boolean>();
  @Output() currentQuestionIndexChange = new EventEmitter<number>();
  private currentQuestionIndexValeurParDefaut: number = 0;
  private isQuestFilled : Boolean = false;

  constructor(private surveyService: SurveyService) {
  }

  ngOnInit(): void {
    this.getOnResponses();
  }
  
  onOptionsSelected() {
    this.getOnResponses();
  }

  goToPreviousQuestion() {

    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.currentQuestionIndexChange.emit(this.currentQuestionIndex);
    }

    if (this.currentQuestionIndexValeurParDefaut > 0)
      this.currentQuestionIndexValeurParDefaut--;
  }

  getOnResponses(){
    if (this.survey) {

      // Chargez les réponses si elles existent déjà.
      const indexValeurParDefaut = this.getCurrentQuestionIndexValeurParDefaut();
      const question = this.survey.questionValeurParDefaut[indexValeurParDefaut];

      if (question.reponse?.proposition) {
        this.isQuestFilled = question.reponse.proposition !== undefined;
      } else {
        this.isQuestFilled = false;
      }
    }
  }
  goToNextQuestion() {

    if(this.isQuestFilled){
      this.currentQuestionIndex++;
      this.currentQuestionIndexChange.emit(this.currentQuestionIndex);
      this.currentQuestionIndexValeurParDefaut++;
    } else {
      this.surveyService.showAlert("Veuillez remplir le questionnaire avant de poursuivre.");
    }
    
  }

  getCurrentQuestionIndexValeurParDefaut() {
    return this.surveyService.findQuestionTypeIndex(this.survey, this.currentQuestionIndex, "questionValeurParDefaut")
  }

  protected readonly JSON = JSON;
}
