import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Survey} from "../../models/survey.model";
import {SurveyService} from "../../services/survey.service";
import { ModeState } from 'src/models/enum/modeState.enum';

@Component({
  selector: 'app-data-survey',
  templateUrl: './data-survey.component.html',
  styleUrls: ['./data-survey.component.css'],
  encapsulation: ViewEncapsulation.None
})


export class DataSurveyComponent implements OnInit {
  currentSection: number = 0;
  currentQuestionIndex: number = 0;
  survey!: Survey;
  typeQuestion: string = '';

  constructor(private surveyService: SurveyService) {
    const storedSurvey = localStorage.getItem('survey');

    if (storedSurvey) {
      this.survey = JSON.parse(storedSurvey);

      this.updateQuestionIndexAndType(this.currentQuestionIndex)

    } else {
      this.ngOnInit();
    }


  }

  ngOnInit() {

    if(this.surveyService.modeState === ModeState.MODE_DEMO){
      this.surveyService.getQuestions('assets/survey_demo.json').subscribe((data: any) => {
        this.survey = data;
        this.updateQuestionIndexAndType(this.currentQuestionIndex)
      });
    } else {
      this.surveyService.getQuestions('assets/survey.json').subscribe((data: any) => {
        this.survey = data;
        this.updateQuestionIndexAndType(this.currentQuestionIndex)
      });
    }
    

  }

  updateQuestionIndexAndType(event: number) {
    this.currentQuestionIndex = event;
    this.typeQuestion = this.surveyService.findQuestionTypeByIndex(this.survey, this.currentQuestionIndex);
    if (this.currentQuestionIndex === (this.surveyService.countQuestions(this.survey))) {
      this.typeQuestion = 'result';
    }
  }

  questionPercentage(survey: Survey, currentQuestion: number) {
    if (this.typeQuestion === 'result')
      return ((currentQuestion - 1) * 100 / (this.surveyService.countQuestions(this.survey) - 1)) | 0
    else
      return (currentQuestion * 100 / (this.surveyService.countQuestions(this.survey) - 1)) | 0
  }

  getTitle() {
    let index = this.surveyService.findQuestionTypeIndex(this.survey, this.currentQuestionIndex, this.typeQuestion)
    switch (this.typeQuestion) {
      case 'questionUnique':
        return this.survey.questionUnique[index].sectionName;
      case 'questionDependante':
        return this.survey.questionDependante[index].sectionName;
      case 'questionLibre':
        return this.survey.questionLibre[index].sectionName;
      case 'questionValeurParDefaut':
        return this.survey.questionValeurParDefaut[index].sectionName;
      case 'questionBinaire':
        return this.survey.questionBinaire[index].sectionName;
      case 'questionChoixMultiple':
        return this.survey.questionChoixMultiple[index].sectionName;
      case 'questionCorp':
        return this.survey.questionCorp[index].sectionName;
      case 'questionRange':
        return this.survey.questionRange[index].sectionName;
      case 'result':
        return "Resultat";
      default:
        return "";
    }
  }


}


