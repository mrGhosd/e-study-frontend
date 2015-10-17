import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './users.routes.js';
import UsersController from './UsersController.js';
import UserController from './UserController.js';
import UserService from 'users/users.service';

export default angular.module('estudy.users', [uirouter])
    .config(routing)
    .controller('UsersController', UsersController)
    .controller('UserController', UserController)
    .factory('UserService', UserService)
    .name;