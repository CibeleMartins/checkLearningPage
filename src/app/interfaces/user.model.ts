export class User {
  constructor(
    private email: string,
    private token: string,
    private id: number,
  ) {}


  get userToken() {
    return this.token;
  }

  get userId() {
    return this.id;
  }
}
