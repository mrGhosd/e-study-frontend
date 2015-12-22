import angular from 'angular';
import uirouter from 'angular-ui-router';

import { routes } from './chat.routes.js';
import ChatsController from './ChatsController';
import ChatFactory from './chat.factory.js';
import messages from './messages/index.js';
import dialogs from './dialogs/index.js';

export default angular.module('estudy.chat', [uirouter, messages, dialogs])
      .controller('ChatsController', ChatsController)
      .service('ChatFactory', ChatFactory)
      .config(routes)
      .name;
