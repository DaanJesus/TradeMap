import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable, NgModule } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        //var _user = JSON.parse(localStorage.getItem('user_logged')!);
        var _token = localStorage.getItem('token')!;

        const dupReq = req.clone({
            headers: req.headers.set('authorization', (_token && _token) ? 'Bearer ' + _token : '')
        })
        return next.handle(dupReq)
    }
}

@NgModule({
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: HttpRequestInterceptor,
        multi: true
    }]
})

export class Interceptor { }