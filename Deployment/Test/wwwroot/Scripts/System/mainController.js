
(function() {
    'use strict'
    define(['app'], function (app) {
        app.controller('mainController', ['$scope', '$rootScope', '$uibModal', 'services', '$state', '$sce', function ($s, $rs, $uibModal, $v, $st, $sce) {
                       
            $s.request = function (method, param, interceptor) {
                return $v.Post(method, param, interceptor).fail(function (e) { console.error('Error-Request:', e); });
            };

            //$s.Dialog = (function (opt) {
            //    return $uibModal.open({
            //        animation: true,
            //        templateUrl: opt.templateUrl || ('/Dialogs/' + opt.template + '.tmpl.html'),
            //        controller: opt.controller,
            //        size: opt.size || 'lg',
            //        appendTo: angular.element(document.body),
            //        backdrop: opt.backdrop || false,
            //        keyboard: false,
            //        windowClass: 'custom-dialog' + opt.windowClass,
            //        resolve: opt.resolve || {
            //            dData: opt.data || null
            //        }
            //    });
            //});

            //$s.Confirm = (function (message, title) {
            //    var def = new $.Deferred();
            //    var dd = $s.Dialog({
            //        controller: ['$scope', 'dData', '$uibModalInstance', function ($s, $data, $d) {

            //            $s.Message = $data.message;
            //            $s.Title = $data.title;

            //            $s.Cancel = (function () {
            //                $d.close(1);
            //            })

            //            $s.OK = (function () {
            //                $d.close(0);
            //            })
            //        }],
            //        template: 'Confirm',
            //        size: 'sm',
            //        windowClass: ' confirm-dlg',
            //        data: {
            //            message: message, title: title || document.title
            //        }
            //    });
            //    dd.result.then(function (x) {
            //        if (x == 0)
            //            def.resolve(x);
            //        else {
            //            def.reject();
            //        }
            //    });
            //    return def.promise();
            //});

            //$s.Prompt = (function (message, title) {
            //    var def = new $.Deferred();
            //    var dd = $s.Dialog({
            //        controller: ['$scope', 'dData', '$uibModalInstance', function ($s, $data, $d) {

            //            $s.Message = $data.message;
            //            $s.Title = $data.title;

            //            $s.OK = (function () {
            //                $d.close(0);
            //            })
            //        }],
            //        template: 'Prompt',
            //        size: 'sm',
            //        windowClass: ' prompt-dlg',
            //        data: {
            //            message: message, title: title || document.title
            //        }
            //    });
            //    dd.result.then(function (x) {
            //        if (x == 0)
            //            def.resolve(x);
            //        else {
            //            def.reject();
            //        }
            //    });
            //    return def.promise();
            //});

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



        }]);
    });
}());
