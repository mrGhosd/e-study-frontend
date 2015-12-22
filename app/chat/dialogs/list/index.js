import angular from 'angular';

import DialogListController from './DialogListController';
import DialogListDirective from './dialog_list.directive';

export default angular.module('chat.dialogs.list', [])
       .controller('DialogListController', DialogListController)
       .directive('dialogList', DialogListDirective)
       .name;
