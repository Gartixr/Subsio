import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';

import { Auth, signOut } from '@angular/fire/auth';
import { Firestore, collection, collectionData, query, where } from '@angular/fire/firestore';
import { Observable, switchMap } from 'rxjs';
import { user } from 'rxfire/auth';

import { AddSubscriptionDialogComponent } from '../add-subscription-dialog/add-subscription-dialog.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatTooltipModule,
  ]
})
export class DashboardComponent implements OnInit {
  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private dialog = inject(MatDialog);

  subscriptions$: Observable<any[]> | undefined;
  router: any;

  ngOnInit(): void {
    this.subscriptions$ = user(this.auth).pipe(
      switchMap(u => {
        const subsRef = collection(this.firestore, 'subscriptions');
        const q = query(subsRef, where('uid', '==', u?.uid));
        return collectionData(q, { idField: 'id' });
      })
    );
  }

  openAddDialog(): void {
    this.dialog.open(AddSubscriptionDialogComponent, {
      width: '400px'
    });
  }

  logout(): void {
    signOut(this.auth);
    this.router.navigate(['']); // redirigir tras registro
  }
}
