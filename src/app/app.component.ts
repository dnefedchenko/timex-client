import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterEvent} from '@angular/router';
import {
  SIGN_IN_URL,
  TIMESHEET_LIST_URL,
  SIGN_IN_HEADING,
  TIMESHEET_LIST_HEADING, ENTER_HOURS_HEADING, ENTER_HOURS_URL, STAFF_HOURS_REPORT_URL, STAFF_HOURS_REPORT_HEADING
} from './app.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
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
    if (this.urlIncludes(url, SIGN_IN_URL)) {
      this.headingMessage = SIGN_IN_HEADING;
    }
    if (this.urlIncludes(url, TIMESHEET_LIST_URL)) {
      this.headingMessage = TIMESHEET_LIST_HEADING;
    }
    if (this.urlIncludes(url, ENTER_HOURS_URL)) {
      this.headingMessage = ENTER_HOURS_HEADING;
    }
    if (this.urlIncludes(url, STAFF_HOURS_REPORT_URL)) {
      this.headingMessage = STAFF_HOURS_REPORT_HEADING;
    }
  }

  private urlIncludes(url: string, maybeIncludedChunk): boolean {
    return url.includes(maybeIncludedChunk);
  }
}
