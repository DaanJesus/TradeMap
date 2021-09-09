import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { HttpOptionsService } from './http-options.service';
import { Stock } from '../models/stock';

const PATH = "trade/v1"

@Injectable({
  providedIn: 'root',
})
export class ChartService extends HttpOptionsService {
  @Output()
  event: EventEmitter<any> = new EventEmitter<Stock>();

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<any> {
    return this.http
      .get(`${environment.endpoint}/${PATH}/lista`, this.getHttpOptions())
  }

  getFavorite() {
    return this.http
      .get(
        `${environment.endpoint}/${PATH}/stocks-favoritos`,
        this.getHttpOptions()
      )
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

  setFavorite(item: any) {
    var favorito;

    if (item.favorito == true) item.favorito = false;
    else item.favorito = true;

    console.log('fav', item.favorito);

    console.log(item);

    return this.http
      .put(
        `${environment.endpoint}/${PATH}//set-favorite/${item._id}`,
        item,
        this.getHttpOptions()
      )
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

  searchStock(name: string) {
    return this.http
      .get(
        `${environment.endpoint}/${PATH}/stock/${name}`,
        this.getHttpOptions()
      )
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
}
