import { Events } from 'ionic-angular';
import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()

export class UserSettings {

    constructor(private storage: Storage,
                private events: Events,
                private sqlite: SQLite) {}
    
    createSQLite(){
        console.log('sqlite', this.sqlite);

        this.sqlite.create({
            name: 'eliteApp.db',
            location: 'default'
        })
        .then( (db: SQLiteObject) => {
            db.executeSql(
                    `create table team (
                     coach text NOT NULL,
                     division text NOT NULL,
                     id integer NOT NULL,
                     name text NOT NULL,
                     tournamentId text NOT NULL
                    )`, {})
                    .then(() => console.log('Executed Sql'))
                    .catch( (e) => console.log(e) );
        });
    }

    // {"team":{
    // "coach":"Bartlett",
    // "division":"6th grade",
    // "id":814,
    // "name":"DC Assault"},
    // "tournamentId":"3dd50aaf-6b03-4497-b074-d81703f07ee8"}

    favoriteTeam(team, tournamentId, tournamentName){
        let item = {
            team, tournamentId, tournamentName
        };
        
        console.log('add:', JSON.stringify(item));

        this.storage.set(team.id, JSON.stringify(item))
            .then( ()=> this.events.publish('favorites:changed') );
    }

    unfavoriteTeam(team){
        console.log('remove:', team.id);

        this.storage.remove(team.id)
            .then( () => this.events.publish('favorites:changed') );
    }
    
    isFavoriteTeam(teamId){
        // console.log('isSetToFavorite', typeof teamId, teamId);
        let bool = true;
        
        return this.storage
            .get(teamId)
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