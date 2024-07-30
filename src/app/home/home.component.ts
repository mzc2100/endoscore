import { Component } from '@angular/core';
import { ModeState } from 'src/models/enum/modeState.enum';
import { SurveyService } from 'src/services/survey.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  toggleState: boolean = false;
  textMode: string = "Mode Normal";

  constructor(private surveyService: SurveyService){
    
    const savedModeState = parseInt(localStorage.getItem('modeState')!) || ModeState.MODE_NORMAL;

    if (savedModeState === ModeState.MODE_DEMO) {
      this.toggleState = true;
      this.textMode = "Mode Démo";
    } else {
      this.toggleState = false;
      this.textMode = "Mode Normal";
    } 
  
  }

  onToggleChange(newState: boolean) {

    if(newState){
      this.textMode = "Mode Démo";
      this.surveyService.modeState = ModeState.MODE_DEMO;
    } else {
      this.textMode = "Mode Normal"
      this.surveyService.modeState = ModeState.MODE_NORMAL;
    }
  }
}
