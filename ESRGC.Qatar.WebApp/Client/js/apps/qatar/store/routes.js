/*
Tu Hoang
ESRGC 2014

QATAR Routing map application
routes.js

store for retrieving geojson routes 
*/

dx.defineStore('Routes', {
    url: location.protocol + '//' + location.host + '/client/data/routes/',
    type: 'geojson'
})