const myapp = angular.module('app', []);

myapp.run(function ($http) {
    // Sends this header with any AJAX request
    $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    // Send this header only in post requests. Specifies you are sending a JSON object
    $http.defaults.headers.post['dataType'] = 'json'
});

myapp.controller('Ctrl',function($scope,$http,$compile){
    $scope.subjectList = [];
    $scope.focusList = [];
    $scope.courseList = [];
    $scope.courseData = {};

    $scope.navList = [];

    $scope.subjectDiv = $("#subject_list");
    $scope.focusDiv = $("#focus_list");
    $scope.courseDiv = $("#course_list");
    $scope.courseItemDiv = $("#course_item");

    $scope.homeNav = $("#home_nav");
    $scope.subjectNav = $("#subject_nav");
    $scope.focusNav = $("#focus_nav");
    $scope.courseNav = $("#course_nav");

    $scope.noSubjectsDiv = $("#no_subjects");
    $scope.noFocusesDiv = $("#no_focus_areas");
    $scope.noCoursesDiv = $("#no_courses");

    $scope.getSubjects = function(){
        const req = $http.get('http://localhost:8081/getCourses');
        req.success(function(data, status, headers, config) {
            showAndHide(0, null);
            $scope.subjectList = data;

            if ($scope.subjectList.length === 0) {
                if ($scope.noSubjectsDiv.hasClass('hidden')) {
                    $scope.noSubjectsDiv.removeClass('hidden');
                }
            } else {
                if (!$scope.noSubjectsDiv.hasClass('hidden')) {
                    $scope.noSubjectsDiv.addClass('hidden');
                }
            }
        });
        req.error(function(data, status, headers, config) {
            alert( "failure message: " + JSON.stringify({data: data}));
        });
    };

    $scope.showSubject = function (id, name) {
        const req = $http.get('http://localhost:8081/getSubject/'+id);
        req.success(function(data, status, headers, config) {
            showAndHide(1, {id: id, name: name});
            $scope.focusList = data;

            if ($scope.focusList.length === 0) {
                if ($scope.noFocusesDiv.hasClass('hidden')) {
                    $scope.noFocusesDiv.removeClass('hidden');
                }
            } else {
                if (!$scope.noFocusesDiv.hasClass('hidden')) {
                    $scope.noFocusesDiv.addClass('hidden');
                }
            }
        });
        req.error(function(data, status, headers, config) {
            alert( "failure message: " + JSON.stringify({data: data}));
        });
    }

    $scope.showFocus = function (id, name) {
        const req = $http.get('http://localhost:8081/getFocus/'+id);
        req.success(function(data, status, headers, config) {
            showAndHide(2, {id: id, name: name});
            $scope.courseList = data;
            if (data.length === 0 && !$scope.noCoursesDiv.hasClass('hidden')) {
                $scope.noCoursesDiv.addClass('hidden');
            } else {
                $scope.noCoursesDiv.removeClass('hidden');
            }

            if ($scope.courseList.length === 0) {
                if ($scope.noCoursesDiv.hasClass('hidden')) {
                    $scope.noCoursesDiv.removeClass('hidden');
                }
            } else {
                if (!$scope.noCoursesDiv.hasClass('hidden')) {
                    $scope.noCoursesDiv.addClass('hidden');
                }
            }
        });
        req.error(function(data, status, headers, config) {
            alert( "failure message: " + JSON.stringify({data: data}));
        });
    }

    $scope.showCourse = function (id, name) {
        const req = $http.get('http://localhost:8081/getCourse/'+id);
        req.success(function(data, status, headers, config) {
            showAndHide(3, {id: id, name: name});
            $scope.courseData = data[0];
        });
        req.error(function(data, status, headers, config) {
            alert( "failure message: " + JSON.stringify({data: data}));
        });
    }

    function showAndHide(indexToShow, navItem) {
        //clear all lists
        $scope.subjectList = [];
        $scope.focusList = [];
        $scope.courseList = [];
        $scope.courseItem = {};

        while ($scope.navList.length > indexToShow) {
            $scope.navList.pop();
        }

        if (navItem != null) {
            $scope.navList.push(navItem);
        }

        //hide all except indexToShow
        if (indexToShow !== 0) {
            if (!$scope.subjectDiv.hasClass("hidden")) {
                $scope.subjectDiv.addClass("hidden");
            }
        }
        if (indexToShow !== 1) {
            if (!$scope.focusDiv.hasClass("hidden")) {
                $scope.focusDiv.addClass("hidden");
            }
        }
        if (indexToShow !== 2) {
            if (!$scope.courseDiv.hasClass("hidden")) {
                $scope.courseDiv.addClass("hidden");
            }
        }
        if (indexToShow !== 3) {
            if (!$scope.courseItemDiv.hasClass("hidden")) {
                $scope.courseItemDiv.addClass("hidden");
            }
        }

        //show indexToShow
        if (indexToShow === 0) {
            if ($scope.subjectDiv.hasClass("hidden")) {
                $scope.subjectDiv.removeClass("hidden");
            }
            //hide all nav bar items after home
            if (!$scope.subjectNav.hasClass("hidden")) {
                $scope.subjectNav.addClass("hidden");
            }
            if (!$scope.focusNav.hasClass("hidden")) {
                $scope.focusNav.addClass("hidden");
            }
            if (!$scope.courseNav.hasClass("hidden")) {
                $scope.courseNav.addClass("hidden");
            }
        } else if (indexToShow === 1) {
            if ($scope.focusDiv.hasClass("hidden")) {
                $scope.focusDiv.removeClass("hidden");
            }
            //show/style subject nav bar item
            if ($scope.subjectNav.hasClass("hidden")) {
                $scope.subjectNav.removeClass("hidden");
                $scope.subjectNav.find(".navBtn").html(navItem.name);

                //have to compile element to get ng-click to work when added in with jquery
                $scope.subjectNav.attr('ng-click','showSubject('+ navItem.id +', "'+ navItem.name +'")');
                $compile($scope.subjectNav)($scope);
            }
            if (!$scope.focusNav.hasClass("hidden")) {
                $scope.focusNav.addClass("hidden");
            }
            if (!$scope.courseNav.hasClass("hidden")) {
                $scope.courseNav.addClass("hidden");
            }

        } else if (indexToShow === 2) {
            if ($scope.courseDiv.hasClass("hidden")) {
                $scope.courseDiv.removeClass("hidden");
            }
            if ($scope.focusNav.hasClass("hidden")) {
                $scope.focusNav.removeClass("hidden");
                $scope.focusNav.find(".navBtn").html(navItem.name);

                $scope.focusNav.attr('ng-click','showFocus('+ navItem.id +', "'+ navItem.name +'")');
                $compile($scope.focusNav)($scope);
            }
            if (!$scope.courseNav.hasClass("hidden")) {
                $scope.courseNav.addClass("hidden");
            }

        } else if (indexToShow === 3) {
            if ($scope.courseItemDiv.hasClass("hidden")) {
                $scope.courseItemDiv.removeClass("hidden");
            }

            if ($scope.courseNav.hasClass("hidden")) {
                $scope.courseNav.removeClass("hidden");
                $scope.courseNav.find(".navBtn").html(navItem.name);

                $scope.courseNav.attr('ng-click','showCourse('+ navItem.id +', "'+ navItem.name +'")');
                $compile($scope.courseNav)($scope);
            }
        }
    }
});