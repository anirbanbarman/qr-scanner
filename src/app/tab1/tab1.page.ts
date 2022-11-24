import { Component, OnDestroy } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnDestroy{
  scanResult:any;
  content_visibility=""


  constructor() {}




  async checkPermission():Promise<any>{
    try{
      // check or request permission
      const status = await BarcodeScanner.checkPermission({ force: true });

    if (status.granted) {
    // the user granted permission
    return true;
    }

    return false;
    }
    catch(e){
     console.log(e)

    }
  
};



  async startScan(){
    try {
    const permission= await this.checkPermission();
    if(!permission)return;
    BarcodeScanner.hideBackground();
    document.querySelector('body')?.classList.add('scanner-active');
    this.content_visibility="hidden"
    const result = await BarcodeScanner.startScan(); // start scanning and wait for a result
    console.log(result); 
    BarcodeScanner.showBackground();
    document.querySelector('body')?.classList.remove('scanner-active');
    this.content_visibility="";
      
      if (result?.hasContent) {
        console.log(result.content); // log the raw scanned content
        this.scanResult=result.content;
        
      
      }
      
    } catch (error) {
      console.log(error);
      this.stopScan()
      
    }
   
  }
   stopScan = () => {
     
     BarcodeScanner.showBackground();
     BarcodeScanner.stopScan();
     document.querySelector('body')?.classList.remove('scanner-active');
     this.content_visibility="";
  };

  ngOnDestroy(){
    BarcodeScanner.stopScan();

  }
  

}
