import bootstrap from 'bootstrap/dist/css/bootstrap.css';
import angular from 'angular';
import uirouter from 'angular-ui-router';

import routes from 'app.config';
import home from 'home/index';
import users from 'users/main'

import './index.html';
import 'css/main.scss';

console.log(bootstrap);
angular.module('estudy', [uirouter])
    .config(routes);