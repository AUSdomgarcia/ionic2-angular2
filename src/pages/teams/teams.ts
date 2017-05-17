import { EliteApi } from '../../shared/elite-api.service';
import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';

import * as _ from 'lodash';
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

  private allTeams: any;
  private allTeamDivisions: any;
  teams = [];

  queryText: string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private eliteApi: EliteApi,
              private loadingController: LoadingController) {}
 
  ionViewDidLoad() {
    let selectedTourney = this.navParams.data;

    let loader = this.loadingController.create({
      content: 'Getting data...'
    });

    loader.present().then(() => {
      this.eliteApi.getTournamentData(selectedTourney.id)
        .subscribe(data => {
          this.allTeams = data.teams;
          this.allTeamDivisions = 
            _.chain(data.teams)
             .groupBy('division')
             .toPairs()
             .map(item => _.zipObject(['divisionName','divisionTeams'], item))
             .value();
            
          this.teams = this.allTeamDivisions;
          // console.log('old', data.teams, 'division teams', this.teams);
          loader.dismiss();
        });
    });
  }

  itemTapped(event, team){
    this.navCtrl.push(TeamHomePage, team);
  }

  updateTeams(){
    let queryTextLower = this.queryText.toLowerCase();
    let filteredTeams = [];

    _.forEach(this.allTeamDivisions, td => {
      let teams = _.filter(td.divisionTeams, t => (<any>t).name.toLowerCase()
      .includes(queryTextLower));

      if(teams.length){
        filteredTeams.push({ divisionName: td.divisionName, divisionTeams: teams });
      }
    });

    this.teams = filteredTeams;
  }
}
