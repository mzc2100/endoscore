import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { Survey } from '../../../models/survey.model';
import { FormGroup } from '@angular/forms';
import { SurveyService } from '../../../services/survey.service';
import { PartieCorp } from '../../../models/enum/partieCorp.enum';
import { QuestionUniqueModel } from '../../../models/questionUnique/questionUnique.model';
import { QuestionDependanteModel } from '../../../models/questionDependante/questionDependante.model';
import { QuestionLibreModel } from '../../../models/questionLibre/questionLibre.model';
import { QuestionValeurParDefautModel } from '../../../models/questionValeurParDefaut/questionValeurParDefaut.model';
import { QuestionBinaireModel } from '../../../models/questionBinaire/questionBinaire.model';
import { QuestionChoixMultipleModel } from '../../../models/questionChoixMultiple/questionChoixMultiple.model';
import { QuestionCorp } from '../../../models/questionCorp/questionCorp.model';
import { QuestionRange } from '../../../models/questionRange/questionRange';

@Component({
  selector: 'app-corphumain-form',
  templateUrl: './corphumain-form.component.html',
  styleUrls: ['./corphumain-form.component.css'],
})
export class CorphumainFormComponent implements OnChanges, OnInit {
  @Input() question!:
    | QuestionUniqueModel
    | QuestionDependanteModel
    | QuestionLibreModel
    | QuestionValeurParDefautModel
    | QuestionBinaireModel
    | QuestionChoixMultipleModel
    | QuestionCorp
    | QuestionRange;

  @Input() survey!: Survey;
  @Input() currentQuestionIndex: number = 0;
  @Output() precedentSection = new EventEmitter<boolean>();
  @Output() nextSection = new EventEmitter<boolean>();
  @Output() currentQuestionIndexChange = new EventEmitter<number>();
  form: FormGroup | undefined;
  dataClickedId: string = '';
  currentQuestionIndexBody: number = 0;

  isQuestFilled: boolean = false;

  constructor(private surveyService: SurveyService) {}

  ngOnInit(): void {
    this.checkFilled();
  }

  ngOnChanges() {
    this.checkFilled();
  }

  stringToPartieCorp(value: string | undefined): PartieCorp | undefined {
    switch (value) {
      case 'poitrine':
        return PartieCorp.BREAST;
      case 'dos':
        return PartieCorp.BACK;
      case 'ventre':
        return PartieCorp.BELLY;
      case 'bas-ventre':
        return PartieCorp.LOWER_ABDOMEN;
      case 'fesse':
        return PartieCorp.BUTTOCK;
      case 'jambe-gauche':
        return PartieCorp.LEG_LEFT;
      case 'jambe-droite':
        return PartieCorp.LEG_RIGHT;
      case 'aine':
        return PartieCorp.GROIN;
      case 'bras-droite':
        return PartieCorp.ARM_RIGHT;
      case 'bras-gauche':
        return PartieCorp.ARM_LEFT;
      default:
        return undefined;
    }
  }

  isClickable(bodyPart: string): boolean {
    const clickableBodyParts = [
      'jambe-gauche',
      'jambe-droite',
      'bas-ventre',
      'ventre',
      'poitrine',
      'fesse',
      'aine',
      'dos',
      'bras-droite',
      'bras-gauche'
    ];
    return clickableBodyParts.includes(bodyPart);
  }
  
  

  onBodyPartClicked(event: MouseEvent) {
    const clickedElementId = (event.target as SVGElement).id;

    if(clickedElementId != undefined){

      this.dataClickedId = clickedElementId;
      const clickedPartieCorp = this.stringToPartieCorp(this.dataClickedId);
    
      const currentIndex = this.getCurrentQuestionIndexBody();
      const currentQuestion = this.survey.questionCorp[currentIndex];
    
      // Initialize the reponse array if empty
      if (!currentQuestion.reponse) {
        currentQuestion.reponse = [];
      }
    
      const indexInReponse = currentQuestion.reponse.indexOf(clickedPartieCorp!);
    
      // If clickedPartieCorp exists in the reponse array, remove it
      if (indexInReponse !== -1) {
        currentQuestion.reponse.splice(indexInReponse, 1);
      } else {
        // Otherwise, add it to the reponse array
        currentQuestion.reponse.push(clickedPartieCorp!); 
      }
    
      this.checkFilled();
    }
      
  }
  

  isBodyPartSelected(bodyPartId: string): boolean {
    const reponse = this.survey.questionCorp[this.getCurrentQuestionIndexBody()].reponse;
    return reponse && reponse.includes(this.stringToPartieCorp(bodyPartId)!);
  }

  
  checkFilled() {
    const responses = this.survey.questionCorp[this.getCurrentQuestionIndexBody()]?.reponse;
  
    if (responses && responses.length > 0) {
      this.isQuestFilled = true;
    } else {
      this.isQuestFilled = false;
    }
  }
  

  goToPreviousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.currentQuestionIndexChange.emit(this.currentQuestionIndex);
    }

    if (this.currentQuestionIndexBody > 0) {
      this.currentQuestionIndexBody--;
      this.checkFilled();
    }
  }

  goToNextQuestion() {
    this.surveyService.saveSurveyData(this.survey);
    if (!this.survey) return;

    this.checkFilled();

    if (this.isQuestFilled) {
      this.currentQuestionIndexBody++;
      this.currentQuestionIndex++;
      this.currentQuestionIndexChange.emit(this.currentQuestionIndex);
    } else {
      this.surveyService.showAlert(
        'Veuillez remplir le questionnaire avant de poursuivre.'
      );
    }
  }

  getCurrentQuestionIndexBody() {
    return this.surveyService.findQuestionTypeIndex(
      this.survey,
      this.currentQuestionIndex,
      'questionCorp'
    );
  }
}
