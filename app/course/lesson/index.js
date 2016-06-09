import angular from 'angular';

import LessonFactory from './LessonFactory.js';
import LessonController from './LessonController';
import { routes } from './routes.js';

export default angular.module('estudy.lessons', [])
                      .controller('LessonController', LessonController)
                      .service('LessonFactory', LessonFactory)
                      .config(routes)
                      .name;
