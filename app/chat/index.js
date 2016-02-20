import angular from 'angular';
import uirouter from 'angular-ui-router';

import { routes } from 'chat/chat.routes.js';
import ChatsController from 'chat/ChatsController';
import messages from 'chat/messages/index.js';
import dialogs from 'chat/dialogs/index.js';

export default angular.module('estudy.chat', [uirouter, messages, dialogs])
      .controller('ChatsController', ChatsController)
      .config(routes)
      .name;
