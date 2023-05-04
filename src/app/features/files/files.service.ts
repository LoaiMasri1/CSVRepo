import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {MyFile} from "./models/MyFile";

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  private baseUrl = `${environment.apiBaseUrl}file`; // replace with your API endpoint

  constructor(private http: HttpClient) {
  }

  getFiles(): Observable<MyFile[]> {
    return this.http.get<MyFile[]>(this.baseUrl);
  }

  downloadFile(fileName: string): Observable<{url:string}> {
    return this.http.get<{url:string}>(`${this.baseUrl}/download?fileName=${fileName}`);
  }

  deleteFile(fileName: string): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}?fileName=${fileName}`);
  }

}


