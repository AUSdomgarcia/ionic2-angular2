import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()

export class UserSettings {
    constructor(private storage: Storage) {}

    favoriteTeam(team, tournamentId, tournamentName){
        let item = {
            team, tournamentId, tournamentName
        };
        this.storage.set(team.id, JSON.stringify(item));
    }
    unfavoriteTeam(team){
        this.storage.remove(team.id);
    }

    isFavoriteTeam(teamId){
        let bool = true;
        return this.storage.get(teamId)
            .then(value => value ? bool : !bool);
    }
}