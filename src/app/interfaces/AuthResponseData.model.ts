export interface AuthResponseData {
  	expiresIn: boolean
	tokenAuthorization: string,
  	user: {
		id: number,
		nameUser: string,
		emailUser: string,
		photoUser: string
		dateRegister: string,
		isLogged: boolean,
		isFirstLogin: boolean
	}
}
