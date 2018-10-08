import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, NgForm, Validators} from '@angular/forms';
import { AccountServiceService} from '../../servers/account/account-service.service';
import { Router } from '@angular/router';
import {observable, of, Subscription} from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  errorMsg = '';
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
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      passwordConfirmation: ['', [Validators.required,
                                  Validators.minLength(4)]]
    }, this.getErrorMessage.bind(this));
    this.authStatus = this.accountservice
                      .getAuthStatusListener()
                      .subscribe( auth => {},
                        error => {

                        });
  }
  signUp() {
    this.accountservice.signup(this.signupForm.value);
  }

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
  ngOnDestroy() {
    this.authStatus.unsubscribe();
  }
}
