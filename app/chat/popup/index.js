import angular from 'angular';

import popupBar from './PopupBar';
import popupMessage from './PopupMessage';
import PopupMessageDirective from './PopupMessageDirective';

export default angular.module('chat.popup', [])
               .directive('popupBar', popupBar)
               .directive('popupMessage', PopupMessageDirective)
               .service('PopupMessage', popupMessage)
               .name;
