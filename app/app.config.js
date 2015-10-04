routing.$inject = ['$urlRouterProvider', '$locationProvider', '$translateProvider'];

export default function routing($urlRouterProvider, $locationProvider, $translateProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
    $urlRouterProvider.otherwise('/');

    $translateProvider.translations('en', {
        auth: {
            "sign_in": "Sign in",
            "sign_up": "Sign_up",
            "sign_out": "Sign out"
        }
    });
    $translateProvider.preferredLanguage('en');
}