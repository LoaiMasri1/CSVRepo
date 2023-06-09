import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
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

  downloadFile(fileName: string): Observable<{ url: string }> {
    return this.http.get<{ url: string }>(`${this.baseUrl}/download?fileName=${fileName}`);
  }

  deleteFile(fileName: string): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}?fileName=${fileName}`);
  }

  uploadFile(file: File): Observable<string> {

    const fileReader = new FileReader();
    fileReader.readAsBinaryString(file);
    return new Observable<string>(observer => {
      fileReader.onload = () => {
        this.http.post<string>(`${this.baseUrl}?fileName=${file.name}`, fileReader.result).subscribe({
          next: (response) => observer.next(response),
          error: (error) => observer.error(error),
          complete: () => observer.complete()
        });
      }
    })
  }

  exportFile(fileName: string): Observable<Array<object>> {
    return this.http.get<Array<object>>(`${this.baseUrl}/export?fileName=${fileName}`);
  }
}


