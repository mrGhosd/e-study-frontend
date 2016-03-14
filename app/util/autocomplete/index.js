import angular from 'angular';

import AutocompleteController from './AutocompleteController';
import autocompleteDirective from './autocomplete.directive';

export default angular.module('estudy.autocomplete', [])
               .controller('AutocompleteController', AutocompleteController)
               .directive('autocomplete', autocompleteDirective)
               .name;
