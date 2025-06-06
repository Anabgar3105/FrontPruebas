import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { map, catchError, tap } from 'rxjs/operators'
import { OResponse } from "../model/response";

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) { }

  login(user: string, password: string): Observable<string> {
  const url = "http://localhost:30030/auth/signin";
  const headers = new HttpHeaders({
    'Authorization': "Basic " + btoa(user + ":" + password)
  });

  return this.http.post(url, {}, { headers, responseType: 'text' }).pipe(
    map(token => {
      sessionStorage.setItem('user', user);
      sessionStorage.setItem('password', password);
      sessionStorage.setItem('token', token); // Guardamos el token
      return "ok";
    }),
    catchError(e => {
      if (e.status === 401) {
        alert("Contraseña incorrecta");
        return throwError(() => new Error("401 - Unauthorized"));
      } else {
        console.error(e.status + ": " + e.message);
        return throwError(() => e);
      }
    })
  );
}
}
