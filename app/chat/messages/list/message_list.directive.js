import _  from 'underscore';
import MessageListController from './MessageListController';
import template from './message_list.html';

messageListDirective.$inject = ['MessageFactory'];
const topLoadValue = 200;
const messageLoadingTimeout = 2000;
let responseSended = false;
let defaultPage = 1;

export default function messageListDirective(MessageFactory) {
  return {
    restrict: "EA",
    template: template,
    scope: false,
    // bindToController: true,
    // controller: MessageListController,
    // controllerAs: "ctrl",
    link: function($scope, element, attrs) {
      element.on('scroll', () => {
        let currentValue = $(element).scrollTop();
        if (currentValue <= topLoadValue) {
          if (!responseSended) {
            responseSended = true;
            const params = {
              page: ++defaultPage,
              chat_id: $scope.ctrl.chat.id,
              limit: 20
            }
            MessageFactory.getList(params).then((response) => {
              let messages = response.reverse();
              if (messages) {
                  messages.map(message => $scope.messages.unshift(message));
              }
              setTimeout(() => {
                responseSended = false;
              }, messageLoadingTimeout);
            });
          }
        }
      });

      $scope.$watchCollection('messages', function (newValue) {
        if (newValue) {
          $(element).scrollTop($(element)[0].scrollHeight);
        }
      });

      $scope.$watch('typing', function(val) {
        if (val) {
          $(element).scrollTop(0,$(element)[0].scrollHeight + 200);
        }
     });
    }
  };
}
