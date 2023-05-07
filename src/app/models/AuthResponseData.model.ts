export interface AuthResponseData {
	tokenAuthorization: string,
  user: {
		id: number,
		nameUser: string,
		emailUser: string,
		photoUser: string
		dateRegister: string
	}
}
