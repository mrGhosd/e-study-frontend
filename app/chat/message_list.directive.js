import _  from 'underscore';
import MessageListController from './MessageListController';
import template from './message_list.html';

export default function messageListDirective() {
  return {
    restrict: "E",
    replace: true,
    template: template,
    scope: {
        currentUser: '='
    },
    bindToController: true,
    controller: MessageListController,
    controllerAs: "ctrl",
    link: function($scope, element) {
      var alreadyAtBottom = true;

      function scrollToBottom() {
        if (alreadyAtBottom) {
          $(element).scrollTop(element.prop("scrollHeight"));
        }
      }

      function isAtBottom() {
        var scrollTop = $(element).scrollTop();
        var maxHeight = element.prop("scrollHeight") - element.prop("clientHeight");

        return scrollTop >= maxHeight;
      }

      // https://developer.mozilla.org/en/docs/Web/API/MutationObserver
      var observer = new window.MutationObserver(scrollToBottom);

      observer.observe(element[0], { childList: true });

      var throttledOnScrollHandler = _.throttle(function() {
        alreadyAtBottom = isAtBottom();
      }, 250);

      element.on("scroll", throttledOnScrollHandler);

      $scope.$on("$destroy", () => {
        element.off("scroll", throttledOnScrollHandler);
        observer.disconnect();
      });
    }
  };
}
