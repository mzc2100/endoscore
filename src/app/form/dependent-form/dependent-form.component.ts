import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Survey} from "../../../models/survey.model";
import {SurveyService} from "../../../services/survey.service";
import { PropositionDependanteModel } from 'src/models/questionDependante/propositionDependante.model';

@Component({
  selector: 'app-dependent-form',
  templateUrl: './dependent-form.component.html',
  styleUrls: ['./dependent-form.component.css']
})
export class DependentFormComponent implements OnInit{
  @Input() survey!: Survey;
  @Input() currentQuestionIndex!: number;
  @Output() precedentSection = new EventEmitter<boolean>();
  @Output() nextSection = new EventEmitter<boolean>();
  @Output() currentQuestionIndexChange = new EventEmitter<number>();
  showDependentQuestions: boolean = false;
  private currentQuestionIndexDependante = 0;

  private isQuestFilled : Boolean = false;

  constructor(private surveyService: SurveyService) {

  }
  
  ngOnInit(): void {
    this.getReponses();
  }


  onOptionSelected(){
    this.getReponses();
  }

  private getReponses() { 

    if (this.survey) {
      
        const question = this.survey.questionDependante[this.getCurrentQuestionIndexDependante()];

        if (question.reponse?.proposition) {
            this.isQuestFilled = question.reponse.proposition !== undefined;
        }
    }
  }

  goToPreviousQuestion() {

    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.currentQuestionIndexChange.emit(this.currentQuestionIndex); // Emit the currentQuestionIndex
    }

    if (this.currentQuestionIndexDependante > 0)
      this.currentQuestionIndexDependante--;
  }

  goToNextQuestion() {

    this.getReponses();

    if(this.isQuestFilled){
      this.currentQuestionIndex++;
      this.currentQuestionIndexChange.emit(this.currentQuestionIndex); // Emit the currentQuestionIndex
      this.currentQuestionIndexDependante++;
    } else {
      this.surveyService.showAlert("Veuillez remplir le questionnaire avant de poursuivre.");
    }
    
  }

  getCurrentQuestionIndexDependante() {
    return this.surveyService.findQuestionTypeIndex(this.survey, this.currentQuestionIndex, "questionDependante");
  }

  protected readonly console = console;
}
