import angular from 'angular';

import commentsListDirective from './CommentsListDirective.js'
import commentsFormDirective from './CommentFormDirective.js'
import CommentFactory from './CommentFactory';

export default angular.module('estudy.comments', [])
                      .directive('commentsList', commentsListDirective)
                      .directive('commentsForm', commentsFormDirective)
                      .service('CommentFactory', CommentFactory)
                      .name;
