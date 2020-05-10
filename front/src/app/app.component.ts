import { Component, OnInit } from '@angular/core';
import { CognitoService } from './service/auth/cognito.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'Try Serverless';
  user: string;
  constructor(private cognito: CognitoService, private router: Router) { }

  ngOnInit(): void {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((e: NavigationEnd) => {
      this.user = e.url.indexOf('main') < 0 ? '' : this.cognito.getCurrentUserName();
    });
  }

}
