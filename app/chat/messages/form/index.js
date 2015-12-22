import angular from 'angular';

import MessageFormController from './MessageFormController';
import MessageFormDirective from './message_form.directive';

export default angular.module('chat.messages.form', [])
      .controller('MessageFormController', MessageFormController)
      .directive('messageForm', MessageFormDirective)
      .name;
