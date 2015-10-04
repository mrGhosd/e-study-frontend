import angular from 'angular';
import uirouter from 'angular-ui-router';
import angularTranslate from 'angular-translate';

import routes from 'app.config';
import home from 'home/index';
import users from 'users/main'

import NavigationController from './navigation/NavigationController'
import './index.html';
import 'css/main.scss';

console.log(angularTranslate);
angular.module('estudy', [uirouter, angularTranslate, home, users]).controller('NavigationController', NavigationController)
    .config(routes);