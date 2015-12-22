import _  from 'underscore';
import MessageListController from './MessageListController';
import template from './message_list.html';

messageListDirective.$inject = [];

export default function messageListDirective() {
  return {
    restrict: "E",
    replace: true,
    template: template,
    scope: {
        currentUser: '=',
        chat: "@",
        messages: "="
    },
    bindToController: true,
    controller: MessageListController,
    controllerAs: "ctrl",
    link: function($scope, element) {
      $scope.$watchCollection('messages', function (newValue) {
        console.log(newValue);
        if (newValue) {
          $(element).scrollTop($(element)[0].scrollHeight);
        }
      });
    }
  };
}
