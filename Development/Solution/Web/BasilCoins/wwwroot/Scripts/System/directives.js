(function () {


    var baseUrl = "/Templates/",
        wcOverlayDirective = function (q, t, w, httpInterceptor, $c) {
            return {
                restrict: 'EA',
                transclude: true,
                s: {
                    wcOverlayDelay: "@"
                },
                templateUrl: baseUrl + 'overlayLoading.tmpl.html',
                link: function (s, element, A) {
                    $c('BaseController', { $scope: s });
                    var overlayContainer = null,
                        timerPromise = null,
                        timerPromiseHide = null,
                        inSession = false,
                        ngRepeatFinished = true,
                        queue = [];

                    init();

                    function init() {
                        wireUpHttpInterceptor();
                        overlayContainer = document.getElementById('overlay-container');
                    }
                    function wireUpHttpInterceptor() {

                        httpInterceptor.request = function (config) {
                            if (config.disableInterceptor == undefined || config.disableInterceptor == false) processRequest();
                            return config || q.when(config);
                        };

                        httpInterceptor.response = function (response) {
                            processResponse();
                            return response || q.when(response);
                        };

                        httpInterceptor.responseError = function (rejection) {
                            processResponse();
                            //s.SetSystemStatus("Error occurred. Contact system administrator.", 'error');
                            return rejection || q.when(rejection);
                        };
                    }
                    function wirejQueryInterceptor() {

                        $(document).ajaxStart(function () {
                            processRequest();
                        });

                        $(document).ajaxComplete(function () {
                            processResponse();
                        });

                        $(document).ajaxError(function () {
                            processResponse();
                        });

                        var $mylist = $("body");
                        $mylist.livequery('iframe', function (elem) {
                            processRequest();
                            $('iframe').ready(function (e) {
                                processResponse();
                            });
                        });

                    }

                    function processRequest() {
                        queue.push({});
                        //showOverlay();
                        if (queue.length == 1) {
                            timerPromise = t(function () {
                                if (queue.length) showOverlay();
                            }, s.wcOverlayDelay ? s.wcOverlayDelay : 300); //Delay showing for 300 millis to avoid flicker
                        }
                    }

                    function processResponse() {
                        queue.pop();
                        if (queue.length == 0) {
                            timerPromiseHide = t(function () {
                                if (queue.length == 0) {
                                    hideOverlay();
                                    if (timerPromiseHide) t.cancel(timerPromiseHide);
                                }
                            }, s.wcOverlayDelay ? s.wcOverlayDelay : 300);
                        }
                    }

                    function showOverlay() {
                        var W = 0;
                        var h = 0;
                        if (!w.innerWidth) {
                            if (!(document.documentElement.clientWidth == 0)) {
                                W = document.documentElement.clientWidth;
                                h = document.documentElement.clientHeight;
                            }
                            else {
                                W = document.body.clientWidth;
                                h = document.body.clientHeight;
                            }
                        }
                        else {
                            W = w.innerWidth;
                            h = w.innerHeight;
                        }
                        overlayContainer.style.display = 'block';
                    }

                    function hideOverlay() {
                        if (timerPromise) t.cancel(timerPromise);
                        overlayContainer.style.display = 'none';
                    }

                    var getComputedStyle = function () {
                        var func = null;
                        if (document.defaultView && document.defaultView.getComputedStyle) {
                            func = document.defaultView.getComputedStyle;
                        } else if (typeof (document.body.currentStyle) !== "undefined") {
                            func = function (element, anything) {
                                return element["currentStyle"];
                            };
                        }

                        return function (element, style) {
                            return func(element, null)[style];
                        }
                    }();
                }
            }
        },
        httpProvider = function ($httpProvider) {
            $httpProvider.interceptors.push('httpInterceptor');
        },
        httpInterceptor = function () {
            return {}
        },
        authHttpResponseInterceptor = function ($q, $location, t, $injector, $rs) {
            return {
                response: function (response) {
                    if (response.status === 401) {
                        console.log(response);
                    }
                    return response || $q.when(response);
                },
                responseError: function (rejection) {
                    if (rejection.status === 401) {
                        console.log(rejection);
                    }
                    if (rejection.status === 404) {
                        if (rejection.config.method == 'POST') {
                            var url = rejection.config.url.split("/");
                            rejection.data = "Method " + url[url.length - 1] + " not found.", "error";
                        } else {
                            rejection.data = "Page not found.";
                        }
                    } else if (rejection.status === 500) {
                        if (rejection.config.method == 'POST') {
                            var url = rejection.config.url.split("/");
                            rejection.data = "Internal server error on " + url[url.length - 1] + ".";
                        } else {
                            rejection.data = "Internal server error.";
                        }
                    }
                    return $q.reject(rejection.data);
                }
            }
        }, httpAuthProvider = function ($httpProvider) {
            $httpProvider.interceptors.push('authHttpResponseInterceptor');
        }

    //loadImage = function ($q, $c, $rs) {

    //    return {
    //        restrict: 'A',
    //        scope: { imageFile: '=' },
    //        link: function (s, e) {
    //            $c('MainController', { $scope: s });
    //            s.$watch('$root.StorageURL', function (fe) {
    //                s.$watch('imageFile', function (fileName) {
    //                    if (fileName != null && fe != null) e[0].src = fe + fileName;
    //                    else e[0].src = 'data:image/jpeg;base64,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A/gAAAAAAHAAAP////////////////////////////8D6AAAAAD/////////////////////////////A+gAAAAA/////////////////////////////wPoAAAAAP////////////////////////////8D6AAAOEJJTQQIAAAAAAAQAAAAAQAAAkAAAAJAAAAAADhCSU0EHgAAAAAABAAAAAA4QklNBBoAAAAAA1sAAAAGAAAAAAAAAAAAAACWAAAA+gAAABMAbQBhAHgAXwBsAG8AZwBvAF8AaABpAC0AcgBlAHMALQBtAGkAbgAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAA+gAAAJYAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAQAAAAAAAG51bGwAAAACAAAABmJvdW5kc09iamMAAAABAAAAAAAAUmN0MQAAAAQAAAAAVG9wIGxvbmcAAAAAAAAAAExlZnRsb25nAAAAAAAAAABCdG9tbG9uZwAAAJYAAAAAUmdodGxvbmcAAAD6AAAABnNsaWNlc1ZsTHMAAAABT2JqYwAAAAEAAAAAAAVzbGljZQAAABIAAAAHc2xpY2VJRGxvbmcAAAAAAAAAB2dyb3VwSURsb25nAAAAAAAAAAZvcmlnaW5lbnVtAAAADEVTbGljZU9yaWdpbgAAAA1hdXRvR2VuZXJhdGVkAAAAAFR5cGVlbnVtAAAACkVTbGljZVR5cGUAAAAASW1nIAAAAAZib3VuZHNPYmpjAAAAAQAAAAAAAFJjdDEAAAAEAAAAAFRvcCBsb25nAAAAAAAAAABMZWZ0bG9uZwAAAAAAAAAAQnRvbWxvbmcAAACWAAAAAFJnaHRsb25nAAAA+gAAAAN1cmxURVhUAAAAAQAAAAAAAG51bGxURVhUAAAAAQAAAAAAAE1zZ2VURVhUAAAAAQAAAAAABmFsdFRhZ1RFWFQAAAABAAAAAAAOY2VsbFRleHRJc0hUTUxib29sAQAAAAhjZWxsVGV4dFRFWFQAAAABAAAAAAAJaG9yekFsaWduZW51bQAAAA9FU2xpY2VIb3J6QWxpZ24AAAAHZGVmYXVsdAAAAAl2ZXJ0QWxpZ25lbnVtAAAAD0VTbGljZVZlcnRBbGlnbgAAAAdkZWZhdWx0AAAA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cmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOmM4ZmMxYTQzLWQ0ZmQtMTFlOS05OGFiLWNhYjA4Yjc2ZDNjNCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDplOGE1ZTFhMi0wZTcyLWM2NDctOGNmNi0xY2NmMzY5OTAxZjEiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0iMTM1RTFBRTI4Qzc2RDcyMjE5MjdGMEM5NjNFQ0RBRjEiIGRjOmZvcm1hdD0iaW1hZ2UvanBlZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgeG1wOkNyZWF0ZURhdGU9IjIwMTktMDktMTBUMTE6Mjc6MTQrMDg6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDE5LTA5LTEyVDA5OjM3KzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE5LTA5LTEyVDA5OjM3KzA4OjAwIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6N2U2MDdkNWQtMzc5Zi0zYzQ1LWE1MTItYTUxMjIzY2YyNjFmIiBzdEV2dDp3aGVuPSIyMDE5LTA5LTEyVDA5OjM3KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmU4YTVlMWEyLTBlNzItYzY0Ny04Y2Y2LTFjY2YzNjk5MDFmMSIgc3RFdnQ6d2hlbj0iMjAxOS0wOS0xMlQwOTozNyswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8P3hwYWNrZXQgZW5kPSJ3Ij8+/+4AIUFkb2JlAGRAAAAAAQMAEAMCAwYAAAAAAAAAAAAAAAD/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQECAgICAgICAgICAgMDAwMDAwMDAwMBAQEBAQEBAQEBAQICAQICAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDA//CABEIAJYA+gMBEQACEQEDEQH/xAC2AAEAAQUBAQEBAAAAAAAAAAADBAACBQYIBwkBCgEBAAAAAAAAAAAAAAAAAAAAABAAAAYBBAMAAgEEAwAAAAAAAgMEBQYHAQAQMTIgEQghEhWQIhMWFBcYEQABAwIDBAcGAwUBDAsAAAABAgMEEQUAIQYxgRITEEFRscEiFCBhcTIVB5FCI/ChUjMk4dHxYnKCorJDNEQWF1Nzg6OzlKQlNUVVEgEA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';

    //                })
    //            }, true)

    //        }
    //    }

    //}


    cookieConsent = function ($cookies) {
        return {
            restrict: 'EA',
            scope: {},
            template:
                '<div style="position: relative; z-index: 1000">' +
                '<div style="background: #ccc; position: fixed; bottom: 0; left: 0; right: 0" ng-hide="consent()">' +
                ' <a href="" ng-click="consent(true)">I\'m cookie consent</a>' +
                '</div>' +
                '</div>',
            controller: function ($scope) {
                var _consent = $cookies.get('consent');
                $scope.consent = function (consent) {
                    if (consent === undefined) {
                        return _consent;
                    } else if (consent) {
                        $cookies.put('consent', true);
                        _consent = true;
                    }
                };
            }
        };

    }


    angular.module('app')

    .factory('httpInterceptor', httpInterceptor)
    .config(['$httpProvider', httpProvider])
    .directive('wcOverlay', ['$q', '$timeout', '$window', 'httpInterceptor', '$controller', wcOverlayDirective])
    //app.directive('loadImage', ['$q', '$controller', '$rootScope', loadImage])

    .directive("limitTo", [function () {
        return {
            restrict: "A",
            link: function (scope, elem, attrs) {
                var limit = parseInt(attrs.limitTo);
                angular.element(elem).on("keypress", function (e) {
                    if (this.value.length == limit) e.preventDefault();
                });
            }
        }
    }])

    .directive("elemLoad", [function () {
        return {
            restrict: "A",
            require: "?repeatHolder",
            scope: {
                interval: '=getInterval',
                animation: '=getAnimation'
            },
            link: function (scope, element, attrs, ctrl) {
                element.addClass(scope.animation + ' animated');
                element.css('animation-delay', scope.interval + 's');
            }
        };
    }])

    .directive('format', ['$filter', function ($filter) {
        return {
            require: '?ngModel',
            link: function (scope, elem, attrs, ctrl) {
                if (!ctrl) return;

                ctrl.$formatters.unshift(function (a) {
                    return $filter(attrs.format)(ctrl.$modelValue, 'P')
                });

                elem.bind('blur', function (event) {
                    var plainNumber = elem.val().replace(/[^\d|\-+|\.+]/g, '');

                    elem.val($filter(attrs.format)(plainNumber, 'P'));

                    //if (!/^[0-9]*$/gm.test(elem.val())) {
                    //    elem.val($filter(attrs.format)(plainNumber, 'P'));
                    //} else {
                    //    elem.val($filter(attrs.format)(elem.val(), 'P'));
                    //}


                });
            }
        };
    }])


    .factory('authHttpResponseInterceptor', ['$q', '$location', '$timeout', '$injector', '$rootScope', authHttpResponseInterceptor])
    .config(['$httpProvider', httpAuthProvider])

    .filter('trusted', ['$sce', function ($sce) {
        return function (url) {
            return $sce.trustAsResourceUrl(url);
        };
    }]);


}());




