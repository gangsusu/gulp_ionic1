angular.module('controllers', ["ionic"])
	.controller("helloCtrl", function($scope) {
        TTC.doing('search', {'q':'挪威的森林'}, function (data) {
            $scope.data = data.books;
            // console.log($scope.data);
        });
	});
