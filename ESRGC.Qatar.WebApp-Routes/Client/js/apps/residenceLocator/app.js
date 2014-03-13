/*
Author: Tu hoang
ESRGC 2014

QATAR

Residence locator application

Dependencies
dx library
*/

dx.application({
    name: 'ResidenceLocator',
    stores: ['Facility', 'Residence'],
    models: [],
    views: ['Map'],
    controllers: ['Map'],
    launch: function() {
        dx.log('App launch function run!')
    }

});