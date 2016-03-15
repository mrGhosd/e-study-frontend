import angular from 'angular';

import AuthorizationController from './AuthorizationController';

export default angular.module('estudy.authorization', [])
               .controller('AuthorizationController', AuthorizationController)
               .name;
