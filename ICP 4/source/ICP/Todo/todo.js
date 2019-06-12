const angularTodo = angular.module('angularTodo', []);

angularTodo.controller('angularTodoCtrl', ['$scope', function ($scope, game) {
    $scope.game = game;
    // define list of items
    $scope.items = ["Do Laundry", "Wash dishes", "Dust", "Vacuum"];

    // Write code to push new item
    $scope.submitNewItem = function () {
        const newItem = this.newItem.trim();
        if (newItem !== "" && this.items.indexOf(newItem) === -1) {
            $scope.items.push(newItem);
        }
    };

    // Write code to complete item
    $scope.completeItem = function (index) {
        const id = "#item" + index;
        $(id).addClass("completed");
        $(id + " .todo-list-item__complete").remove();

        // doesn't work -> had to use hidden class
        // $(id).append("<div class='todo-list-item__trash' ng-click='deleteItem(1)'>Trash</div>");
        // const newDiv = "<div class='todo-list-item__trash' ng-click='deleteItem("+index+")'>Trash</div>";
        // $(id).append($compile(newDiv)(scope));
        // scope.apply();

        $(id + " .todo-list-item__trash").removeClass("hidden");
    };


    // Write code to delete item
    $scope.deleteItem = function (index) {
        $scope.items.splice((parseInt(index) - 1), 1);
        const id = "#item" + index;
        $(id).remove();
    };
}]);