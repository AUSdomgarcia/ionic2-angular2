import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { TournamentsPage } from '../tournaments/tournaments';

@Component({
    templateUrl: './my-teams.page.html',
})

export class MyTeamsPage {

    favorites = [
        {
            team: { id: 6182, name: 'HC Elite 7th', coach: 'Michelotti'},
                tournamentId: '123456',
                tournamentName: 'March Madness Tournament'
        },
        {
            team: { id: 6182, name: 'HC Elite', coach: 'Michelotti'},
                tournamentId: '1234567',
                tournamentName: 'Holiday Hoops Challenge'
        },
    ];

    constructor(private nav: NavController) { }

    toToTournaments(){
        this.nav.push(TournamentsPage);
    }
}