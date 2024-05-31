(function () {
    'use strict'
    define(['app'], function (app) {

        app.config(["$stateProvider", "$controllerProvider", "$compileProvider", "$provide", "$urlRouterProvider","$locationProvider",function ($stateProvider, $controllerProvider, $compileProvider, $provide, $urlRouterProvider, $locationProvider) {

            app.register = {
                controller: $controllerProvider.register,
                directive: $compileProvider.directive,
                factory: $provide.factory,
                service: $provide.service
            }

            $locationProvider.hashPrefix('');
            
            var _min = false ? '.min.js' : '.js';

            var v = '/App/Views/';
            var c = '/App/Controllers/';


            var states = [];

            function loader(q, R, dependency) {
                var def = q.defer();
                require(dependency, function () {
                    def.resolve();
                });
                return def.promise;
            }
            
            states.push({
                name: 'home',
                url: '/home',
                templateUrl: v + 'home.html',
                controller: 'home',
                resolve: {
                    load: ['$q', '$rootScope', function (q, R) {
                        return loader(q, R, [c + 'home' + _min]);
                    }]
                }
            });

            
            var stateName = "";
            try {
                angular.forEach(states, function (state) {
                    stateName = state.name;
                    $stateProvider.state(state);
                });
            } catch (e) { }

            $urlRouterProvider.otherwise('/home');

        }]);


        app.run(['$rootScope', '$state', function ($rs, $st) {

            $rs.CurrentState = false;
            $rs.ShowCart = false;
            $rs.CartCount = 0;
            $rs.IsPackagesTab = false;
            $rs.IsWidthMD = false;
            $rs.isIOS = false;

            var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
            var iOS_s = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);

            if (iOS == true || iOS_s == true) {
                $rs.isIOS = true;
            } else {
                $rs.isIOS = false;
            }


            //$urlRouterProviderRef.otherwise('/Home/Dashboard');


            //var browser_width = $(window).width();
            //if (browser_width < 768) {
            //    $rs.IsWidthMD = true;
            //} else {
            //    $rs.IsWidthMD = false;
            //}
            //$(window).resize(function () {
            //    browser_width = $(window).width();
            //    if (browser_width < 768) {
            //        $rs.IsWidthMD = true;
            //    } else {
            //        $rs.IsWidthMD = false;
            //    }
            //    $rs.$apply();
            //});

            //$rs.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {

            //});

            //$rs.connection = new signalR.HubConnectionBuilder().withUrl("/signalr").build();
            //$rs.connection.start().catch(function (error) { });
        }]);

    });

}());
