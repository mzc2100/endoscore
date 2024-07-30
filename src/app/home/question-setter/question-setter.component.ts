import { Component, Input } from '@angular/core';
import { Survey } from 'src/models/survey.model';
import { SurveyService } from 'src/services/survey.service';

@Component({
  selector: 'app-question-setter',
  templateUrl: './question-setter.component.html',
  styleUrls: ['./question-setter.component.css'],
})
export class QuestionSetterComponent {

  questionTypes: string[] = [];
  dragIndex: number = 0;
  dropIndex: number = 0;
  survey: Survey = new Survey(); // Initialize survey object

  constructor(public surveyService: SurveyService) {
    const storedSurvey = localStorage.getItem('survey2');

    if (storedSurvey) {
      this.survey = JSON.parse(storedSurvey);
      this.questionTypes = Object.keys(this.survey);
    } else {
      this.surveyService.getQuestions('assets/survey.json').subscribe((data: Survey) => {
        this.survey = data;
        this.questionTypes = Object.keys(this.survey);
      });
    }
  }

  onDragStart(event: DragEvent, dragIndex: number): void {
    this.dragIndex = dragIndex;
  }

  onDrop(event: DragEvent, dropIndex: number): void {
    event.preventDefault();

    this.dropIndex = dropIndex;

    this.surveyService.swapQuestions(this.survey, this.dragIndex, this.dropIndex);
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }
}
