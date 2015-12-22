import angular from 'angular';

import MessageList from './message_list.directive';
import MessageListController from './MessageListController';

export default angular.module('chat.messages.list', [])
      .controller('MessageListController', MessageListController)
      .directive('messageList', MessageList)
      .name;
