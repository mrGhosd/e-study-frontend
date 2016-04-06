import _  from 'underscore';
import MessageListController from './MessageListController';
import template from './message_list.html';
import Message from '../message.model';
import User from 'users/user.model';

messageListDirective.$inject = ['MessageFactory', 'WebSockets', '$timeout', '$document'];
const topLoadValue = 200;
const messageLoadingTimeout = 2000;
let responseSended = false;
let defaultPage = 1;

export default function messageListDirective(MessageFactory, WebSockets, $timeout, $document) {
  return {
    restrict: "E",
    template: template,
    replace: true,
    scope: false,
    link: function($scope, element, attrs) {
      let currentUser = $scope.ctrl.currentUser;
      let chat = $scope.ctrl.chat;

      element.on('scroll', function() {
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


      WebSockets.on(`user${currentUser.id}chatmessage`, (event, data) => {
        const message = new Message(angular.fromJson(data.obj));
        if (message.userId !== currentUser.id &&
           message.chatId === this.chat.id){
          this.chat.messages.push(message);
        }
      });

      WebSockets.on(`chat${chat.id}usertyping`, (event, data) => {
        const user = new User(angular.fromJson(data.user));
        if (user.id !== currentUser.id) {
          this.$scope.typing = `${user.correctNaming()} typing...`;
        }
      });

      WebSockets.on(`chat${chat.id}userendtyping`, (event, data) => {
        const user = new User(angular.fromJson(data.user));
        if (user.id !== currentUser.id) {
          this.$scope.typing = null;
        }
      });

      $scope.$watchCollection('messages', function (newValue) {
        if (newValue) {
          let scrollValue = $(element)[0].scrollHeight * 2;
          $(element).scrollTop(100000000000);
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
