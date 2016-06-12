import angular from 'angular';
import template from './form_field.html';

formFieldDirective.$inject = ['$translate'];

export default function formFieldDirective($translate) {
  return {
    restrict: "E",
    template: template,
    transclude:true,
    scope: {
      title: '=',
      form: '=',
      field: '='
    },
    link: function($scope, element, attr) {
      $translate($scope.title).then((translated) => {
          $scope.translatedTitle = translated;
      });
    }
  };
}
