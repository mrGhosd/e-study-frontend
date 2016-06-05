import template from './comments_list.html';

commentsListDirective.$inject = ['$anchorScroll', '$location'];

export default function commentsListDirective($anchorScroll, $location) {
  return {
    restrict: "E",
    template: template,
    replace: true,
    scope: false,
    link: function($scope, element, attrs) {
      $scope.commentFormVisible = false;

      $scope.editComment = function(comment) {
        $scope.formComment = comment;
        $scope.commentText = comment.text;
        if ($location.hash() !== 'commentForm' ) {
            $location.hash('commentForm');
        }
        else {
          $anchorScroll();
        }

      }
    }
  };
}
