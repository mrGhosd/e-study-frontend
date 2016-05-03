import angular from 'angular';

import listDirective from './list.directive.js';

export default angular.module('estudy.utils.list', [])
      .directive('list', listDirective)
      .name;
