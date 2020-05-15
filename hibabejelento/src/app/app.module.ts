import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatTabsModule} from "@angular/material/tabs";
import {MatInputModule} from '@angular/material';
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";

import {HttpClientModule} from "@angular/common/http";
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatMenuModule} from "@angular/material/menu";
import {MatTableModule} from "@angular/material/table";
import { NewComplaintModalComponent } from './modals/new-complaint-modal/new-complaint-modal.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatSelectModule} from "@angular/material/select";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserDetailsModalComponent } from './modals/user-details-modal/user-details-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NewComplaintModalComponent,
    AdminDashboardComponent,
    UserDetailsModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatTabsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    MatSidenavModule,
    MatMenuModule,
    MatTableModule,
    MatDialogModule,
    MatSelectModule,
    MatSnackBarModule

  ],
  providers: [],
  entryComponents: [
    NewComplaintModalComponent,
    UserDetailsModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
