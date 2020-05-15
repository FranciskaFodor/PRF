import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {ComplaintService} from "../../services/complaint.service";
import {MatSnackBar} from "@angular/material/snack-bar";

interface Szolgaltatasok {
  value: string;
}

@Component({
  selector: 'app-new-complaint-modal',
  templateUrl: './new-complaint-modal.component.html',
  styleUrls: ['./new-complaint-modal.component.css']
})
export class NewComplaintModalComponent implements OnInit {

  szolgTipus: string;
  hibaLeiras: string;
  nev: string;
  cim: string;
  telefon: string;

  szolgaltatasok: Szolgaltatasok[] = [
    {value: 'TV'},
    {value: 'Internet'},
    {value: 'Telefon'}
  ];



  constructor(private modalRef: MatDialogRef<NewComplaintModalComponent>,
              private complaintService: ComplaintService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  closeModal(){
    this.modalRef.close();

  }

  makeComplaint() {
    let username = localStorage.getItem('username');
    this.complaintService.newComplaint(username, this.szolgTipus, this.hibaLeiras, this.cim, this.telefon).subscribe(data => {
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
