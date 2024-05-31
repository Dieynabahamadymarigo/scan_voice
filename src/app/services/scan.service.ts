import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScanService {
  constructor(private http: HttpClient) {}

  // inscription
  signUp(users: any): Observable<any> {
    return this.http.post('http://localhost:3000/auth/register', users);
  }

  // connexion
  connexion(users: any): Observable<any> {
    return this.http.post('http://localhost:3000/auth/login', users);
  }

  // mot de passe oublié
  forgotPassword(users: any): Observable<any> {
    return this.http.post('http://localhost:3000/auth/forgotPassword', users);
  }

  // OCR list
  private apiKey = '7d6393ed5688957';
  ocrImageGet(): Observable<any> {
    const headers = new HttpHeaders({
      apikey: this.apiKey,
    });

    return this.http.get<any>('https://api.ocr.space/parse/ImageUrl', {
      headers,
    });
  }

  // OCR ajout
  private urlsite = 'https://api.ocr.space/parse/image';

  parseImage(image: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('language', 'fre');
    formData.append('apikey', '7d6393ed5688957');

    return this.http.post(this.urlsite, formData);
  }

  // node printer
  private apiUrl = 'http://localhost:3000/scan/scan';

  getPrinters(): Observable<any> {
    const accessToken = localStorage.getItem('userConnect');
    return accessToken
      ? this.http.get<any>(this.apiUrl, {
          headers: new HttpHeaders({
            Authorization: `Bearer ${accessToken}`,
          }),
        })
      : of(null);
  }
}
