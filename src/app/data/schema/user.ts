export interface User {
	firstName: string,
	lastName: string,
	email: string,
	deliveryAddress: string,
	password: string,
	isConfirmed: boolean,
	confirmOTP: string,
	otpTries: number,
	status: boolean
}

