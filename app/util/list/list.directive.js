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
        const currentValue = $($window).scrollTop();
        const listHeight = $(element).height();

        if ($(element).height() > 0 &&
            listHeight >= currentValue &&
            listHeight - currentValue <= 600) {
              if (!canLoadMore) {
                canLoadMore = true;
                $scope[attr.ctrl][attr.func]();
                setTimeout(() => {
                  canLoadMore = false;
                }, 3000);
              }
        }
      });
    }
  };
}
