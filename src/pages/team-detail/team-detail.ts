import { UserSettings } from '../../shared/user.settings.service';
import { GamePage } from '../game/game';
import { EliteApi } from '../../shared/shared';
import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import * as _ from 'lodash';
import * as moment from 'moment';

/**
 * Generated class for the TeamDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()

@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.html',
})
export class TeamDetailPage {

  private tourneyData: any;
  team: any;
  games: any[];
  teamStanding: any;
  allGames: any[];
  isFollowing: Boolean = false;

  dateFilter: string;

  useDateFilter: Boolean = false;
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private eliteApi: EliteApi,
              private alertController: AlertController,
              private toastController: ToastController,
              private userSettings: UserSettings) {}
  
  ionViewDidLoad() {
    this.team = this.navParams.data;
    this.tourneyData = this.eliteApi.getCurrentTourney();

    this.games = _.chain(this.tourneyData.games)
                  .filter(g => g.team1Id === this.team.id || g.team2Id === this.team.id)
                  .map(g => {
                      let isTeam1 = (g.team1Id === this.team.id);
                      let opponentName = isTeam1 ? g.team2 : g.team1;
                      let scoreDisplay = this.getScoreDisplay(isTeam1, g.team1Score, g.team2Score);
                      return {
                          gameId: g.id,
                          opponent: opponentName,
                          time: Date.parse(g.time),
                          location: g.location,
                          locationUrl: g.locationUrl,
                          scoreDisplay: scoreDisplay,
                          homeAway: (isTeam1 ? "vs." : "at")
                      };
                  })
                  .value();

      this.allGames = this.games;
      this.teamStanding = _.find(this.tourneyData.standings, { 'teamId': this.team.id });
      
      if(this.team){
        this.userSettings.isFavoriteTeam(this.team.id)
          .then( value => { 
            return this.isFollowing = value;
          });
      }
  }

  getScoreDisplay(isTeam1, team1Score, team2Score) {
        if (team1Score && team2Score) {
            var teamScore = (isTeam1 ? team1Score : team2Score);
            var opponentScore = (isTeam1 ? team2Score : team1Score);
            var winIndicator = teamScore > opponentScore ? "W: " : "L: ";
            return winIndicator + teamScore + "-" + opponentScore;
        }
        else {
            return "";
        }
    }

  gameClicked(event, game){
    let sourceGame = this.tourneyData.games.find(g => g.id === game.gameId);
    this.navCtrl.parent.parent.push(GamePage, sourceGame);
    // le.log(sourceGame);
  }

  dateChanged(){
      // let that = this;
      // this.games = _.filter(this.allGames, function(g){
          // return moment(g.time).isSame(that.dateFilter, 'day')
      // });

    if(this.useDateFilter){
        this.games = _.filter(this.allGames, g => moment(g.time)
            .isSame(this.dateFilter, 'day'));
    } else {
      this.games = this.allGames;
    }
  }
  
  goHome(){
    // this.navCtrl.push(MyTeamsPage);
    // this.navCtrl.popToRoot();
    this.navCtrl.parent.parent.popToRoot();
  }

  getScoreWorL(game){
    // console.log(game);
    return game.scoreDisplay ? game.scoreDisplay[0] : '';
  }

  getScoreDisplayBadgeClass(game){
    return game.scoreDisplay.indexOf('W:') === 0 ? 'primary':'danger';
  }

  toggleFollow(){
    if(this.isFollowing){
      let confirm = this.alertController.create({
        title: 'Unfollow',
        message: 'Are you sure you want to unfollow this team?',
        buttons: [
          {
            text: 'Yes',
            handler: () => { 
              this.isFollowing = false 
              // TODO: Persist data  
              this.userSettings.unfavoriteTeam(this.team);
              
              let toast = this.toastController.create({
                message: 'You have unfollowed this team.',
                duration: 2000,
                position: 'bottom'
              });
              
              toast.present();
            }
          },
          {
            text: 'No'
          }
        ]
      });

      confirm.present();

    } else {
      this.isFollowing = true;
      // TODO: Persist data 
      this.userSettings
        .favoriteTeam(
                  this.team, 
                  this.tourneyData.tournament.id,
                  this.tourneyData.name);
    }

  }
}
