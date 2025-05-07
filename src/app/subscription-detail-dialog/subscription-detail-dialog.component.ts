import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Firestore, doc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-subscription-detail-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './subscription-detail-dialog.component.html',
  styleUrls: ['./subscription-detail-dialog.component.scss']
})
export class SubscriptionDetailDialogComponent {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<SubscriptionDetailDialogComponent>,
    private firestore: Firestore,
    private fb: FormBuilder,
    private dialog: MatDialog

  ) {
    this.form = this.fb.group({
      name: [data.name],
      price: [data.price],
      renewalDate: [data.renewalDate]
    });
  }

  async save() {
    const subRef = doc(this.firestore, `subscriptions/${this.data.id}`);
    await updateDoc(subRef, this.form.value);
    this.dialogRef.close();
  }


  confirmDelete() {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        const subRef = doc(this.firestore, `subscriptions/${this.data.id}`);
        await deleteDoc(subRef);
        this.dialogRef.close();
      }
    });
  }
}


@Component({
  selector: 'app-delete-confirmation-dialog',
  standalone: true,
  template: `
    <h2 mat-dialog-title>Delete Subscription</h2>
    <mat-dialog-content>
      Are you sure you want to delete this subscription? This action cannot be undone.
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>No</button>
      <button mat-flat-button color="warn" [mat-dialog-close]="true">Yes, Delete</button>
    </mat-dialog-actions>
  `,
  imports: [
    MatDialogModule,
    MatButtonModule
  ]
})
export class DeleteConfirmationDialogComponent {}