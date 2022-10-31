import { Model } from '@core/interfaces/model.interface';
export class Hero implements Model {
  private _id!: number;
  private _name!: string;
  private _alias!: string;
  private _city!: string;

  public get id(): number {
    return this._id;
  }
  public set id(value: number) {
    this._id = value;
  }
  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }
  public get alias(): string {
    return this._alias;
  }
  public set alias(value: string) {
    this._alias = value;
  }
  public get city(): string {
    return this._city;
  }
  public set city(value: string) {
    this._city = value;
  }

  constructor(input: any) {
    Object.assign(this, input);
  }

  serialize() {
    return {
      id: this.id,
      name: this.name,
      alias: this.alias,
      city: this.city,
    };
  }
}
