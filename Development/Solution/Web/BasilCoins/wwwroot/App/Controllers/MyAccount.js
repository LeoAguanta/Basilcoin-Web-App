angular.module('app')
    .controller('MyAccount', ['$scope', '$rootScope', '$controller', function ($s, $rs, $c) {
        $c('BaseController', { $scope: $rs });

        $s.Init = function () {
            //Initialize
        }

        $s.Init();

    }]);