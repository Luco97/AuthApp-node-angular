import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuthResponse, Usuario } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _usuario!: Usuario;

  get usuario() {
    return {...this._usuario};
  }

  constructor(private http: HttpClient) { }

  login( email: string, password: string ) {
    
    const url: string = `${this.baseUrl}/auth`;
    const body = {
      email: email,
      password: password
    }
    return this.http.post<AuthResponse>(url,body)
              .pipe(
                tap(resp => { //Antes de enviar, puedo hacer cosas antes
                  if(resp.ok){
                    localStorage.setItem('token',resp.token! );
                    this._usuario = {
                      name: resp.name!
                    }
                  }
                }),
                map(resp => resp.ok), // Transforma salidas
                catchError(err => of(err.error)) //No existe, asi lo mando
              );
              
  }

  validarToken() {
    const url: string = `${this.baseUrl}/auth/renew`;
    const headers = new HttpHeaders()
            .set('x-token',localStorage.getItem('token') || '') //Como puede ser nulo, envio un string vacio
    return this.http.get<AuthResponse>(url, {headers: headers})
          .pipe(
            map( resp => {
              return resp.ok;
            }),
            catchError( err => of(false))
          );
  }

}
