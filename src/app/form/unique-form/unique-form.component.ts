import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Survey} from "../../../models/survey.model";
import {SurveyService} from "../../../services/survey.service";

@Component({
  selector: 'app-unique-form',
  templateUrl: './unique-form.component.html',
  styleUrls: ['./unique-form.component.css']
})
export class UniqueFormComponent implements OnInit {

  protected readonly String = String;

  @Input() survey!: Survey;
  @Input() currentQuestionIndex!: number;
  @Output() precedentSection = new EventEmitter<boolean>();
  @Output() nextSection = new EventEmitter<boolean>();
  @Output() currentQuestionIndexChange = new EventEmitter<number>();
  private currentQuestionIndexUnique: number = 0;

  isQuestFilled: Boolean = false;

  constructor(private surveyService: SurveyService) {
  }

  goToPreviousQuestion() {

    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.currentQuestionIndexChange.emit(this.currentQuestionIndex); // Emit the currentQuestionIndex
    }

    if (this.currentQuestionIndexUnique > 0)
      this.currentQuestionIndexUnique--;
  }

  ngOnInit(): void {
    this.getOnResponses();
  }


  handleItemClick(label: string) {
    // save question response and refresh
    this.survey.questionUnique[this.getCurrentQuestionIndexUnique()].reponse = label;
    this.getOnResponses();
  }

  getOnResponses() {
    if (this.survey) {

      // Chargez les réponses si elles existent déjà.
      const indexUnique = this.getCurrentQuestionIndexUnique();
      const question = this.survey.questionUnique[indexUnique];

      if (question.reponse) {
        this.isQuestFilled = question.reponse !== undefined;
      } else {
        this.isQuestFilled = false;
      }
    }
  }

  goToNextQuestion() {
    this.surveyService.saveSurveyData(this.survey);

    this.getOnResponses();

    if (this.isQuestFilled) {
      this.currentQuestionIndex++;
      this.currentQuestionIndexChange.emit(this.currentQuestionIndex);
      this.currentQuestionIndexUnique++;
    } else {
      this.surveyService.showAlert("Veuillez remplir le questionnaire avant de poursuivre.");
    }

  }

  getCurrentQuestionIndexUnique() {
    return this.surveyService.findQuestionTypeIndex(this.survey, this.currentQuestionIndex, "questionUnique")
  }

}
