import { HttpClient } from '@angular/common/http';
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
                    this._usuario = {
                      name: resp.name!
                    }
                  }
                }),
                map(resp => resp.ok), // Transforma salidas
                catchError(err => of(false)) //No existe, asi lo mando
              );
  }
}
