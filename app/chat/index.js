import angular from 'angular';
import uirouter from 'angular-ui-router';

import { routes } from './chat.routes.js';
import ChatListController from './ChatListController';
import ChatFactory from './chat.factory.js';

export default angular.module('estudy.chat', [uirouter])
      .controller('ChatListController', ChatListController)
      .service('ChatFactory', ChatFactory)
      .config(routes)
      .name;
