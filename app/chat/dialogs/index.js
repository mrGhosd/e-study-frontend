import angular from 'angular';

import form from './form/index.js';
import list from './list/index.js';

export default angular.module('chat.dialogs', [form, list]).name;
