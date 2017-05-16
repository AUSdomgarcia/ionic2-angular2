import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import * as _ from 'lodash';

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
        console.log('isSetToFavorite', typeof teamId, teamId);
        let bool = true;

        return this.storage.get(teamId)
            .then(value => value ? bool : !bool);
    }

    getAllFavorites(){
        let collections = [];
        
        this.storage.keys().then( items => {
            
            let promises = items.map( item => {
                return this.storage.get(item);
            });
            
            Promise.all(promises).then(function(teams) {
                teams.map(function(team){
                    collections.push(JSON.parse(team));
                });
            });
        })
        .catch(function(err) {
            if(err) throw err;
        });

        return Promise.resolve(collections);
    }
}