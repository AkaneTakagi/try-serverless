import { Component, OnInit } from '@angular/core';
import { CognitoService } from 'src/app/service/auth/cognito.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit {
  opened: boolean = true;
  menus = ["dashboard", "list"];

  constructor(private cognito: CognitoService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogoutClick(){
    this.cognito.logout();
    this.router.navigate(["../../login"])
  }

}
