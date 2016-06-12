import angular from 'angular';

import HomeworkFactory from './HomeworkFactory.js';
import HomeworkFormController from './HomeworkFormController.js';
import HomeworkController from './HomeworkController.js';
import { routes } from './routes.js';

export default angular.module('estudy.homework', [])
                      .controller('HomeworkFormController', HomeworkFormController)
                      .controller('HomeworkController', HomeworkController)
                      .service('HomeworkFactory', HomeworkFactory)
                      .config(routes)
                      .name;
