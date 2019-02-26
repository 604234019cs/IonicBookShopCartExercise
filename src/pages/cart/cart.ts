import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController, ToastController } from 'ionic-angular';
import { BookRestProvider } from '../../providers/book-rest/book-rest';

@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  books:any[];
  total:string;
  clear:boolean=false;
  checkout:boolean=false;
  order:any;
  
  constructor(public toastCtrl: ToastController,public alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController, public bookRestProvider: BookRestProvider) {
  
  }

  ionViewWillEnter(){   
    
    this.clearOrder();

    if (localStorage.getItem('ShopCart')!==null || (localStorage.getItem('ShopCart')!=='undefined')){        
      this.books=JSON.parse(localStorage.getItem('ShopCart'));          
    }        

    if (localStorage.getItem('total')!==null || (localStorage.getItem('total')!=='undefined')){        
      this.total=localStorage.getItem('total');          
    }else{
      this.total="0";          
    }        
                        
  }

  clearCart(){
    localStorage.removeItem('numItem');
    localStorage.removeItem('ShopCart');
    localStorage.removeItem('total');
    this.clear=true;
    this.viewCtrl.dismiss({clear:this.clear});    
  }

  checkOut(){
    this.checkout=!this.checkout;
  }

  confirmOrder() {
    const confirm = this.alertCtrl.create({
      title: 'Confirm book Order',
      message: 'Do you want to confirm this order ?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.addOrder();              
          }
        },
        {
          text: 'No',
          handler: () => {}
        }
      ]
    });
    confirm.present();
  }

  presentToast(msg:string) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  addOrder(){
      var isSussess=false;
      this.bookRestProvider.getOrderLastId().then((data) => {
      this.order.orderId = Number(data)+1;
      }
      ).then( () => {
      this.bookRestProvider.editOrderLastId(this.order.orderId).then( () => {
      this.order.orderdetail=this.books;
      this.order.total=this.total;
      this.bookRestProvider.addOrder(this.order).then( () => {
      this.presentToast("Add order successfully!");
      this.clearOrder();
      this.clearCart();
      isSussess=true;
    }, (err) => {
    console.log(err);
    });
    }, (err) => {
    console.log(err);
    });
    
    }
    );
    if (isSussess){
    this.viewCtrl.dismiss({clear:this.clear});
    }
    
    
  }
  

  clearOrder() {
    
    this.order={
      orderId: -1,
      name: "",
      address: "",
      province: "",
      postal:"",
      total:0,
      orderDate: new Date().toISOString().substring(0,10),      
      orderdetail: [],
     };
    
  }



  closeModal(){
    this.viewCtrl.dismiss({clear:this.clear});
  }



}
