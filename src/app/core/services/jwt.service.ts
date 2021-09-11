import { Injectable } from '@angular/core';
import { environment } from '@env';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  private storageKey = {
    jwtToken: "jwtToken",
    jwtTokenExpiryDate: "jwtTokenExpiryDate"
  };
  
  constructor() { }
  
  getToken(): String {   
    let expiraTionDate: Date =  null;

    expiraTionDate =  new Date(JSON.parse(localStorage.getItem(this.storageKey.jwtTokenExpiryDate)));  
    if(!expiraTionDate || new Date() > expiraTionDate) {
			return null;
		}		
    return localStorage.getItem(this.storageKey.jwtToken);
  }

  saveToken(token: string) {
    const expiraTionDate = new Date(
      new Date().getTime() + environment.tokenExpiration * 1000
    );
    localStorage.setItem(this.storageKey.jwtToken, token);  
    localStorage.setItem(this.storageKey.jwtTokenExpiryDate, JSON.stringify(expiraTionDate));      
  }

  destroyToken() {
    localStorage.removeItem(this.storageKey.jwtToken);
    localStorage.removeItem(this.storageKey.jwtTokenExpiryDate);
  }
}
