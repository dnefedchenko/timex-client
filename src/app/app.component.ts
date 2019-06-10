import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterEvent} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private readonly SIGN_IN_URL = '/login';
  private readonly TIMESHEET_LIST_URL = '/timesheet-list';

  public headingMessage = 'Sign In';

  constructor(private router: Router) {}

  public ngOnInit(): void {
    this.watchRouteChanges();
  }

  private watchRouteChanges() {
    this.router.events.subscribe(
      (nextEvent: RouterEvent) => {
        if (nextEvent instanceof NavigationEnd) {
          this.updateHeadingMessage(nextEvent.urlAfterRedirects);
        }
      },
      (error: any) => {});
  }

  private updateHeadingMessage(url: string) {
    switch (url) {
      case this.SIGN_IN_URL:
        this.headingMessage = 'Sign In';
        break;
      case this.TIMESHEET_LIST_URL:
        this.headingMessage = 'Timesheet List';
        break;
      default:
        this.headingMessage = 'Sign In';
        break;
    }
  }
}
