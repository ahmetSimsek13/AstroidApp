import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AstroidService {
  list: string[];
  apikey = 'aAAeqoMBAHgYFFG5qZDKNgEcpOa3iZ5RG2TG77Wd';
  url;
  constructor(private http: Http) {
    this.list = [];
    this.url = 'https://api.nasa.gov/neo/rest/v1/feed?';
   }
   getAstroid(startdate,enddate)
   {
     return this.http.get(this.url+'?start_date='+startdate+'&enddate='+enddate+'&api_key='+this.apikey)
     .map(res => res.json().near_earth_objects);
   }
   getNumbers(link)
   {
       return this.http.get(link)
       .map(res => res.json());
   }
   setLinks(obj)
   {
    this.list = obj;
   }
   getLinks()
   {
     return this.list;
   }
   emptyLinks()
   {
     this.list.length = 0;
   }

}

