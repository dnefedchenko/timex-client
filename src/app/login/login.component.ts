import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginService} from './services/login.service';
import {Employee} from '../model/employee.interface';
import {HttpErrorResponse} from '@angular/common/http';
import {CURRENT_EMPLOYEE_KEY, TIMESHEET_LIST_URL} from '../app.constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public signInForm: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private loginService: LoginService) {

  }

  ngOnInit() {
    this.buildSignInForm();
  }

  private buildSignInForm() {
    this.signInForm = this.formBuilder.group({
      employeeId: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public login(): void {
    this.loginService
      .login(this.signInForm.value)
      .then(
         (employee: Employee) => {
           localStorage.setItem(CURRENT_EMPLOYEE_KEY, JSON.stringify(employee));
           this.router.navigateByUrl(TIMESHEET_LIST_URL);
         },
        (error: HttpErrorResponse) => {});
  }
}
