import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface SecurityToken{
  access_token?: string; 
  expires_in?: number;
  token_type?: string;
}
@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  private http = inject(HttpClient);
  private apiUrl = "https://localhost:7110/api/security/token";
  getToken(): Observable<SecurityToken>{
    return this.http.get<SecurityToken>(this.apiUrl);
  }
  constructor() { }
}
