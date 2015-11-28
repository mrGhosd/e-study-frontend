import angular from 'angular';

function notify() {
  return {
    scope: {
      class: '=',
      message: '='
    },
    template: require('./test_directive.html')
  }
}

export default angular.module('estudy.notify', []).directive('notify', notify).name;
