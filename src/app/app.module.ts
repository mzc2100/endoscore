import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DataSurveyComponent} from './data-survey/data-survey.component';
import {HomeComponent} from './home/home.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UniqueFormComponent} from './form/unique-form/unique-form.component';
import {DependentFormComponent} from './form/dependent-form/dependent-form.component';
import {QuestionLibreFormComponent} from './form/question-libre-form/question-libre-form.component';
import {ValeurParDefautFormComponent} from './form/valeur-par-defaut-form/valeur-par-defaut-form.component';
import {ChoixMultipleFormComponent} from './form/choix-multiple-form/choix-multiple-form.component';
import {QuestionBinaireFormComponent} from './form/question-binaire-form/question-binaire-form.component';
import {HttpClientModule} from '@angular/common/http';
import {ResultComponent} from './result/result.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatListModule} from "@angular/material/list";
import {MatTabsModule} from "@angular/material/tabs";
import {MatCardModule} from "@angular/material/card";
import {MatRadioModule} from "@angular/material/radio";
import {MatSnackBar, MatSnackBarModule, MatSnackBarConfig} from '@angular/material/snack-bar';
import {CorphumainFormComponent} from './form/corphumain-form/corphumain-form.component';
import {RangeFormComponent} from './form/range-form/range-form.component';
import {MatSliderModule} from "@angular/material/slider";
import {NgApexchartsModule} from "ng-apexcharts";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import { QuestionSetterComponent } from './home/question-setter/question-setter.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginComponent } from './home/login/login.component';
import { RegistrationComponent } from './home/registration/registration.component';
import { AddressFormComponent } from './home/address-form/address-form.component';
import { MatButtonModule } from '@angular/material/button';
import { GoogleLoginCardComponent } from './home/login/google-login-card/google-login-card.component';

@NgModule({
  declarations: [
    AppComponent,
    DataSurveyComponent,
    HomeComponent,
    UniqueFormComponent,
    DependentFormComponent,
    QuestionLibreFormComponent,
    ValeurParDefautFormComponent,
    ChoixMultipleFormComponent,
    QuestionBinaireFormComponent,
    ResultComponent,
    CorphumainFormComponent,
    RangeFormComponent,
    QuestionSetterComponent,
    LoginComponent,
    RegistrationComponent, 
    AddressFormComponent,
    GoogleLoginCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatIconModule,
    MatProgressBarModule,
    MatListModule,
    MatTabsModule,
    MatCardModule,
    MatRadioModule,
    MatSliderModule,
    NgApexchartsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
