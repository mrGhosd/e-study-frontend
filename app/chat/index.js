import angular from 'angular';
import uirouter from 'angular-ui-router';

import { routes } from './chat.routes.js';
import ChatListController from './ChatListController';
import ChatsController from './ChatsController';
import ChatFactory from './chat.factory.js';
import messages from './messages/index.js';

export default angular.module('estudy.chat', [uirouter, messages])
      .controller('ChatsController', ChatsController)
      .controller('ChatListController', ChatListController)
      .service('ChatFactory', ChatFactory)
      .config(routes)
      .name;
