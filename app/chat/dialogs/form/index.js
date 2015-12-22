import angular from 'angular';

import dialogFormDirective from './dialog_form.directive';
import DialogFormController from './DialogFormController';

export default angular.module('chat.dialogs.form', [])
              .controller('DialogFormController', DialogFormController)
              .directive('dialogForm', dialogFormDirective)
              .name;
