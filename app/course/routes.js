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
        });
}
