import { TeamHomePage } from '../pages/team-home/team-home';
import { TournamentsPage } from '../pages/tournaments/tournaments';
import { MyTeamsPage } from '../pages/my-teams/my-teams.page';
import { Component, ViewChild } from '@angular/core';
import { Events, LoadingController, Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// import { HomePage } from '../pages/home/home';
// import { ListPage } from '../pages/list/list';

import { EliteApi, UserSettings } from '../shared/shared';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  favoriteTeams: any[];

  rootPage: any = MyTeamsPage;

  constructor(public platform: Platform, 
              public statusBar: StatusBar, 
              public splashScreen: SplashScreen,
              private userSettings: UserSettings,
              private loadingController:LoadingController,
              private eliteApi: EliteApi,
              private events: Events ) {
              
                this.initializeApp();
              }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();

      this.refreshFavorites();

      this.events
          .subscribe('favorites:changed', 
          () => this.refreshFavorites() );
      
      if(this.platform.is('cordova')){
        this.userSettings.createSQLite();
        
      } else {
        alert('not native!');
      }
      
      this.splashScreen.hide(); 
    });
  }

  refreshFavorites(){
    // TODO: 
    this.userSettings.getAllFavorites()
        .then( favoriteTeams => {
          this.favoriteTeams = favoriteTeams;
        });
  }

  gotoTeam(favorite){
    let loader = this.loadingController.create({
        content: 'Getting Data...',
        dismissOnPageChange: true
    });

    loader.present();
    
    this.eliteApi
      .getTournamentData(favorite.tournamentId)
      .subscribe( l => {
        this.nav.push(TeamHomePage, favorite.team);
      });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
    // this.nav.push(page.component);
  }

  goHome(){
    // this.nav.push(MyTeamsPage);
    this.nav.popToRoot();
  }
  
  goToTournaments(){
    this.nav.push(TournamentsPage);
  }
}

// pages: Array<PagesContract>;

// interface PagesContract {
//   title: string;
//   component: any;
// }
// used for an example of ngFor and navigation
// this.pages = [
  // { title: 'Home', component: HomePage },
  // { title: 'List', component: ListPage }
// ]; 

// this.pages = [
//   {title: 'Tournaments 1', component: TournamentsPage},
//   {title: 'Tournaments 2', component: TournamentsPage},
// ];