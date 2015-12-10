import angular from 'angular';
import uirouter from 'angular-ui-router';

import { routes } from './chat.routes.js';
import ChatListController from './ChatListController';

export default angular.module('estudy.chat', [uirouter])
      .controller('ChatListController', ChatListController)
      .config(routes)
      .name;
