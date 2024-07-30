import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Survey} from "../../../models/survey.model";
import {SurveyService} from "../../../services/survey.service";
import {QuestionUniqueModel} from "../../../models/questionUnique/questionUnique.model";
import {QuestionDependanteModel} from "../../../models/questionDependante/questionDependante.model";
import {QuestionLibreModel} from "../../../models/questionLibre/questionLibre.model";
import {QuestionValeurParDefautModel} from "../../../models/questionValeurParDefaut/questionValeurParDefaut.model";
import {QuestionBinaireModel} from "../../../models/questionBinaire/questionBinaire.model";
import {QuestionChoixMultipleModel} from "../../../models/questionChoixMultiple/questionChoixMultiple.model";
import {QuestionCorp} from "../../../models/questionCorp/questionCorp.model";
import {QuestionRange} from "../../../models/questionRange/questionRange";

@Component({
  selector: 'app-range-form',
  templateUrl: './range-form.component.html',
  styleUrls: ['./range-form.component.css']
})
export class RangeFormComponent implements OnInit {
  
  @Input() question!: (QuestionUniqueModel | QuestionDependanteModel | QuestionLibreModel | QuestionValeurParDefautModel | QuestionBinaireModel | QuestionChoixMultipleModel | QuestionCorp | QuestionRange);
  @Input() survey!: Survey;
  @Input() currentQuestionIndex!: number;
  @Output() precedentSection = new EventEmitter<boolean>();
  @Output() nextSection = new EventEmitter<boolean>();
  @Output() currentQuestionIndexChange = new EventEmitter<number>();
  private currentQuestionIndexRange: number = 0;

  private isQuestFilled: Boolean = false;
  private sliderChanged: Boolean = false;

  constructor(private surveyService: SurveyService) {
  }

  goToPreviousQuestion() {

    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.currentQuestionIndexChange.emit(this.currentQuestionIndex); // Emit the currentQuestionIndex
    }

    if (this.currentQuestionIndexRange > 0) {
      this.currentQuestionIndexRange--;
    }
  }

  ngOnInit(): void {
    this.getOnResponses();
    this.sliderChanged = false;
  }

  getOnResponses() {
    
    if (this.survey) {

      const indexRange = this.getCurrentQuestionIndexRange();
      const question = this.survey.questionRange[indexRange];

      console.log("on reponse" + question.reponseMax);
      console.log("on reponse step" + question.index);

      // if response is 0 the slider has to be changed
      if (this.sliderChanged) {
        this.isQuestFilled = question.reponseMax !== undefined;

        console.log("is filled true");

      } else if(question.reponseMax !== 0){
        this.isQuestFilled = true;
        this.isQuestFilled = question.reponseMax !== undefined;
        console.log("is filled true");
      } else {
        this.isQuestFilled = false;
        console.log("is filled false");
      }
    }
  }

  handleSliderChange($event: Event) {

    console.log("hand slider change clicked");
    this.sliderChanged = true;
    this.getOnResponses();
  }

  goToNextQuestion() {

    this.getOnResponses();

    if(this.isQuestFilled){
      this.currentQuestionIndex++;
      this.currentQuestionIndexChange.emit(this.currentQuestionIndex);
    } else {
      this.surveyService.showAlert("Veuillez remplir le questionnaire avant de poursuivre.");
    }
    
    this.sliderChanged = false;
  }

  getCurrentQuestionIndexRange() {
    return this.surveyService.findQuestionTypeIndex(this.survey, this.currentQuestionIndex, "questionRange")
  }


}
