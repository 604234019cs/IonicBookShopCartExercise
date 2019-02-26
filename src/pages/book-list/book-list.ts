import { Component } from '@angular/core';
import { NavController, NavParams,AlertController,LoadingController, ModalController } from 'ionic-angular';
import { BookDetailPage } from '../book-detail/book-detail';
import { Book } from '../../../models/book.model';
import { BookRestProvider } from '../../providers/book-rest/book-rest';
import { CartPage } from '../cart/cart';



@Component({
  selector: 'page-book-list',
  templateUrl: 'book-list.html',
})
export class BookListPage {

  books:Book;
  category:string;
  loading: any;

  numItem: number;
  

  constructor(public modalCtrl:ModalController,public loadingController:LoadingController,public alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams, public bookRestProvider: BookRestProvider) {
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

  refreshNumItem(){
    if (localStorage.getItem('numItem')==null || Number.isNaN(Number(localStorage.getItem('numItem')))){      
      localStorage.setItem('numItem','0');
      this.numItem=0;
    }else{
      this.numItem=Number(localStorage.getItem('numItem'));
    }
  }
  
  ionViewWillEnter(){        
    this.loading = this.loadingController.create({ content: "please wait..." });
    this.loading.present();   

    this.refreshNumItem();

    this.category=this.navParams.get("category");    
    
    this.bookRestProvider.getbooklist().subscribe(  
      data=>{                
          this.books=data.filter(book => (book!=null && book.category === this.category)); 
          this.loading.dismissAll();
      } 
      ,
      (err) => {
        this.loading.dismissAll();
        console.log(err);
      }
    );
    
  }

  ShowDetail(bookId:number) {
    this.navCtrl.push(BookDetailPage,
      {bookId:bookId}
      );
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
    

    onSearch(event){
        this.loading = this.loadingController.create({ content: "please wait..." });
        this.loading.present();
        let search:string=event.target.value;
        this.bookRestProvider.getbooklist().subscribe(
        data=>{
        if (search.length>0){
        this.books=data.filter(book => (book!=null && book.category === this.category &&
        book.title.toLowerCase().indexOf(search.toLowerCase()) > -1 ));
        }else{
        this.books=data.filter(book => (book!=null && book.category === this.category));
        }
        this.loading.dismissAll();
        }
      ,
    (err) => {
    this.loading.dismissAll();
    console.log(err);
    }
    );
  }  
  onClear(event){
      this.loading = this.loadingController.create({ content: "please wait..." });
      this.loading.present();
      this.bookRestProvider.getbooklist().subscribe(
      data=>{
      
      this.books=data.filter(book => (book!=null && book.category === this.category));
      this.loading.dismissAll();
      }
      ,
      (err) => {
      this.loading.dismissAll();
      console.log(err);
      }
      );
      
  }

  onCancel(event){
    this.loading = this.loadingController.create({ content: "please wait..." });
    this.loading.present();   
        
    
  }

  goBack() {
    this.navCtrl.pop();
  }

}
