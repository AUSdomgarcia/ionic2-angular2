import { EliteApi } from '../../shared/shared';
import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';

declare var window: any;
/**
 * Generated class for the MapPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

import { 
    GoogleMaps,
    GoogleMap,
    GoogleMapsEvent,
    LatLng,
    CameraPosition,
    MarkerOptions,
    Marker
    } from '@ionic-native/google-maps';

@IonicPage()


@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})

export class MapPage {

  map: any;
  googleMap: GoogleMap;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private googleMaps: GoogleMaps,
              private eliteApi: EliteApi,
              private alertController:AlertController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');

    let games = this.navParams.data;
    let tourneyData = this.eliteApi.getCurrentTourney();
    let location = tourneyData.locations[games.locationId];

    this.map = {
      lat: location.latitude,
      lng: location.longitute,
      zoom: 12,
      markerLabel: games.location
    };

    this.loadMap();

  }

  loadMap(){
    let element: HTMLElement = document.getElementById('map');
    this.googleMap = this.googleMaps.create(element);

    this.googleMap.one(GoogleMapsEvent.MAP_READY).then( () => {
        // Sample Marker
        this.addMapItem();
    });
    // this.showAlert();
  }

  addMapItem(){
     let coords: LatLng = new LatLng(14.5840,121.0633);

    let position: CameraPosition = {
      target: coords,
      zoom: 18,
      tilt: 30
    };

    let markerOptions: MarkerOptions = {
        position: coords,
        title: 'Domz Garcia',
        icon: 'http://findicons.com/files/icons/1588/farm_fresh_web/32/sport_basketball.png'
      };

    let marker = this.googleMap.addMarker(markerOptions)
          .then((marker: Marker) => {
              marker.showInfoWindow();
            });
            
    this.googleMap.moveCamera(position);
  }

  showAlert(){
    let confirm = this.alertController.create({
        title: 'Map Alert',
        message: 'Map is working fine',
        buttons: [
          {
            text: 'Yes',
            handler: () => {}
          },
          {
            text: 'No'
          }
        ]
      });
      confirm.present();
  }
  
  getDirections(){
    window.location = `geo:14.5840,121.0633;u=35`;
  }
    
    // let map: GoogleMap = this.googleMaps.create(element);
    // map.one(GoogleMapsEvent.MAP_READY).then(
    //     () => {
    //       console.log('Map is ready!');
    //       // Now you can add elements to the map like the marker
    //     }
    //   );
    
    //   let ionic: LatLng = new LatLng(43.0741904,-89.3809802);

    //   let position: CameraPosition = { target: ionic,
    //                                     zoom: 18,
    //                                     tilt: 30
    //                                   };

    //   map.moveCamera(position);

      // let markerOptions: MarkerOptions = {
      //   position: ionic,
      //   title: 'Ionic'
      // };

      // const marker: Marker = map.addMarker(markerOptions)
      //                           .then((marker: Marker) => {
      //                             marker.showInfoWindow();
      //                           });
      // }

  
}
