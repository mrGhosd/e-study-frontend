import angular from 'angular';
import uirouter from 'angular-ui-router';

import messagesList from './list/index.js';
import messageForm from './form/index.js';
import MessageFactory from './message.factory';

export default angular.module('chat.messages', [messagesList, messageForm])
               .service('MessageFactory', MessageFactory)
               .name;
