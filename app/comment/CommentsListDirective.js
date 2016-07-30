import template from './comments_list.html';

commentsListDirective.$inject = ['$anchorScroll', '$location', 'CommentFactory'];

export default function commentsListDirective($anchorScroll, $location, CommentFactory) {
  return {
    restrict: "E",
    template: template,
    replace: true,
    scope: false,
    link: function($scope, element, attrs) {
      let page = 1;
      $scope.commentFormVisible = false;
      $scope.lastListRequest;

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

      $scope.deleteComment = function(comment) {
        CommentFactory.destroy(comment.id)
        .then((response) => {
          removeFromList(comment);
        });
      };

      $scope.loadMore = function() {
        if ($scope.lastListRequest && $scope.lastListRequest.length === 0) {
          return;
        }
        const type = $scope.type;
        const id = $scope.object.id;
        CommentFactory.getList(type, id, ++page)
          .then(response => {
            $scope.lastListRequest = response;
            console.log(response);
            response.map(item => {
              $scope.comments.push(item);
            });
          });
      }

      function removeFromList(comment) {
        if ($scope.comments.includes(comment)) {
          let index = $scope.comments.indexOf(comment);
          $scope.comments.splice(index, 1);
        }
      }
    }
  };
}
