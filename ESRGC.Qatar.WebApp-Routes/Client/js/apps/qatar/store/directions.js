/*
Tu Hoang
ESRGC 2014

QATAR Routing map application
directions.js

store for retrieving xml or json direction data 
*/

dx.defineStore('Directions', {
    url: 'directions',
    type: 'xml',
    errorCallback: function(err) {
        //does nothing when no direction found
        dx.log('No direction data found!')
    }
})