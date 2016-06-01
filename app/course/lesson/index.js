import angular from 'angular';

import LessonFactory from './LessonFactory.js';

export default angular.module('estudy.lessons', [])
                      .service('LessonFactory', LessonFactory)
                      .name;
