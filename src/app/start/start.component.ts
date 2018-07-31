import { Component, OnInit } from '@angular/core';
import { Http , Response} from '@angular/http';
import {AstroidService} from '../astroid.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  images = './assets/delete.ico';
  dtOptions: DataTables.Settings = {};
  showTable: boolean;
  showSection: boolean;
  dtTrigger: Subject<any> = new Subject();
  startdate;
  enddate;
  list: any[] = [];
  chartArr: any[] = [];
    constructor(private router: Router,
    private astroidService: AstroidService,
    private flashMessages: FlashMessagesService) { }

  ngOnInit() {
    this.showTable = false;
    this.showSection = false;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      rowCallback: (row: Node, data: any[] | Object, index: number) =>{
        const self = this;
        $('td', row).unbind('click');
        $('td', row).bind('click',() =>{
          self.propogate(data);
        });
        return row;
      },
    };
  }
  ngOnDestroy() {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  propogate(data)
  {
    this.showSection = true;
    let links;
    for(const item of this.list)
    {
      if(data[1] == item.name)
      {
        links = {'name': data[1],'link': item.links.self, 'approach': 0, 'color' :0};
      }
    }
    this.astroidService.getNumbers(links.link)
      .subscribe(res =>{
        let num = res['close_approach_data'].map(res => res.close_approach_date);
        links.approach = num.length;
        if(num.length < 25)
        {
          links.color = JSON.parse(JSON.stringify('#33FF6B'));
        }
        else if(num.length > 25 && num.length < 45)
        {
          links.color = JSON.parse(JSON.stringify('#F0FF33'));
        }
        else if(num.length > 45 && num.length < 75)
        {
          links.color = JSON.parse(JSON.stringify('#FFAC33'));
        }
        else
        {
          links.color = JSON.parse(JSON.stringify('#FF3333'));
        }
        this.chartArr.push(links);
        this.chartArr.sort(function(obj1,obj2){
          return obj1.approach - obj2.approach;
        })
      })
  }
  deleteRow(name){
    let index = this.chartArr.indexOf(name);
    let index2 = this.list.indexOf(name);
    this.chartArr.splice(index, 1);
    this.list.splice(index2, 1);
  }
  onDateSubmit()
  {
    if(this.startdate == null || this.enddate == null)
    {
      this.flashMessages.show('Please choose respectful dates', {cssClass: 'alert-danger', timeout: 3000});
    }
    else{
      const starttime = new Date(this.startdate);
      const endtime = new Date(this.enddate);
      let one_day = 1000*60*60*24;
      let val = Math.round((endtime.getTime() - starttime.getTime()) /one_day);
      if(val < 7)
      {
        this.flashMessages.show('Please choose respectful dates', {cssClass: 'alert-danger', timeout: 3000});
      }
      else{
        this.astroidService.getAstroid(this.startdate, this.enddate)
        .subscribe(data =>{
          for (const key in data) {
            if (data.hasOwnProperty(key)) {
              const element = data[key];
              for(const elem of element)
              {
                if(elem.is_potentially_hazardous_asteroid)
                { 
                  this.list.push(elem);
                }
              }
            }
          }
          this.dtTrigger.next();
        });
        this.showTable = true;
      }
    }
  }
  openPage()
  {
    if(this.chartArr.length == 0)
    {
      this.flashMessages.show('No Astroid in List', {cssClass: 'alert-danger', timeout: 3000});
    }
    else
    {
      this.astroidService.setLinks(this.chartArr);
      this.router.navigate(['/chart']);
    }
  }
}
