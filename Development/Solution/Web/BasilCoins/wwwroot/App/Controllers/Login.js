angular.module('app')

.controller('Login', ['$scope', '$state', '$rootScope', '$controller', function ($s, $st, $rs,$c) {
    $c('BaseController', { $scope: $s });

    $s.Login = function (l) {

        $s.request('Login', l).then(function (r) {

            console.log('res', r);
            if (r.status == 1) {

                $st.go('Main.Home');

            } else {

                alert(r.message);
            }

        });
    }

    $s.BackHome = function () {
        $st.go('Main.Home');
    }

    $s.Register = function (c) {


        $s.request('Register', { newCustomer: JSON.stringify(c) }).then(function (r) {

            if (r.status == 1) {


                $s.Prompt('Thank you for joining us please check your Email to verify your account.', 'Thank you.');

            } else {

                $s.Prompt(r.message, 'Error');
            }

        });




    }


    $s.Verify = function () {

        $s.request('Verification', { Password: '123', VerificationCode: 'BC34200317' }).then(function (r) {

            if (r.status == 1) {



            } else {

                alert(r.message);
            }

        });

    }


}]);

    //(function () {
    //    'use strict'
    //    define(['app'], function (app) {
    //        app.register.controller('Login', ['$scope', '$state', '$rootScope', function ($s, $st, $rs) {


    //            $s.Login = function (l) {

    //                $s.request('Login', l).then(function (r) {

    //                    console.log('res', r);
    //                    if (r.status == 1) {

    //                        $st.go('Main.Home');

    //                    } else {

    //                        alert(r.message);
    //                    }

    //                });
    //            }


    //            $s.Register = function (c) {


    //                $s.request('Register', { newCustomer: JSON.stringify(c) }).then(function (r) {

    //                    if (r.status == 1) {


    //                        $s.Prompt('Thank you for joining us please check your Email to verify your account.', 'Thank you.');

    //                    } else {

    //                        $s.Prompt(r.message, 'Error');
    //                    }

    //                });




    //            }


    //            $s.Verify = function () {

    //                $s.request('Verification', { Password: '123', VerificationCode: 'BC34200317' }).then(function (r) {

    //                    if (r.status == 1) {



    //                    } else {

    //                        alert(r.message);
    //                    }

    //                });

    //            }


    //        }]);
    //    });

    //});
