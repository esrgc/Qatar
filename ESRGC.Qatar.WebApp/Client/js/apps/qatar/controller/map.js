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
        routeList: '#routeList'
    },
    control: {
        routeList: {
            change: 'onRouteChange'
        }
    },
    initialize: function(e) {
        dx.app.controller.Map.parent.initialize.apply(this, arguments);
        var scope = this;

        //initialize map
        var app = dx.getApp();
        //initialize the map
        app.appData.mapViewer = new dx.map.LeafletViewer({
            center: new L.LatLng(25.280468, 51.522312),
            zoomLevel: 9
        });
        app.getMapViewer = function() {
            return app.appData.mapViewer;
        };
        var routeStore = dx.getStore('Routes');
        routeStore.on('load', this.onRouteStoreLoad);
    },
    onRouteChange: function(e, object) {
        dx.log('Route changed: ');
        var route = $(object).val();
        dx.log(route);
        var routeStore = dx.getStore('Routes');
        var url = routeStore.url + '/' + route;
        routeStore.loadContentUrl(url)
    },
    //store event
    onRouteStoreLoad: function(store, data) {
        dx.log('RouteStore loaded:')
        var app = dx.getApp();
        var viewer = app.getMapViewer();
        dx.log(data);
        viewer.clearGeoJsonFeatures();
        viewer.addGeoJsonLayer(data);
        viewer.zoomToGeoJsonFeatures();
    }
});