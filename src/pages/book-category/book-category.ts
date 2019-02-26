import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { BookListPage } from '../book-list/book-list';
import { CartPage } from '../cart/cart';

@Component({
  selector: 'page-book-category',
  templateUrl: 'book-category.html',
})

export class BookCategoryPage {

  numItem: number;

  constructor(public modalCtrl:ModalController,public navCtrl: NavController, public navParams: NavParams) {
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
    this.refreshNumItem();
  }
  
  showBookList(categoryName:string){
    this.navCtrl.push(BookListPage,
      {category:categoryName}
      );
    
  }

}
