import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';

import { Auth, signOut, User } from '@angular/fire/auth';
import { Firestore, collection, collectionData, query, where } from '@angular/fire/firestore';
import { map, Observable, switchMap } from 'rxjs';
import { user } from 'rxfire/auth';

import { BarChartComponent } from '../charts/bar-chart.component';
import { LineChartComponent } from '../charts/line-chart.component';
import { AddSubscriptionDialogComponent } from '../add-subscription-dialog/add-subscription-dialog.component';
import { Router } from '@angular/router';
import { SubscriptionDetailDialogComponent } from '../subscription-detail-dialog/subscription-detail-dialog.component';

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
    BarChartComponent,
    LineChartComponent
  ]
})
export class DashboardComponent implements OnInit {
  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private dialog = inject(MatDialog);
  private router = inject(Router);

  subscriptions$: Observable<any[]> | undefined;
  totalPrice: number = 0;
  chartData: any[] = [];
  userName: string = 'User'

  ngOnInit(): void {

    // Obtener el usuario autenticado
    user(this.auth).subscribe((u: User | null) => {
      if (u) {
        this.userName = u.displayName || u.email || 'User';
      }
    });
    
    this.subscriptions$ = user(this.auth).pipe(
      switchMap((u) => {
        const subsRef = collection(this.firestore, 'subscriptions');
        const q = query(subsRef, where('uid', '==', u?.uid));
        return collectionData(q, { idField: 'id' }).pipe(
          map(subs => {
            this.totalPrice = subs.reduce((sum, sub) => sum + sub['price'], 0);
            this.chartData = subs.map(sub => ({
              name: sub['name'],
              price: sub['price'],
              days: this.calculateDaysLeft(sub['renewalDate'])
            }));
            return subs;
          }
          )
        );
      })
    );
  }

  calculateDaysLeft(renewalDate: string): number {
    const today = new Date();
    const renewal = new Date(renewalDate);
    const diff = renewal.getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  openAddDialog(): void {
    this.dialog.open(AddSubscriptionDialogComponent, {
      width: '400px'
    });
  }

  openViewDialog(subscription: any) {
    this.dialog.open(SubscriptionDetailDialogComponent, {
      width: '400px',
      data: subscription
    });
  }

  logout(): void {
    this.router.navigate(['']);
    signOut(this.auth);
  }
}
