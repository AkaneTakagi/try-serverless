import { Component, OnInit } from '@angular/core';
import { CognitoService } from 'src/app/service/auth/cognito.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less']
})
export class SignupComponent implements OnInit {
  successfullySignup: boolean;
  signupForm: FormGroup;
  confirmationForm: FormGroup;

  constructor(private fb: FormBuilder, private cognito: CognitoService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.successfullySignup = false;
    this.signupForm = this.fb.group({
      email: [''],
      password: ['']
    });
    this.confirmationForm = this.fb.group({
      confirmationCode: ['']
    });
  }

  onSubmitSignup(value: any) {
    const email = value.email, password = value.password;
    this.cognito.signUp(email, password)
      .subscribe((result) => {
        console.log(result);
        this.successfullySignup = true;
      }, (err) => {
        console.log(err);
        this.snackBar.open(err.message, null, { duration: 5000 });
      });
  }

  onSubmitConfirmation(value: any) {
    const email = this.signupForm.controls['email'].value;
    const confirmationCode = value.confirmationCode;
    this.cognito.confirmation(email, confirmationCode)
      .subscribe((result) => {
        if (result) { console.log(result); }
        this.router.navigate(['/login']);
      }, (err) => {
        console.log(err);
        this.snackBar.open(err.message, null, { duration: 5000 });
      });
  }

}
