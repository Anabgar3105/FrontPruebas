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
    let url = "http://localhost:30030/auth/signin";
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': "Basic " + btoa(user + ":" + password) })
    return this.http.post(url, { headers: headers }).pipe(
      map(resp => {
        sessionStorage.setItem('user', user);
        sessionStorage.setItem('password', password);
        return "ok";
      }),
      catchError(e => {
        if (e.error.status == "401") {
          alert("constraseña incorrecta");
          return "ko";
        } else {
          console.error(e.error.status + ":" + e.error.error);
          return throwError(() => e);
        }
      })
    );
  }
}
