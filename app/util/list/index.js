import angular from 'angular';

import listDirective from './list.directive.js';
import formFieldDirective from './form_field.directive.js';

export default angular.module('estudy.utils', [])
      .directive('list', listDirective)
      .directive('formField', formFieldDirective)
      .name;
