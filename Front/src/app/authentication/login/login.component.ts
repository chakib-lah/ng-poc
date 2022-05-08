import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { AuthenticationService } from '../services/authentication.service';
import { GenericValidator } from '../../shared/validators/generic-validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;


  constructor(
      private router: Router,
      private authService: AuthenticationService,
      private fb: FormBuilder
  ) {
    this.validationMessages = {
      username: {
        required: 'Please enter your username.'
      },
      password: {
        required: 'Please enter your password.'
      }
    };
    this.genericValidator = new GenericValidator(this.validationMessages);
  }


  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  public login() {
    let username = this.loginForm.get('username')?.value;
    let password = this.loginForm.get('password')?.value;
    // TODO handle login error
    this.authService
        .login(username, password)
        .subscribe(() => console.log('next'),
             msg => console.log(msg)
        );
  }

}
