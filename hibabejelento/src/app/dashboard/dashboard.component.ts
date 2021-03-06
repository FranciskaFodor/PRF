import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {NewComplaintModalComponent} from "../modals/new-complaint-modal/new-complaint-modal.component";
import {ComplaintService} from "../services/complaint.service";
import {MatSort} from "@angular/material/sort";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {UserDetailsModalComponent} from "../modals/user-details-modal/user-details-modal.component";



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['datum', 'szolgTipus', 'hibaLeiras', 'cim', 'telefon'];
  dataSource;

  constructor(private dialog: MatDialog,
              private complaintService: ComplaintService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    console.log(localStorage.getItem('role'));
    this.refresh();
    //this.dataSource.sort = this.sort;
  }

  newComplaint() {
    this.dialog.open(NewComplaintModalComponent).afterClosed().subscribe(result=> {
      this.refresh();
    });
  }

  adatok() {
    this.dialog.open(UserDetailsModalComponent).afterClosed().subscribe(result=> {
      this.refresh();
    });
  }

  refresh() {
    let user = localStorage.getItem('username');
    this.complaintService.getComplaintListByUsername(user).subscribe(data => {
      console.log('data', data);
      this.dataSource = data;
    });
  }

  logout() {
    this.userService.logout().subscribe(data => {
      //localStorage.clear();
      this.router.navigate(['/login']);
    }, error => {
      console.log(error);
      alert('Sikertelen kijelentkezés!');
    });
  }

}
