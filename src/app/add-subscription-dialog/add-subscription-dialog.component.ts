import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { user } from 'rxfire/auth';
import { firstValueFrom } from 'rxjs';
import { MatRadioButton } from '@angular/material/radio';

@Component({
  selector: 'app-add-subscription-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioButton
  ],
  templateUrl: './add-subscription-dialog.component.html',
  styleUrls: ['./add-subscription-dialog.component.scss']
})
export class AddSubscriptionDialogComponent {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  auth = inject(Auth);

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddSubscriptionDialogComponent>,
    private firestore: Firestore

  ) {
    this.firstFormGroup = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]]
    });

    this.secondFormGroup = this.fb.group({
      renewalDate: ['', Validators.required],
      frequency: [''],
      notes: ['']
    });
  }

  async submit() {
    if (this.firstFormGroup.valid && this.secondFormGroup.valid) {
      const currentUser = await firstValueFrom(user(this.auth));
  
      if (!currentUser) return;
  
      const data = {
        ...this.firstFormGroup.value,
        ...this.secondFormGroup.value,
        uid: currentUser.uid,
        createdAt: new Date()
      };
  
      try {
        const col = collection(this.firestore, 'subscriptions');
        await addDoc(col, data);
        this.dialogRef.close(data);
      } catch (error) {
        console.error('Error saving to Firestore:', error);
      }
    }
  }
}
