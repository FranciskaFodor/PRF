import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  vezeteknev: string;
  keresztnev: string;
  registerUsername: string;
  username: string;
  password: string;
  registerPassword: string;
  email: string;
  confirmPassword: string;
  msg: string;

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService,
              private snackBar: MatSnackBar) { }

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
    this.userService.login(this.username, this.password).subscribe(data => {
      console.log('data', data);
      localStorage.setItem('username', this.username);
      localStorage.setItem('role', data.user.role);
      if (data.user.role === 'admin') {
        this.router.navigate(['/admin-dashboard']);
      } else {
        this.router.navigate(['/dashboard']);
      }

    }, error => {
      alert('Hibás felhasználónév vagy jelszó!');
    });
  }

  register() {
    if(this.registerPassword === this.confirmPassword){
      this.userService.register(this.registerUsername, this.registerPassword, "user", this.vezeteknev, this.keresztnev, this.email).subscribe(data => {
        console.log('data', data);
        localStorage.setItem('username', this.registerUsername);
        this.router.navigate(['/dashboard']);
      }, error => {
        alert('Hibás adatok!');
      });
    } else {
      alert("Nem egyezik a két jelszó!")
    }
  }

  createAdmin() {
    const admin = "admin";
    this.userService.register(admin, admin, admin, admin, admin, admin ).subscribe(data => {
      localStorage.setItem('username', admin);
      this.snackBar.open('Admin sikeresen létrehozva! Most már admin-admin ' +
        ' felhasználónév-jelszó párossal bejelenetkezhetsz admin jogosultsággal!', '', {
        duration: 8000,
      });
      this.router.navigate(['/admin-dashboard']);
    }, error => {
      alert('Szerepel már admin az adatbázisban! (Felhasználónév: admin, jelszó: admin)');
    });


  }

}
