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
        const currentValue = $(window).scrollTop();
        const listHeight = $(element).height();
        if ($(element).height() > 0 &&
            (elementInViewport(element) || listHeight >= currentValue) &&
            listHeight - currentValue <= 600) {
              if (!canLoadMore) {
                canLoadMore = true;
                attr.ctrl ? $scope[attr.ctrl][attr.func]() : $scope[attr.func]();
                setTimeout(() => {
                  canLoadMore = false;
                }, 3000);
              }
        }
      });
    }
  };

  function elementInViewport(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
  }
}
