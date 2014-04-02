/*
Author: Tu hoang
ESRGC 2013

QATAR

Routing application

Dependencies
dx library
*/

dx.application({
    name: 'Qatar',
    stores: ['Routes', 'Directions'],
    models: [],
    views: [],
    controllers: ['Map', 'Route'],
    launch: function() {
        dx.log('App launch function run!')
    }

});