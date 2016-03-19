import angular from 'angular';
import uirouter from 'angular-ui-router';
import angularTranslate from 'angular-translate';
import config from 'app.config';

import home from 'home/index';
import users from 'users/main';
import chat from 'chat/index';
import autocomplete from 'util/autocomplete/index';
import countries from 'countries/index';
import authorization from 'authorization/index';

import notifications from 'modal_windows/notification/index';
import I18n from 'i18n-js';
import angularMessages from 'angular-messages';
import NavigationController from './navigation/NavigationController'
import HeaderController from './application/HeaderController'
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
import 'font-awesome/scss/font-awesome.scss';
import 'font-awesome/fonts/FontAwesome.otf';
import 'angular-material/angular-material.scss';
import runConfig from 'run_configuration/index';
import angularSanitize from 'angular-sanitize';
import angularMaterial from 'angular-material';

angular.module('estudy', [uirouter, angularTranslate, home, users, chat,
   authorization,
   ApiRequest, ngFileUpload, angularSpinner.name, angularCookies, ngStorage.name,
   notifications, angularElastic, angularSanitize, autocomplete,
   countries, angularMaterial, angularMessages])
    .controller('NavigationController', NavigationController)
    .controller('HeaderController', HeaderController)
    .service('Notification', Notification)
    .service('WebSockets', WebSockets)
    .config(config)
    .run(($rootScope, AuthService, $location, $state,
          usSpinnerService, Notification, $cookies, WebSockets, PopupMessage) => {
            runConfig($rootScope, AuthService, $location, $state,
                  usSpinnerService, Notification, $cookies, WebSockets, PopupMessage);
    });
