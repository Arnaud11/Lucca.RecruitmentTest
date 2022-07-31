import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
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
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

  private extractData(res: Response): any {
    const body = res;
    return body || { };
  }

  getItems(): Observable<any> {
    return this.http.get<Item>(endpoint + 'expenseItems').pipe(
      catchError(this.handleError)
    );
  }

  getItem(id: string): Observable<any> {
    return this.http.get<Item>(endpoint + 'expenseItems/' + id).pipe(
      catchError(this.handleError)
    );
  }

  addItem(item: any): Observable<any> {
    return this.http.post(endpoint + 'expenseItems/', item).pipe(
      catchError(this.handleError)
    );
  }
  
  updateItem(id: string, item: Item): Observable<any> {
    return this.http.put<Item>(endpoint + 'expenseItems/' + id, item).pipe(
      catchError(this.handleError)
    );
  }

  deleteItem(id: string): Observable<any> {
    return this.http.delete<Item>(endpoint + 'expenseItems/' + id).pipe(
      catchError(this.handleError)
    );
  }

  getTotal(): Observable<any> {
    return this.http.get<Item>(endpoint + 'expenseItems').pipe(
        catchError(this.handleError)
      );
  }
}
