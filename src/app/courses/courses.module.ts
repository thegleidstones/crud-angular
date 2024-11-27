import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';



import { CoursesComponent } from './containers/courses/courses.component';
import { CoursesRoutingModule } from './courses-routing.module';
import { CourseFormComponent } from './containers/course-form/course-form.component';
import { CoursesListComponent } from './components/courses-list/courses-list.component';


@NgModule({
    imports: [
    CommonModule,
    CoursesRoutingModule,
    ReactiveFormsModule,
    CoursesComponent,
    CourseFormComponent,
    CoursesListComponent
]
})
export class CoursesModule { }
