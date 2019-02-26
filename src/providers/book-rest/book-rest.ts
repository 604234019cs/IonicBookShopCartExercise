import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Book } from '../../../models/book.model';

@Injectable()
export class BookRestProvider {
  
  private url="http://localhost:3000";
 
     
  constructor(public http: HttpClient) {    
  }

  getbooklist():Observable<any>{        
    return this.http.get<Book>(this.url + '/books', {
      headers: new HttpHeaders().set('Content-Type', 'application/json')      
    });
  }

  gettopsellerlist():Observable<any>{        
    return this.http.get<Book>(this.url + '/topsellers', {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  getbookById(bookid:number):Observable<any>{        
    return this.http.get<Book>(this.url + '/book/' + bookid, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }


  getOrderLastId(){        
    return new Promise((resolve, reject) => {        
      this.http.get<number>(this.url + '/lastorderid' , {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      }).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });

  }


  editOrderLastId(lastOrderid:number) {
        
    return new Promise((resolve, reject) => {
      let lastOrderIdsend='{"orderId":' + lastOrderid + '}';
      this.http.put(this.url + '/lastorderid',JSON.parse(lastOrderIdsend) ,{
        headers: new HttpHeaders().set('Content-Type', 'application/json')    
      })
      .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
      });
  }  

  addOrder(order:any) {
    
    return new Promise((resolve, reject) => {
      
      this.http.post(this.url + '/order', JSON.stringify(order), {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      } )
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
      
    });

  }


}
