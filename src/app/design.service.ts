import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import {Observable} from 'rxjs/Observable';
import {Design} from './design/design';
import {catchError, tap} from 'rxjs/operators';
import {ServiceBase} from './serviceBase';
import {DesignColor} from './design-detail/design-detail';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DesignService extends ServiceBase {
  private url = 'http://localhost:8080/designs';  // URL to web ap
  private urlForColors = 'http://localhost:8080/designcolors';
  constructor(private http: HttpClient,
              messageService: MessageService) {
    super(messageService, 'DesignService');
  }
  getDesigns(): Observable<Design[]> {
    return this.http.get<Design[]>(this.url)
      .pipe(
        tap(designs => this.log(`fetched designs`)),
        catchError(this.handleError('getDesigns', []))
      );
  }

  getAllColors(): Observable<DesignColor[]> {
    return this.http.get<DesignColor[]>(this.urlForColors)
      .pipe(
        tap(designColors => this.log(`fetched design colors`)),
        catchError(this.handleError('getAllColors', []))
      );
  }

  getDesignColors(id: string): Observable<DesignColor[]> {
    const url = `${this.url}/${id}/colors`;
    return this.http.get<DesignColor[]>(url)
      .pipe(
        tap(designColors => this.log(`fetched design colors`)),
        catchError(this.handleError('getDesignColors', []))
      );
  }

  getDesign(id: string): Observable<Design> {
    const url = `${this.url}/${id}`;
    return this.http.get<Design>(url).pipe(
      tap(_ => this.log(`fetched design id=${id}`)),
      catchError(this.handleError<Design>(`getDesign id=${id}`))
    );
  }

  addDesign (design: Design): Observable<Design> {
    return this.http.post<Design>(this.url, design, httpOptions).pipe(
      tap((designResponse: Design) => this.log(`added design w/ id=${designResponse.entityID}`)),
      catchError(this.handleError<Design>('addDesign'))
    );
  }

  addDesignColor (designColor: DesignColor): Observable<DesignColor> {
    return this.http.post<DesignColor>(this.urlForColors, designColor, httpOptions).pipe(
      tap((response: DesignColor) => this.log(`added design color w/ id=${response.entityID}`)),
      catchError(this.handleError<DesignColor>('addDesignColor'))
    );
  }
}
