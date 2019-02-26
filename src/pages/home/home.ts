import { Component } from '@angular/core';
import { NavController,  ModalController } from 'ionic-angular';
import { BookCategoryPage } from '../book-category/book-category';
import { CartPage } from '../cart/cart';
import { TopsellerPage } from '../topseller/topseller';





@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  numItem: number;  
  total:number;

  constructor(public modalCtrl:ModalController, public navCtrl: NavController) {

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

    if (localStorage.getItem('total')==null || Number.isNaN(Number(localStorage.getItem('total')))){      
      localStorage.setItem('total','0');
      this.total=0;
    }else{
      this.total=Number(localStorage.getItem('total'));
    }
  }

  

  goToPageTopSell(){
    this.navCtrl.push(TopsellerPage);
  }

  goToPageCategory(){
    this.navCtrl.push(BookCategoryPage);
  }

  

  

}