//(function () {


//    var baseUrl = "/Templates/",
//        wcOverlayDirective = function (q, t, w, httpInterceptor, $c) {
//            return {
//                restrict: 'EA',
//                transclude: true,
//                s: {
//                    wcOverlayDelay: "@"
//                },
//                templateUrl: baseUrl + 'overlayLoading.tmpl.html',
//                link: function (s, element, A) {
//                    $c('BaseController', { $scope: s });
//                    var overlayContainer = null,
//                        timerPromise = null,
//                        timerPromiseHide = null,
//                        inSession = false,
//                        ngRepeatFinished = true,
//                        queue = [];

//                    init();

//                    function init() {
//                        wireUpHttpInterceptor();
//                        overlayContainer = document.getElementById('overlay-container');
//                    }
//                    function wireUpHttpInterceptor() {

//                        httpInterceptor.request = function (config) {
//                            if (config.disableInterceptor == undefined || config.disableInterceptor == false) processRequest();
//                            return config || q.when(config);
//                        };

//                        httpInterceptor.response = function (response) {
//                            processResponse();
//                            return response || q.when(response);
//                        };

//                        httpInterceptor.responseError = function (rejection) {
//                            processResponse();
//                            //s.SetSystemStatus("Error occurred. Contact system administrator.", 'error');
//                            return rejection || q.when(rejection);
//                        };
//                    }
//                    function wirejQueryInterceptor() {

