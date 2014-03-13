/*
Tu Hoang
ESRGC 2014

QATAR Routing map application
routes.js

store for retrieving geojson routes 
*/

dx.defineStore('Routes', {
    url: 'routes',
    type: 'geojson',
    errorCallback: function(err) {
        alert('Sorry! The route you selected is not available at this time.');
    }
})