angular.module('CalculatorApp', [])
    .controller('CalculatorController', function ($scope) {

        $scope.updateDisplay = function (button, isOperator) {
            const display = $("#displayScreen");
            const input = display.text();

            let inputArray = [];
            let first, second;

            if (input.includes("/")) {
                inputArray = input.split("/");
                if (inputArray.length === 2 && inputArray[1] !== "") { // if last is empty means string ends with operator
                    if (isOperator) {
                        first = parseFloat(inputArray[0]);
                        second = parseFloat(inputArray[1]);
                        const answer = "" + (first / second);
                        if (button !== "=") {
                            display.text(answer + "" + button);
                        } else {
                            display.text(answer + "");
                        }
                    } else {
                        display.text(input + "" + button);
                    }

                } else if (isOperator) {
                    this.clearDisplay();

                } else {
                    display.text(input + "" + button);
                }

            } else if (input.includes("*")) {
                inputArray = input.split("*");
                if (inputArray.length === 2  && inputArray[1] !== "") {
                    if (isOperator) {
                        first = parseFloat(inputArray[0]);
                        second = parseFloat(inputArray[1]);
                        const answer = "" + (first * second);
                        if (button !== "=") {
                            display.text(answer + "" + button);
                        } else {
                            display.text(answer + "");
                        }

                    } else {
                        display.text(input + "" + button);
                    }

                } else if (isOperator) {
                    this.clearDisplay();

                } else {
                    display.text(input + "" + button);
                }

            } else if (input.includes("+")) {
                inputArray = input.split("+");
                if (inputArray.length === 2 && inputArray[1] !== "") {
                    if (isOperator) {
                        first = parseFloat(inputArray[0]);
                        second = parseFloat(inputArray[1]);
                        const answer = "" + (first + second);
                        if (button !== "=") {
                            display.text(answer + "" + button);
                        } else {
                            display.text(answer + "");
                        }

                    } else {
                        display.text(input + "" + button);
                    }

                } else if (isOperator) {
                    this.clearDisplay();

                } else {
                    display.text(input + "" + button);
                }

            } else if (input.includes("-")) {
                inputArray = input.split("-");
                if (inputArray.length === 2 && inputArray[1] !== "") {
                    if (isOperator) {
                        first = parseFloat(inputArray[0]);
                        second = parseFloat(inputArray[1]);
                        const answer = "" + (first - second);
                        if (button !== "=") {
                            display.text(answer + "" + button);
                        } else {
                            display.text(answer + "");
                        }

                    } else {
                        display.text(input + "" + button);
                    }

                } else if (isOperator) {
                    this.clearDisplay();

                } else {
                    display.text(input + "" + button);
                }

            } else {
                if (input === "0" && !isOperator) {
                    display.text("" + button); //removes leading zero from number
                } else {
                    if (button !== "=") {
                        display.text(input + "" + button);
                    } else {
                        display.text(input + "");
                    }
                }
            }
        };

        $scope.clearDisplay = function () {
            // this.displayScreen = "";
            $("#displayScreen").text("0");
        }
    });

    //tried to make to make ng-model work on a span with a custom directive,
    // but it would not pick up the new value when added with js so just used jquery to grab and set text in display