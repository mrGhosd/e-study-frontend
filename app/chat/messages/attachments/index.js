import anuglar from 'angular';

import AttachesController from './attaches.controller';
import attachesDirective from './attaches.directive';

export default angular.module('estudy.attaches', [])
       .controller('AttachesController', AttachesController)
       .directive('attaches', attachesDirective)
       .name;
