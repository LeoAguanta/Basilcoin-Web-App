'use strict'

window.$stateProviderRef = null;
window.$urlRouterProviderRef = null;

require.config({
    baseUrl: '/Scripts/System/'
});

var _min = false ? '.min' : '';

var components = [
    'app',
    'config' + _min,
    'directives' + _min,
    'providers' + _min,
    'mainController' + _min
];

require(components,function (app) {
    angular.bootstrap(document, ['app']);
});