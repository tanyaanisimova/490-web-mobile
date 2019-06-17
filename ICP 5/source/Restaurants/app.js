// 'use strict';

// Declare app level module which depends on views, and components
angular.module('Restaurants', [])
    .controller('Ctrl', function ($scope, $http) {
        $scope.venueList = new Array();
        $scope.mostRecentReview;
        $scope.getVenues = function () {
            var placeEntered = document.getElementById("txt_placeName").value;
            var searchQuery = document.getElementById("txt_searchFilter").value;
            if (placeEntered != null && placeEntered != "" && searchQuery != null && searchQuery != "") {

                //This is the API that gives the list of venues based on the place and search query.
                var handler = $http.get("https://api.foursquare.com/v2/venues/search" +
                    "?client_id=XWO5JMYH5VRS1X5SPDZXHW0NCHBG5DB13K2KR5LWYOWZ4RIQ" +
                    "&client_secret=I3ZBTMTNX2IVUT4IFQ2EDN40ZOERKVOB1XGIDQWQ3B54RQA5" +
                    "&v=20160215&limit=5" +
                    "&near=" + placeEntered +
                    "&query=" + searchQuery);

                handler.success(function (data) {
                    if (data != null && data.response != null && data.response.venues != undefined && data.response.venues != null) {
                        let location;
                        data.response.venues.forEach(function (venue) {
                            location = venue.location.address + ", " + venue.location.city + ", " + venue.location.country;
                            $scope.venueList.push({name: venue.name, id:venue.id, location:location});
                        })
                    }
                })
                handler.error(function (data) {
                    alert("There was some error processing your request. Please try after some time.");
                });
            }
        }
    });
