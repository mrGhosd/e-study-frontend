'use strict';

routes.$inject = ['$stateProvider', '$stateParamsProvider', '$urlRouterProvider'];

export function routes($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('courses', {
            url: '/courses',
            template: require('./courses.html'),
            controller: 'CoursesController',
            controllerAs: 'ctrl',
            resolve: {
                courses: ['CourseFactory', (CourseFactory) => {
                    return CourseFactory.getList();
                }]
            }
        })
        .state('new_course', {
            url: '/courses/new',
            template: require('./form/base.html'),
            controller: 'CourseFormController',
            controllerAs: 'ctrl',
            resolve: {
              course: () => {
                return { description: '', lessons: [] };
              }
            }
        })
        .state('edit_course', {
            url: '/courses/:id/edit',
            template: require('./form/base.html'),
            controller: 'CourseFormController',
            controllerAs: 'ctrl',
            resolve: {
              course: ['$stateParams', 'CourseFactory', ($stateParams, CourseFactory) => {
                return CourseFactory.get($stateParams.id);
              }]
            }
        })
        .state('course', {
            url: '/courses/:id',
            template: require('./show.html'),
            controller: 'CourseController',
            controllerAs: 'ctrl',
            resolve: {
              course: ['$stateParams', 'CourseFactory', ($stateParams, CourseFactory) => {
                return CourseFactory.get($stateParams.id);
              }]
            }
        });
}
