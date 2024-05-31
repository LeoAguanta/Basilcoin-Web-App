angular.module('app')

.controller('BaseController', ['$scope', '$rootScope', '$uibModal', 'services', '$state', '$sce', function ($s, $rs, $uibModal, $sv, $st, $sce) {

    $s.request = function (method, param, interceptor) {

        return $sv.Post(method, param, interceptor).fail(function (e) { console.error('Error-Request:', e); });
    };

    $s.GETRequest = function (method, param, interceptor) {

        return $sv.Get(method, param, interceptor).fail(function (e) { console.error('Error-Request:', e); });
    };

    $s.Dialog = (function (opt) {
        return $uibModal.open({
            animation: true,
            templateUrl: opt.templateUrl || ('/Dialogs/' + opt.template + '.tmpl.html'),
            controller: opt.controller,
            size: opt.size || 'lg',
            appendTo: angular.element(document.body),
            backdrop: opt.backdrop || false,
            keyboard: false,
            windowClass: 'custom-dialog' + opt.windowClass,
            resolve: opt.resolve || {
                dData: opt.data || null
            }
        });
    });

    $s.SetIcon = (function (str) {
        if (str != undefined) {
            var abbr = "";
            str = str.split(" ");
            for (var i = 0; i < str.length; i++) {
                abbr += str[i].substr(0, 1);
            }

            if (abbr.length > 1) {
                abbr = abbr.substr(0, 2);
            }

            return abbr.toLowerCase();
        }
    });

    $s.Confirm = (function (message, title, icon) {
        var def = new $.Deferred();
        var dd = $s.Dialog({
            controller: ['$scope', 'dData', '$uibModalInstance', function ($s, $data, $d) {

                $s.Message = $data.message;
                $s.Title = $data.title;
                $s.Icon = icon || 'info';
                $s.Cancel = (function () {
                    $d.close(1);
                })

                $s.OK = (function () {
                    $d.close(0);
                })
            }],
            template: 'Confirm',
            size: 'sm',
            windowClass: ' confirm-dlg',
            data: {
                message: message, title: title || document.title
            }
        });
        dd.result.then(function (x) {
            if (x == 0)
                def.resolve(x);
            else {
                def.reject();
            }
        });
        return def.promise();
    });

    $s.Prompt = (function (message, title, icon) {
        var def = new $.Deferred();
        var dd = $s.Dialog({
            controller: ['$scope', 'dData', '$uibModalInstance', function ($s, $data, $d) {

                $s.Message = $data.message;
                $s.Title = $data.title;
                $s.Icon = icon || 'info';
                $s.OK = (function () {
                    $d.close(0);
                })
            }],
            template: 'Prompt',
            size: 'sm',
            windowClass: ' prompt-dlg',
            data: {
                message: message, title: title || document.title
            }
        });
        dd.result.then(function (x) {
            if (x == 0)
                def.resolve(x);
            else {
                def.reject();
            }
        });
        return def.promise();
    });

    $s.formatDate = function (dt) {
        return moment(dt).format('LL');
    }

    $s.trusted = function (src) {
        return $sce.trustAsResourceUrl(src);
    }

    $s.compress = function (string, type) {
        try {
            if (type) {

                return LZString.compressToEncodedURIComponent(JSON.stringify(string));

            } else {
                return JSON.parse(LZString.decompressFromEncodedURIComponent(string));
            }
        } catch (e) {

            return null
        }

    }

    $(document).ready(function () {
        $('<div class="quantity-button quantity-up">' +
            '<i class="fas fa-plus"></i>' +
            '</div>' +
            '<div class="quantity-button quantity-down">' +
            '<i class="fas fa-minus"></i>' +
            '</div>').insertAfter('.quantity input');
        $('.quantity').each(function () {
            var spinner = $(this),
                input = spinner.find('input[type="number"]'),
                btnUp = spinner.find('.quantity-up'),
                btnDown = spinner.find('.quantity-down'),
                min = input.attr('min'),
                max = input.attr('max');

            btnUp.click(function () {
                var oldValue = parseFloat(input.val());
                if (oldValue >= max) {
                    var newVal = oldValue;
                } else {
                    var newVal = oldValue + 1;
                }
                spinner.find("input").val(newVal);
                spinner.find("input").trigger("change");
            });

            btnDown.click(function () {
                var oldValue = parseFloat(input.val());
                if (oldValue <= min) {
                    var newVal = oldValue;
                } else {
                    var newVal = oldValue - 1;
                }
                spinner.find("input").val(newVal);
                spinner.find("input").trigger("change");
            });

        });
    })

}]);




