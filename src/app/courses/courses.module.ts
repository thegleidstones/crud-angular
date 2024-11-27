import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { CoursesComponent } from './containers/courses/courses.component';
import { CoursesRoutingModule } from './courses-routing.module';
import { CourseFormComponent } from './containers/course-form/course-form.component';
import { CoursesListComponent } from './components/courses-list/courses-list.component';


@NgModule({
    imports: [
        AppMaterialModule,
        CommonModule,
        CoursesRoutingModule,
        ReactiveFormsModule,
        SharedModule,
        CoursesComponent,
        CourseFormComponent,
        CoursesListComponent
    ]
})
export class CoursesModule { }
