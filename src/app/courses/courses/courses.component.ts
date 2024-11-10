import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [
    {_id: '1', name: 'Angular', category: 'Front-end'},
    {_id: '2', name: 'React', category: 'Front-end'},
    {_id: '3', name: 'Vue', category: 'Front-end'},
    {_id: '4', name: 'Java', category: 'Backend'},
    {_id: '5', name: 'Spring Web Framework', category: 'Backend'},
    {_id: '4', name: 'Spring Security Framework', category: 'Backend'},
  ];
  displayedColumns = ['name', 'category'];

  constructor() {}

  ngOnInit(): void {
  }

}
