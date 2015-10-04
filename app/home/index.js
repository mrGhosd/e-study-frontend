import angular from 'angular';
import uirouter from 'uirouter';

import routing from './home.routes';
import HomeController from './home.controller';

export default angular.module('estudy.home', [uirouter])
    .config(routing)
    .controller('HomeController', HomeController).name;