import { catchError } from 'rxjs/internal/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, tap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

const endpoint = 'http://localhost:3000/api/';

export interface Item {
  id: string;
  purchasedOn: Date;
  nature: string;
  originalAmount: {
    amount: number;
    currency: string;
  };
  convertedAmount: {
    amount: number;
    currency: string;
  };
  comment: string;
  createdAt: Date;
  lastModifiedAt: Date;
}

@Injectable({
  providedIn: 'root',
})
export class RestService {
  public first: string = '';
  public prev: string = '';
  public next: string = '';
  public last: string = '';

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }

  private extractData(res: Response): any {
    const body = res;
    return body || {};
  }

  parseLinkHeader(header: string) {
    if (header.length == 0) {
      return;
    }

    let parts = header.split(',');
    var links: any = {};
    parts.forEach((p) => {
      let section = p.split(';');
      var url = section[0].replace(/<(.*)>/, '$1').trim();
      var name = section[1].replace(/rel="(.*)"/, '$1').trim();
      links[name] = url;
    });

    this.first = links['first'];
    this.last = links['last'];
    this.prev = links['prev'];
    this.next = links['next'];
  }

  public sendGetRequest(): Observable<any> {
    // Add safe, URL encoded _page and _limit parameters
    return this.http
      .get<Item>(endpoint + 'expenseItems', {
        params: new HttpParams({ fromString: '_page=1&_limit=5' }),
        observe: 'response',
      })
      .pipe(
        retry(3),
        catchError(this.handleError),
        tap((res) => {
          console.log(res.headers.get('Link'));
          this.parseLinkHeader(res.headers.get('Link'));
        })
      );
  }

  public sendGetRequestToUrl(url: string): Observable<any>{
    return this.http.get<Item>(url, { observe: "response"}).pipe(retry(3), catchError(this.handleError), tap(res => {
      console.log(res.headers.get('Link'));
      this.parseLinkHeader(res.headers.get('Link'));
    }));
  }

  getItems(): Observable<any> {
    return this.http
      .get<Item>(endpoint + 'expenseItems')
      .pipe(catchError(this.handleError));
  }

  getItem(id: string): Observable<any> {
    return this.http
      .get<Item>(endpoint + 'expenseItems/' + id)
      .pipe(catchError(this.handleError));
  }

  addItem(item: any): Observable<any> {
    return this.http
      .post(endpoint + 'expenseItems/', item)
      .pipe(catchError(this.handleError));
  }

  updateItem(id: string, item: Item): Observable<any> {
    return this.http
      .put<Item>(endpoint + 'expenseItems/' + id, item)
      .pipe(catchError(this.handleError));
  }

  deleteItem(id: string): Observable<any> {
    return this.http
      .delete<Item>(endpoint + 'expenseItems/' + id)
      .pipe(catchError(this.handleError));
  }

  getTotal(): Observable<any> {
    return this.http
      .get<Item>(endpoint + 'expenseItems')
      .pipe(catchError(this.handleError));
  }
}
