import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import {AstroidService} from '../astroid.service';
import {Router} from '@angular/router';
import 'rxjs/add/operator/map';
import {Chart} from 'chart.js';
import { ChartData } from '../chart-data';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  list = [];
  chart = [];
  items: ChartData = {
    labels: [],
    backgroundColor: [],
    data: []
 };
  constructor(private router: Router,
    private astroidService: AstroidService) { }

  ngOnInit() {
    this.list = this.astroidService.getLinks();
    for(let i = 0; i < this.list.length; ++i)
    {
      this.items.labels.push(this.list[i].name);
      this.items.backgroundColor.push(this.list[i].color);
      this.items.data.push(this.list[i].approach);
    }
    if(this.items.labels.length === this.list.length)
      {
        this.chart = new Chart('canvas',{
            type: 'horizontalBar',
            data: {
              labels: this.items.labels,
              datasets:[
                {
                  label: 'Astroid',
                  data: this.items.data,
                  backgroundColor: this.items.backgroundColor
                }
              ]
            },
            options: {
              elements :{
                rectangle: {
                  borderWidth: 2,
                }
              },
              responsive: true,
              legend: {
                display : false,
              }
            }
        })
    }
  }
  back()
  {
    this.list.length = 0;
    this.astroidService.emptyLinks();
    this.router.navigate(['/']);
  }

}
