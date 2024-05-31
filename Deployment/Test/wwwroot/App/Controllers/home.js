'use strict'
define(['app'], function (app) {
    app.register.controller('home', ['$scope', '$rootScope', function ($s, $rs) {
        

        $s.request('Test',{param: 'Baptismal'}).then(function (r) {

            if (r.status == 3) {
                console.log('res', r);
                return;
            }

            
        });

    }]);
});