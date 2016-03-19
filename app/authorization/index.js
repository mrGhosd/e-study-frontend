import angular from 'angular';

import AuthorizationController from './AuthorizationController';
import AuthService from 'authorization/AuthService';

export default angular.module('estudy.authorization', [])
               .controller('AuthorizationController', AuthorizationController)
               .service('AuthService', AuthService)
               .name;
