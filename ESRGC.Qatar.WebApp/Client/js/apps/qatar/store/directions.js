﻿/*
Tu Hoang
ESRGC 2014

QATAR Routing map application
directions.js

store for retrieving xml or json direction data 
*/

dx.defineStore('Directions', {
    url: location.protocol + '//' + location.host + '/client/data/directions/',
    type: 'xml'
})