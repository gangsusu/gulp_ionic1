angular.module('myApp', ['ionic', 'controllers', 'ui.router'])
    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

        $ionicConfigProvider.platform.ios.tabs.style('standard');			//自动根据当前平台来调整使用什么样的过渡方式
        $ionicConfigProvider.platform.ios.tabs.position('bottom');
        $ionicConfigProvider.platform.android.tabs.style('standard');
        $ionicConfigProvider.platform.android.tabs.position('standard');
        $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
        $ionicConfigProvider.platform.android.navBar.alignTitle('center');
        $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
        $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');
        $ionicConfigProvider.platform.ios.views.transition('ios');
        $ionicConfigProvider.platform.android.views.transition('android');
        $stateProvider.state('hello', {
            url: '/hello',
            templateUrl: 'dist/templates/hello.html',
            controller: 'helloCtrl'
        });
    });

TTC = {};

TTC.doing = function(action, param,callback) {
    var url = 'https://api.douban.com/v2/book/' +action;
    param = param || {};
    $.ajax({
        type: 'POST',
        url: url,
        async:false,
        cache: false,
        dataType: "text",
        data: param,
        dataType: "json",
        success: function(data) {
            callback(data);
        }
    })
};
angular.module('controllers', ["ionic"])
	.controller("helloCtrl", function($scope) {
        TTC.doing('search', {'q':'挪威的森林'}, function (data) {
            $scope.data = data.books;
            // console.log($scope.data);
        });
	});
