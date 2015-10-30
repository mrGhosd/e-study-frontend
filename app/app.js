import angular from 'angular';
import uirouter from 'angular-ui-router';
import angularTranslate from 'angular-translate';
import angularBootstrap from 'angular-ui-bootstrap';

import config from 'app.config';
import home from 'home/index';
import users from 'users/main';

import I18n from 'i18n-js';
import NavigationController from './navigation/NavigationController'
import HeaderController from './application/HeaderController'
import AuthorizationController from './modal_windows/AuthorizationController';
import ApiRequest from 'api/ApiRequest';
import NotificationsController from './modal_windows/notification/NotificationsController';
import angularSpinner from 'angular-spinner';
import ngFileUpload from 'ng-file-upload';
import Notification from './modal_windows/notification/Notification';
import './index.html';
import 'css/main.scss';


angular.module('estudy', [uirouter, angularTranslate, angularBootstrap, home, users,
    ApiRequest, ngFileUpload, angularSpinner.name])
    .controller('NavigationController', NavigationController)
    .controller('HeaderController', HeaderController)
    .controller('AuthorizationController', AuthorizationController)
    .controller('NotificationsController', NotificationsController)
    .service('Notification', Notification)
    .config(config)
    .run(($rootScope, AuthService, $location, $state, $modal,  usSpinnerService, Notification) => {
        $rootScope.$on('signedIn', (event, args) => {
            if($state.current.name === 'user'){
                $state.go('profile');
            }
        });

        $rootScope.$on('signedOut', (event, args) => {
            if($state.current.name === 'profile'){
                $state.go('users');
            }
        });

        $rootScope.$on('$stateChangeStart', (event, viewConfig) => {
            usSpinnerService.spin('main-spinner');
        });

        $rootScope.$on('$stateChangeSuccess', (event) => {
            usSpinnerService.stop('main-spinner');
        });

        $rootScope.$on('$stateChangeError', (event, toState, toParams, fromState, fromParams, error) => {
            usSpinnerService.stop('main-spinner');
            event.preventDefault();
            if(fromState.name !== ""){
                $state.go(fromState.name);
            } else {
                if(toState.name === 'profile'){
                    $state.go('users');
                }
            }
            Notification.alert('errors.401');
        })
    });

