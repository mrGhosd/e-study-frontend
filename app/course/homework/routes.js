'use strict';

routes.$inject = ['$stateProvider', '$stateParamsProvider', '$urlRouterProvider'];

export function routes($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('new_homework', {
            url: '/courses/:course_id/lesson/:lesson_id/homeworks/new',
            template: require('./form.html'),
            controller: 'HomeworkFormController',
            controllerAs: 'ctrl',
            resolve: {
              homework: () => {
                return { text: '' };
              }
            }
        })
        .state('edit_homework', {
            url: '/courses/:course_id/lesson/:lesson_id/homeworks/:id/edit',
            template: require('./form.html'),
            controller: 'HomeworkFormController',
            controllerAs: 'ctrl',
            resolve: {
              homework: ['$stateParams', 'HomeworkFactory', ($stateParams, HomeworkFactory) => {
                return HomeworkFactory.get($stateParams.course_id, $stateParams.lesson_id, $stateParams.id);
              }]
            }
        });
}
