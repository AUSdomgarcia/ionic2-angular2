import { Events } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()

export class UserSettings {

    constructor(private events: Events,
                private sqlite: SQLite) {}
    
    createSQLite(){
        this.sqlite.create({
            name: 'eliteApp.db',
            location: 'default'
        })
        .then( (db: SQLiteObject) => {
            db.executeSql(
                    `CREATE TABLE IF NOT EXISTS team (
                     coach text NOT NULL,
                     division text NOT NULL,
                     id integer NOT NULL,
                     name text NOT NULL,
                     tournamentId text NOT NULL
                    )`, [])
                    .then(() => alert('executed sql successfully') )
                    .catch( (e) => alert('CREATE_ERROR ' + JSON.stringify(e)) );
        })
        .catch( (e)=> { alert('DB_CONN_ERROR ' + e) });
    }

    truncateDB(){
        this.sqlite.create({
            name: 'eliteApp.db',
            location: 'default'
        })
        .then( (db: SQLiteObject) => {
            db.executeSql(`DELETE FROM team`, [])
            .then(() => {
                alert('truncate sql successfully') ;
                this.events.publish('favorites:changed');
            })
            .catch( (e) => alert('TRUNC_ERROR ' + JSON.stringify(e)) );
        })
        .catch( (e)=> { alert('DB_CONN_ERROR ' + e) });
    }

    favoriteTeam(team, tournamentId, tournamentName){
        let item = {
            team, tournamentId, tournamentName
        };
        
        // DELETE:
        // this.storage.set(team.id, JSON.stringify(item))
            // .then( ()=> this.events.publish('favorites:changed') );

        this.sqlite.create({
            name: 'eliteApp.db',
            location: 'default'
        })
        .then( (db: SQLiteObject) => {
            db.executeSql(`INSERT INTO team
                VALUES(?,?,?,?,?) 
            `, [
                item['team']['coach'],
                item['team']['division'],
                item['team']['id'],
                item['team']['name'],
                tournamentId
            ])
            .then( () => {
                this.events.publish('favorites:changed');
            } )
            .catch((e) => {
                alert('INSERT_ERROR ' + JSON.stringify(e));
            })
        })
        .catch((e) => {
            alert('DB_CONN_ERROR ' + JSON.stringify(e));
        });
    }

    unfavoriteTeam(team){
        // console.log('remove:', team.id);
        // DELETE:
        // this.storage.remove(team.id)
        // .then( () => this.events.publish('favorites:changed') );

        let teamId = team.id;

        this.sqlite.create({
            name: 'eliteApp.db',
            location: 'default'
        })
        .then( (db: SQLiteObject) => {
            db.executeSql(`
                DELETE FROM team 
                WHERE id = ${teamId}`, [])
            .then( () => {
                this.events.publish('favorites:changed');
            })
            .catch((e) => {
                alert('DELETE_ERROR ' + JSON.stringify(e));
            })
        })
        .catch((e) => {
            alert('DB_CONN_ERROR ' + JSON.stringify(e));
        });

    }
    
    isFavoriteTeam(teamId) {
        let bool = false;
        return new Promise((resolve, reject) => {
            this.sqlite.create({
                name: 'eliteApp.db',
                location: 'default'
            })
            .then((db: SQLiteObject) => {
                db.executeSql(`SELECT * FROM team WHERE id = ${teamId}`, [])
                .then( (resultSet) => {
                    alert('id: ' + `${teamId}` 
                        + ' ' + resultSet.rows.length + ' ' 
                        + JSON.stringify(resultSet) );
                    
                    bool = (resultSet.rows.length !== 0) ? true : false;
                    resolve(bool);
                })
                .catch( (e) => {
                    alert('SELECT_ERROR ' + e);
                    reject(new Error(e));
                });
            })
            .catch( (e) => {
                alert('DB_CONN_ERROR ' + e);
                reject(new Error(e));
            });
        })
    }

    getAllFavorites(){
        let collections = [];

        this.sqlite.create({
            name: 'eliteApp.db',
            location: 'default'
        })
        .then((db: SQLiteObject) => {
            
            db.executeSql(`SELECT * FROM team`, [])

            .then( (resultSet) => {

                for(let i = 0; i < resultSet.rows.length; i++){
                    collections.push({
                        team: {
                            coach: resultSet.rows.item(i).coach,
                            division: resultSet.rows.item(i).division,
                            id: resultSet.rows.item(i).id,
                            name: resultSet.rows.item(i).name
                        },
                        tournamentId: resultSet.rows.item(i).tournamentId
                    });
                }
            })
            .catch( (e) => alert('SELECT_ERROR ' + e) );
        })
        .catch( (e) => alert('DB_CONN_ERROR ' + e) );

        return Promise.resolve(collections);
    }
}