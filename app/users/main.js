import angular from 'angular';
import uirouter from 'uirouter';

import routing from './users.routes.js';
import UsersController from './UsersController.js';

export default angular.module('estudy.users', [uirouter])
    .config(routing)
    .controller('UsersController', UsersController).name;