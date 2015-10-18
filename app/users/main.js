import angular from 'angular';
import uirouter from 'angular-ui-router';

import {routes} from './users.routes.js';
import UsersController from './UsersController.js';
import UserController from './UserController.js';
import UserService from 'users/users.service';
import AuthService from 'users/AuthService';

export default angular.module('estudy.users', [uirouter])
    .controller('UsersController', UsersController)
    .controller('UserController', UserController)
    .service('UserService', UserService)
    .service('AuthService', AuthService)
    .config(routes)
    .name;