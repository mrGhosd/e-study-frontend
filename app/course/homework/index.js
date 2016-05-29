import angular from 'angular';

import HomeworkFactory from './HomeworkFactory.js';
import HomeworkFormController from './HomeworkFormController.js';
import { routes } from './routes.js';

export default angular.module('estudy.homework', [])
                      .controller('HomeworkFormController', HomeworkFormController)
                      .service('HomeworkFactory', HomeworkFactory)
                      .config(routes)
                      .name;
