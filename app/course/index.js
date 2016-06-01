import angular from 'angular';

import CourseFactory from './CourseFactory.js';
import CoursesController from './CoursesController.js';
import CourseFormController from './CourseFormController';
import CourseController from './CourseController';
import { routes } from './routes.js';

import homework from './homework/index';
import lesson from './lesson/index';

export default angular.module('estudy.course', [homework, lesson])
                      .controller('CoursesController', CoursesController)
                      .controller('CourseFormController', CourseFormController)
                      .controller('CourseController', CourseController)
                      .service('CourseFactory', CourseFactory)
                      .config(routes)
                      .name;
