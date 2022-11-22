import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotesServiceService {
  constructor(private http: HttpClient) {}
  postNotes(data: any) {
    return this.http.post<any>('http://localhost:3000/notes/', data);
  }
  getNotes() {
    return this.http.get<any>('http://localhost:3000/notes/');
  }

  //get note by id
  getNoteById(id: any) {
    return this.http.get('http://localhost:3000/notes/' + id);
  }

  //update
  updateNote(id: any, data: any) {
    return this.http.put('http://localhost:3000/notes/' + id, data);
  }
  deleteNotes(id: any) {
    return this.http.delete<any>('http://localhost:3000/notes/' + id);
  }
}