//(function() {
//    'use strict'
//    define(['app'], function (app) {
//        app.controller('BaseController', ['$scope', '$rootScope', '$uibModal', 'services', '$state', '$sce', function ($s, $rs, $uibModal, $sv, $st, $sce) {

//            $s.request = function (method, param, interceptor) {

//                return $sv.Post(method, param, interceptor).fail(function (e) { console.error('Error-Request:', e); });
//            };

//            $s.Dialog = (function (opt) {
//                return $uibModal.open({
//                    animation: true,
//                    templateUrl: opt.templateUrl || ('/Dialogs/' + opt.template + '.tmpl.html'),
//                    controller: opt.controller,
//                    size: opt.size || 'lg',
//                    appendTo: angular.element(document.body),
//                    backdrop: opt.backdrop || false,
//                    keyboard: false,
//                    windowClass: 'custom-dialog' + opt.windowClass,
//                    resolve: opt.resolve || {
//                        dData: opt.data || null
//                    }
//                });
//            });

//            $s.Confirm = (function (message, title) {
//                var def = new $.Deferred();
//                var dd = $s.Dialog({
//                    controller: ['$scope', 'dData', '$uibModalInstance', function ($s, $data, $d) {

//                        $s.Message = $data.message;
//                        $s.Title = $data.title;

//                        $s.Cancel = (function () {
//                            $d.close(1);
//                        })

//                        $s.OK = (function () {
//                            $d.close(0);
//                        })
//                    }],
//                    template: 'Confirm',
//                    size: 'sm',
//                    windowClass: ' confirm-dlg',
//                    data: {
//                        message: message, title: title || document.title
//                    }
//                });
//                dd.result.then(function (x) {
//                    if (x == 0)
//                        def.resolve(x);
//                    else {
//                        def.reject();
//                    }
//                });
//                return def.promise();
//            });

//            $s.Prompt = (function (message, title) {
//                var def = new $.Deferred();
//                var dd = $s.Dialog({
//                    controller: ['$scope', 'dData', '$uibModalInstance', function ($s, $data, $d) {

//                        $s.Message = $data.message;
//                        $s.Title = $data.title;

//                        $s.OK = (function () {
//                            $d.close(0);
//                        })
//                    }],
//                    template: 'Prompt',
//                    size: 'sm',
//                    windowClass: ' prompt-dlg',
//                    data: {
//                        message: message, title: title || document.title
//                    }
//                });
//                dd.result.then(function (x) {
//                    if (x == 0)
//                        def.resolve(x);
//                    else {
//                        def.reject();
//                    }
//                });
//                return def.promise();
//            });

//            $s.formatDate = function (dt) {
//                return moment(dt).format('LL');
//            }

//            $s.trusted = function (src) {
//                return $sce.trustAsResourceUrl(src);
//            }

//            $s.compress = function (string, type) {
//                try {
//                    if (type) {

//                        return LZString.compressToEncodedURIComponent(JSON.stringify(string));

//                    } else {
//                        return JSON.parse(LZString.decompressFromEncodedURIComponent(string));
//                    }
//                } catch (e) {

//                    return null
//                }

//            }



//        }]);
//    });
//}());
