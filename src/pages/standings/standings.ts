import { EliteApi } from '../../shared/shared';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import * as _ from 'lodash';

/**
 * Generated class for the StandingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()

@Component({
  selector: 'page-standings',
  templateUrl: 'standings.html',
})

export class StandingsPage {
  allStandings: any[];
  standings: any[];
  team: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private eliteApi: EliteApi) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StandingsPage');

    this.team = this.navParams.data;
    let tourneyData = this.eliteApi.getCurrentTourney();
    this.standings = tourneyData.standings;

    this.allStandings = 
      _.chain(this.standings)
      .groupBy('division')
      .toPairs()
      .map(item => _.zipObject(['divisionName','divisionStandings'], item))
      .value();

      console.log('standings:', this.standings);
      console.log('divsion standings:', this.allStandings);
  }
}
