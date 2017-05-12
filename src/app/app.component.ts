import { TournamentsPage } from '../pages/tournaments/tournaments';
import { MyTeamsPage } from '../pages/my-teams/my-teams.page';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// import { HomePage } from '../pages/home/home';
// import { ListPage } from '../pages/list/list';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = MyTeamsPage;

  // pages: Array<{title: string, component: any}>;

  pages: Array<PagesContract>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    // this.pages = [
      // { title: 'Home', component: HomePage },
      // { title: 'List', component: ListPage }
    // ]; 

    this.pages = [
      {title: 'Tournaments 1', component: TournamentsPage},
      {title: 'Tournaments 2', component: TournamentsPage},
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
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


interface PagesContract {
  title: string;
  component: any;
}