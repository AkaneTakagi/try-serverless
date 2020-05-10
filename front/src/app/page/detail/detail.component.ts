import { Component, OnInit, Input } from '@angular/core';
import { PaciantService, SEX_LABEL, RESULT_LABEL, Sex, Result, Paciant } from 'src/app/service/paciant/paciant.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { flatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.less']
})
export class DetailComponent implements OnInit {
  private id: string;
  mode: 'add' | 'edit';
  sexLabel = SEX_LABEL;
  resultLabel = RESULT_LABEL;
  detailForm: FormGroup;

  status: string;

  constructor(private fb: FormBuilder, private acrivatedRoute: ActivatedRoute, private paciantService: PaciantService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.detailForm = this.fb.group({
      'id': [''],
      'name': ['', Validators.required],
      'age': [0, Validators.required],
      'sex': [0, Validators.required],
      'testedAt': [null, Validators.required],
      'result': [0, Validators.required],
      'registeredBy': ['', Validators.required]
    });
    this.detailForm.statusChanges.subscribe(s => {
      console.log(s);
      this.status = s;
    });
    this.acrivatedRoute.queryParams.pipe(flatMap(p => {
      this.id = p.id;
      this.mode = p.mode;
      if (this.id && this.mode === 'edit') {
        return this.paciantService.getById(this.id);
      } else {
        return of(this.paciantService.buildEmptyPaciant());
      }
    })).subscribe(p => {
      console.log(p);
      this.detailForm.patchValue(p);
    })
  }

  onDetailSubmit(value: Paciant) {
    switch (this.mode) {
      case 'add':
        this.paciantService.add(value).subscribe(message => {
          this.snackBar.open(message, null, {
            duration: 5000,
          });
          this.router.navigate(['main/list']);
        });
        break;
      case 'edit':
        this.paciantService.modify(value).subscribe(message => {
          this.snackBar.open(message, null, {
            duration: 5000,
          });
          this.router.navigate(['main/list']);
        });
        break;
      default:
        break;
    }
  }

}
