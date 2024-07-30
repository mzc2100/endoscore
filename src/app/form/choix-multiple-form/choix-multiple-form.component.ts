import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Survey } from "../../../models/survey.model";
import { FormGroup } from "@angular/forms";
import { SurveyService } from "../../../services/survey.service";
import { ReponseChoixMultiple } from "../../../models/questionChoixMultiple/ReponseChoixMultiple.model";
import { QuestionUniqueModel } from "../../../models/questionUnique/questionUnique.model";
import { QuestionDependanteModel } from "../../../models/questionDependante/questionDependante.model";
import { QuestionLibreModel } from "../../../models/questionLibre/questionLibre.model";
import { QuestionValeurParDefautModel } from "../../../models/questionValeurParDefaut/questionValeurParDefaut.model";
import { QuestionBinaireModel } from "../../../models/questionBinaire/questionBinaire.model";
import { QuestionChoixMultipleModel } from "../../../models/questionChoixMultiple/questionChoixMultiple.model";
import { QuestionCorp } from "../../../models/questionCorp/questionCorp.model";
import { QuestionRange } from "../../../models/questionRange/questionRange";
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-choix-multiple-form',
  templateUrl: './choix-multiple-form.component.html',
  styleUrls: ['./choix-multiple-form.component.css']
})
export class ChoixMultipleFormComponent implements OnInit {
  @Input() question!: (QuestionUniqueModel | QuestionDependanteModel | QuestionLibreModel | QuestionValeurParDefautModel | QuestionBinaireModel | QuestionChoixMultipleModel | QuestionCorp | QuestionRange);
  @Input() survey!: Survey;
  @Input() currentQuestionIndex: number = 0;
  @Output() precedentSection = new EventEmitter<boolean>();
  @Output() nextSection = new EventEmitter<boolean>();
  @Output() currentQuestionIndexChange = new EventEmitter<number>();
  form: FormGroup | undefined;
  selectedOptions: ReponseChoixMultiple[][] = [];
  currentQuestionIndexMultipleform = 0;

  private isQuestFilled: boolean = false;

  constructor(private surveyService: SurveyService, private _snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.getReponses();
  }

  private getReponses() {

    if (this.survey) {
      this.selectedOptions = this.survey.questionChoixMultiple.map(() => []);

      // Chargez les réponses si elles existent déjà.
      const indexMultipleChoix = this.getCurrentQuestionIndexMultipleChoix();
      const question = this.survey.questionChoixMultiple[indexMultipleChoix];

      if (question.reponses) {
        this.selectedOptions[indexMultipleChoix] = [...question.reponses];

        this.isQuestFilled = question.reponses.some(response => response.name !== undefined);
      } else {
        this.isQuestFilled = false;
      }
    }
  }


  compareFunction = (o1: any, o2: any) => o1.id === o2.id;

  onOptionSelected(option: ReponseChoixMultiple, questionIndex: number): void {
    if (option.name !== undefined) {
      if (this.survey) {
        const currentQuestionChoixMultiple = this.survey.questionChoixMultiple[questionIndex];
        if (currentQuestionChoixMultiple) {
          currentQuestionChoixMultiple.reponses = this.selectedOptions[questionIndex];
          this.surveyService.saveSurveyData(this.survey);

          // Check if at least one response is checked
          const isAtLeastOneResponseChecked = currentQuestionChoixMultiple.reponses.some(response => response.name !== undefined);

          // Set isQuestfilled to true if at least one response is checked
          this.isQuestFilled = isAtLeastOneResponseChecked;
        }
      }
    }
  }


  goToPreviousQuestion() {

    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.currentQuestionIndexChange.emit(this.currentQuestionIndex)
    }

    if (this.currentQuestionIndexMultipleform > 0) {
      this.currentQuestionIndexMultipleform--;
      this.getReponses();
    }

  }

  goToNextQuestion() {

    this.getReponses();

    if (this.isQuestFilled) {
      this.currentQuestionIndexMultipleform++;
      this.currentQuestionIndex++;
      this.currentQuestionIndexChange.emit(this.currentQuestionIndex)
    } else {
      this.surveyService.showAlert("Veuillez remplir le questionnaire avant de poursuivre.");
    }
  }

  getCurrentQuestionIndexMultipleChoix() {
    return this.surveyService.findQuestionTypeIndex(this.survey, this.currentQuestionIndex, "questionChoixMultiple");
  }

}