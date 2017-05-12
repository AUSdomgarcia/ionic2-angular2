import { GamePage } from '../pages/game/game';
import { HttpModule } from '@angular/http';
import { MyTeamsPage } from '../pages/my-teams/my-teams.page';
import { TeamsPage } from '../pages/teams/teams';
import { TeamDetailPage } from '../pages/team-detail/team-detail';
import { TournamentsPage } from '../pages/tournaments/tournaments';

import { StandingsPage } from '../pages/standings/standings';
import { TeamHomePage } from '../pages/team-home/team-home';

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
// import { HomePage } from '../pages/home/home';
// import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { EliteApi } from '../shared/shared';

@NgModule({
  declarations: [
    MyApp,
    // HomePage,
    // ListPage,
    MyTeamsPage,
    TournamentsPage,
    TeamsPage,
    TeamDetailPage,
    StandingsPage,
    TeamHomePage,
    GamePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    // HomePage,
    // ListPage
    MyTeamsPage,
    TournamentsPage,
    TeamsPage,
    TeamDetailPage,
    StandingsPage,
    TeamHomePage,
    GamePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    EliteApi,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
