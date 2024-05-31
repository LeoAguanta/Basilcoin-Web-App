angular.module('app')

.config(["$stateProvider", "$controllerProvider", "$compileProvider", "$provide", "$urlRouterProvider", "$locationProvider", function ($stateProvider, $controllerProvider, $compileProvider, $provide, $urlRouterProvider, $locationProvider) {

    //app.register = {
    //    controller: $controllerProvider.register,
    //    directive: $compileProvider.directive,
    //    factory: $provide.factory,
    //    service: $provide.service
    //}

    //$locationProvider.hashPrefix('');

    var _min = false ? '.min.js' : '.js';

    var v = '/App/Views/';
    var c = '/App/Controllers/';


    var state = [

        {
            Name: 'Main',
            Url: '/Main',
            Template: 'Main.html',
            Controller: 'Main',
        },
        {
            Name: 'Main.Home',
            Url: '/Home',
            Template: 'Home.html',
            Controller: 'Home',
        },
        {
            Name: 'Login',
            Url: '/Login',
            Template: 'Login.html',
            Controller: 'Login',
        },
        {
            Name: 'Main.UniqueDeals',
            Url: '/Unique-Deals',
            Template: 'UniqueDeals.html',
            Controller: 'UniqueDeals',
        },
        {
            Name: 'Main.Categories',
            Url: '/Categories',
            Template: 'Categories.html',
            Controller: 'Categories',
        },
        {
            Name: 'Main.ProductDetail',
            Url: '/ProductDetail/:id',
            Template: 'ProductDetail.html',
            Controller: 'ProductDetail',
        },
        {
            Name: 'Main.CartItems',
            Url: '/CartItems',
            Template: 'CartItems.html',
            Controller: 'CartItems',
        },
        {
            Name: 'Main.CheckOut',
            Url: '/CheckOut',
            Template: 'CheckOut.html',
            Controller: 'CheckOut',
        },
        {
            Name: 'Main.MyOrders',
            Url: '/MyOrders',
            Template: 'MyOrders.html',
            Controller: 'MyOrders',
        },
        {
            Name: 'Main.MyAccount',
            Url: '/MyAccount',
            Template: 'MyAccount.html',
            Controller: 'MyAccount',
        }
    ];

    function loader(q, R, dependency) {
        var def = q.defer();
        require(dependency, function () {
            def.resolve();
        });
        return def.promise;
    }

    function initState(state) {

        Enumerable.From(state).ForEach(function (s) {

            $stateProvider.state({
                name: s.Name,
                url: s.Url,
                templateUrl: v + s.Template,
                controller: s.Controller,
                resolve: {
                    //load: ['$q', '$rootScope', function (q, R) {
                    //    return loader(q, R, [c + s.Controller + _min]);
                    //}]
                }

            });

        })


    }

    $urlRouterProvider.otherwise('Main/Home');

    initState(state);

}])

