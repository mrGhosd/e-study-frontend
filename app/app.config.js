var en = require('../localization/en.json');
var ru = require('../localization/ru.json');
routing.$inject = ['$urlRouterProvider', '$locationProvider',
    '$translateProvider', '$httpProvider', 'usSpinnerConfigProvider', '$provide', '$qProvider', 'usSpinnerConfigProvider'];

export default function routing($urlRouterProvider, $locationProvider, $translateProvider,
        $httpProvider, usSpinnerConfigProvider, $provide, $q, usSpinnerService) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
    $urlRouterProvider.otherwise('/');

    $translateProvider.translations('en', en);
    $translateProvider.translations('ru', ru);
    $translateProvider.preferredLanguage('en');

    $provide.factory('SpinnerFactory', ($q, usSpinnerService) => {
        return {
          'request': (response) => {
              usSpinnerService.spin('main-spinner');
              return response;
          },
          'response': (response) => {
              usSpinnerService.stop('main-spinner');
              return response;
          },
          'requestError': (response) => {
            usSpinnerService.stop('main-spinner');
            return response;
          },
            'requestError': (response) => {
                usSpinnerService.stop('main-spinner');
                return response;
            }
        };
    });
    $httpProvider.interceptors.push('SpinnerFactory');
}