//                        $(document).ajaxStart(function () {
//                            processRequest();
//                        });

//                        $(document).ajaxComplete(function () {
//                            processResponse();
//                        });

//                        $(document).ajaxError(function () {
//                            processResponse();
//                        });

//                        var $mylist = $("body");
//                        $mylist.livequery('iframe', function (elem) {
//                            processRequest();
//                            $('iframe').ready(function (e) {
//                                processResponse();
//                            });
//                        });

//                    }

//                    function processRequest() {
//                        queue.push({});
//                        //showOverlay();
//                        if (queue.length == 1) {
//                            timerPromise = t(function () {
//                                if (queue.length) showOverlay();
//                            }, s.wcOverlayDelay ? s.wcOverlayDelay : 300); //Delay showing for 300 millis to avoid flicker
//                        }
//                    }

//                    function processResponse() {
//                        queue.pop();
//                        if (queue.length == 0) {
//                            timerPromiseHide = t(function () {
//                                if (queue.length == 0) {
//                                    hideOverlay();
//                                    if (timerPromiseHide) t.cancel(timerPromiseHide);
//                                }
//                            }, s.wcOverlayDelay ? s.wcOverlayDelay : 300);
//                        }
//                    }

//                    function showOverlay() {
//                        var W = 0;
//                        var h = 0;
//                        if (!w.innerWidth) {
//                            if (!(document.documentElement.clientWidth == 0)) {
//                                W = document.documentElement.clientWidth;
//                                h = document.documentElement.clientHeight;
//                            }
//                            else {
//                                W = document.body.clientWidth;
//                                h = document.body.clientHeight;
//                            }
//                        }
//                        else {
//                            W = w.innerWidth;
//                            h = w.innerHeight;
//                        }
//                        overlayContainer.style.display = 'block';
//                    }

