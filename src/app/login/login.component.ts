import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginService} from './services/login.service';
import {Employee} from '../model/employee.interface';
import {HttpErrorResponse} from '@angular/common/http';
import {
  CURRENT_EMPLOYEE_KEY,
  MARK_PAID_URL,
  OVERALL_SUMMARY_URL,
  SIGN_IN_URL,
  STAFF_HOURS_REPORT_URL,
  TIMESHEET_LIST_URL
} from '../app.constants';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public signInForm: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder,
              private loginService: LoginService, private authService: AuthService) {

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
      .subscribe(
         (employee: Employee) => {
           this.authService.setCurrentEmployee(employee);
           this.navigateEmployee(employee);
         },
        (error: HttpErrorResponse) => {
           this.authService.clear();
        });
  }

  private navigateEmployee(employee: Employee) {
    switch (employee.role) {
      case 'ROLE_EMPLOYEE':
        this.router.navigateByUrl(TIMESHEET_LIST_URL);
        break;
      case 'ROLE_MANAGER':
        this.router.navigateByUrl(STAFF_HOURS_REPORT_URL);
        break;
      case 'ROLE_EXECUTIVE':
        this.router.navigateByUrl(OVERALL_SUMMARY_URL);
        break;
      case 'ROLE_ACCOUNTING':
        this.router.navigateByUrl(MARK_PAID_URL);
        break;
      default:
        this.router.navigateByUrl(SIGN_IN_URL);
        break;
    }
  }
}
