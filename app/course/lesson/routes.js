'use strict';

routes.$inject = ['$stateProvider', '$stateParamsProvider', '$urlRouterProvider'];

export function routes($stateProvider, $urlRouterProvider) {
    $stateProvider
                .state('lesson', {
                    url: '/courses/:course_id/lessons/:id',
                    template: require('./lesson.html'),
                    controller: 'LessonController',
                    controllerAs: 'ctrl',
                    resolve: {
                        lesson: ['LessonFactory', '$stateParams',
                                 (LessonFactory, $stateParams) => {
                            return LessonFactory.get($stateParams.course_id,
                                                     $stateParams.id);
                        }]
                    }
                })
  }
