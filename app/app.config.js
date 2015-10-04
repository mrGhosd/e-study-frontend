var en = require('../localization/en.json');
var ru = require('../localization/ru.json');
routing.$inject = ['$urlRouterProvider', '$locationProvider', '$translateProvider'];

export default function routing($urlRouterProvider, $locationProvider, $translateProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
    $urlRouterProvider.otherwise('/');
    console.log($translateProvider);

    $translateProvider.translations('en', en);
    $translateProvider.translations('ru', ru);
    $translateProvider.preferredLanguage('en');
}