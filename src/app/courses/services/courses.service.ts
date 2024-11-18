import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { Course } from '../model/course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly API = 'api/courses';

  constructor(private httpClient: HttpClient) { }

  list(): Observable<Course[]> {
    return this.httpClient.get<Course[]>(this.API)
    .pipe(
      first(),
    ) ;
  }

  listById(id: string): Observable<Course> {
    return this.httpClient.get<Course>(`${this.API}/${id}`);
  }

  save(record: Partial<Course>): Observable<Course> {
    console.log(record);

    if (record._id) {
      console.log('update');
      return this.update(record);
    }

    console.log('create');
    return this.create(record);
  }

  private create(record: Partial<Course>): Observable<Course> {
    return this.httpClient.post<Course>(this.API, record).pipe(first());
  }

  private update(record: Partial<Course>): Observable<Course> {
    return this.httpClient.put<Course>(`${this.API}/${record._id}`, record).pipe(first());
  }

  delete(id: string): Observable<Object> {
    return this.httpClient.delete(`${this.API}/${id}`).pipe(first());
  }

}
