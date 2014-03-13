/*
Author: Tu hoang
ESRGC
Provides base (prototype) functions for mapviewer
Note: this class is defined using dx library

This class implement leaflet API
*/
if (typeof dx.map == 'undefined')
    dx.map = {};

dx.map.MapViewer = dx.define({
    name: 'MapViewer',
    extend: 'dx.Component',
    _className: 'dx.map.MapViewer',
    initialize: function(options) {
        dx.Component.prototype.initialize.apply(this, arguments);
    },
    zoomToExtent: function(extent) {
        this.map.fitBounds(new L.LatLngBounds(new L.LatLng(extent.xmin, extent.ymin),
         new L.LatLng(extent.xmax, extent.ymax)));
    },
    zoomToFullExtent: function() {
    },
    //zoom to xy (if level exists then zoom to that level otherwise maxlevel is used)
    zoomToXY: function(x, y, level) {
        if (typeof level == 'undefined')
            this.map.setView(new L.LatLng(y, x), this.map.getMaxZoom());
        else
            this.map.setView(new L.LatLng(y, x), level);
    },
    zoomIn: function() {
        this.map.zoomIn();
    },
    zoomOut: function() {
        this.map.zoomOut();
    },
    zoomToDataExtent: function(layer) {
        this.map.fitBounds(layer.getBounds());
    },
    panTo: function(x, y) {
        this.map.panTo(new L.LatLng(y, x));
    },
    locate: function() {
        this.map.locateAndSetView(this.map.getMaxZoom() - 2);
    }

});