//                    function hideOverlay() {
//                        if (timerPromise) t.cancel(timerPromise);
//                        overlayContainer.style.display = 'none';
//                    }

//                    var getComputedStyle = function () {
//                        var func = null;
//                        if (document.defaultView && document.defaultView.getComputedStyle) {
//                            func = document.defaultView.getComputedStyle;
//                        } else if (typeof (document.body.currentStyle) !== "undefined") {
//                            func = function (element, anything) {
//                                return element["currentStyle"];
//                            };
//                        }

//                        return function (element, style) {
//                            return func(element, null)[style];
//                        }
//                    }();
//                }
//            }
//        },
//        httpProvider = function ($httpProvider) {
//            $httpProvider.interceptors.push('httpInterceptor');
//        },
//        httpInterceptor = function () {
//            return {}
//        },
//        authHttpResponseInterceptor = function ($q, $location, t, $injector, $rs) {
//            return {
//                response: function (response) {
//                    if (response.status === 401) {
//                        console.log(response);
//                    }
//                    return response || $q.when(response);
//                },
//                responseError: function (rejection) {
//                    if (rejection.status === 401) {
//                        console.log(rejection);
//                    }
//                    if (rejection.status === 404) {
//                        if (rejection.config.method == 'POST') {
//                            var url = rejection.config.url.split("/");
//                            rejection.data = "Method " + url[url.length - 1] + " not found.", "error";
//                        } else {
//                            rejection.data = "Page not found.";
//                        }
//                    } else if (rejection.status === 500) {
//                        if (rejection.config.method == 'POST') {
//                            var url = rejection.config.url.split("/");
//                            rejection.data = "Internal server error on " + url[url.length - 1] + ".";
//                        } else {
//                            rejection.data = "Internal server error.";
//                        }
//                    }
//                    return $q.reject(rejection.data);
//                }
//            }
//        }, httpAuthProvider = function ($httpProvider) {
//            $httpProvider.interceptors.push('authHttpResponseInterceptor');
//        }

