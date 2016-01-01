import angular from 'angular';
import uirouter from 'angular-ui-router';
import angularTranslate from 'angular-translate';
import angularBootstrap from 'angular-ui-bootstrap';
import config from 'app.config';

import home from 'home/index';
import users from 'users/main';
import chat from 'chat/index';

import notifications from 'modal_windows/notification/index';
import I18n from 'i18n-js';
import NavigationController from './navigation/NavigationController'
import HeaderController from './application/HeaderController'
import AuthorizationController from './modal_windows/AuthorizationController';
import ApiRequest from 'api/ApiRequest';
import angularSpinner from 'angular-spinner';
import ngFileUpload from 'ng-file-upload';
import Notification from './modal_windows/notification/Notification';
import angularCookies from 'angular-cookies';
import ngStorage from 'ngstorage';
import WebSockets from './sockets/socket.io.factory';
import 'babel-core/polyfill';
import __UtilPolyfill from 'util/polyfill';
import angularElastic from 'angular-elastic';
import './index.html';
import 'css/main.scss';

angular.module('estudy', [uirouter, angularTranslate, angularBootstrap, home, users, chat,
   ApiRequest, ngFileUpload, angularSpinner.name, angularCookies, ngStorage.name,
   notifications, angularElastic])
    .controller('NavigationController', NavigationController)
    .controller('HeaderController', HeaderController)
    .controller('AuthorizationController', AuthorizationController)
    .service('Notification', Notification)
    .service('WebSockets', WebSockets)
    .config(config)
    .run(($rootScope, AuthService, $location, $state, $modal,
          usSpinnerService, Notification, $cookies, WebSockets) => {
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
            if(error.status === 401) {
                if (fromState.name !== "") {
                    $state.go(fromState.name);
                } else {
                    if (toState.name === 'profile') {
                        $state.go('users');
                    }
                }
                Notification.alert('errors.401');
            }
        });
        $rootScope.$on('currentUser', (event, args) => {
          console.log(args);
          WebSockets.on(`user${args.user.id}chatmessage`, (event, data) => {
            console.log(data);
            // const message = new Message(angular.fromJson(data.obj));
            // if (message.userId !== this.currentUser.id &&
            //    message.chatId === this.chat.id){
            //   this.chat.messages.push(message);
            // }
          });
        });
    });
