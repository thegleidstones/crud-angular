import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, UntypedFormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { MatIconButton, MatButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardActions } from '@angular/material/card';
import { MatOption } from '@angular/material/core';
import { MatFormField, MatHint, MatError, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbar } from '@angular/material/toolbar';

import { CoursesService } from '../../services/courses.service';
import { Course } from '../../model/course';
import { Lesson } from '../../model/lesson';
import { FormUtilsService } from 'src/app/shared/form/form-utils.service';

@Component({
    selector: 'app-course-form',
    templateUrl: './course-form.component.html',
    styleUrls: ['./course-form.component.scss'],
    standalone: true,
    imports: [MatCard, MatToolbar, MatCardContent, ReactiveFormsModule, MatFormField, MatInput, MatHint, MatError, MatLabel, MatSelect, MatOption, MatIconButton, MatIcon, MatCardActions, MatButton]
})
export class CourseFormComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute,
    public formUtils: FormUtilsService
  ) {}

  ngOnInit(): void {
    const course: Course = this.route.snapshot.data['course'];
    this.form = this.formBuilder.group({
      _id: [course._id],
      name: [course.name,
        [Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100)]
      ],
      category: [course.category, [Validators.required]],
      lessons: this.formBuilder.array(this.retrieveLessons(course), Validators.required)
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.service.save(this.form.value)
        .subscribe(
          result => {
            this.returnMessage("Curso salvo com sucesso!")
            this.onCancel();
          },
          error => {
            this.returnMessage("Erro ao salvar curso.")
        });
    } else {
      this.formUtils.validateAllFormFields(this.form);
    }
  }

  private retrieveLessons(course: Course) {
    const lessons = [];
    if (course?.lessons) {
      course.lessons.forEach(lesson => lessons.push(this.createLesson(lesson)));
    } else {
      lessons.push(this.createLesson());
    }
    return lessons;
  }

  private createLesson(lesson: Lesson = {id: '', name: '', lessonUrl: ''}) {
    return this.formBuilder.group({
      id: [lesson.id],
      name: [lesson.name, [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100)
        ]
      ],
      lessonUrl: [lesson.lessonUrl, [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(100)
        ]
      ]
    });
  }

  getLessonsFormArray() {
    return (<UntypedFormArray>this.form.get('lessons')).controls;
  }

  addNewLesson() {
    const lessons = this.form.get('lessons') as UntypedFormArray;
    lessons.push(this.createLesson());
  }

  removeLesson(index: number) {
    const lessons = this.form.get('lessons') as UntypedFormArray;
    lessons.removeAt(index);
  }

  onCancel() {
    this.location.back();
  }

  private returnMessage(message: string) {
    this.snackBar.open(message, '', { duration: 5000 });
  }

}
