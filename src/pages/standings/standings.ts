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
  divisionFilter:string = 'division';

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private eliteApi: EliteApi) {
  }
  
  getHeader(record, recordIndex, records){
    if(recordIndex % 10 === 0 || record.division !== records[recordIndex-1].division){
      return record.division;
    }
    return null;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StandingsPage');

    this.team = this.navParams.data;
    let tourneyData = this.eliteApi.getCurrentTourney();
    this.standings = tourneyData.standings;

    this.allStandings = tourneyData.standings;

    // this.allStandings = 
    //   _.chain(this.standings)
    //   .groupBy('division')
    //   .toPairs()
    //   .map(item => _.zipObject(['divisionName','divisionStandings'], item))
    //   .value();

    let pairs = 
      _.chain(this.standings)
      .groupBy('division')
      .toPairs()
      .map(item => _.zipObject(['divisionName','divisionStandings'], item))
      .value();
    
    console.log(pairs);

    // console.log('divsion standings:', this.allStandings);

    this.filterDivision();
  }

  filterDivision(){
    if(this.divisionFilter === 'all' ){
      this.standings = this.allStandings;
    } else {
      this.standings = _.filter(this.allStandings, s => s.division === this.team.division);
    }
  }
}
