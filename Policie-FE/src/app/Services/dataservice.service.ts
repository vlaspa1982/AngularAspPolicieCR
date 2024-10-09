import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BtsData } from '../Models/BtsData';
import { GpsData } from '../Models/GpsData';

@Injectable({
  providedIn: 'root',  // standalone služba poskytovaná v rootu aplikace
})
export class DataService {
  private apiUrl = 'Https://localhost:7236/api/Data'; // URL API
  
  constructor(private http: HttpClient) {}

  saveData(btsData: BtsData[], gpsData: GpsData[]): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const body = {
      btsData: btsData,
      gpsData: gpsData,
    };

    return this.http.post<any>(this.apiUrl, body, { headers });
  }
}
