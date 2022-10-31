export class ControlatedError extends Error {
  private _title!: string;
  private _output!: "message" | "modal" | "notification";

  public get title(): string {
    return this._title;
  }
  public set title(value: string) {
    this._title = value;
  }
  public get output(): "message" | "modal" | "notification" {
    return this._output;
  }
  public set output(value: "message" | "modal" | "notification") {
    this._output = value;
  }

  constructor(
    title: string,
    output: "message" | "modal" | "notification",
    ...parameters: any
  ) {
    super(...parameters);
    this.title = title;
    this.output = output;
  }
}
