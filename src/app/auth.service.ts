import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { tap } from "rxjs";

@Injectable({
    providedIn:'root'
})

export class AuthService2{
    private urlApi = 'http://localhost:3000';

    constructor(private http: HttpClient, private router:Router){}
        login(email:string, passoword:string) {
            return this.http.post<{token:string}>(`${this.urlApi}/login`,{
                email,passoword
            }).pipe(tap(
                response => {
                    localStorage.setItem('auth_token',response.token)
                }
            ))}
            logout() {
                localStorage.removeItem('auth_token');
                this.router.navigate(['/login']);
              }
            
              isLoggedIn(): boolean {
                return !!localStorage.getItem('auth_token');
              }
}
