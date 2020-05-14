import { Component, OnInit } from '@angular/core';
import {LoginService} from "../services/login.service";
import {ActivatedRoute, Router} from "@angular/router";

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
  msg: string;

  constructor(private route: ActivatedRoute, private router: Router, private loginService: LoginService) { }

  ngOnInit() {
    localStorage.clear();
    this.route.params.subscribe(params => {
      console.log(params);
      if(params.msg) {
        this.msg = params.msg;
      } else {
        this.msg = "";
      }
    })
  }

  login() {
    this.loginService.login(this.username, this.password).subscribe(data => {
      console.log('data', data);
      localStorage.setItem('username', this.username);
      this.router.navigate(['/dashboard']);
    }, error => {
      alert('Hibás felhasználónév vagy jelszó!');
    });
  }

  register() {
    this.loginService.register(this.registerUsername, this.registerPassword).subscribe(data => {
      console.log('data', data);
      localStorage.setItem('username', this.registerUsername);
      this.router.navigate(['/dashboard']);
    }, error => {
      alert('Hibás adatok!');
    });

  }

}
