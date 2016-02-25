import angular from 'angular';

popupMessageDirective.$inject = ['$timeout'];

export default function popupMessageDirective($timeout) {
  return {
    restrict:"C",
      transclude:true,
      template: "<a href=\"javascript:void(0)\" class=\"closeMessage\" ng-click=\"close()\">x</a><div ng-transclude></div>",
      link: function(scope, el, attr) {
          var promiseToEnd,
              promiseToDestroy;
          //ugly hack to get css styling to be interpreted correctly by browser.  Blech!
          console.log(scope, el, attr);
          $timeout(function() {
          	el.addClass("show");
          }, 1);
          scope.close = function() {
              el.remove();
              scope.$destroy();
          };

          function cancelTimeouts() {
            console.log(promiseToEnd, promiseToDestroy);
              if(promiseToDestroy) {
                  $timeout.cancel(promiseToDestroy);
                  promiseToDestroy = undefined;
              }
              $timeout.cancel(promiseToEnd);
              el.addClass("show");
          }

          function startTimeouts() {
          	promiseToEnd = $timeout(function() {
              	el.removeClass("show");
              	promiseToDestroy = $timeout(scope.close, 1010);
          	}, attr.time);
          }

          el.bind("mouseenter", cancelTimeouts);
          el.bind("mouseleave", startTimeouts);

          startTimeouts();
      }
  }
}
