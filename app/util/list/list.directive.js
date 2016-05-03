import angular from 'angular';

listDirective.$inject = ['$window'];

const topLoadValue = 200;
const heightForUpload = 600;

export default function listDirective($window) {
  return {
    restrict:"E",
    replace: true,
    scope: {
      func: '='
    },
    link: function($scope, element, attr) {
      $($window).on('scroll', function() {
        const currentValue = $($window).scrollTop();
        const listHeight = $(element).height();

        if (listHeight >= currentValue && listHeight - currentValue <= 600) {
          $scope.$parent.$apply(attr.func);
        }
      });
    }
  };
}
