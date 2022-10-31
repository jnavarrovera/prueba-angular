import { Notification } from './notification.model';

export class ConfirmationNotification extends Notification {
  private _textYes: string = 'Sí';
  private _textNo: string = 'No';
  private _fnYes!: () => any;
  private _fnNo!: () => any;

  public get textYes(): string {
    return this._textYes;
  }
  public set textYes(value: string) {
    this._textYes = value;
  }
  public get textNo(): string {
    return this._textNo;
  }
  public set textNo(value: string) {
    this._textNo = value;
  }
  public get fnYes(): () => any {
    return this._fnYes;
  }
  public set fnYes(value: () => any) {
    this._fnYes = value;
  }
  public get fnNo(): () => any {
    return this._fnNo;
  }
  public set fnNo(value: () => any) {
    this._fnNo = value;
  }

  constructor(input: any) {
    super(input);
    Object.assign(this, input);
  }
}
