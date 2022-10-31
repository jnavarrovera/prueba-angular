import { Component, OnInit, Input, Inject } from '@angular/core';
import {
  MatSnackBarRef,
  MAT_SNACK_BAR_DATA,
} from '@angular/material/snack-bar';
import { Notification } from '@core/models/notification.model';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  constructor(
    public snackBarRef: MatSnackBarRef<NotificationComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: Notification
  ) {}

  ngOnInit(): void {}

  getIcon() {
    switch (this.data.type) {
      case 'success':
        return 'task_alt';
      case 'loading':
        return 'hourglass_empty';
      default:
        return this.data.type.toString();
    }
  }

  onClickClose() {
    this.snackBarRef.dismiss();
  }
}
