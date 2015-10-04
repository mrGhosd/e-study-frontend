import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './users.routes.js';
import UsersController from './UsersController.js';

console.log(angular);
export default angular.module('estudy.users', [uirouter])
    .config(routing)
    .controller('UsersController', UsersController)
    .name;