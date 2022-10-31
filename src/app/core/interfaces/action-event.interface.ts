export interface ActionEvent<T> {
  action: string;
  payload?: T;
}
