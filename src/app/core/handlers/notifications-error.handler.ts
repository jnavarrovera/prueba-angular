import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { ControlatedError } from '@core/models/controlated-error.model';
import { Notification } from '@core/models/notification.model';
import { NotificationHubService } from '@core/services/notification-hub.service';

@Injectable()
export class NotificationErrorHandler implements ErrorHandler {
  constructor(
    private notificationService: NotificationHubService,
    private zone: NgZone
  ) {}

  /**
   * Función que maneja el error que el interceptor lanzó
   * @param error
   */
  handleError(error: any): void {
    let notification: Notification;
    //Si el error es el que creamos sino será de JS
    if (error instanceof ControlatedError) {
      notification = new Notification({
        msg: error.message,
        title: error.title,
        output: error.output,
      });
    } else {
      error = error.rejection ?? error;
      notification = new Notification({
        msg: error.message,
        title: 'Error inesperado',
        output: 'modal',
      });
    }
    notification.type = 'error';
    this.zone.run(() => this.notificationService.show(notification));
  }
}
