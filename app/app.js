import angular from 'angular';
import uirouter from 'angular-ui-router';
import angularTranslate from 'angular-translate';

import config from 'app.config';
import home from 'home/index';
import users from 'users/main'

import I18n from 'i18n-js';
import NavigationController from './navigation/NavigationController'
import HeaderController from './application/HeaderController'
import './index.html';
import 'css/main.scss';
console.log(angularTranslate);
angular.module('estudy', [uirouter, angularTranslate, home, users])
    .controller('NavigationController', NavigationController)
    .controller('HeaderController', HeaderController)
    .config(config);

