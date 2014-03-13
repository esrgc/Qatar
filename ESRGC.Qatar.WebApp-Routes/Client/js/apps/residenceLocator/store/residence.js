/*
Author: Tu hoang
ESRGC 2014

Project QATAR 
residence.js

loads residenceinfo

*/


dx.defineStore('Residence', {
    url: '/residence/',
    type: 'json',
    errorCallback: function(err) {
        alert('Sorry! Residence data for this facility is not available at this time.');
        var view = dx.getView('Map');
        ko.mapping.fromJS(null, view.viewModel);
    }
});