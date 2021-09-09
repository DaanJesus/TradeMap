import { Response } from './../models/response';
import { Observable } from 'rxjs';
import { User } from './../models/user';
import { environment } from 'src/environments/environment';
import { HttpOptionsService } from './http-options.service';
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import { tap, catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

const pathTrade = "trade/v1/"
const pathAuth = "auth/v1/"

@Injectable({
  providedIn: 'root'
})
export class LoginService extends HttpOptionsService {

  private isAuth: boolean = false
  showToolbar = new EventEmitter<boolean>()

  @Output()
  event: EventEmitter<any> = new EventEmitter<User>();

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private router: Router,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {
    super()
  }

  login(user: any): Observable<Object> {

    return this.http.post<Response>(`${environment.endpoint}/${pathAuth}/login`, user, this.getHttpOptions())
      .pipe(
        map((data: any) => {

          if (data.status == "200") {

            //localStorage.setItem("user_logged", JSON.parse(data.body.user))
            localStorage.setItem("token", data.body.token)

            this.snackBar.open(data.body.message, "X", {/* 
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition, */
              duration: 2000
            })

              this.isAuth = true
              this.showToolbar.emit(true)
              this.router.navigate(['/lista'])

          } else {
            this.isAuth = false
            this.showToolbar.emit(false)
          }

          return data || {};
        }),
        catchError((error) => {
          this.snackBar.open(error.error.error, "X", { duration: 2000 })
          this.event.emit({ erro: error });
          return throwError(error);
        })
      );
  }

  register(user: any) {
    console.log(user);

    return this.http.post<Response>(`${environment.endpoint}/${pathTrade}/register`, user, this.getHttpOptions())
      .pipe(
        tap((data: any) => {
          return data || {};
        }),
        catchError((error) => {
          this.event.emit({ erro: error });
          return throwError(error);
        })
      );

  }

  userAuth() {
    return this.isAuth
  }

}