//    //loadImage = function ($q, $c, $rs) {

//    //    return {
//    //        restrict: 'A',
//    //        scope: { imageFile: '=' },
//    //        link: function (s, e) {
//    //            $c('MainController', { $scope: s });
//    //            s.$watch('$root.StorageURL', function (fe) {
//    //                s.$watch('imageFile', function (fileName) {
//    //                    if (fileName != null && fe != null) e[0].src = fe + fileName;
//    //                    else e[0].src = 'data:image/jpeg;base64,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A/gAAAAAAHAAAP////////////////////////////8D6AAAAAD/////////////////////////////A+gAAAAA/////////////////////////////wPoAAAAAP////////////////////////////8D6AAAOEJJTQQIAAAAAAAQAAAAAQAAAkAAAAJAAAAAADhCSU0EHgAAAAAABAAAAAA4QklNBBoAAAAAA1sAAAAGAAAAAAAAAAAAAACWAAAA+gAAABMAbQBhAHgAXwBsAG8AZwBvAF8AaABpAC0AcgBlAHMALQBtAGkAbgAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAA+gAAAJYAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAQAAAAAAAG51bGwAAAACAAAABmJvdW5kc09iamMAAAABAAAAAAAAUmN0MQAAAAQAAAAAVG9wIGxvbmcAAAAAAAAAAExlZnRsb25nAAAAAAAAAABCdG9tbG9uZwAAAJYAAAAAUmdodGxvbmcAAAD6AAAABnNsaWNlc1ZsTHMAAAABT2JqYwAAAAEAAAAAAAVzbGljZQAAABIAAAAHc2xpY2VJRGxvbmcAAAAAAAAAB2dyb3VwSURsb25nAAAAAAAAAAZvcmlnaW5lbnVtAAAADEVTbGljZU9yaWdpbgAAAA1hdXRvR2VuZXJhdGVkAAAAAFR5cGVlbnVtAAAACkVTbGljZVR5cGUAAAAASW1nIAAAAAZib3VuZHNPYmpjAAAAAQAAAAAAAFJjdDEAAAAEAAAAAFRvcCBsb25nAAAAAAAAAABMZWZ0bG9uZwAAAAAAAAAAQnRvbWxvbmcAAACWAAAAAFJnaHRsb25nAAAA+gAAAAN1cmxURVhUAAAAAQAAAAAAAG51bGxURVhUAAAAAQAAAAAAAE1zZ2VURVhUAAAAAQAAAAAABmFsdFRhZ1RFWFQAAAABAAAAAAAOY2VsbFRleHRJc0hUTUxib29sAQAAAAhjZWxsVGV4dFRFWFQAAAABAAAAAAAJaG9yekFsaWduZW51bQAAAA9FU2xpY2VIb3J6QWxpZ24AAAAHZGVmYXVsdAAAAAl2ZXJ0QWxpZ25lbnVtAAAAD0VTbGljZVZlcnRBbGlnbgAAAAdkZWZhdWx0AAAA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cmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOmM4ZmMxYTQzLWQ0ZmQtMTFlOS05OGFiLWNhYjA4Yjc2ZDNjNCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDplOGE1ZTFhMi0wZTcyLWM2NDctOGNmNi0xY2NmMzY5OTAxZjEiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0iMTM1RTFBRTI4Qzc2RDcyMjE5MjdGMEM5NjNFQ0RBRjEiIGRjOmZvcm1hdD0iaW1hZ2UvanBlZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgeG1wOkNyZWF0ZURhdGU9IjIwMTktMDktMTBUMTE6Mjc6MTQrMDg6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDE5LTA5LTEyVDA5OjM3KzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE5LTA5LTEyVDA5OjM3KzA4OjAwIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6N2U2MDdkNWQtMzc5Zi0zYzQ1LWE1MTItYTUxMjIzY2YyNjFmIiBzdEV2dDp3aGVuPSIyMDE5LTA5LTEyVDA5OjM3KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmU4YTVlMWEyLTBlNzItYzY0Ny04Y2Y2LTFjY2YzNjk5MDFmMSIgc3RFdnQ6d2hlbj0iMjAxOS0wOS0xMlQwOTozNyswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8P3hwYWNrZXQgZW5kPSJ3Ij8+/+4AIUFkb2JlAGRAAAAAAQMAEAMCAwYAAAAAAAAAAAAAAAD/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQECAgICAgICAgICAgMDAwMDAwMDAwMBAQEBAQEBAQEBAQICAQICAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDA//CABEIAJYA+gMBEQACEQEDEQH/xAC2AAEAAQUBAQEBAAAAAAAAAAADBAACBQYIBwkBCgEBAAAAAAAAAAAAAAAAAAAAABAAAAYBBAMAAgEEAwAAAAAAAgMEBQYHAQAQMTIgEQghEhWQIhMWFBcYEQABAwIDBAcGAwUBDAsAAAABAgMEEQUAIQYxgRITEEFRscEiFCBhcTIVB5FCI/ChUjMk4dHxYnKCorJDNEQWF1Nzg6OzlKQlNUVVEgEA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';

