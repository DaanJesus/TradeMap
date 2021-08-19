import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { HttpOptionsService } from './http-options.service';

@Injectable({
  providedIn: 'root'
})
export class ChartService extends HttpOptionsService {
  @Output()
  event: EventEmitter<any> = new EventEmitter<any>()

  constructor(private http: HttpClient) { super() }

  getAll() {
    return this.http.get("http://localhost:3000/trads", this.getHttpOptions())
      .pipe(tap((data: any) => { return data || {} }),
        catchError(error => {
          this.event.emit({ 'erro': error })
          return throwError(error)
        }))
  }
}
