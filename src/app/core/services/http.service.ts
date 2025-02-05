import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export const API_CONFIG = {
  BASE_URL: 'http://localhost:3000/api/v1',
  TIMEOUT: 30000,
};

@Injectable({ providedIn: 'root' })
export class HttpService {
  private readonly _http = inject(HttpClient);

  private _createHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  public get<T>(url: string, params?: HttpParams): Observable<T> {
    return this._http.get<T>(`${API_CONFIG.BASE_URL}${url}`, {
      headers: this._createHeaders(),
      params,
    });
  }

  public post<T, U>(url: string, body: U): Observable<T> {
    return this._http.post<T>(`${API_CONFIG.BASE_URL}${url}`, body, {
      headers: this._createHeaders(),
    });
  }

  public put<T, U>(url: string, body: U): Observable<T> {
    return this._http.put<T>(`${API_CONFIG.BASE_URL}${url}`, body, {
      headers: this._createHeaders(),
    });
  }

  public patch<T, U>(url: string, body: U): Observable<T> {
    return this._http.put<T>(`${API_CONFIG.BASE_URL}${url}`, body, {
      headers: this._createHeaders(),
    });
  }

  public delete<T>(url: string): Observable<T> {
    return this._http.delete<T>(`${API_CONFIG.BASE_URL}${url}`, {
      headers: this._createHeaders(),
    });
  }
}
