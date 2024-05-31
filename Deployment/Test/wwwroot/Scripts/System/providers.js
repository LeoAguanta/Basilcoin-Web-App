(function () {

    'use strict';
    define(['app'], function (app) {

        app.provider('services', function () {

            return {
                $get: ['$http', '$q', function ($http, $q) {
                    return {
                        Post: (function (name, param, disableInterceptor) {
                            var def = $.Deferred();

                            var req = {

                                url: '/api/Action/' + name,
                                method: "POST",
                                data: param,
                                disableInterceptor: (disableInterceptor == undefined ? false : disableInterceptor),
                                dataType: "application/json"
                            }

                            $http(req).then(function (d) {
                                try {
                                    def.resolve(d.data);

                                } catch (e) {
                                    def.reject(e);

                                }
                            });

                            return def.promise();
                        })
                    }
                }]
            }
        });
    });
}());

