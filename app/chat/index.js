import angular from 'angular';
import uirouter from 'angular-ui-router';

import { routes } from './chat.routes.js';
import ChatListController from './ChatListController';
import ChatsController from './ChatsController';
import ChatFactory from './chat.factory.js';
import DialogController from './DialogController';
import MessageFactory from './message.factory';

export default angular.module('estudy.chat', [uirouter])
      .controller('ChatsController', ChatsController)
      .controller('ChatListController', ChatListController)
      .controller('DialogController', DialogController)
      .service('ChatFactory', ChatFactory)
      .service('MessageFactory', MessageFactory)
      .config(routes)
      .name;