//    //                })
//    //            }, true)

//    //        }
//    //    }

//    //}


//    cookieConsent = function ($cookies) {
//        return {
//            restrict: 'EA',
//            scope: {},
//            template:
//                '<div style="position: relative; z-index: 1000">' +
//                '<div style="background: #ccc; position: fixed; bottom: 0; left: 0; right: 0" ng-hide="consent()">' +
//                ' <a href="" ng-click="consent(true)">I\'m cookie consent</a>' +
//                '</div>' +
//                '</div>',
//            controller: function ($scope) {
//                var _consent = $cookies.get('consent');
//                $scope.consent = function (consent) {
//                    if (consent === undefined) {
//                        return _consent;
//                    } else if (consent) {
//                        $cookies.put('consent', true);
//                        _consent = true;
//                    }
//                };
//            }
//        };

//    }



//    define(['app'], function (app) {
//        app.factory('httpInterceptor', httpInterceptor);
//        app.config(['$httpProvider', httpProvider]);
//        app.directive('wcOverlay', ['$q', '$timeout', '$window', 'httpInterceptor', '$controller', wcOverlayDirective]);
//        //app.directive('loadImage', ['$q', '$controller', '$rootScope', loadImage])

//        app.directive("limitTo", [function () {
//            return {
//                restrict: "A",
//                link: function (scope, elem, attrs) {
//                    var limit = parseInt(attrs.limitTo);
//                    angular.element(elem).on("keypress", function (e) {
//                        if (this.value.length == limit) e.preventDefault();
//                    });
//                }
//            }
//        }]);

//        app.directive("elemLoad", [function () {
//            return {
//                restrict: "A",
//                require: "?repeatHolder",
//                scope: {
//                    interval: '=getInterval',
//                    animation: '=getAnimation'
//                },
//                link: function (scope, element, attrs, ctrl) {
//                    element.addClass(scope.animation + ' animated');
//                    element.css('animation-delay', scope.interval + 's');
//                }
//            };
//        }]);

//        app.directive('format', ['$filter', function ($filter) {
//            return {
//                require: '?ngModel',
//                link: function (scope, elem, attrs, ctrl) {
//                    if (!ctrl) return;

//                    ctrl.$formatters.unshift(function (a) {
//                        return $filter(attrs.format)(ctrl.$modelValue, 'P')
//                    });

//                    elem.bind('blur', function (event) {
//                        var plainNumber = elem.val().replace(/[^\d|\-+|\.+]/g, '');

//                        elem.val($filter(attrs.format)(plainNumber, 'P'));

//                        //if (!/^[0-9]*$/gm.test(elem.val())) {
//                        //    elem.val($filter(attrs.format)(plainNumber, 'P'));
//                        //} else {
//                        //    elem.val($filter(attrs.format)(elem.val(), 'P'));
//                        //}


//                    });
//                }
//            };
//        }]);


//        app.factory('authHttpResponseInterceptor', ['$q', '$location', '$timeout', '$injector', '$rootScope', authHttpResponseInterceptor]);
//        app.config(['$httpProvider', httpAuthProvider]);

//        app.filter('trusted', ['$sce', function ($sce) {
//            return function (url) {
//                return $sce.trustAsResourceUrl(url);
//            };
//        }]);


//        //app.directive('cookieConsent', ['$cookies', cookieConsent]);
//    });

//}());
