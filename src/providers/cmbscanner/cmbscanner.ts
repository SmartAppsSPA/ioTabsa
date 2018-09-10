
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import {Events} from 'ionic-angular';

declare var cmbScanner: any;

interface BarcodeResult {
	symbology : string,
	readString : string,
	symbologyString? : string,
	xml? : string,
	image? : string
};

export enum TriggerType {MANUAL_TRIGGER = 2, CONTINUOUS_TRIGGER = 5};
export enum DeviceType {DEVICE_TYPE_MX_1000 = 0 ,DEVICE_TYPE_MOBILE_DEVICE = 1};
export interface Settings {
  	deviceType : DeviceType,
  	cameraMode? : number,
  	triggerType : TriggerType,
  	enableImage : boolean,
  	enableImageGraphics : boolean,
  	symbols : string[],
  	enabledSymbols? : string[],
  	previewContainer? : number[],
  	[key: string] : any
  };

/*
  Generated class for the CmbscannerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CmbscannerProvider {


  public isDone : boolean = false;

  public connected : boolean = false;
  private storageReady : boolean = false;
  public data : any[] = [];

  public cmbScanner : any;

  private allDone : Promise<{}>[] = [];

  private settings : Settings = {
  	deviceType : DeviceType.DEVICE_TYPE_MOBILE_DEVICE,
  	previewContainer : [0,15,100,50],
  	enabledSymbols : [
          "SYMBOL.DATAMATRIX"		
          ,"SYMBOL.QR"				
          ,"SYMBOL.C128"			
          ,"SYMBOL.UPC-EAN"			
          ,"SYMBOL.C11"				
          ,"SYMBOL.C39"				
          ,"SYMBOL.C93"				
  	],
  	enableImage : true,
  	enableImageGraphics : true,
  	cameraMode : 0,
  	symbols : [ 
          "SYMBOL.DATAMATRIX"
          ,"SYMBOL.QR"
          ,"SYMBOL.C128"
          ,"SYMBOL.UPC-EAN"
          ,"SYMBOL.C11"
          ,"SYMBOL.C39"
          ,"SYMBOL.C93"
          ,"SYMBOL.I2O5"
          ,"SYMBOL.CODABAR"
          ,"SYMBOL.EAN-UCC"
          ,"SYMBOL.PHARMACODE"
          ,"SYMBOL.MAXICODE"
          ,"SYMBOL.PDF417"
          ,"SYMBOL.MICROPDF417"
          ,"SYMBOL.DATABAR"
          ,"SYMBOL.POSTNET"
          ,"SYMBOL.PLANET"
          ,"SYMBOL.4STATE-JAP"
          ,"SYMBOL.4STATE-AUS"
          ,"SYMBOL.4STATE-UPU"
          ,"SYMBOL.4STATE-IMB"
          ,"SYMBOL.VERICODE"
          ,"SYMBOL.RPC"
          ,"SYMBOL.MSI"
          ,"SYMBOL.AZTECCODE"
          ,"SYMBOL.DOTCODE"
          ,"SYMBOL.C25"
          ,"SYMBOL.C39-CONVERT-TO-C32"
          ,"SYMBOL.OCR"
          ,"SYMBOL.4STATE-RMC"  
  	],
  	triggerType : TriggerType.CONTINUOUS_TRIGGER
  };


  constructor(public storage: Storage,public events: Events) {}
  config(){


	cmbScanner.setConnectionStateDidChangeOfReaderCallback( connectionState => {

		this.events.publish('connection:changed', connectionState);
		
		if (connectionState == cmbScanner.CONSTANTS.CONNECTION_STATE_CONNECTED){

			//image results should be set after we have a connection to the READER
			cmbScanner.enableImage(this.settings.enableImage);
			cmbScanner.enableImageGraphics(this.settings.enableImageGraphics);


			this.settings.enabledSymbols.forEach((v) => {
		        this.allDone.push(cmbScanner.setSymbologyEnabled(v,true).then((symbResult : any) => {
		        	// console.log(JSON.stringify(symbResult));
		        	return symbResult;
		        }));					
			});				

			Promise.all(this.allDone).then(results => {
				//when all is said and done
				this.isDone = true; //not sure why it's important


			});
			this.connected = true;
			cmbScanner.setTriggerType(this.settings.triggerType).then(result =>{
			});
		}
		else if(connectionState == cmbScanner.CONSTANTS.CONNECTION_STATE_DISCONNECTED){

			this.connected = false;

		}
	});



	this.cmbScanner = cmbScanner;

	return this.storage.ready().then(() => {
				this.storageReady = true;


				this.storage.get('settings').then(settings => {
					if(!settings){
						//set settings with the default settings
					  	this.storage.set("settings",this.settings).then(status => {
					  		// this.events.publish('settings:update', item,value,status);
					  	})						
					}
					else{

						this.settings = settings;
					}
					
			

					cmbScanner.setPreviewContainerPositionAndSize(...this.settings.previewContainer);
					cmbScanner.setCameraMode(this.settings.cameraMode);   
					cmbScanner.loadScanner(this.settings.deviceType,function(result){cmbScanner.connect(); });					
				});

				return this.storage.get('results').then( data => {
							if(Array.isArray(data))
								this.data = data;

							return {list : this.data,scanner : cmbScanner};
						});
			});
  }
  start(){
  	cmbScanner.startScanning();

  }
  stop(){
  	cmbScanner.stopScanning();
  }

  setResultItem(item){
  	let item_candidate : BarcodeResult = {
  		symbology : "",
  		readString : ""
  	};

	// console.log(JSON.stringify(item));  	

  	item_candidate.symbology = item.symbology;
  	item_candidate.readString = item.readString;


  	if(this.storageReady){
  		this.data.push(item);
  		this.storage.set("results",this.data);
  	}
  }

  setSymbolItem(item:string,value:boolean){

  	if(value){
  		this.settings.enabledSymbols.push(item);
  	}
  	else{
  		let index = this.settings.enabledSymbols.indexOf(item);
  		if(index > -1)
  			this.settings.enabledSymbols.splice(index,1);
  	}

  	this.storage.set("settings",this.settings).then(status => {
  		this.events.publish('settings:update', "enabledSymbols",this.settings.enabledSymbols,status);
  	})  	

  }
  removeItem(id){
  	this.data.splice(id,1);
  	this.storage.set("results",this.data);
  	return this.data;
  }
  removeItems(){
    this.data = [];
    this.storage.set("results",this.data);
    return this.data;
  }
  getSettings(){
  	return this.settings;
  }
  setSettingsItem(item:string,value:any){

  	this.settings[item] = value;
  	this.storage.set("settings",this.settings).then(status => {
  		this.events.publish('settings:update', item,value,status);
  	})
  }

}
