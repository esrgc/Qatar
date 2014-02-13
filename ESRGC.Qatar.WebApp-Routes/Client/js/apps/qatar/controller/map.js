﻿/*
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
        routeList: '#routeList',
        directionContainer: '#directionContainer',
        directionOverview: '#directionSummary',
        directionList: '#directionList',
        directionItems: 'a.list-group-item'
    },
    control: {
        routeList: {
            change: 'onRouteChange'
        },
        directionItems: {
            click: 'onDirectionClick'
        }
    },
    initialize: function(e) {
        dx.app.controller.Map.parent.initialize.apply(this, arguments);
        var scope = this;

        //initialize map
        var app = dx.getApp();
        //initialize the map viewer
        app.appData.mapViewer = new dx.map.LeafletViewer({
            center: new L.LatLng(25.280468, 51.522312),
            zoomLevel: 9
        });
        app.getMapViewer = function() {
            return app.appData.mapViewer;
        };
        var routeStore = dx.getStore('Routes');
        if (typeof routeStore != 'undefined')
            routeStore.on('load', this.onRouteStoreLoad);
        var directionStore = dx.getStore('Directions');
        if (typeof directionStore != 'undefined')
            directionStore.on('load', this.onDirectionStoreLoad);
    },
    onRouteChange: function(e, object) {
        dx.log('Route changed: ');
        //get selected route
        var route = $(object).val();
        dx.log(route);
        if (route == 'none')
            return;

        var routeStore = dx.getStore('Routes');
        if (typeof routeStore == 'undefined') {
            dx.log('Error retrieving route store');
            return;
        }
        var url = routeStore.url + route + '.' + routeStore.type;
        //load geojson route geometry
        routeStore.loadContentUrl(url);

        //handle directions
        var directionStore = dx.getStore('Directions');
        if (typeof directionStore == 'undefined') {
            dx.log('Error retrieving direction store');
            return;
        }
        var url = directionStore.url + directionStore.type + '/' + route + '.' + directionStore.type;
        directionStore.loadContentUrl(url);
    },
    //store event
    onRouteStoreLoad: function(store, data) {
        dx.log('RouteStore loaded:')
        var app = dx.getApp();
        var viewer = app.getMapViewer();
        //dx.log(data);
        viewer.clearGeoJsonFeatures();
        viewer.clearFeatures();
        viewer.addGeoJsonLayer(data);
        viewer.zoomToGeoJsonFeatures();
    },
    onDirectionStoreLoad: function(store, data) {
        var scope = dx.getController('Map');

        dx.log('direction loaded: XML format')
        try {
            var jsonStr = xml2json(data, '');
            var dirData = $.parseJSON(jsonStr);
            //dx.log(dirData);
            var directions = dirData['NA:DIRECTIONS'].ROUTE;
            dx.log(directions);
        } catch (exception) {
            return;
        }
        //parse direction data
        //1. overview data
        var overviewElm = scope.getDirectionOverview();
        overviewElm.text('');//empty content
        overviewElm.append('<small><strong>From to:</strong>&nbsp;' + directions['@name'] + '</small><br/>');
        var drivingDist = directions.DIRECTION.STRINGS.STRING[1]['@text'];
        overviewElm.append('<small><strong>Driving distance:</strong>&nbsp;' + drivingDist + '</small>');
        //parse direction
        var directionList = scope.getDirectionList();
        directionList.html('');//clear all previous content
        var path = directions.PATH.DIRECTION;
        for (var i in path) {
            //get map point
            var x = path[i].POINT['@x'];
            var y = path[i].POINT['@y'];
            var a = $(document.createElement('a'));
            a.addClass('list-group-item');
            a.attr('href', '#');
            a.attr('data-x', x);
            a.attr('data-y', y);
            var dirTextSum = '', distance = '', distanceTraveled = '';
            for (var d in path[i].STRINGS.STRING) {
                var dirStr = path[i].STRINGS.STRING[d];
                switch (dirStr['@style']) {
                    case 'depart':
                    case 'arrive':
                    case 'normal':
                        dirTextSum = dirStr['@text'];
                        break;
                    case 'summary':
                        distance = dirStr['@text'];
                        break;
                    case 'Cumul_length':
                        distanceTraveled = dirStr['@text'];
                        break;
                }
            }
            var html = [
                '<small>',
                    '<strong>',
                        dirTextSum,
                    '</strong>',
                '<small>',
                '<br/>',
                '<small>',
                    distance,
                '</small>',
                '<br/>',
                '<small>',
                    '<strong>',
                        'Distance traveled: ',
                    '</strong>',
                    distanceTraveled,
                '</small>'
            ].join('');
            a.html(html);
            directionList.append(a);
        };
    },
    onDirectionClick: function(e, obj) {
        this.getDirectionItems().removeClass('active');
        $(obj).addClass('active');
        var x = $(obj).attr('data-x');
        var y = $(obj).attr('data-y');
        dx.log('Direction detail: ' + $(obj).text() + 'xy: ' + x + ' ' + y);
        var mapViewer = dx.getApp().getMapViewer();
        mapViewer.clearFeatures();
        //add marker
        mapViewer.addFeatureToFeatureGroup(new L.Marker([y, x]));
        //zoom to the location
        mapViewer.zoomToXY(x, y, mapViewer.map.getMaxZoom() - 1);
    }

});