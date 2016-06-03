import template from './comments_list.html';

commentsListDirective.$inject = [];

export default function commentsListDirective() {
  return {
    restrict: "E",
    template: template,
    replace: true,
    scope: false,
    link: function($scope, element, attrs) {

    }
  };
}
