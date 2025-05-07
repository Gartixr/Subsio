import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionDetailDialogComponent } from './subscription-detail-dialog.component';

describe('SubscriptionDetailDialogComponent', () => {
  let component: SubscriptionDetailDialogComponent;
  let fixture: ComponentFixture<SubscriptionDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriptionDetailDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptionDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
