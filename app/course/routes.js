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
            template: require('./form.html'),
            controller: 'CourseFormController',
            controllerAs: 'ctrl',
            resolve: {
              course: () => {
                return {};
              }
            }

        });
}
