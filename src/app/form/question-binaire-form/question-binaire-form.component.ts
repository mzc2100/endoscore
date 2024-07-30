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
  selector: 'app-question-binaire-form',
  templateUrl: './question-binaire-form.component.html',
  styleUrls: ['./question-binaire-form.component.css']
})
export class QuestionBinaireFormComponent implements OnInit {
  @Input() question!: (QuestionUniqueModel | QuestionDependanteModel | QuestionLibreModel | QuestionValeurParDefautModel | QuestionBinaireModel | QuestionChoixMultipleModel | QuestionCorp | QuestionRange);

  @Input() survey!: Survey;
  @Input() currentQuestionIndex!: number;
  @Output() precedentSection = new EventEmitter<boolean>();
  @Output() nextSection = new EventEmitter<boolean>();
  @Output() currentQuestionIndexChange = new EventEmitter<number>();

  private isQuestFilled : Boolean = false;

  constructor(private surveyService: SurveyService) {
  }

  goToPreviousQuestion() {

    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.currentQuestionIndexChange.emit(this.currentQuestionIndex); // Emit the currentQuestionIndex
    }
  }

  ngOnInit(): void {
    this.getOnResponses();
  }
  
  selectChoice(choice: string) {
    this.survey.questionBinaire[this.getCurrentQuestionIndexBinaire()].reponse = choice;
    this.getOnResponses();
  }

  onOptionsSelected() {
    this.getOnResponses();
  }

  getOnResponses(){
    if (this.survey) {

      // Chargez les réponses si elles existent déjà.
      const indexBinaire = this.getCurrentQuestionIndexBinaire();
      const question = this.survey.questionBinaire[indexBinaire];

      console.log(question.reponse);

      if (question.reponse) {
        this.isQuestFilled = question.reponse !== undefined;
      } else {
        this.isQuestFilled = false;
      }
    }
  }

  goToNextQuestion() {

    this.getOnResponses();

    if(this.isQuestFilled){
      this.currentQuestionIndex++;
      this?.currentQuestionIndexChange?.emit(this?.currentQuestionIndex);
    } else {
      this.surveyService.showAlert("Veuillez remplir le questionnaire avant de poursuivre.");
    }
    
  }


  getCurrentQuestionIndexBinaire() {
    return this.surveyService.findQuestionTypeIndex(this.survey, this.currentQuestionIndex, "questionBinaire");
  }


  protected readonly String = String;
}
