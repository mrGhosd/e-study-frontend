import template from './comment_form.html';

commentsFormDirective.$inject = ['CommentFactory', '$location'];

export default function commentsFormDirective(CommentFactory, $location) {
  return {
    restrict: "E",
    template: template,
    replace: true,
    scope: false,
    link: function($scope, element, attrs) {
      $scope.commentText = '';
      $scope.formComment = {};

      $scope.createComment = function() {
        createComment();
      };

      $scope.trixInitialize = function(e, editor) {

      }

      function createComment() {
        let promise = {};
        const params = {
          text: $scope.commentText,
          id: $scope.course.id,
          type: 'course'
        };

        if ($scope.formComment.id) {
          // promise =
          $scope.formComment.text = $scope.commentText;
          let ids = $scope.comments.map(v => v.id);
          let index = ids.indexOf($scope.formComment.id);
          $scope.comments.splice(index, 1, $scope.formComment)
          if ($location.hash() !== $scope.formComment.id ) {
              $location.hash($scope.formComment.id);
          }
          $scope.commentText = null;
        }
        else {
          // promise = CommentFactory.create(params)
        }

        // promise
        // .then((comment) => {
        //   $scope.comments.push(comment);
        //   $scope.commentText = '';
        // })
        // .catch((error) => {
        //   $scope.commentForm.$submitted = true;
        //   $scope.commentForm.$errors = error;
        //   $scope.commentForm.$invalid = true;
        //   console.log($scope.commentForm);
        // });
      }
    }
  };
}
