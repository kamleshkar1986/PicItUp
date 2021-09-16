export interface User {
	firstName: string,
	lastName: string,
	email: string,
	deliveryAddress: string,
	password: string,
	isConfirmed: boolean,
	confirmOTP: string,
	otpTries: number,
	status: boolean,
	mobile: string,
	address: UserAddress
}

export interface UserAddress {
	pinCode: string,
	building: string,
	area: string,
	landmark: string,
	city: string,
	state: string
}

// export class User {
// 	public deliveryAddress: string;
// 	public password: string;
// 	public isConfirmed: boolean;
// 	public confirmOTP: string;
// 	public otpTries: number;
// 	public status: boolean;
// 	constructor(
// 		public firstName: string,
// 		public lastName: string,
// 		public email: string,
// 		//public deliveryAddress: string,
// 		//public password: string,
// 		//public isConfirmed: boolean,
// 		//public confirmOTP: string,
// 		//public otpTries: number,
// 		//public status: boolean,
// 		private _token: string,
// 		private _tokenExpirationDate: Date
// 	) {}

	
// }

