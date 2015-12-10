import angular from 'angular';
import uirouter from 'angular-ui-router';

import {routes} from './users.routes.js';
import UsersController from './UsersController.js';
import UserController from './UserController.js';
import UserFormController from './UserFormController';
import UserService from 'users/users.service';
import AuthService from 'users/AuthService';
import User from 'users/user.model';

export default angular.module('estudy.users', [uirouter])
    .controller('UsersController', UsersController)
    .controller('UserController', UserController)
    .controller('UserFormController', UserFormController)
    .service('UserService', UserService)
    .service('AuthService', AuthService)
    .config(routes)
    .name;
