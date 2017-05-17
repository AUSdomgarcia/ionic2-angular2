import { UserSettings } from '../../shared/user.settings.service';
import { TeamHomePage } from '../team-home/team-home';
import { EliteApi } from '../../shared/shared';
import { LoadingController, NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { TournamentsPage } from '../tournaments/tournaments';

@Component({
    templateUrl: './my-teams.page.html',
})

export class MyTeamsPage {

    favorites: any[];

    constructor(private nav: NavController,
                private loadingController: LoadingController,
                private eliteApi: EliteApi,
                private userSettings: UserSettings) { }
                
    gotoTournaments(){
        this.nav.push(TournamentsPage);
    }
    
    favoriteTapped(event, favorite){
        let loader = this.loadingController.create({
            content: 'Getting data...',
            dismissOnPageChange: true
        });
        
        loader.present();
        this.eliteApi.getTournamentData(favorite.tournamentId)
            .subscribe( t => this.nav.push(TeamHomePage, favorite.team));
    }

    ionViewDidEnter(){
        this.userSettings.getAllFavorites()
        .then( favorites => {
             this.favorites = favorites;
        });
    }
}