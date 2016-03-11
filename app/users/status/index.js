import angular from 'angular';

import userStatusDirective from './user_status.directive';
import UserStatusController from './UserStatusController';

export default angular.module('estudy.users.status', [])
               .directive('userStatus', userStatusDirective)
               .controller('UserStatusController', UserStatusController).name;
