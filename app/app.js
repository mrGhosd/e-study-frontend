import angular from 'angular';
import uirouter from 'angular-ui-router';
import angularTranslate from 'angular-translate';
import angularBootstrap from 'angular-ui-bootstrap';
import config from 'app.config';

import home from 'home/index';
import users from 'users/main';
import chat from 'chat/index';
import countries from 'countries/index';
import course from 'course/index';
import comment from 'comment/index';

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
import runConfig from 'run_configuration/index';
import list from 'util/list';
import angularSanitize from 'angular-sanitize';
require("font-awesome-webpack");
import 'angular-bootstrap-datetimepicker';
import 'angular-bootstrap-datetimepicker/src/js/datetimepicker.templates.js';
import 'angular-bootstrap-datetimepicker/src/scss/datetimepicker.scss';
import 'moment';
import 'script!trix';
import 'angular-trix';


angular.module('estudy', [uirouter, angularTranslate, angularBootstrap, home, users, chat,
   ApiRequest, course, ngFileUpload, angularSpinner.name, angularCookies, ngStorage.name,
   notifications, angularElastic, countries, list, 'angularTrix', angularSanitize,
   comment, 'ui.bootstrap.datetimepicker'])
    .controller('NavigationController', NavigationController)
    .controller('HeaderController', HeaderController)
    .controller('AuthorizationController', AuthorizationController)
    .service('Notification', Notification)
    .service('WebSockets', WebSockets)
    .config(config)
    .run(($rootScope, AuthService, $location, $state, $modal,
          usSpinnerService, Notification, $cookies, WebSockets, PopupMessage, currentUserFactory) => {
            runConfig($rootScope, AuthService, $location, $state, $modal,
                  usSpinnerService, Notification, $cookies, WebSockets, PopupMessage, currentUserFactory);
    });
