/*
Author: Tu Hoang
ESRGC 2014

Residence Locator 
View
map.js

Binds view data for facility using knockout js
*/

dx.defineView('Map', {
    viewModel: null,
    initialize: function() {
        dx.app.view.Map.parent.initialize.apply(this, arguments);
    }
})