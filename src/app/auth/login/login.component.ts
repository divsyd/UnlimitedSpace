import {Component, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountServiceService} from '../../servers/account/account-service.service';
import {validate} from 'codelyzer/walkerFactory/walkerFn';
import {Subscription} from 'rxjs';
// component for log  user
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  private authStatus: Subscription;
  loginForm: FormGroup;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor(private router: Router,
              private formbuilder: FormBuilder,
              private accountservice: AccountServiceService) {
  }

  ngOnInit() {
    this.loginForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required]]
    });
    this.authStatus = this.accountservice
      .getAuthStatusListener()
      .subscribe( auth => {},
        error => {});
  }

// back to home page
  btnClick(): void {
    this.router.navigate(['/']);

  }
// post data to back end
  loginUser(): void {
    this.accountservice.login(this.loginForm.value);
  }

  // destroy unused subscription
  ngOnDestroy() {
    this.authStatus.unsubscribe();
  }
}
