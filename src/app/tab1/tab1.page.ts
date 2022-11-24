import { Component } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  scanResult:any;


  constructor(private barcodeScanner: BarcodeScanner) {}
  startScan(){
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.scanResult=barcodeData?.text;
     }).catch(err => {
         console.log('Error', err);
     });
  }

}
