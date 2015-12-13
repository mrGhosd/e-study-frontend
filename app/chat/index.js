import angular from 'angular';
import uirouter from 'angular-ui-router';

import { routes } from './chat.routes.js';
import ChatListController from './ChatListController';
import ChatsController from './ChatsController';
import ChatFactory from './chat.factory.js';
import MessageListController from './MessageListController';
import MessageFactory from './message.factory';
import MessageList from './message_list.directive';
import MessageFormController from './MessageFormController';
import MessageFormDirective from './message_form.directive';

export default angular.module('estudy.chat', [uirouter])
      .controller('ChatsController', ChatsController)
      .controller('ChatListController', ChatListController)
      .controller('MessageListController', MessageListController)
      .controller('MessageFormController', MessageFormController)
      .service('ChatFactory', ChatFactory)
      .service('MessageFactory', MessageFactory)
      .directive('messageList', MessageList)
      .directive('messageForm', MessageFormDirective)
      .config(routes)
      .name;
