import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.sass']
})
export class LoginFormComponent implements OnInit {

  model: any = {};
  greetings: string;

  constructor(
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.greetings = this.loginService.greetings();
    // console.log(this.greetings);
  }

}
