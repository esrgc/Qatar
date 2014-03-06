/*
Author: Tu hoang
ESRGC
Provides base (prototype) functions for mapviewer
Note: this class is defined using dx library

implements leaflet API 
operates foodshed application
*/

dx.map.LeafletViewer = dx.define({
    name: 'LeafletViewer',
    extend: dx.map.MapViewer,
    _className: 'LeafletViewer',
    initialize: function(options) {
        dx.map.MapViewer.prototype.initialize.apply(this, arguments);
        //cloudmade layer
        var cloudMadeUrl = 'http://{s}.tile.cloudmade.com/c0925b1494384159af7cd710aadbda8d/997/256/{z}/{x}/{y}.png';
        var cloudMadeAttribution = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>';
        var cmLayer = new L.TileLayer(cloudMadeUrl, {
            attribution: cloudMadeAttribution,
            maxZoom: 18
        });
        //osmlayer
        var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        var osmAttrib = 'Map data © OpenStreetMap contributors';
        var osm = new L.TileLayer(osmUrl, {
            minZoom: 1,
            maxZoom: 18,
            attribution: osmAttrib
        });
        this.features = new L.FeatureGroup([
            //new L.Marker([39.0, -76.70]).bindPopup('Some organization'),
            //new L.Marker([39.0, -76.20]).bindPopup('Abc company'),
            //new L.Marker([38.9, -76.0]).bindPopup('Eastern shore company'),
            //new L.Marker([38.36, -75.59]).bindPopup('Salisbury University')
        ]);
        this.geoJsonFeatures = L.geoJson();
        this.map = L.map('map', {
            layers: [osm, this.features, this.geoJsonFeatures],
            center: this.center || new L.LatLng(39.0, -76.70),
            zoom: this.zoomLevel || 7,
            measureControl: true
        });
        //set up layer control
        var baseMaps = {
            'CloudMade': cmLayer,
            'OpenStreetMap': osm
        };
        if (typeof this.baseLayers != 'undefined')
            for (var i in this.baseLayers) {
                var layer = this.baseLayers[i];
                if (layer !== undefined)
                    baseMaps[i] = layer;
            }
        var overlayMaps = {
            //other overlay layers go here
            //feature layer
            //'Features': this.features,
            'Overlays': this.geoJsonFeatures
        };
        if (typeof this.overlays != 'undefined') {
            for (var i in this.overlays) {
                var layer = this.overlays[i];
                overlayMaps[i] = layer;
            }
        }
        L.control.layers(baseMaps, overlayMaps).addTo(this.map);
        L.control.scale().addTo(this.map);
    },
    addGeoJsonLayer: function(data, option) {
        if (typeof data == 'undefined') {
            dx.log('No data found')
            return;
        }
        dx.log('Adding data to map...');
        if (this.geoJsonFeatures != 'undefined') {
            if (typeof option == 'undefined')
                this.geoJsonFeatures.addLayer(L.geoJson(data));
            else
                this.geoJsonFeatures.addLayer(L.geoJson(data, option));
        }
    },
    clearGeoJsonFeatures: function() {
        if (this.geoJsonFeatures != 'undefined')
            this.geoJsonFeatures.clearLayers();
    },
    addFeatureToFeatureGroup: function(feature) {
        var features = this.features;
        if (typeof features == 'undefined') {
            dx.log('No feature group found');
            return;
        }
        if (feature != null)
            features.addLayer(feature);
    },
    clearFeatures: function() {
        var features = this.features;
        if (typeof features == 'undefined') {
            dx.log('No feature group found');
            return;
        }
        features.clearLayers();
    },
    createFeature: function(obj) {
        var wkt = new Wkt.Wkt();
        wkt.read(obj);
        var f = wkt.toObject();
        return f;
    },
    getFeaturesBound: function() {
        var features = this.features;
        if (typeof features == 'undefined') {
            dx.log('No feature group found');
            return;
        }
        return features.getBounds();
    },
    getGeoJsonFeaturesBound: function() {
        var features = this.geoJsonFeatures;
        if (typeof features == 'undefined') {
            dx.log('No geojson feature found');
            return;
        }
        return features.getBounds();
    },
    zoomToFeatures: function() {
        var bounds = this.getFeaturesBound();
        if (typeof bounds != 'undefined')
            this.map.fitBounds(bounds);
    },
    zoomToGeoJsonFeatures: function() {
        var bounds = this.getGeoJsonFeaturesBound();
        if (typeof bounds != 'undefined')
            this.map.fitBounds(bounds);
    },
    zoomToPoint: function(point, zoom) {
        var z = zoom || this.getMaxZoom();//default zoom
        if (typeof point.x != 'undefined' && typeof point.y != 'undefined') {
            var latlng = new L.LatLng(point.x, point.y);
            this.map.setView(latlng, z);
        }
        else {
            this.map.setView(point, z);
        }
    }
});