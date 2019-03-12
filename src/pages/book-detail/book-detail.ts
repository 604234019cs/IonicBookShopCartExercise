import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Book } from '../../../models/book.model';
import { BookRestProvider } from '../../providers/book-rest/book-rest';
import { CartPage } from '../cart/cart';

@Component({
  selector: 'page-book-detail',
  templateUrl: 'book-detail.html',
})
export class BookDetailPage {

  bookId:number;
  book:Book;

  numItem: number;

  constructor(public modalCtrl:ModalController,public navCtrl: NavController, public navParams: NavParams, public bookRestProvider: BookRestProvider) {
  }

  refreshNumItem(){
    if (localStorage.getItem('numItem')==null || Number.isNaN(Number(localStorage.getItem('numItem')))){      
      localStorage.setItem('numItem','0');
      this.numItem=0;
    }else{
      this.numItem=Number(localStorage.getItem('numItem'));
    }
  }

  showCart(){    
    let modal=this.modalCtrl.create(CartPage);
    modal.onDidDismiss( (data)=>{
      if (data.clear==true){
        this.refreshNumItem();
      }      
    });
    modal.present();   
     
  }

  ionViewWillEnter(){
    this.refreshNumItem();
       
    this.bookId=this.navParams.get("bookId");
    this.bookRestProvider.getbookById(this.bookId).subscribe(book=>{            
      this.book=book;
    })
  }

  BookAdd(bookId:number,title:string,price:number) {
    var ShopCart:any[];
    var numItem;
    var total;
    if (localStorage.getItem('ShopCart')==null ||
    (localStorage.getItem('ShopCart')==='undefined')){
    ShopCart=[];
    ShopCart.push({
    bookid: bookId,
    title: title,
    quatity: 1,
    price: price
    });
    localStorage.setItem('ShopCart', JSON.stringify(ShopCart));
    }else{
    ShopCart=JSON.parse(localStorage.getItem('ShopCart'));
    var books=ShopCart.filter(book => ( book.bookid === bookId));
    if (books.length==0){
    ShopCart.push({
    bookid: bookId,
    title: title,
    quatity: 1,
    price: price
    });
    }else{
    ShopCart.filter(book => ( book.bookid === bookId))[0].quatity=ShopCart.filter(book =>
    ( book.bookid === bookId))[0].quatity+1;
    }
    localStorage.setItem('ShopCart', JSON.stringify(ShopCart));
    }
    numItem=Number(localStorage.getItem('numItem'));
    numItem=numItem+1;
    localStorage.setItem('numItem', numItem);
    this.numItem=Number(numItem);
    total=Number(localStorage.getItem('total'));
    
    total=total+price;
    localStorage.setItem('total', total);
    }
  goBack() {
    this.navCtrl.pop();
  }

}
