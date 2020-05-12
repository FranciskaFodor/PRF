import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  firstname: string;
  lastname: string;
  registerUsername: string;
  username: string;
  password: string;
  registerPassword: string;
  email: string;
  confirmPassword: string;
  remember = false;
  rememberCheckbox = false;

  constructor() { }

  ngOnInit() {
  }

  login(){

  }

  register(){

  }

}
