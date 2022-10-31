export class Notification {
  private _msg!: string;
  private _duration!: number;
  private _type!: 'success' | 'info' | 'warning' | 'error' | 'loading';
  private _output!: 'message' | 'modal' | 'notification';
  private _title!: string;

  public get msg(): string {
    return this._msg;
  }
  public set msg(value: string) {
    this._msg = value;
  }
  public get type(): 'success' | 'info' | 'warning' | 'error' | 'loading' {
    return this._type;
  }
  public set type(value: 'success' | 'info' | 'warning' | 'error' | 'loading') {
    this._type = value;
  }
  public get duration(): number {
    return this._duration;
  }
  public set duration(value: number) {
    this._duration = value;
  }
  public get output(): 'message' | 'modal' | 'notification' {
    return this._output;
  }
  public set output(value: 'message' | 'modal' | 'notification') {
    this._output = value;
  }
  public get title(): string {
    return this._title;
  }
  public set title(value: string) {
    this._title = value;
  }

  constructor(input: any) {
    Object.assign(this, input);
  }
}
