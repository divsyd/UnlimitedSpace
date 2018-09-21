import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountServiceService} from '../../servers/account/account-service.service';
import {validate} from 'codelyzer/walkerFactory/walkerFn';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
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
  }
// direct to an user
  btnClick(): void {
    this.router.navigateByUrl('/user');

  }

  loginUser(): void {
    this.accountservice.login(this.loginForm.value).subscribe(
      res => {
        console.log(res);
        if (res['success'] ) {
          console.log('reach navigate');
          this.router.navigateByUrl('/user');
        }
      },
      error => {
        this.errorMsg = error;
      }
    );
  }
}
