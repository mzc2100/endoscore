import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {DataSurveyComponent} from "./data-survey/data-survey.component";
import {HomeComponent} from "./home/home.component";
import {QuestionSetterComponent} from "./home/question-setter/question-setter.component";
import { LoginComponent } from './home/login/login.component';
import { AddressFormComponent } from './home/address-form/address-form.component';
import { RegistrationComponent } from './home/registration/registration.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'survey', component: DataSurveyComponent },
  { path: 'setter', component: QuestionSetterComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'address', component: AddressFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
