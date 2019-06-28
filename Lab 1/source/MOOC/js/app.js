const myapp = angular.module('app', []);

myapp.run(function ($http) {
    // Sends this header with any AJAX request
    $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    // Send this header only in post requests. Specifies you are sending a JSON object
    $http.defaults.headers.post['dataType'] = 'json'
});

myapp.controller('Ctrl',function($scope,$http){
    $scope.subjectList = [];
    $scope.focusList = [];
    $scope.courseList = [];
    $scope.courseData = {};

    $scope.subjectDiv = $("#subject_list");
    $scope.focusDiv = $("#focus_list");
    $scope.courseDiv = $("#course_list");
    $scope.courseItemDiv = $("#course_item");

    $scope.getData = function(){
        const req = $http.get('http://localhost:8081/getCourses');
        req.success(function(data, status, headers, config) {
            $scope.subjectList = data;
        });
        req.error(function(data, status, headers, config) {
            alert( "failure message: " + JSON.stringify({data: data}));
        });
    };

    $scope.showSubject = function (id) {
        const req = $http.get('http://localhost:8081/getSubject/'+id);
        req.success(function(data, status, headers, config) {
            if (!$scope.subjectDiv.hasClass("hidden")) {
                $scope.subjectDiv.addClass("hidden");
            }
            if ($scope.focusDiv.hasClass("hidden")) {
                $scope.focusDiv.removeClass("hidden");
            }
            $scope.subjectList = [];
            $scope.focusList = data;
        });
        req.error(function(data, status, headers, config) {
            alert( "failure message: " + JSON.stringify({data: data}));
        });
    }

    $scope.showFocus = function (id) {
        const req = $http.get('http://localhost:8081/getFocus/'+id);
        req.success(function(data, status, headers, config) {
            if (!$scope.focusDiv.hasClass("hidden")) {
                $scope.focusDiv.addClass("hidden");
            }
            if ($scope.courseDiv.hasClass("hidden")) {
                $scope.courseDiv.removeClass("hidden");
            }
            $scope.focusList = [];
            $scope.courseList = data;
        });
        req.error(function(data, status, headers, config) {
            alert( "failure message: " + JSON.stringify({data: data}));
        });
    }

    $scope.showCourse = function (id) {
        const req = $http.get('http://localhost:8081/getCourse/'+id);
        req.success(function(data, status, headers, config) {
            if (!$scope.courseDiv.hasClass("hidden")) {
                $scope.courseDiv.addClass("hidden");
            }
            if ($scope.courseItemDiv.hasClass("hidden")) {
                $scope.courseItemDiv.removeClass("hidden");
            }
            $scope.courseList = [];
            $scope.courseData = data[0];
        });
        req.error(function(data, status, headers, config) {
            alert( "failure message: " + JSON.stringify({data: data}));
        });
    }
});

// myapp.controller('courseController',function($scope,$http,$routeParams){
//     $scope.getData = function(){
//         $scope.id=$routeParams.id;
//         const req = $http.get('http://localhost:8081/getCourses');
//         req.success(function(data, status, headers, config) {
//             $scope.courseList = data;
//         });
//         req.error(function(data, status, headers, config) {
//             alert( "failure message: " + JSON.stringify({data: data}));
//         });
//
//     };
// });
