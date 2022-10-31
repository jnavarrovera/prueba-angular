import { Injectable } from '@angular/core';
import { Notification } from '@core/models/notification.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from '@core/components/notification/notification.component';
import { ConfirmationNotification } from '@core/models/confirmation-notification.model';
import { ConfirmationComponent } from '@core/components/confirmation/confirmation.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class NotificationHubService {
  constructor(private _snackBar: MatSnackBar, private _dialog: MatDialog) {}

  public show(notification: Notification) {
    switch (notification.output) {
      case 'message':
        return this.showMessage(notification);
      case 'modal':
        return this.showModal(notification);
      default:
        return this.showNotification(notification);
    }
  }

  public showMessage(notification: Notification) {
    this._snackBar.openFromComponent(NotificationComponent, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      data: notification,
      panelClass: `notification-${notification.type}`,
      duration: 4000,
    });
  }

  public showNotification(notification: Notification) {
    this._snackBar.openFromComponent(NotificationComponent, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      data: notification,
      panelClass: `notification-${notification.type}`,
    });
  }

  public showModal(notification: Notification) {
    // TODO
  }

  public showConfirmation(confirmationNotification: ConfirmationNotification) {
    const dialogRef = this._dialog.open<
      ConfirmationComponent,
      ConfirmationNotification,
      string
    >(ConfirmationComponent, {
      data: confirmationNotification,
    });

    dialogRef.afterClosed().subscribe((resp) => {
      if (resp === 'yes') {
        confirmationNotification.fnYes();
      } else {
        confirmationNotification.fnNo();
      }
    });
  }
}
