import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ComplaintService} from "../services/complaint.service";
import {MatSort} from "@angular/material/sort";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['datum', 'nev', 'szolgTipus', 'hibaLeiras', 'cim', 'telefon'];
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

  refresh() {
    this.complaintService.getAllComplaint().subscribe(data => {
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
