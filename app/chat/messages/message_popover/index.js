import angular from 'angular';

import MessagePopoverController from './message_popover.controller';
import MessagePopoverDirective from './message_popover.directive';

export default angular.module('estudy.message.message_popover', [])
       .controller('MessagePopoverController', MessagePopoverController)
       .directive('messagePopover', MessagePopoverDirective)
       .name;
