import { Component, OnInit } from '@angular/core';
import { CognitoService } from 'src/app/service/auth/cognito.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private cognito: CognitoService, private router: Router, private fb: FormBuilder, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.cognito.isAuthenticated()
      .subscribe(auth => this.router.navigate(['/list']), ()=>{});
    this.loginForm = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  onSubmitLogin(value: any) {
    const email = value.email, password = value.password;
    this.cognito.login(email, password)
      .subscribe(
        result => this.router.navigate(['main/dashboard']),
        err => {
          this.snackBar.open(err.message,null, {
            duration: 5000,
          });
          console.log(err);
        } );
  }

  onSignupClick(){
    this.router.navigate(['/signup'])
  }

}
