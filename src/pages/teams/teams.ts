import { EliteApi } from '../../shared/elite-api.service';
import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TeamsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

import { TeamHomePage } from '../team-home/team-home'; 

@IonicPage()
@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html',
})
export class TeamsPage {

  teams = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private eliteApi: EliteApi,
              private loadingController: LoadingController) {}
 
  ionViewDidLoad() {
    let selectedTourney = this.navParams.data;
    let loader = this.loadingController.create({
      content: 'Getting Teams...',
      // spinner: 'dots',
    });
    
    loader.present().then(() => {
        this.eliteApi
          .getTournamentData(selectedTourney.id)
          .subscribe( data => { 
            this.teams = data.teams;
            loader.dismiss();
        });
    });
  }

  itemTapped(event, team){
    this.navCtrl.push(TeamHomePage, team);
  }
}
