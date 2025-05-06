import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { RouterModule } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import {MatGridListModule} from '@angular/material/grid-list';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';

@Component({
  selector: 'app-home',
  imports: [RouterModule, MatButtonModule, MatCardModule, MatToolbarModule, MatDividerModule, CommonModule, MatGridListModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private dialog: MatDialog) {}

  openLoginDialog() {
    this.dialog.open(LoginDialogComponent);
  }
  openRegisterDialog() {
    this.dialog.open(RegisterDialogComponent, {
      width: '400px'
    }); 
  }
}
