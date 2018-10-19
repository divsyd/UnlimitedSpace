import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, NgForm, Validators} from '@angular/forms';
import { AccountServiceService} from '../../servers/account/account-service.service';
import { Router } from '@angular/router';
import {observable, of, Subscription} from 'rxjs';
// sign up component
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  private authStatus: Subscription;
  signupForm: FormGroup;
  constructor(private router: Router,
              private formbuilder: FormBuilder,
              private accountservice: AccountServiceService) { }

  getErrorMessage(type: string) {
    if (type === 'email') {
      return of();
    }
  }
  ngOnInit() {
    this.signupForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      passwordConfirmation: ['', [Validators.required,
                                  Validators.minLength(4)]]
    }, this.getErrorMessage.bind(this));
    this.authStatus = this.accountservice
                      .getAuthStatusListener()
                      .subscribe( auth => {},
                        error => {});
  }
  // send user information to back end
  signUp() {
    this.accountservice.signup(this.signupForm.value);
  }
// get kinds of error message
  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get passwordMismatch(): boolean {
    return this.signupForm.get('password').dirty !== this.signupForm.get('passwordConfirmation').dirty;
  }

  btnBack() {
    this.router.navigate(['/']);
  }
  // destroy unused subscription
  ngOnDestroy() {
    this.authStatus.unsubscribe();
  }
}
