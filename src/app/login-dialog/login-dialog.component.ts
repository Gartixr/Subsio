import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Import Router for navigation

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  imports: [FormsModule, CommonModule], // Add FormsModule to imports
  styleUrls: ['./login-dialog.component.scss'],
})
export class LoginDialogComponent {
  email = '';
  password = '';
  error = '';

  constructor(
    private auth: AuthService,
    private dialogRef: MatDialogRef<LoginDialogComponent>,
    private router: Router // Inject Router for navigation
  ) {}

  async login() {
    try {
      await this.auth.login(this.email, this.password);
      this.dialogRef.close();
      this.router.navigate(['/dashboard']);
    } catch (err) {
      this.error = 'Login failed. Check credentials.';
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
