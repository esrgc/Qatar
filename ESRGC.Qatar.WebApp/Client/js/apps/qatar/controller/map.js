/*
Author: Tu hoang
ESRGC 2014

QATAR

Map controller
map.js

controller for profile searching by tags

Dependencies
dx library
*/

dx.defineController('Map', {
    refs: {

    },
    control: {},
    initialize: function (e) {
        dx.app.controller.Map.parent.initialize.apply(this, arguments);
        var scope = this;

        //initialize map
        var app = dx.getApp();
        //initialize the map
        app.appData.mapViewer = new dx.map.LeafletViewer({
            center: new L.LatLng(25.280468, 51.522312),
            zoomLevel: 9
        });
        app.getMapViewer = function () {
            return app.appData.mapViewer;
        };
    }
});