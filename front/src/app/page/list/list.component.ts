import { Component, OnInit } from '@angular/core';
import { PaciantService, Paciant, SEX_LABEL, RESULT_LABEL } from 'src/app/service/paciant/paciant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {
  list: Paciant[];
  sexLabel = SEX_LABEL;
  resultLabel = RESULT_LABEL;
  displayedColumns: string[] = ['id', 'name', 'age', 'sex', 'testedAt', 'result'];

  constructor(private paciantService: PaciantService, private router: Router) { }

  ngOnInit(): void {
    this.paciantService.getAll().subscribe(res => {
      console.log(res);
      this.list = res;
    });
  }

  onClickRow(paciant) {
    this.router.navigate(['main/detail'], {
      queryParams: {
        id: paciant.id,
        mode: 'edit'
      }
    });
  }

  onClickAdd(){
    this.router.navigate(['main/detail'], {
      queryParams: {
        mode: 'add'
      }
    });
  }

}
