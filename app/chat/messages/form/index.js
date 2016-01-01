import angular from 'angular';

import MessageFormController from './MessageFormController';
import MessageFormDirective from './message_form.directive';
import contentEditableDirective from './contenteditable.directive';

export default angular.module('chat.messages.form', [])
      .controller('MessageFormController', MessageFormController)
      .directive('messageForm', MessageFormDirective)
      .directive('contenteditable', contentEditableDirective)
      .name;
