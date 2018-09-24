import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, NgForm, Validators} from '@angular/forms';
import { AccountServiceService} from '../../servers/account/account-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  errorMsg = '';
  signupForm: FormGroup;
  constructor(private router: Router,
              private formbuilder: FormBuilder,
              private accountservice: AccountServiceService) { }

  getErrorMessage(type: string) {
    if (type === 'email') {
      return this.signupForm.value.email.hasError('required') ? 'You must enter a value' :
        this.signupForm.value.email.hasError('email') ? 'Not a valid email' :
          '';
    } else {
      return this.signupForm.value.password.hasError('required') ? 'Please enter a password' :
        this.signupForm.value.password.hasError('minLength') ? 'password 8 ' : '';
    }
  }
  ngOnInit() {
    this.signupForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required ]
    });
  }
  signUp() {
    this.accountservice.signup(this.signupForm.value).subscribe(
      res => {
        console.log(res);
        if (res) {
          this.router.navigateByUrl('/user');
        }
      },
    );
  }
}
