/* Interface for a model of the User */
export interface UserModel {
  id: number;
  login: string;
  money: number;
  registrationInstant: string;
  token: string;
}
