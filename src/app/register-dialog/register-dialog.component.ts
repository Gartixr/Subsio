import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Auth, createUserWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss']
})
export class RegisterDialogComponent {
  fb = inject(FormBuilder);
  dialogRef = inject(MatDialogRef<RegisterDialogComponent>);
  auth = inject(Auth);
  router = inject(Router);

  registerForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  async register() {
    if (this.registerForm.invalid) return;
  
    const { email, password, name } = this.registerForm.value;
  
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email!, password!);
      await updateProfile(userCredential.user, { displayName: name! });
  
      this.dialogRef.close(); // cerrar el diálogo
      this.router.navigate(['/dashboard']); // redirigir tras registro
    } catch (error) {
      console.error('Registration error:', error);
      // puedes mostrar un error con MatSnackBar si quieres
    }
  }
}
