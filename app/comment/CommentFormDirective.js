import template from './comment_form.html';

commentsFormDirective.$inject = ['CommentFactory'];

export default function commentsFormDirective(CommentFactory) {
  return {
    restrict: "E",
    template: template,
    replace: true,
    scope: false,
    link: function($scope, element, attrs) {
      $scope.commentText = '';

      $scope.createComment = function() {
        createComment();
      };

      $scope.trixInitialize = function(e, editor) {

      }

      function createComment() {
        const params = {
          text: $scope.commentText,
          id: $scope.course.id,
          type: 'course'
        };

        CommentFactory.create(params)
        .then((comment) => {
          $scope.comments.push(comment);
          $scope.commentText = '';
        })
        .catch((error) => {
          $scope.commentForm.$submitted = true;
          $scope.commentForm.$errors = error;
          $scope.commentForm.$invalid = true;
          console.log($scope.commentForm);
          // console.log(error);
        });
      }
    }
  };
}
