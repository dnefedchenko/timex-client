import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from './login/services/auth/auth.service';
import {
  APPROVE_TIMESHEETS_URL,
  ENTER_HOURS_URL,
  MARK_PAID_URL,
  OVERALL_SUMMARY_URL,
  STAFF_HOURS_REPORT_URL,
  TIMESHEET_LIST_URL
} from './app.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthorizedGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.authService.isAuthorized()) {
      this.router.navigateByUrl('login');
      return false;
    }

    const navigatingUrl = state.url;

    if (this.employeeAccessibleUrl(navigatingUrl) && !this.authService.isEmployee()) {
      this.router.navigateByUrl('page-not-found');
      return false;
    }
    if (this.managerAccessibleUrl(navigatingUrl) && !this.authService.isManager()) {
      this.router.navigateByUrl('page-not-found');
      return false;
    }
    if (this.executiveAccessibleUrl(navigatingUrl) && !this.authService.isExecutive()) {
      this.router.navigateByUrl('page-not-found');
      return false;
    }
    if (this.accountantAccessibleUrl(navigatingUrl) && !this.authService.isAccountant()) {
      this.router.navigateByUrl('page-not-found');
      return false;
    }
    return true;
  }

  private employeeAccessibleUrl(url) {
    return url.includes(TIMESHEET_LIST_URL) || url.includes(ENTER_HOURS_URL);
  }

  private managerAccessibleUrl(url) {
    return url.includes(STAFF_HOURS_REPORT_URL) || url.includes(APPROVE_TIMESHEETS_URL);
  }

  private executiveAccessibleUrl(url) {
    return url.includes(OVERALL_SUMMARY_URL);
  }

  private accountantAccessibleUrl(url) {
    return url.includes(MARK_PAID_URL);
  }
}
