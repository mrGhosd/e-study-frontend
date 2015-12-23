import angular from 'angular';

import form from './form/index.js';
import list from './list/index.js';
import DialogFactory from './dialog.factory';

export default angular.module('chat.dialogs', [form, list])
       .service('DialogFactory', DialogFactory)
       .name;
