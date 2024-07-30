import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

hide: boolean = false;

loginForm: FormGroup = new FormGroup({
  username: new FormControl('', [Validators.email, Validators.required]),
  password: new FormControl('', Validators.required)
})

}
