/*
Author: Tu hoang
ESRGC 2014

QATAR - Residence Locator

Map controller
map.js

controller for locating residence on map
Dependencies
dx library
*/
dx.defineController('Map', {
    refs: {
        mapContainer: '#map',
        popupLinks: '.popup-detail a'
    },
    control: {
        popupLinks: {
            click: 'onPopupLinksClick'
        }
    },
    initialize: function(e) {
        dx.app.controller.Map.parent.initialize.apply(this, arguments);
        var scope = this;

        //initialize map
        var app = dx.getApp();
        //initialize the map viewer
        var mapViewer = app.appData.mapViewer = new dx.map.LeafletViewer({
            center: new L.LatLng(25.3199, 51.5221),//Qatar coordinates
            zoomLevel: 12,
            baseLayers: {
                //add esri layer
                EsriGray: L.esri.basemapLayer("Gray"),
                EsriImagery: L.esri.basemapLayer('Imagery')
            },
            overlays: {
                EsriImageryLabels: L.esri.basemapLayer('ImageryLabels'),
                EsriImageryTransportation: L.esri.basemapLayer('ImageryTransportation')
            }
        });
        app.getMapViewer = function() {
            return app.appData.mapViewer;
        };
        var map = mapViewer.map;

        var resourceUrl = this.getMapContainer().attr('data-resourceUrl');
        if (resourceUrl !== undefined) {
            //wire store event
            var store = dx.getStore('Facility');
            if (store !== undefined) {
                store.on('load', this.onFacilityStoreLoad);
                var url = resourceUrl + store.url;
                //get facility data
                store.loadContentUrl(url);
            }
            store = dx.getStore('Residence');
            if (store !== undefined) {
                store.on('load', this.onResidenceStoreLoad);
                store.url = resourceUrl + store.url;
            }
        }

        mapViewer.zoomToPoint({ x: 25.3199, y: 51.5221 }, 16);
        //var routeStore = dx.getStore('Routes');
        //if (typeof routeStore != 'undefined')
        //    routeStore.on('load', this.onRouteStoreLoad);
        //var directionStore = dx.getStore('Directions');
        //if (typeof directionStore != 'undefined')
        //    directionStore.on('load', this.onDirectionStoreLoad);
    },
    onResidenceStoreLoad: function(store, data) {
        //update view model
        var view = dx.getView('Map');
        if (view === undefined) {
            dx.log('Error getting view "Map"');
            return;
        }
        var viewModel = view.viewModel;
        if (viewModel == null) {
            //applying ko
            dx.log('Applying ko view model');
            viewModel = ko.mapping.fromJS(data);
            //activate view binding
            ko.applyBindings(viewModel);
            view.viewModel = viewModel;//store view model
        }
        else {
            dx.log('Refreshing data...')
            try {
                ko.mapping.fromJS(data, viewModel);
            } catch (e) {
                dx.log(e.message);
            }
        }
    },
    onFacilityStoreLoad: function(store, data) {
        //dx.log(data);
        //get mapviewer
        var mapViewer = dx.getApp().getMapViewer();
        if (mapViewer === undefined) {
            dx.log('onFacilityStoreLoad: No mapViewer found!');
            return;
        }
        mapViewer.addGeoJsonLayer(data, {
            style: function(feature) {
                return {
                    fill: true,
                    weight: 4,
                    fillOpacity: .5,
                    fillColor: '#F7F988',
                    color: '#00FF00'
                };
            },
            onEachFeature: function(feature, layer) {
                var html = [
                    '<div class="popup-detail">',
                    '<p>',
                        '<strong>',
                            feature.properties.NAME.toUpperCase(),
                        '</strong>',
                        '<br/>',
                        '<span>',
                            'Type:&nbsp;',
                            feature.properties.Building_T,
                        '</span>',
                    '</p>',
                    '<a href="#" data-toggle="modal" data-target="#facility-modal"',
                        'data-facility="' + feature.properties.NAME.toUpperCase().replace(' ', '_') + '">View details</a>',
                    '</div>'
                ].join('');
                layer.bindPopup(html);
            }
        });
        //mapViewer.zoomToGeoJsonFeatures();
        dx.log('Facilities loaded')
    },
    onPopupLinksClick: function(event, object) {
        var facName = $(object).attr('data-facility');
        dx.log(facName);
        var store = dx.getStore('Residence');
        if (store === undefined) {
            dx.log('Error getting store "Residence"');
            return;
        }
        var url = store.url + facName + '.json';
        store.loadContentUrl(url);//load residence data
    }

});