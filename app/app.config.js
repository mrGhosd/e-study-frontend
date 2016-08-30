var en = require('../localization/en.json');
var ru = require('../localization/ru.json');
import moment from 'moment';
routing.$inject = ['$urlRouterProvider', '$locationProvider',
    '$translateProvider', '$httpProvider', 'usSpinnerConfigProvider', '$provide', '$qProvider', 'usSpinnerConfigProvider'];

export default function routing($urlRouterProvider, $locationProvider, $translateProvider,
        $httpProvider, usSpinnerConfigProvider, $provide, $q, usSpinnerService) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
    $urlRouterProvider.otherwise('/');

    let userLocale = (navigator.language || navigator.userLanguage).substr(0, 2);
    moment.locale(userLocale);
    $translateProvider.translations('en', en);
    $translateProvider.translations('ru', ru);
    $translateProvider.preferredLanguage(userLocale);
}
