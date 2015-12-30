import angular from 'angular';
import uirouter from 'angular-ui-router';

import messagesList from './list/index.js';
import messageForm from './form/index.js';
import attaches from './attachments/index';
import messagePopover from './message_popover/index.js';
import MessageFactory from './message.factory';

export default angular.module('chat.messages', [messagesList,
      messageForm, attaches, messagePopover])
               .service('MessageFactory', MessageFactory)
               .name;
