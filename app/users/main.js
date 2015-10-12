import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './users.routes.js';
import UsersController from './UsersController.js';
import UserService from 'users/users.service';

export default angular.module('estudy.users', [uirouter])
    .config(routing)
    .controller('UsersController', UsersController)
    .factory('UserService', UserService)
    .name;