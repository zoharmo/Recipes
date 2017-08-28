/**
 * Created by Yarden on 8/5/2016.
 */

(function(){
    "use strict";
    function googleMapsCtrl($scope){

        $scope.loadScript = function() {
            if(google == undefined) {
                var script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = 'https://maps.google.com/maps/api/js?key=AIzaSyD0T8JZfHykfYrGDv8SNSl7X0X30ErsQ-U&sensor=false&callback=init';
                document.body.appendChild(script);
                setTimeout(function () {
                    $scope.init();
                }, 500);
            }
            else {
                google.maps.event.addDomListener(window, 'load', $scope.init());
            }
        }

        $scope.init = function () {
            var center = new google.maps.LatLng(31.96993,34.772329);
            var mapOptions = {
                zoom: 17,
                center: center,
                scrollwheel: true,
                // styles: [{"featureType":"administrative.land_parcel","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"simplified"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"hue":"#f49935"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"hue":"#fad959"}]},{"featureType":"road.arterial","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"visibility":"simplified"}]},{"featureType":"road.local","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"hue":"#a1cdfc"},{"saturation":30},{"lightness":49}]}]
            };

            var mapElement = document.getElementById('map');
            var map = new google.maps.Map(mapElement, mapOptions);
            var address = 'Rishon Lezion, elie wiesel 2';

                $.getJSON('http://maps.googleapis.com/maps/api/geocode/json?address='+address+'&sensor=false', null, function (data) {
                    var p = data.results[0].geometry.location
                    var latlng = new google.maps.LatLng(p.lat, p.lng);
                    new google.maps.Marker({
                        position: latlng,
                        map: map,
                    });
                });
        }
    }
    angular.module('recipesApp').controller('googleMapsCtrl', ['$scope',  googleMapsCtrl])
})();




