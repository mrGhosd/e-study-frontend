import angular from 'angular';

listDirective.$inject = ['$window'];

const topLoadValue = 200;
const heightForUpload = 600;
let canLoadMore = false;

export default function listDirective($window) {
  return {
    restrict:"E",
    replace: true,
    link: function($scope, element, attr) {
      $($window).on('scroll', function() {
        $scope.counts = 0;
        if (isViewOnBottom(element)) {
              if (!$scope.canLoadMore) {
                $scope.canLoadMore = true;
                loadList($scope, attr, element);
              }
        }
      });
    }
  };

  function loadList($scope, attr, element) {
    // if ($scope.counts < 2) {
      applyElementsLoading($scope, attr);
      setTimeout(() => {
        $scope.canLoadMore = false;
        if (isViewOnBottom(element)) {
          loadList($scope, attr, element);
          $scope.counts++;
        }
      }, 3000);
    // }
  }

  function applyElementsLoading($scope, attr) {
    attr.ctrl ? $scope[attr.ctrl][attr.func]() : $scope[attr.func]();
  }


  function isViewOnBottom(element) {
    const currentValue = $(window).scrollTop();
    const listHeight = $(element).height();
    return $(element).height() > 0 && (elementInViewport(element) || listHeight >= currentValue) && listHeight - currentValue <= 600;
  }

  function elementInViewport(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
  }
}
