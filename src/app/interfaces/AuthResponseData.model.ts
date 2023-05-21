export interface AuthResponseData {
  	expiresIn: string
	tokenAuthorization: string,
  	user: {
		id: number,
		nameUser: string,
		emailUser: string,
		photoUser: string
		dateRegister: string
	}
}
