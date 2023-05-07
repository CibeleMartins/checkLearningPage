export class User {
  constructor(
    private email: string,
    private token: string,
    private id: number,
    // private expirationDate: Date
  ) {}

  // get expireDate() {
  //   return this.expirationDate;
  // }

  get userToken() {
    return this.token;
  }

  get userId() {
    return this.id;
  }
}
