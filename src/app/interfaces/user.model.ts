export class User {
  constructor(
    private email: string,
    private token: string,
    private id: number,
    private isLogged: boolean
  ) {}


  get userToken() {
    return this.token;
  }

  get userId() {
    return this.id;
  }
  get userIsLogged() {
    return this.isLogged;
  }
}
