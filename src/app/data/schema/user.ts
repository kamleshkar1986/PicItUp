export class User {
	public deliveryAddress: string;
	public password: string;
	public isConfirmed: boolean;
	public confirmOTP: string;
	public otpTries: number;
	public status: boolean;
	constructor(
		public firstName: string,
		public lastName: string,
		public email: string,
		//public deliveryAddress: string,
		//public password: string,
		//public isConfirmed: boolean,
		//public confirmOTP: string,
		//public otpTries: number,
		//public status: boolean,
		private _token: string,
		private _tokenExpirationDate: Date
	) {}

	get token() {
		if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
			return null;
		}
		return this._token;
	}
}

