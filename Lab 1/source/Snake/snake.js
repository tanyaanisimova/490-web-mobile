angular.module('Snake', [])
    .controller('Ctrl', function ($scope) {
        $scope.size = 6;
        $scope.bestScore = 0;
        $scope.score = 0;
        $scope.body = [];
        $scope.direction = 0;

        $scope.newTarget = function () {
            $scope.target = getBox()
        };

        $scope.getBox = function () {
            return {x: Math.random() * $scope.size, y: Math.random() * $scope.size};
        };

        $scope.updateScore = function () {
            if ($scope.score > $scope.bestScore) {
                $scope.bestScore = $scope.score
            }
        };

        $scope.newGame = function () {
           $scope.updateScore();
           $scope.score = 0;
           $scope.body = new Array(getBox());
           $scope.target = getBox();
           //start timer
        };
    });
