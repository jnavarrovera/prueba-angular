import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BackdropComponent } from './components/backdrop/backdrop.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { LoaderComponent } from './components/loader/loader.component';
import { NotificationComponent } from './components/notification/notification.component';
import { NotificationErrorHandler } from './handlers/notifications-error.handler';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { HttpHeadersInterceptor } from './interceptors/http-headers.interceptor';
import { LoadingInterceptor } from './interceptors/loading.interceptor';

const materialModules = [
  MatIconModule,
  MatDialogModule,
  MatButtonModule,
  MatProgressSpinnerModule,
];

@NgModule({
  declarations: [
    NotificationComponent,
    ConfirmationComponent,
    BackdropComponent,
    LoaderComponent,
  ],
  imports: [CommonModule, OverlayModule, ...materialModules],
  exports: [BackdropComponent, LoaderComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHeadersInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: ErrorHandler, useClass: NotificationErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    MatSnackBar,
  ],
})
export class CoreModule {}
