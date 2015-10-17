var en = require('../localization/en.json');
var ru = require('../localization/ru.json');
routing.$inject = ['$urlRouterProvider', '$locationProvider', '$translateProvider', '$httpProvider'];

export default function routing($urlRouterProvider, $locationProvider, $translateProvider, $httpProvider) {
    $urlRouterProvider.otherwise('/');

    $translateProvider.translations('en', en);
    $translateProvider.translations('ru', ru);
    $translateProvider.preferredLanguage('en');


}