import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

export interface MyFile {
  id: string;
  name: string;
  content: string;
}

interface FileResponse {
  files: MyFile[];
}

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  private baseUrl = `${environment.apiBaseUrl}files`; // replace with your API endpoint

  constructor(private http: HttpClient) {
  }

  /**
   * Saves a CSV files to the server.
   * @param file The CSV files to save.
   * @returns An Observable that emits the saved files object.
   */
  saveFile(file: File): Observable<MyFile> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<MyFile>(`${this.baseUrl}/save`, formData);
  }

  /**
   * Deletes a CSV files from the server.
   * @param fileId The ID of the files to delete.
   * @returns An Observable that emits the deleted files object.
   */
  deleteFile(fileId: string): Observable<MyFile> {
    return this.http.delete<MyFile>(`${this.baseUrl}/${fileId}`).pipe(
      map(response => response)
    );
  }

  /**
   * Retrieves a CSV files from the server.
   * @param fileId The ID of the files to retrieve.
   * @returns An Observable that emits the retrieved files object.
   */
  getFile(fileId: string): Observable<MyFile> {
    return this.http.get<MyFile>(`${this.baseUrl}/${fileId}`).pipe(
      map(response => response)
    );
  }

  /**
   * Retrieves a list of CSV files from the server.
   * @returns An Observable that emits an array of files objects.
   */
  getFiles(): Observable<MyFile[]> {
    return this.http.get<FileResponse>(`${this.baseUrl}`).pipe(
      map(response => response.files)
    );
  }

  /**
   * Downloads a CSV files from the server.
   * @param file The files to download.
   * @returns An Observable that emits the files content.
   */
  downloadFile(file: MyFile): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/${file.id}/download`).pipe(
      map(response => response)
    );
  }

  /**
   * Converts a CSV files to JSON.
   * @param file The files to convert.
   * @returns An Observable that emits the files content.
   */
  convertToJson(file: MyFile): Observable<any> {
    return this.http.post(`${this.baseUrl}/${file.id}/convert`, null).pipe(
      map(response => response)
    );
  }
}


