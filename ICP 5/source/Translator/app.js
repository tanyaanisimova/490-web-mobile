// 'use strict';

// Declare app level module which depends on views, and components
angular.module('Translate', [])
    .controller('Ctrl', function ($scope, $http) {
        $scope.translated = "";
        $scope.translate = function () {
            const text = document.getElementById("text-to-translate").value;
            if (text != null && text != "") {
                const lang = "en-ru";

                //This is the API that gives the list of venues based on the place and search query.
                var handler = $http.get("https://translate.yandex.net/api/v1.5/tr.json/translate" +
                    "?key=trnsl.1.1.20130922T110455Z.4a9208e68c61a760.f819c1db302ba637c2bea1befa4db9f784e9fbb8" +
                    "&text=" + text +
                    "&lang=" + lang
                );

                handler.success(function (data) {
                    if (data != null && data.text != undefined && data.text != null) {
                         $scope.translated = data.text[0];
                    }
                })
                handler.error(function (data) {
                    alert("There was some error processing your request. Please try after some time.");
                });
            }
        }
    });
