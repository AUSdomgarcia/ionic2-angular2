import { TeamsPage } from '../teams/teams';
import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { EliteApi } from '../../shared/shared';

/**
 * Generated class for the TournamentsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()

@Component({
  selector: 'page-tournaments',
  templateUrl: 'tournaments.html',
})

export class TournamentsPage {
  tournaments: any;

  constructor(private eliteApi: EliteApi, 
              public navCtrl: NavController, 
              public navParams: NavParams,
              private loadingController: LoadingController) {}

  itemTapped(event, tournament){
    this.navCtrl.push(TeamsPage, tournament);
  }

  ionViewDidLoad(){
    // console.log('# on ionViewLoaded ');
    let loader = this.loadingController.create({
      content: 'Getting Tournaments...',
      // spinner: 'dots',
    });

    loader.present().then(() => {
        this.eliteApi.getTournaments()
          .then(data => {
              this.tournaments = data; 
              loader.dismiss();
          });
    });
  }

  ionViewLoaded(){
    // NOT INCLUDED: https://ionicframework.com/docs/api/navigation/NavController/#lifecycle-events
  }
  
  ionViewWillEnter(){
    
  }

  ionViewWillLeave(){

  }

  ionViewDidUnload(){

  }

}