.run(['$rootScope', 'services', '$state','$controller', function ($rs, $ss, $st,$c) {
    $c('BaseController', { $scope: $rs });
    $rs.CurrentState = null;
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

    $(window).scroll(function (event) {
        var st = $(this).scrollTop();
        if (st > 50 && $rs.CurrentState == 'Main.Home') {
            $('.main-header').addClass('scrolled-down');
            $('.mhl-menu-container').addClass('scrolled-down');
        }
        else {
            $('.main-header').removeClass('scrolled-down');
            $('.mhl-menu-container').removeClass('scrolled-down');
        }
    });

    $rs.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {
        $rs.CurrentState = toState.name;
        $(window).scrollTop(0);
    });

    var basils = document.querySelector("bailscoins");
    var auth = basils.innerHTML.trim();

    $ss.SetEncryption(auth);

    basils.parentNode.removeChild(basils);
    
    
    //if ('serviceWorker' in navigator) {

    //    try {
    //        navigator.serviceWorker.register('../../basils-sw.js').then(function (r) {

    //            console.log('SW registered!', r);

    //        });

    //    } catch (error) {
    //        console.log('SW not loaded!');
    //    }
    //}
    

    if ('serviceWorker' in navigator) {
        // register service worker file
        navigator.serviceWorker.register('../../basils-sw.js')
            .then(reg => {
                console.log('SW registered!');
                reg.onupdatefound = () => {

                    const installingWorker = reg.installing;

                    installingWorker.onstatechange = () => {

                        switch (installingWorker.state) {
                            case 'installed':
                                if (navigator.serviceWorker.controller) {

                                    console.log('new update...');
                                    // new update available
                                    //installingWorker.postMessage({ action: 'skipWaiting' });
                                }
                                break;
                        }
                    };
                };
            })
            .catch(err => console.error('[SW ERROR]', err));
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



//(function () {
//    'use strict'


//    define(['app'], function (app) {

//        app.config(["$stateProvider", "$controllerProvider", "$compileProvider", "$provide", "$urlRouterProvider","$locationProvider",function ($stateProvider, $controllerProvider, $compileProvider, $provide, $urlRouterProvider, $locationProvider) {

//            app.register = {
//                controller: $controllerProvider.register,
//                directive: $compileProvider.directive,
//                factory: $provide.factory,
//                service: $provide.service
//            }

//            //$locationProvider.hashPrefix('');
            
//            var _min = false ? '.min.js' : '.js';

//            var v = '/App/Views/';
//            var c = '/App/Controllers/';


//            var state = [

//                {
//                    Name: 'Main',
//                    Url: '/Main',
//                    Template: 'Main.html',
//                    Controller: 'Main',
//                },
//                {
//                    Name: 'Main.Home',
//                    Url: '/Home',
//                    Template: 'Home.html',
//                    Controller: 'Home',
//                },
//                {
//                    Name: 'Login',
//                    Url: '/Login',
//                    Template: 'Login.html',
//                    Controller: 'Login',
//                },
//                {
//                    Name: 'Main.UniqueDeals',
//                    Url: '/Unique-Deals',
//                    Template: 'UniqueDeals.html',
//                    Controller: 'UniqueDeals',
//                },
//                {
//                    Name: 'Main.ProductDetail',
//                    Url: '/ProductDetail/:id',
//                    Template: 'ProductDetail.html',
//                    Controller: 'ProductDetail',
//                }
//            ];

//            function loader(q, R, dependency) {
//                var def = q.defer();
//                require(dependency, function () {
//                    def.resolve();
//                });
//                return def.promise;
//            }
        
//            function initState(state) {
                
//                Enumerable.From(state).ForEach(function (s) {

//                    $stateProvider.state({
//                        name: s.Name,
//                        url: s.Url,
//                        templateUrl: v + s.Template,
//                        controller: s.Controller,
//                        resolve: {
//                            load: ['$q', '$rootScope', function (q, R) {
//                                return loader(q, R, [c + s.Controller + _min]);
//                            }]
//                        }

//                    });

//                })
                
                
//            }
           
//            $urlRouterProvider.otherwise('Main/Home');

//            initState(state);

//        }]);
        
//        app.run(['$rootScope', 'services','$state', function ($rs,$ss, $st) {

//            $rs.CurrentState = false;
//            $rs.ShowCart = false;
//            $rs.CartCount = 0;
//            $rs.IsPackagesTab = false;
//            $rs.IsWidthMD = false;
//            $rs.isIOS = false;

//            var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
//            var iOS_s = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);

//            if (iOS == true || iOS_s == true) {
//                $rs.isIOS = true;
//            } else {
//                $rs.isIOS = false;
//            }



//            var maxs = document.querySelector("bailscoins");
//            var auth = maxs.innerHTML.trim();

//            $ss.SetEncryption(auth);



//            //$urlRouterProviderRef.otherwise('/Home/Dashboard');


//            //var browser_width = $(window).width();
//            //if (browser_width < 768) {
//            //    $rs.IsWidthMD = true;
//            //} else {
//            //    $rs.IsWidthMD = false;
//            //}
//            //$(window).resize(function () {
//            //    browser_width = $(window).width();
//            //    if (browser_width < 768) {
//            //        $rs.IsWidthMD = true;
//            //    } else {
//            //        $rs.IsWidthMD = false;
//            //    }
//            //    $rs.$apply();
//            //});

//            //$rs.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {

//            //});

//            //$rs.connection = new signalR.HubConnectionBuilder().withUrl("/signalr").build();
//            //$rs.connection.start().catch(function (error) { });
//        }]);

//    });

//}());
