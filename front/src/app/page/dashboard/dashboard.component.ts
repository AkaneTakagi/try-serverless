import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {

  multi: any[];
  view: any[] = [700, 400];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = '日付';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = '人数';
  animations: boolean = true;



  onSelect(event) {
    console.log(event);
  }

  constructor() {
    // Object.assign(this, { multi });
  }

  ngOnInit(): void {
    of([
      {
        "name": "5/1",
        "series": [
          {
            "name": "陽性",
            "value": 123
          },
          {
            "name": "陰性",
            "value": 812
          },
          {
            "name": "結果待ち",
            "value": 320
          }
        ]
      },
    
      {
        "name": "5/2",
        "series": [
          {
            "name": "陽性",
            "value": 140
          },
          {
            "name": "陰性",
            "value": 852
          },
          {
            "name": "結果待ち",
            "value": 328
          }
        ]
      },
    
      {
        "name": "5/3",
        "series": [
          {
            "name": "陽性",
            "value": 187
          },
          {
            "name": "陰性",
            "value": 891
          },
          {
            "name": "結果待ち",
            "value": 268
          }
        ]
      },
      {
        "name": "5/4",
        "series": [
          {
            "name": "陽性",
            "value": 212
          },
          {
            "name": "陰性",
            "value": 1020
          },
          {
            "name": "結果待ち",
            "value": 323
          }
        ]
      }
    ]).subscribe(data => {
      this.multi = data;
    });
  }

}
