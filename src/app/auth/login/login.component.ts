import {Component, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountServiceService} from '../../servers/account/account-service.service';
import {validate} from 'codelyzer/walkerFactory/walkerFn';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  private authStatus: Subscription;
  loginForm: FormGroup;
  errorMsg: String = '';

  constructor(private router: Router,
              private formbuilder: FormBuilder,
              private accountservice: AccountServiceService) {
  }

  ngOnInit() {
    this.loginForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
    this.authStatus = this.accountservice
      .getAuthStatusListener()
      .subscribe( auth => {},
        error => {});
  }

// direct to an user
  btnClick(): void {
    this.router.navigateByUrl('/');

  }

  loginUser(): void {
    this.accountservice.login(this.loginForm.value);
  }

  ngOnDestroy() {
    this.authStatus.unsubscribe();
  }
}
