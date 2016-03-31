import _  from 'underscore';
import MessageListController from './MessageListController';
import template from './message_list.html';

messageListDirective.$inject = [];
const topLoadValue = 200;

export default function messageListDirective() {
  return {
    restrict: "E",
    replace: true,
    template: template,
    scope: {
        currentUser: '=',
        chat: "="
    },
    bindToController: true,
    controller: MessageListController,
    controllerAs: "ctrl",
    link: function($scope, element) {
      element.on('scroll', () => {
        let currentValue = $(element).scrollTop();
        if (currentValue <= topLoadValue) {
            console.log(currentValue);
        }
      });
      $scope.$watchCollection('messages', function (newValue) {
        if (newValue) {
          $(element).scrollTop($(element)[0].scrollHeight);
        }
      });
    }
  };
}
