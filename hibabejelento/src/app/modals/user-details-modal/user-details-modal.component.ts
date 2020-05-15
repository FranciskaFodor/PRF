import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {NewComplaintModalComponent} from "../new-complaint-modal/new-complaint-modal.component";
import {UserService} from "../../services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details-modal.component.html',
  styleUrls: ['./user-details-modal.component.css']
})
export class UserDetailsModalComponent implements OnInit {

  vezeteknev;
  keresztnev;
  email;

  constructor(private modalRef: MatDialogRef<NewComplaintModalComponent>,
              private userService: UserService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    let user = localStorage.getItem('username');
    this.userService.getUserByUsername(user).subscribe(data => {
      this.vezeteknev = data[0].vezeteknev;
      this.keresztnev = data[0].keresztnev;
      this.email = data[0].email;
    })
  }

  closeModal(){
    this.modalRef.close();

  }

  edit() {
    let username = localStorage.getItem('username');
    this.userService.update(username, this.vezeteknev, this.keresztnev, this.email).subscribe(data => {
      console.log('data', data);
      this.modalRef.close();
      this.snackBar.open(data.msg, '', {
        duration: 2000,
      });

    }, error => {
      alert(error.error.msg);
    });

  }

}
