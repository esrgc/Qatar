/*
Author: Tu hoang
ESRGC 2014

QATAR routing

Map controller
route.js

controller for routes

Dependencies
dx library
*/

dx.defineController('Route', {
    refs: {
        fromRouteList: '#routeList-from',
        toRouteList: '#routeList-to'
    },
    control: {
        fromRouteList: {
            change: 'onFromRouteChange'
        }
    },
    initialize: function() {
        dx.app.controller.Route.parent.initialize.apply(this, arguments);
        //var fromName = this.getFromRouteList().val();
        //var toRouteList = this.getToRouteList();
        //toRouteList.find('option').each(function(i) {
        //    if ($(this).val() == fromName) {
        //        $(this).attr('disabled', 'disabled');
        //        $(this).next().attr('selected', 'selected');
        //    }
        //});
    },
    onFromRouteChange: function(event, object) {
        var fromName = $(object).val();
        dx.log(fromName);
        var toRouteList = this.getToRouteList();
        toRouteList.find('option').removeAttr('disabled')
        toRouteList.find('option').each(function(index) {
            var value = $(this).val();
            if (value == fromName) {
                $(this).attr('disabled', 'disabled');
                $(this).siblings().first().attr('selected', 'selected');
            }
        });
    }

});
